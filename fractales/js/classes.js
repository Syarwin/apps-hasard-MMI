
/*
 * Class that defines an affine map of the real plane
 */
class AffineMap {
  constructor(t){
    this.l = [[t[0], t[1]], [t[2], t[3]]];
    this.b = [t[4], t[5]];
  }

  apply(p){
    return {
      x : this.l[0][0]*p.x + this.l[0][1]*p.y   + this.b[0],
      y : this.l[1][0]*p.x + this.l[1][1]*p.y   + this.b[1],
    };
  }

  translate(p){
    this.b[0] += p.x;
    this.b[1] += p.y;
  }

  scale(s){
    this.l[0][0] *= s.x;
    this.l[0][1] *= s.x;
    this.l[1][0] *= s.y;
    this.l[1][1] *= s.y;

    this.b[0] *= s.x;
    this.b[1] *= s.y;
  }


  get det(){
    return this.computeDet();
  }

  computeDet(){
    return this.l[0][0] * this.l[1][1] - this.l[0][1] * this.l[1][0];
  }
};

function mapFromRectangle(r){
  return new AffineMap([
    r[1].x - r[0].x, 
    r[3].x - r[0].x,
    r[1].y - r[0].y, 
    r[3].y - r[0].y,
    r[0].x,
    r[0].y
  ]);
}



/*
 * Class that allow to define a fractal given by the list of affine map
 */
class Fractal {
	constructor(t){
		// Instanciate the maps and compute the probability distribution
		this.affineMaps = [];
		this.distribution = [];

		var s = 0;
		for(var i = 0; i < t.length; i++){
      var map;
      if(t[i] instanceof AffineMap)
        map = t[i];
      else
			  map = new AffineMap(t[i]);

			this.affineMaps.push(map);
			this.distribution.push(map.det);
			s += map.det;
		}

		// Normalize the distribution
		for(var i = 0; i < t.length; i++)
			this.distribution[i] /= s;
	} 


	randomMap(){
	  var r = Math.random();
  	for(var i = 0; i < this.distribution.length; i++){
	    r -= this.distribution[i];
	    if(r < 0)
	      return this.affineMaps[i];
 	 	}

  	return -1; // This line shouldn't be reached
	}

	computeOrbit(N, pos){
		this.orbit = [];
		this.orbit.push(pos? pos : {x:0, y:0});

		for(var i = 0; i < N; i++){
		  var p = this.orbit[i];
  		var m = this.randomMap();
 	 		this.orbit.push(m.apply(p));
		}
	}
}


/*
 * Class Letter
 */
class Letter {
  constructor(letter){
    if(letter == " "){
      this.rectangles = [];
      this.affineMaps = [];
      this.w = 3;
      this.h = 2;
      return;
    }
      
    this.rectangles = dictionnary[letter.toUpperCase()]
    this.affineMaps = [];

    // Compute non-empty size of letter
    var xmin = 7,  xmax = 0,
        ymin = 10, ymax = 0;
    for(var i = 0; i < this.rectangles.length; i++)
    for(var j = 0; j < 4; j++){
      xmin = Math.min(xmin, this.rectangles[i][j].x);
      xmax = Math.max(xmax, this.rectangles[i][j].x);
      ymin = Math.min(ymin, this.rectangles[i][j].y);
      ymax = Math.max(ymax, this.rectangles[i][j].y);
    }     

    this.w = xmax - xmin
    this.h = ymax - ymin
    var tOrigin = { x : -xmin, y : -ymin};

    // Init affine maps
    for(var i = 0; i < this.rectangles.length; i++){
      var m = mapFromRectangle(this.rectangles[i]);
      m.translate(tOrigin);
      this.affineMaps.push(m);
    }
  }
}            


/*
 * Class Word
 */
class Word {
  constructor(text, margin){
    this.text = text;
    this.margin = margin;
    this.affineMaps = [];
    this.area = 0;

    this.w = 0;
    this.h = 0;
    for(var i = 0; i < text.length; i++){
      var l = new Letter(text[i]);
      for(var j = 0; j < l.affineMaps.length; j++){
        l.affineMaps[j].translate({x : this.w, y : 0});
        this.affineMaps.push(l.affineMaps[j]);
      }

      this.w += l.w + this.margin;
      this.h = Math.max(this.h, l.h);
    }            
    this.w -= this.margin;

    // Rescale
    var scale = { x : 1/this.w, y : 1/this.h };
    for(var i = 0; i < this.affineMaps.length; i++){
      this.affineMaps[i].scale(scale);
      this.area += this.affineMaps[i].det;
    }
  }                
}
        





