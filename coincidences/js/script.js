$('#go .input-group.date').datepicker({
    language: "fr"
});



function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

$('#go button').click(() => {
  var targetDate = moment($("#go input").val(), "DD/MM/YYYY");;
  
  var coincidences = [];
  for(var i = 0; i < events.length; i++){
    var e = events[i];

    var eventDate = moment(e.day + "/" + e.month + "/" + e.year, "DD/MM/YYYY"),
        dDay      = targetDate.diff(eventDate, "days"),
        dMonth    = targetDate.diff(eventDate, "months", true),
        dYear     = targetDate.diff(eventDate, "years", true);

    for(var j = 0; j < numbers.length; j++){
      var n = numbers[j];

      if(n.val == dDay || n.val == dMonth || n.val == dYear){
        console.log(dDay, dMonth, dYear, n.val);
 
       coincidences.push({
          type: (n.val == dDay? "jours" : (n.val == dMonth? "mois" : "ans")),
          number:n,
          event:e
        });
      }
    }
  }

  $("#overlay h2").text(coincidences.length + " coïncidence" + (coincidences.length <= 1? "" : "s") + " trouvée" + (coincidences.length <= 1? "" : "s") + " pour le " + $("#go input").val());
  $("#overlay section").empty();
  for(var i = 0; i < coincidences.length; i++){
    var c = coincidences[i];
    $("#overlay section").append("<div>C'est exactement " + c.number.val + " " + c.type + " après le " + pad(c.event.day,2) + "/" + pad(c.event.month, 2) + "/" + c.event.year + " : " + c.event.event);
  }
  $("#overlay").addClass("active");

  console.log(coincidences)
})



document.getElementById("overlay").addEventListener("click", () => {	document.getElementById("overlay").className = ""; });
document.getElementById("modal").addEventListener("click", (event) => event.stopPropagation());

