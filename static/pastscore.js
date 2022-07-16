$(document).ready(function () {
    $('#past-scores-option').addClass("clicked")
    let isEmpty = Object.keys(past_score).length === 0    
    if (isEmpty === true){
        var div = $("<b><p class='row center'></p><b>")
        div.append("No scores yet!")
        $("#pastscores-message").prepend(div);
    }else{
        $.each(past_score, function (index, value) {        
            var div = $("<b><p class='row center'></p><b>")
            var datetime = $("<div class='date'>" + value['datetime'] + ", " + "</div>")
            var score = value['score'] + " out of 20"
            var score_info = $("<div class='score'>  " + score + "</div>")
            div.append(datetime)
            div.append(score_info)
            $("#pastscores-message").prepend(div)
        });
    }
   
});

$(document).ready(function () {
    $("#nav-head").removeClass("clicked");
    $("#exit-button").click(function(){
      window.location.replace("/");
    });
});