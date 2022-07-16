var penalty = false

function displayHeader(headerText) {
    let header = $("<h2>");
    $(header).text(headerText);
    $("#quiz-container").append(header);
}

function displayWineCard(wine) {

  // Create card for the wine  
  let card = $("<div id='wine-card' class='wine-card-sample'>")
  let cardContainer = $("<div class='card-container'>");
  $(cardContainer).append(card)
  $("#qrow").append(cardContainer)

  let exit = $("<span id='exit-btn'>")
  let exitImg = $("<img id='exit-image'>")
  $(exitImg).attr("src", "/static/images/x.png");
  $(exitImg).hover(function() {
    $(this).css('cursor','pointer');
  })
  $(exit).append(exitImg)
  $(card).append(exit)

  // Display the type of wine
  let titleRow = $("<div class='row'>")
  let wineName = $("<div id='wineName' class='col-6'>")
  let foodTitle = $("<div id='foodTitle' class='col-6'>")
  $(wineName).text(wine['name'])
  $(foodTitle).text("Food Pairings")
  $(titleRow).append(wineName)
  $(titleRow).append(foodTitle)
  $(card).append(titleRow)

  let contentRow = $("<div class='row'>")
  $(card).append(contentRow)

  // Display the image
  let wineImage = $("<div class='col-2'>")
  let wineImg = $("<img id='card-wine-image'>")
  $(wineImg).attr("src", `/static/${wine["image"]}` );
  $(wineImage).append(wineImg)
  $(contentRow).append(wineImage)
  
  // Display the trademarks and common wines
  let info = $("<div id='info' class='col-4'>")
  let trademarkTitle = $("<div id='trademarkTitle'>")
  $(trademarkTitle).text("Trademarks")
  $(info).append(trademarkTitle)
  let trademarkList = $("<ul id='trademarkList'>")
  for (i = 0; i < wine["trademarks"].length; i++){
    let trademark = $("<li>")
    $(trademark).text(wine["trademarks"][i])
    $(trademarkList).append(trademark)
  }
  $(info).append(trademarkList)
  let commonTitle = $("<div id='commonTitle'>")
  $(commonTitle).text(`Common ${wine["name"]}`)
  $(info).append(commonTitle)
  let commonList = $("<ul id='commonList'>")
  for (i = 0; i < wine["common"].length; i++){
    let common = $("<li>")
    $(common).text(wine["common"][i])
    $(commonList).append(common)
    let audio = $("<audio>");
    $(audio).attr("src", `/static/audios/${wine["audio-files"][i]}`);
    $(audio).attr("id", `${wine["audio-files"][i]}`);
    $(common).append(audio);
    let sound = $(`<img class='sound-button'>`);
    $(sound).attr("src", "/static/images/sound.png");
    $(sound).attr("wine-name", `${wine["common"][i]}`);
    $(sound).attr("audio-file", `${wine["audio-files"][i]}`);
    $(common).prepend(sound)
    $(sound).click(function(){
      let audio = document.getElementById($(this).attr('audio-file'));
      audio.play();
			console.log(`Play the sound for ${$(this).attr('wine-name')}`);
		})
    $(sound).hover(function() {
      $(this).css('cursor','pointer');
    })
  }
  $(info).append(commonList)
  $(contentRow).append(info)

  // Display the food pairings
  let food = $("<div class='col-6'>")
  let foodGrid = $("<div id='foodGrid' class='row'>")
  for (i = 0; i < wine["food-names"].length; i++){
    let foodContainer = $(`<div class='col-6 food-container'>`)
    let foodImage = $("<img class='food-pairing-image'>")
    $(foodImage).attr("src", `/static/images/food-learn/${wine["food-images"][i]}`)
    $(foodContainer).append(foodImage)
    let foodName = $("<div class='food-pairing-name'>")
    $(foodName).text(wine["food-names"][i])
    $(foodContainer).append(foodName)
    $(foodGrid).append(foodContainer)
  }
  $(food).append(foodGrid)
  $(contentRow).append(food)
}

// ajax call function to update score
function update_score(flag, penalize){
  let score = {
      "is_correct": flag.toString(),
      "type": question['type'],
      "penalty": penalize
  };
  console.log(score)
  $.ajax({
      type: "POST",
      url: "update_score",                
      dataType : "json",
      contentType: "application/json; charset=utf-8",
      data : JSON.stringify(score),

      success: function(result){
          let response_score = result["score"]
          console.log("Updated score: ",response_score)
          $('#food-score').html(response_score[1] + "/10")
          $('#wine-score').html(response_score[0] + "/10")
          $('#total-score').html(response_score[2] + "/20")
      },
      error: function(request, status, error){
          console.log("Error Occured during ajax call");
          console.log(request)
          console.log(status)
          console.log(error)
      }
  });


}

