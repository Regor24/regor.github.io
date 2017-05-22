// прелоадер для изображений на странице
(function(){

  document.addEventListener("DOMContentLoaded", function(){

    var spinnerTemplate = document.querySelector("#spinner-template").innerHTML;
    var spinnerNumbers = ["first", "second", "third", "fourth", "fifth", "sixth"];
    var imagesArray = [];
    var spinnersArray = [];

    for(var i = 0; i < spinnerNumbers.length; i++){
      var html = Mustache.render(spinnerTemplate, {
        "spinnerNumber": spinnerNumbers[i]
      });

      var imageBlock = document.querySelector("[imgBlock=" + spinnerNumbers[i] + "]"); 
      imageBlock.innerHTML = imageBlock.innerHTML + html; 

      var spinner = document.querySelector("[spinner=" + spinnerNumbers[i] + "]");  
      var image = document.querySelector("[imgnumber=" + spinnerNumbers[i] + "]");  

      image.classList.add("modal-content-hide");
      spinner.classList.add("modal-content-show");

      imagesArray.push(image);
      spinnersArray.push(spinner);

    }

    imagesArray[0].onload = function(){
      spinnersArray[0].classList.remove("modal-content-show");
      imagesArray[0].classList.remove("modal-content-hide");      
    }
    imagesArray[1].onload = function(){
      spinnersArray[1].classList.remove("modal-content-show");
      imagesArray[1].classList.remove("modal-content-hide");      
    }
     imagesArray[2].onload = function(){
      spinnersArray[2].classList.remove("modal-content-show");
      imagesArray[2].classList.remove("modal-content-hide");      
    }
     imagesArray[3].onload = function(){
      spinnersArray[3].classList.remove("modal-content-show");
      imagesArray[3].classList.remove("modal-content-hide");      
    }
     imagesArray[4].onload = function(){
      spinnersArray[4].classList.remove("modal-content-show");
      imagesArray[4].classList.remove("modal-content-hide");      
    }
     imagesArray[5].onload = function(){
      spinnersArray[5].classList.remove("modal-content-show");
      imagesArray[5].classList.remove("modal-content-hide");      
    }

  });


})();


// modal block in header
(function(){

  var modalLinksBlock = document.querySelector(".js-modal-header-links");
  var modalLinksCloseCross = document.querySelector(".js-close-cross");
  var modalLinksButton =  document.querySelector(".js-header-link-button");

  modalLinksButton.addEventListener("click", switchModalLinks); 
  modalLinksCloseCross.addEventListener("click", switchModalLinks); 

  function switchModalLinks(e){

    if (modalLinksBlock.style.display === "block") {
      modalLinksBlock.style.display = "none";
      modalLinksCloseCross.style.display = "none";
    } else {
      modalLinksBlock.style.display = "block";
      modalLinksCloseCross.style.display = "block";
    }

  }

})();


// modal block plan in project page
(function(){

  var projPlanForm = document.querySelector(".js-project-plan-form");
  var projPlanClose = document.querySelector(".js-plan-close");
  var backOverlay = document.querySelector(".js-background-overlay");

  //var projPlanItem = document.querySelector(".js-plan-item");
  var projPlanItems = document.querySelector(".js-levels-content");

  //projPlanItem.addEventListener("click", showPlanForItem);
  projPlanItems.addEventListener("click", showPlanForItem);

  projPlanClose.addEventListener("click", closePlanForItem); 

  function showPlanForItem(e){

    if (hasClass(e.target, "js-plan-item")){
      if (projPlanForm.style.display === "block") {
        projPlanForm.style.display = "none";
        backOverlay.classList.remove("darken-background");
      } else {
        projPlanForm.style.display = "block";
        backOverlay.classList.add("darken-background");
      }  
    }

  }

  function closePlanForItem(e){

    if (projPlanForm.style.display === "block") {
      projPlanForm.style.display = "none";
      backOverlay.classList.remove("darken-background");
    } else {
      projPlanForm.style.display = "block";
      backOverlay.classList.add("darken-background");
    }  
  }


  function hasClass(element, cls) {
      return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }

  window.addEventListener("keydown", function(event){
    if (event.keyCode == 27) {
      projPlanForm.style.display = "none";
      backOverlay.classList.remove("darken-background");
    }
  });

})();


//tabs in project page
(function(){

  var projNavList = document.querySelector(".js-proj-nav-list");
  var projBanner = document.querySelector(".js-banner");
  var projFormSearch = document.querySelector(".js-form-search");  
  
  var contentNavs = {
    'tab-about': document.querySelector("#tab-about"),
    'tab-gallery': document.querySelector("#tab-gallery"),
    'tab-plan': document.querySelector("#tab-plan"),
    'tab-docs': document.querySelector("#tab-docs"),
    'tab-map': document.querySelector("#tab-map"),
    'tab-sales': document.querySelector("#tab-sales"),
  }

  var contentTabs = {
    'tab-about': document.querySelector("#tab-content-about"),
    'tab-gallery': document.querySelector("#tab-content-gallery"),
    'tab-plan': document.querySelector("#tab-content-plan"),
    'tab-docs': document.querySelector("#tab-content-docs"),
    'tab-map': document.querySelector("#tab-content-map"),
    'tab-sales': document.querySelector("#tab-content-sales"),
  }

  // contentNavs['tab-about'].setAttribute("checked", "checked");
  // contentTabs['tab-gallery'].classList.add("hide-content");

  for (var item in contentNavs){
    if (!contentNavs[item].attributes['checked']){
       contentTabs[item].classList.add("hide-content");
    }
  }  

  projNavList.addEventListener('click', switchContentTab);

  function switchContentTab(e){
    
    for (var item in contentTabs){
      if (item != e.target.attributes['for'].value){
        contentTabs[item].classList.add("hide-content");
      }
    }

    contentTabs[e.target.attributes['for'].value].classList.remove("hide-content");

    if ((e.target.attributes['for'].value === 'tab-docs') || (e.target.attributes['for'].value === 'tab-sales')){
      projBanner.style.display = 'none';  
      projFormSearch.style.display = 'none';  
    } else {
      projBanner.style.display = 'block';  
      projFormSearch.style.display = 'block';        
    }

  }

})();


// levels for proj. page
(function(){

  var levelsContent = document.querySelector('.js-levels-content');
  var levelsNavs = document.querySelector('.js-levels-navs'); 
  var firstLevel = document.querySelector('[level="level1"]'); 

  firstLevel.classList.add("show-hidden-content");

  levelsNavs.addEventListener("click", showLevel);

  function showLevel(e){
    var level = e.target.attributes["for"].value;
    for (var i = 0; i < levelsContent.children.length; i++){
      if (levelsContent.children[i].attributes["level"].value === level){
        levelsContent.children[i].classList.add("show-hidden-content");
      } else{
        levelsContent.children[i].classList.remove("show-hidden-content");        
      }
    }
  }


})();