/*
 * Class that defines a renderer
 */
class Renderer{
  constructor(o,t){
    var maxRatio = Math.min((o.offsetWidth - 2*t.marginX)/ t.size, (o.offsetHeight - 2*t.marginY) / t.ratio);
    this.w = t.size * maxRatio;
    this.h = t.ratio * maxRatio;
    this.density = (this.w * this.h) / (o.offsetWidth * o.offsetHeight);
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.w + 2*t.marginX;
    this.canvas.height = this.h + 2*t.marginY;
    while(o.firstChild)
      o.removeChild(o.firstChild);
    o.appendChild(this.canvas);

    this.ctx = this.canvas.getContext("2d");
    this.settings = t;

    this.ctx.fillStyle = "rgba(0,0,120,0.4)";
    this.ctx.fillRect(t.marginX, t.marginY, this.w, this.h);

		// View parameters
		this.x0 = 0;
		this.y0 = 0;
		this.wView = this.canvas.width;
		this.hView = this.canvas.height;
		this.lastX = null;
		this.lastY = null;

    document.body.addEventListener("dblclick",   (e) => this.handleDblClick(e), 	false);
    document.body.addEventListener("mousedown",  () => this.handleMouseDown(), 		false);
    document.body.addEventListener("mousemove",  (e) => this.handleMouseMove(e), 	false);
    document.body.addEventListener("mouseup",    () => this.handleMouseUp(), 			false);
    document.body.addEventListener("mousewheel", (e) => this.handleMouseWheel(e), 		false);
    document.body.addEventListener("DOMMouseScroll", (e) => this.handleMouseWheel(e), false);
  }

  getMouseCoords(e){
    var coords = this.canvas.relMouseCoords(e);
    if(coords.x < this.settings.marginX
    || coords.x > this.w + this.settings.marginX
    || coords.y < this.settings.marginY
    || coords.y > this.h + this.settings.marginY)
      return false;

    coords.x = (coords.x - this.settings.marginX) / this.w,
    coords.y = 1 - (coords.y - this.settings.marginY) / this.h;
    return coords;
  }


	getCoords(pos){
		return {
      x : this.w*pos.x + this.settings.marginX, 
      y : this.canvas.height - this.settings.marginY - this.h*pos.y
		};
	}


  drawPoint(pos, r, opacity){
    this.ctx.beginPath();
    this.ctx.arc(pos.x, pos.y, r, 0, 2*Math.PI, false);

    this.ctx.fillStyle = "rgba(255,0,0," + opacity + ")";
    this.ctx.fill();
  }



  updateDrawing(M, r){
		// Global transformation
    this.ctx.setTransform(1,0,0,1,0,0);
    this.ctx.scale(this.canvas.width / this.wView, this.canvas.height / this.hView);
    this.ctx.translate(-this.x0, -this.y0);
   	this.ctx.clearRect(this.x0, this.y0, this.wView, this.hView);

		// If we are still running the animation, display the right amount of points
		if(this.animationStart != null){
	    for(var i = 0; i < M; i++)
 	    	this.drawPoint(this.points[i], r, (1 - 0.9*i/M));
		}
		// Otherwise, use the quadtree to find the points to draw
		else {
			// Use a radius inversely proportional to scale
			r = this.wView / this.canvas.width;

			// Define the boundaries of current view
			var mX = this.x0,
					MX = (this.x0 + this.wView),
					mY = this.y0,
					MY = (this.y0 + this.hView);

			var _this = this;
			var nDrawn = 0;
			for(var i = 0; i < this.quadtrees.length && nDrawn < this.settings.maxPoints; i++){
  			this.quadtrees[i].visit(function(node, x1, y1, x2, y2) {
				  if (!node.length) {
		    		do {
		      		var d = node.data;
		      		if(d.x >= mX && d.x < MX && d.y >= mY && d.y < MY && nDrawn <= _this.settings.maxPoints){
				 	    	_this.drawPoint(d, r, 1);
								nDrawn++;
							}
		    		} while (node = node.next);
		  		}

				  return x1 >= MX || y1 >= MY || x2 < mX || y2 < mY || nDrawn > _this.settings.maxPoints;
	  		});
			}

			console.log(nDrawn);
		}
  }




