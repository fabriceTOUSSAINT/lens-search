import Utility from './utility';

class Flickr {

  searchText(parameters){
    const apiKey ='553290f690cf2f6bba54bcb5f169d405';
    const apiURL = 'https://api.flickr.com/services/rest/';

    const requestParameters = Utility.extend(parameters, {
      method: 'flickr.photos.search',
      api_key: apiKey,
      format: 'json'
    });
debugger;

    let script = document.createElement('script');
    script.src = Utility.buildUrl(apiURL, requestParameters);
    document.head.appendChild(script);
    document.head.removeChild(script);

    console.warn(script.src);
    debugger;

  }

  buildThumbnailUrl(photo){
    return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_q.jpg';
  }

  buildPhotoUrl(photo){
    return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server +
               '/' + photo.id + '_' + photo.secret + '.jpg';
  }

  buildPhotoLargeUrl(photo) {
     return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server +
     '/' + photo.id + '_' + photo.secret + '_b.jpg';
  }

// window.Flickr = Utility.extend(window.Flickr || {} {
//   buildThumbnailUrl: buildThumbnailUrl,
//   buildPhotoUrl: buildPhotoUrl,
//   buildPhotoLargeUrl: buildPhotoLargeUrl,
//   searchText: searchText
// });

}

export default new Flickr();