// dynamically generate the questions from the list in server.py
function createQuestion(qnum, question){
  let main_div = $('<div class="container" id="questions-container">');
  
  let ques_row = $('<div class="row" id = "ques-row">')
  ques_row.append('<div class="col-md-2 col-sm-2 col-xs-2 col-2" id="qno">'+ qnum +'/10.</div>')
  let span = $('<span class="hovertext">');
  let hint = $('<img id = "hint-icon">')
  $(hint).attr("src", "/static/images/hint.png");
  span.append(hint)
  let ques = $('<div class="col-md-10 col-sm-10 col-xs-10 col-10" id="ques">')
  ques.append(question['ques'])
  ques.append(span)
  ques_row.append(ques)
  let options_main = $('<div class="row" id = "options-row">')
  let op_cols = $('<div class="col-md-12 col-sm-12 col-xs-12 col-12" id="ques">')
  let option_row = $('<div id="opts-row" class = "row">')
  let feedback_row = $('<div class="row" id="feedback-row">')
  for(i=0;i<=question['options'].length-1;i++){
    let option_col = $('<div class="col-lg-3 col-md-6 col-sm-6 col-xs-6 col-6" id="options">')
    let opid = "option"+(i+1).toString()
    let option = $('<div id='+opid+' class="option_hover">')
    if (question['options'][i]['img']!=""){
      op_img = $(`<img class="img-responsive" alt='option-pic' src="/static/images/food-quiz/${question['options'][i]['img']}" id="options-pic">`)
      option.append(op_img);
    }
    option.append('<br>')
    let option_answer = $('<p id="op">'+question['options'][i]['answer']+'</p>')
    option.append(option_answer);
    let feedbackid = "op-feedback"+(i+1).toString()
    option_col.append('<div id='+feedbackid+'></div>')
    option_col.append(option) 
    option_row.append(option_col)
    
  }
  op_cols.append(option_row)
 
  
  options_main.append(op_cols)
  let next_link = "/quiz/"+(qnum+1).toString()
  //let buttons_row = $('<div class="row" id = "nav-buttons-row"><div id="check-btn">Submit</div><a class="mynext" href='+next_link+' id="next-btn"><div>next</div></a></div>   ')
  let buttons_row = $('<div class="row" id = "nav-buttons-row"><div id="check-btn">Submit</div><button onclick="location.href=\''+next_link+'\'" id="next-btn">next</button></div>   ')
  if (qnum==10){
    next_link = "/quiz/end"
    //buttons_row = $('<div class="row" id = "nav-buttons-row"><div id="check-btn">Submit</div><a class="mynext" href='+next_link+' id="next-btn"><div>end</div></a></div>   ')
    buttons_row = $('<div class="row" id = "nav-buttons-row"><div id="check-btn">Submit</div><button onclick="location.href=\''+next_link+'\'" id="next-btn">end</button></div>   ')
  }

  $(".mynext").prop('disabled', true);
  let progress = $('<br><progress value="' + qnum * 10 + '"max="100"></progress>');
 
   
  
  main_div.append(progress)
  main_div.append(ques_row)
  main_div.append(options_main)
  main_div.append(buttons_row)
  main_div.append(progress)
          
  $('#qcol').append(main_div)
}

function info_feedback_correct(correct_info_num) {
  $('#correct-info').click(function(){
    displayWineCard(wines[correct_info_num])
    $('#exit-btn').click(function(){
      $(".card-container").remove();
    });      
  });
}

function info_feedback_wrong(wrong_info_num) {
  $('#incorrect-info').click(function(){
    displayWineCard(wines[wrong_info_num])
    $('#exit-btn').click(function(){
      $(".card-container").remove();
    });      
  });
}

function submit_answer(question, selected){
  $("#op-feedback1").text("");
  $("#op-feedback2").text("");
  $("#op-feedback3").text("");
  $("#op-feedback4").text("");

  console.log(selected.toString())
  console.log(question['correct'].toString())

  // flag to indicate whether user answered the question correctly or not
  flag = 0
  
  if (selected.toString() == question['correct'].toString()){
    // HANDLE QUIZ SCORE PART 
    flag = 1
    // var audio = $("#audio-right")[0];
		// audio.play();
    
  }else{
    // var audio = $("#audio-wrong")[0];
		// audio.play();
  }
  // ajax call to update score
  update_score(flag, penalty) 

  // CSS changes to show answer feedback
  $("#option"+selected.toString()).css("outline", "2px solid red");
  $("#option"+selected.toString()).css("webkit-border-radius", "20px");
  $("#option"+selected.toString()).css("border-radius", "20px");

  $("#op-feedback"+selected.toString()).text("incorrect");
  $("#op-feedback"+selected.toString()).append('<span id="incorrect-info">&#8505;</span>')
  $("#op-feedback"+selected.toString()).css("color", "red");

  $("#option"+question['correct'].toString()).css("outline", "2px solid green");
  $("#option"+question['correct'].toString()).css("webkit-border-radius", "20px");
  $("#option"+question['correct'].toString()).css("border-radius", "20px");
  $("#op-feedback"+question['correct'].toString()).text("correct");
  $("#op-feedback"+question['correct'].toString()).css("color", "green");
  $("#op-feedback"+question['correct'].toString()).append('<span id="correct-info">&#8505;</span>')



  // add info feedback
  info_feedback_correct(question['correct-info'])
  if (selected != 0) {
    info_feedback_wrong(question['options'][selected - 1]['info'])
  }
  

  // once the user has answered the question, they cannot select again
  $("#hint-icon").hide();
  $("#check-btn").hide();
  $("#option1").unbind('click');
  $("#option2").unbind('click');
  $("#option3").unbind('click');
  $("#option4").unbind('click');

  $("#option1").removeClass('option_hover');
  $("#option2").removeClass('option_hover');
  $("#option3").removeClass('option_hover');
  $("#option4").removeClass('option_hover');


}


