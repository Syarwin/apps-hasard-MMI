var numbers = [];
function AN(v, c){
  numbers.push({
    val:  v,
    text: c
  });
}


AN(1, "Pile-poil 1 !");

// Puissances de 10
var p = 10;
for(var i = 1; i <= 9; i++, p *= 10)
  AN(p, "Puissance de 10 : 10^" + i);

// Puissances de 2
var p = 32;
for(var i = 5; i < 10; i++, p *= 2)
  AN(p, "Puissance de 2 : 2^" + i)
for(var i = 10; i < 20; i++, p *= 2)
  AN(p, "Puissance de 2 : 2^" + i + " = " + (p / 1024) + "ko");
for(var i = 20; i < 27; i++, p *= 2)
  AN(p, "Puissance de 2 : 2^" + i + " = " + (p / 1048576) + "Mo");


// Nombres composés d'un seul chiffre
for(var k = 1; k <= 9; k++){
  var p = k*111;
  for(var i = 0; i < 7; i++, p = 10*p + k)
    AN(p, "Nombre composé uniquement du chiffre " + k);
}


// Suites consécutives
var p = 123;
for(var k = 4; k <= 9; p = 10*p + k, k++)
  AN(p, "Nombre composé de chiffres consécutifs");


// Palindromes
for(var i = 100; i < 9999; i++){
  var r = 0,
      p = 1;
  for(var j = i; j > 0; j = Math.floor(j / 10)){
    r = 10*r + (j % 10);
    p *= 10;
  }

  var n1 = i*p + r,
      n2 = (i - (i % 10))*p/10 + r;
  
  AN(n1, "Nombre palindromique : se lit indifféremment de gauche à droite et de droite à gauche");
  AN(n2, "Nombre palindromique : se lit indifféremment de gauche à droite et de droite à gauche");
}
