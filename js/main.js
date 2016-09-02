(function(document, window){
  'use strict';

  var gallery;
  var lastSearch = 'London';

  function searchPhotos(text, page){
    if(text.length === 0){
      alert('Error: this field is required');
    }

    page = page > 0 ? page : 1;

    Flickr.searchText({
      text: text,
      per_page: 6,
      jsoncallback: 'Website.Homepage.showPhotos',
      page: page
    });
  }


function showPhotos(data){
  gallery = new Gallery(data.photos.photo, document.getElementById('gallery-image'));
  gallery.createThumbnailsGallery(document.getElementById('thumbnail_list'));
}

function init(){
  document.getElementById('search-form').addEventListener('submit', function(event){
    event.preventDefault();

    lastSearch = document.getElementById('query').value;
    if(lastSearch.length > 0){
      searchPhotos(lastSearch, 1);
    }
  });

    searchPhotos(lastSearch, 1);
}

window.Website = Utility.extend(window.Website || {}, {
  Homepage: {
    init: init,
    showPhotos: showPhotos
  }
});
})(document, window);

Website.Homepage.init();