$(document).ready(function () {
  $("#nav-head").removeClass("clicked");
  $("#quiz-option").addClass("clicked");
  console.log("Quiz page ready");
  qnum = parseInt(qnum)
  createQuestion(qnum,question)
  $(".hovertext").attr("data-hover","hint");
  $('#food-score').html(quiz_score[1] + "/10")
  $('#wine-score').html(quiz_score[0] + "/10")
  $('#total-score').html(quiz_score[2] + "/20")

  var selected = 0
  $("#option1").click(function(){
      $("#option1").css("outline", "2px solid black");
      $("#option1").css("webkit-border-radius", "20px");
      $("#option1").css("border-radius", "20px");
      
      $("#option2").css("outline", "None");
      $("#option3").css("outline", "None");
      $("#option4").css("outline", "None");
      selected = 1;
  });

  $("#option2").click(function(){
    $("#option2").css("outline", "2px solid black");
    $("#option2").css("webkit-border-radius", "20px");
    $("#option2").css("border-radius", "20px");

    $("#option1").css("outline", "None");
    $("#option3").css("outline", "None");
    $("#option4").css("outline", "None");
    selected = 2;
  });

  $("#option3").click(function(){
    $("#option3").css("outline", "2px solid black");
    $("#option3").css("webkit-border-radius", "20px");
    $("#option3").css("border-radius", "20px");

    $("#option2").css("outline", "None");
    $("#option1").css("outline", "None");
    $("#option4").css("outline", "None");
    selected = 3;
  });

  $("#option4").click(function(){
    $("#option4").css("outline", "2px solid black");
    $("#option4").css("webkit-border-radius", "20px");
    $("#option4").css("border-radius", "20px");

    $("#option2").css("outline", "None");
    $("#option3").css("outline", "None");
    $("#option1").css("outline", "None");
    selected = 4;
  });



  $("#check-btn").click(function(){
    
    if (selected === 0){
        $(function () {
          $.ui.dialog.prototype._focusTabbable = function(){};
          $("#dialog").dialog({

              modal: true,
              dialogClass: "mydialogclass",
              width: 550,
              buttons: [
              {
                  id: "Try",
                  text: "Keep Trying",
                  click: function () {
                      $(this).dialog('close');
                  
                  }
              },
              {
                  id: "Skip",
                  text: "Learn Answer",
                  click: function () {                      
                      $(this).dialog('close');
                      $("#next-btn").prop('disabled', false);
                      $("#next-btn").removeClass("disabledButton");
                      submit_answer(question, selected);
                      
                     
                  }
              }
             
              
              ]
              

          });
      });
    }else{
      $("#next-btn").prop('disabled', false);
      $("#next-btn").removeClass("disabledButton");
      submit_answer(question, selected);
     
    }
  });

});


$(document).ready(function () {
  $("#continue-button").click(function(){
    window.location.replace("/quiz/1");
  });
});


$(document).ready(function () {

  $("#next-btn").prop('disabled', true);
  $("#next-btn").addClass("disabledButton");  
});





$(document).ready(function () {

  $("#hint-icon").click(function(){
    $(function () {
      $.ui.dialog.prototype._focusTabbable = function(){};
      $("#dialog-hint").dialog({
        modal: true,
        dialogClass: "mydialogclass",
        width: 550,
        buttons: [
        {
            id: "no-hint",
            text: "Keep Trying",
            click: function () {
                $(this).dialog('close');
            
            }
        },
        {
            id: "use-hint",
            text: "Use Hint",
            click: function () {                      
                $(this).dialog('close');
                $(this).dialog('widget').addClass('hintdialogclass');
                $( function() {
                  penalty = true
                  let queshint =  question["hint"]
                  console.log(queshint);                  
                  $("#ques-hint").text(queshint);
                  $("#ques-hint").dialog({ width : 500 });
                
                });             
            }
        } 
        ]
      });
    });
  });
});











