let sliderObjects = [];
createSliderObjects();

function plusDivs(obj, n) {
  let parentDiv = $(obj).parent();
  let matchedDiv;
  $.each(sliderObjects, function (i, item) {
    if ($(parentDiv[0]).attr("id") === $(item).attr("id")) {
      matchedDiv = item;
      return false;
    }
  });
  matchedDiv.slideIndex = matchedDiv.slideIndex + n;
  showDivs(matchedDiv, matchedDiv.slideIndex);
}

function createSliderObjects() {
  let sliderDivs = $(".slider");
  $.each(sliderDivs, function (i, item) {
    let obj = {};
    obj.id = $(item).attr("id");
    obj.divContent = item;
    obj.slideIndex = 1;
    obj.slideContents = $(item).find(".mySlides");
    obj.slideIterations = $(item).find(".numbertext");
    showDivs(obj, 1);
    sliderObjects.push(obj);
  });
}

function showDivs(divObject, n) {
  let i;
  if (n > divObject.slideContents.length) {
    divObject.slideIndex = 1;
  }
  if (n < 1) {
    divObject.slideIndex = divObject.slideContents.length;
  }
  for (i = 0; i < divObject.slideContents.length; i++) {
    divObject.slideContents[i].style.display = "none";
    divObject.slideIterations[i].style.display = "none";
  }
  divObject.slideContents[divObject.slideIndex - 1].style.display = "block";
  divObject.slideIterations[divObject.slideIndex - 1].style.display = "block";
}
