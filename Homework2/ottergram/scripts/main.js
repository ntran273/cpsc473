var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var randomThumb;
var usedImg;
var tacocaturl = "https://img0.etsystatic.com/135/0/9793565/il_340x270.1006989508_atrg.jpg";
// Set Details with image URL and Title Text

function setDetails(imageURL, titleText) {
  'use strict';
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute('src', imageURL);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;

}

// Get images from Thumbnail
function imageFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-url');
}

// Get titles from Thumbnail
function titleFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-title');
}

// Set Details from Thumb
function setDetailsFromThumb(thumbnail) {
  'use strict';
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}


//Function generate random Number
function randomNumber() {
  var thumbnails = getThumbnailsArray();
  var length = thumbnails.length;
  var randomNumb = Math.floor(Math.random() * length);
  return randomNumb;
}

//Function set Thumbnails Tacocat in random place
function setRandomTacocat() {
  var thumbnails = getThumbnailsArray();
  var num = randomNumber();
  randomThumb = thumbnails[num];
  usedImg = randomThumb.getAttribute('data-image-url');
  randomThumb.setAttribute('data-image-url', tacocaturl);
}


// Add thumbnail click, set detail, and prevent default
function addThumbClickHandler(thumb) {
  'use strict';
  thumb.addEventListener('click', function(event) {
    event.preventDefault();

    /*
      Get Image Url
      If Image Url = tacoimage Url, then restore used image and set tacocat to random place
    */
    var imgURL = imageFromThumb(thumb);
    if (imgURL = tacocaturl) {
      randomThumb.setAttribute('data-image-url', usedImg);
      setRandomTacocat();
    }

    setDetailsFromThumb(thumb);
  });
}

// Get Thumbnail Array
function getThumbnailsArray() {
  'use strict';
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

// initializeEvents
function initializeEvents() {
  'use strict';
  setRandomTacocat();
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);

}

initializeEvents();
