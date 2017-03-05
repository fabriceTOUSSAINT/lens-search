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

export const checkExifForLensModel = (searchString, searchResults, cb) => {
  const searchMethod = 'flickr.photos.getExif';
  const callback = cb.bind(this);

  //FIXME: Hard code autocomplete of search string until i write those functions
  // searchString = 'XF23mmF1.4 R';
  let requestParameters = {
    text: searchString,
    per_page: 30,
    method: searchMethod,
    api_key: apiKey,
    format: 'json'
  };

  // Build array of API calls
  const exifApiUrl = searchResults.map((photo) => {
    requestParameters.photo_id = photo.id;
    return `${buildUrl(apiURL, requestParameters)}&nojsoncallback=?`;
  });

  let flickrPhotosLens = [];
  const promiseArray = exifApiUrl.map(exifUrl => axios.get(exifUrl));

  searchString = 'XF23mmF1.4 R';
  axios.all(promiseArray)
  .then((res) => {
    res.map((lensRes) => {
      if (lensRes.data.stat !== 'fail') {
        lensRes.data.photo.exif.map((tag) => {
          if (tag.tag === 'LensModel' && searchString === tag.raw._content) {
              flickrPhotosLens.push(lensRes.data.photo);
          }
        });
      }
    });
    callback(flickrPhotosLens);
  })
  .catch((err) => {
    return err;
  });
};


export const searchPhotoApi = (searchString, method, photoId, cb) => {
  const requestParameters = {
    text: searchString,
    per_page: 30,
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
      checkExifForLensModel(searchString, searchResults, cb);
    })
    .catch(function (error) {
      return error;
    });

  return fullApiUrl;
};

export default searchPhotoApi;

