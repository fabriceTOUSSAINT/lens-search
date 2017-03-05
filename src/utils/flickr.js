import axios from 'axios';


const apiKey ='553290f690cf2f6bba54bcb5f169d405';
const apiURL = 'https://api.flickr.com/services/rest/';

function buildUrl(url, parameters){
  let queryString = '';

  for(const key in parameters){
    if(parameters.hasOwnProperty(key)){
      // console.log("ecode URI >>" + encodeURIComponent(key) + " URI:: " + key + " comp:-> " + parameters[key]);
      queryString += encodeURIComponent(key) + '=' + encodeURIComponent(parameters[key]) + '&';
    }
  }

  if(queryString.lastIndexOf('&') === queryString.length - 1){
    queryString = queryString.substring(0, queryString.length - 1);
  }

  return url + '?' + queryString;
}

export const buildThumbnailUrl = (photo) => {
  return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_q.jpg';
};

export const buildPhotoUrl = (photo) => {
  return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server +
             '/' + photo.id + '_' + photo.secret + '.jpg';
};

export const buildPhotoLargeUrl = (photo)  => {
   return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server +
   '/' + photo.id + '_' + photo.secret + '_b.jpg';
};


export const searchPhotoApi = (searchString, method, photoId) => {
  const requestParameters = {
    text: searchString,
    per_page: 20,
    method: method,
    api_key: apiKey,
    photo_id: photoId,
    format: 'json'
  };

  const fullApiUrl = `${buildUrl(apiURL, requestParameters)}&nojsoncallback=?`;

  axios.get(fullApiUrl)
    .then((response) => {
      // this.props.callback(response.data.photos.photo);
      const searchResults = response.data.photos.photo;
      this.checkExifForLensModel(searchString, searchResults, this.props.callback);
    })
    .catch(function (error) {
      return error;
    });

  return fullApiUrl;
};

export const checkExifForLensModel = (searchString, searchResults, cb) => {
  const searchMethod = 'flickr.photos.getExif';
  // let photosShotWithLens = [];
// debugger;
  //FIXME: Hard code autocomplete of search string until i write those functions
  searchString = 'XF23mmF1.4 R';
  let requestParameters = {
    text: searchString,
    per_page: 20,
    method: searchMethod,
    api_key: apiKey,
    format: 'json'
  };
  // Create an array of Flickr api Urls to later use to fetch data
  // on individual photos
  const exifApiUrl = searchResults.map((photo) => {
    requestParameters.photo_id = photo.id;
    const fullApiUrl = buildUrl(apiURL, requestParameters);
    console.log(fullApiUrl, 'exif fullapiurl');
    // return searchPhotoApi(searchString, searchMethod, photo.id);
  });

  exifApiUrl.map((exifUrl) => {
    return axios.get(exifUrl)
    .then((res) => {
      if (res.data.stat !== 'fail') {
        res.data.photo.exif.map((tag) => {
          if (tag.tag === 'LensModel') {
            if (searchString === tag.raw._content){
              cb(res.data.photo);
            }
          }
        });
      }
    })
    .catch((err) => {
      return err;
    });
  });
}

export default searchPhotoApi;

// import React from 'react';
// import Utility from './utility';
// import axios from 'axios';
//
// class Flickr extends React.Component {
//
//   searchText(searchString){
//     const apiKey ='553290f690cf2f6bba54bcb5f169d405';
//     const apiURL = 'https://api.flickr.com/services/rest/';
//
//     const requestParameters = Utility.extend({
//       text: searchString,
//       per_page: 20,
//       method: 'flickr.photos.search',
//       api_key: apiKey,
//       format: 'json'
//     });
//
//     // FIXME: Build Url within Axios call instead of complete sepereate utility
//     const fullApiUrl = `${Utility.buildUrl(apiURL, requestParameters)}&nojsoncallback=?`;
//
//     axios.get(fullApiUrl)
//       .then((response) => {
//         return response;
//       })
//       .catch(function (error) {
//         return error;
//       });
//     // let script = document.createElement('script');
//     // // script.src = Utility.buildUrl(apiURL, requestParameters);
//     // document.head.appendChild(script);
//     // document.head.removeChild(script);
//   }
//
//   buildThumbnailUrl(photo){
//     return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_q.jpg';
//   }
//
//   buildPhotoUrl(photo){
//     return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server +
//                '/' + photo.id + '_' + photo.secret + '.jpg';
//   }
//
//   buildPhotoLargeUrl(photo) {
//      return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server +
//      '/' + photo.id + '_' + photo.secret + '_b.jpg';
//   }
//
// // window.Flickr = Utility.extend(window.Flickr || {} {
// //   buildThumbnailUrl: buildThumbnailUrl,
// //   buildPhotoUrl: buildPhotoUrl,
// //   buildPhotoLargeUrl: buildPhotoLargeUrl,
// //   searchText: searchText
// // });
//
// }
//
// export default Flickr;
