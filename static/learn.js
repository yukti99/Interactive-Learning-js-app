function displayWineCard(wine) {

  // Create card for the wine
  let card = $("<div id='wine-card'>")
  $("#learn-container").append(card)
  let exit = $("<a href='/learn/0'>")
  let exitImg = $("<img id='exit-image'>")
  $(exitImg).attr("src", "/static/images/x.png");
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
    let sound = $(`<img class='sound-button'>`)
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

function displayCounterWines(wines){
  for (const [key, value] of Object.entries(wines)) {
    let wineLink = $(`<a wine-number='${key}' href='/learn/${key}'>`)
    let wineImg = $(`<img id='${value['name'].toLowerCase()}-learn-image' class='learn-img'/>`);
    $(wineImg).attr("src", `/static/${value["image"]}` );
    $(wineLink).append(wineImg)
    $("#learn-container").append(wineLink)
  }
  let groceriesImg = $(`<img id='groceries-learn-image'/>`);
  $(groceriesImg).attr("src", `/static/images/groceries.png` );
  $("#learn-container").append(groceriesImg)
}

$(document).ready(function () {
  $("#nav-head").removeClass("clicked");
  $("#learn-option").addClass("clicked")
  displayCounterWines(wines);
  if (wine != "None"){
    displayWineCard(wine);
  }
});