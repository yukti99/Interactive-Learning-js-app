$(document).ready(function () {
    $("#quiz-option").addClass("clicked");
    $('#food-message').html("Food Pairings: " + "<div class='bold'>" + quiz_score[1] + "/10" + "</div>")
    $('#wine-message').html("Wine Types: " + "<div class='bold'>" + quiz_score[0] + "/10" + "</div>")
    $('#total-message').html("Total Score: " + "<div class='bold'>" + quiz_score[2] + "/20" + "</div>")
    
});


$(document).ready(function () {
    $("#past-scores-button").click(function(){
      window.location.replace("/quiz/past_scores");
    });
});

$(document).ready(function () {
  $("#nav-head").removeClass("clicked");
    $("#exit-button").click(function(){
      window.location.replace("/");
    });
});