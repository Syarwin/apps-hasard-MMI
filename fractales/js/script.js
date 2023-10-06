document.getElementById("render").addEventListener("click", validateWord);
$("#form-word").submit(validateWord);

function validateWord(){
  var text = document.getElementById("word").value;
  if($.trim(text).length == 0)
    return false;
  var word = new Word(text, 1);

  document.getElementById("container").style.marginTop = "-100vh";
  document.getElementById("arrow-back").style.opacity = "0";
  document.getElementById("instructions_depart").style.opacity = "1";
  var renderer = new Renderer(document.getElementById("renderer"), {
    ratio: 1.2,
    size: text.length,
    marginX: 40,
    marginY: 230,
    maxPoints: 50000,
  });


  var N = Math.round(1000000 * word.area * renderer.density);
  var fractal = new Fractal(word.affineMaps);
  var canvas = document.querySelector("#renderer canvas");
  canvas.onclick = function(e){
    var coords = renderer.getMouseCoords(e);
    if(!coords)
      return;

    // Desactivate click
    canvas.onclick = () => {};

    // Generate fractal
    fractal.computeOrbit(N, coords);
    renderer.initAnimation(fractal.orbit, {
      duration : 5000,
    });

    document.getElementById("arrow-back").style.opacity = "1";
    document.getElementById("instructions_depart").style.opacity = "0";
    setTimeout(function(){ renderer.startAnimating() }, 1000);
  };

  return false;
}



$("#arrow-back").click(backTop);
$(document).keyup(function(e) {
  if (e.keyCode === 27) backTop();
});
function backTop(){
  document.getElementById("container").style.marginTop = "0";
}