  initAnimation(points, settings){
    this.aSettings = settings;

		this.points = [];
    this.quadtrees = [];
		var k = 0;
		for(var i = 0; i < points.length; i++){
			if(k == 0)
				this.quadtrees.push(d3.quadtree().x((p) => { return p.x}).y((p) => { return p.y}));

			var t = this.getCoords(points[i]);

			// Add to the current quadtree
			this.quadtrees[this.quadtrees.length - 1].add(t);
			k++;
			if(k >= this.settings.maxPoints)
				k = 0;

			// Add to the points if it's not too much
			if(i < this.settings.maxPoints)
				this.points.push(t);
		}

   	this.ctx.clearRect(this.x0, this.y0, this.wView, this.hView);
    this.drawPoint(this.points[0], 20, 1);
  }


  startAnimating(){
    this.animationStart = null;
    var animationStep = (timestamp) => {
      if (this.animationStart === null)
        this.animationStart = timestamp;

  	  var animationProgress = timestamp - this.animationStart;
      if(animationProgress > this.aSettings.duration)
        animationProgress = this.aSettings.duration;
      var t = animationProgress / this.aSettings.duration;

      // Compute the number of points to draw and the radius of the points
      var M = Math.round(Math.exp(t * Math.log(this.points.length)));
      var r = Math.ceil(Math.exp((10000 - M)/10000 * Math.log(20)));
      r = Math.max(r, 1);

      // Update drawing
	    this.updateDrawing(M, r);

      if(animationProgress < this.aSettings.duration)
        requestAnimationFrame(animationStep);
			else
				this.animationStart = null;
    };

    requestAnimationFrame(animationStep);
  }



	/*
	 * Event handlers for scaling
   */

	scaleView(scale, x, y){
    this.wView *= scale;
    this.hView *= scale;

    if (this.wView > this.canvas.width || this.hView > this.canvas.height) {
      this.wView = this.canvas.width;
      this.hView = this.canvas.height;
      x = this.wView/2;
      y = this.hView/2;
    }

    this.x0 = x - this.wView/2;
    this.y0 = y - this.hView/2;

    this.updateDrawing();
	}


  handleDblClick(event) {
		if(this.animationStart != null)
			return;

    var X = event.clientX - this.canvas.offsetLeft - this.canvas.clientLeft + this.canvas.scrollLeft,
    		Y = event.clientY - this.canvas.offsetTop - this.canvas.clientTop + this.canvas.scrollTop,
    		x = X/this.canvas.width * this.wView + this.x0,
    		y = Y/this.canvas.height * this.hView + this.y0;

    var scale = event.shiftKey == 1 ? 1.8 : 0.2;
		this.scaleView(scale, x, y);
  }



  handleMouseWheel(event) {
		if(this.animationStart != null)
			return;

    var x = this.wView/2 + this.x0,
    		y = this.hView/2 + this.y0;

    var scale = (event.wheelDelta < 0 || event.detail > 0) ? 1.3 : 0.7;
		this.scaleView(scale, x, y);
  }



	/*
	 * Event handlers for panning
   */

  handleMouseDown(event) {
		if(this.animationStart != null)
			return;

    this.mouseDown = true;
  }

  handleMouseUp(event) {
		if(this.animationStart != null)
			return;

    this.mouseDown = false;
  }


  handleMouseMove(event) {
		if(this.animationStart != null)
			return;

    var X = event.clientX;
    var Y = event.clientY;
		if(this.lastX == null && this.lastY == null){
			this.lastX = X;
			this.lastY = Y;
			return;
		}

    if (this.mouseDown) {
      var dx = (X - this.lastX) / this.canvas.width * this.wView;
      var dy = (Y - this.lastY)/  this.canvas.height * this.hView;
      this.x0 -= dx;
      this.y0 -= dy;

      this.updateDrawing(this.points.length, this.wView / this.canvas.width);
    }
    this.lastX = X;
    this.lastY = Y;
  }
}







// Get real coordinate of mouse click
function relMouseCoords(event){
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do{
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    }
    while(currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    return {x:canvasX, y:canvasY}
}
HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;

