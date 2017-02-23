import React from 'react';
import Utility from './utility';
import axios from 'axios';

class Flickr extends React.Component {

  searchText(searchString){
    const apiKey ='553290f690cf2f6bba54bcb5f169d405';
    const apiURL = 'https://api.flickr.com/services/rest/';

    const requestParameters = Utility.extend({
      text: searchString,
      per_page: 20,
      method: 'flickr.photos.search',
      api_key: apiKey,
      format: 'json'
    });

    // FIXME: Build Url within Axios call instead of complete sepereate utility
    const fullApiUrl = `${Utility.buildUrl(apiURL, requestParameters)}&nojsoncallback=?`;

    axios.get(fullApiUrl)
      .then((response) => {
        return response;
      })
      .catch(function (error) {
        return error;
      });
    // let script = document.createElement('script');
    // // script.src = Utility.buildUrl(apiURL, requestParameters);
    // document.head.appendChild(script);
    // document.head.removeChild(script);
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

export default Flickr;
