(function(document, window) {
   'use strict';

var apiKey ='553290f690cf2f6bba54bcb5f169d405';
var apiURL = 'https://api.flickr.com/services/rest/';
//example getphoto by exif
var exifURL = "https://api.flickr.com/services/rest/?method=flickr.photos.getExif&api_key=553290f690cf2f6bba54bcb5f169d405&photo_id=15950428049@N00&format=json&nojsoncallback=?"

//open Json of given url for exif
var xhr = new XMLHttpRequest();
xhr.open('GET', exifURL, true);
xhr.send();

xhr.addEventListener("readystatechange", processRequest, false);

//parse and search json for lens match
function processRequest(e){
  if(xhr.readyState == 4 && xhr.status == 200){
    var response = xhr.responseText;
    response = JSON.parse(response);
    var exif = response.photo.exif;

    for(var i = 0; i < exif.length; i++){
      if(exif[i].tag == "LensModel"){
        console.log(exif[i].raw._content);
      }
  }

  }
}

function searchText(parameters){
  var requestParameters = Utility.extend(parameters, {
    method: 'flickr.photos.search',
    api_key: apiKey,
    format: 'json'
  });

  var script = document.createElement('script');
  script.src = Utility.buildUrl(apiURL, requestParameters);
  document.head.appendChild(script);
  document.head.removeChild(script);

}


function buildThumbnailUrl(photo){
  return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_q.jpg';
}

function buildPhotoUrl(photo){
  return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server +
             '/' + photo.id + '_' + photo.secret + '.jpg';
}

function buildPhotoLargeUrl(photo) {
   return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server +
   '/' + photo.id + '_' + photo.secret + '_b.jpg';
}

window.Flickr = Utility.extend(window.Flickr || {}, {
  buildThumbnailUrl: buildThumbnailUrl,
  buildPhotoUrl: buildPhotoUrl,
  buildPhotoLargeUrl: buildPhotoLargeUrl,
  searchText: searchText
});

 })(document, window);
