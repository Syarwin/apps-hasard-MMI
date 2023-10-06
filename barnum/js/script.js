if(localStorage.getItem("nVotes") == undefined){
  localStorage.setItem("nVotes", 0);
  for(var i = 0; i < 5; i++)
    localStorage.setItem("nVotes" + i, 0);
}


$('#go .input-group.date').datepicker({
    language: "fr"
});


$('#go button').click(() => {
  var date = $("#go input").val();
  $("#overlay").addClass("active");
  $("#load").css("display", "block");
  $("#horoscope").css("display","block");
  $("#smileys").css("display","flex");
  $("#explications").css("display","none");

  setTimeout(() => {
    $("#load").css("transform", "rotate(1200deg)");
    setTimeout(() => {
      $("#load").css("display", "none");
      $("#modal").addClass("active");


    }, 1000);
  }, 100);
})


$("#smiley_0").click(vote(0));
$("#smiley_1").click(vote(1));
$("#smiley_2").click(vote(2));
$("#smiley_3").click(vote(3));
$("#smiley_4").click(vote(4));


function vote(i){
  return () => {
    var a = parseInt(localStorage.getItem("nVotes" + i)),
        n = parseInt(localStorage.getItem("nVotes"));
    localStorage.setItem("nVotes" + i, a+1);
    localStorage.setItem("nVotes", n+1);

    $("#horoscope").css("display","none");
    $("#smileys").css("display","none");
    $("#explications").css("display","block");
  };
}


$("#overlay").click(closeModal);
$("#close").click(closeModal); 

function closeModal(){
  $("#load").css("display", "none");
  $("#load").css("transform", "rotate(0deg)");
  $("#modal").removeClass("active");
  $("#overlay").removeClass("active"); 
}
document.getElementById("modal").addEventListener("click", (event) => event.stopPropagation());

