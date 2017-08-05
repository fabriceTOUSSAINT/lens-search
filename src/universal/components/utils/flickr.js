import axios from 'axios';
import * as flickr_config from '../../config/Flickr';

const buildUrl = (url, parameters) => {
    let queryString = '';
    for (const key in parameters) {
        if (parameters.hasOwnProperty(key)) {
            queryString += `${encodeURIComponent(key)}=${encodeURIComponent(parameters[key])}&`;
        }
    }

    if (queryString.lastIndexOf('&') === queryString.length - 1) {
        queryString = queryString.substring(0, queryString.length - 1);
    }

    return `${url}?${queryString}`;
}

const buildThumbnailUrl = (photo) => {
    return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`;
};

const buildPhotoUrl = (photo) => {
    return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
};

const buildPhotoLargeUrl = (photo) => {
    return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;
};

const packageFlickrData = (photoData, cb) => {
    const flickrData = photoData.map(data => {
        return (
            {
                'thumbnail': buildThumbnailUrl(data),
                'imageUrl': buildPhotoUrl(data),
                'imageUrl-large': buildPhotoLargeUrl(data),
                'camera': data.camera,
                'exif': data.exif
            }
        );
    });

    cb(flickrData);
};

const buildFlickrData = (searchString, searchResults, cb) => {
    const searchMethod = 'flickr.photos.getExif';

    //FIXME: Hard code autocomplete of search string until i write those functions
    searchString = 'XF23mmF1.4 R';
    const requestParameters = {
        text: searchString,
        per_page: 30,
        method: searchMethod,
        api_key: flickr_config.apiKey,
        format: 'json'
    };

    // Build array of API calls
    const exifApiUrl = searchResults.map((photo) => {
        requestParameters.photo_id = photo.id;
        return `${buildUrl(flickr_config.apiURL, requestParameters)}&nojsoncallback=?`;
    });

    let photosUsingLensData = [];
    const promiseArray = exifApiUrl.map(exifUrl => axios.get(exifUrl));

    axios.all(promiseArray)
        .then((res) => {
            res.map((lensRes) => {
                if (lensRes.data.stat !== 'fail') {
                    lensRes.data.photo.exif.map((tag) => {
                        if (tag.tag === 'LensModel' && searchString === tag.raw._content) {
                            photosUsingLensData.push(lensRes.data.photo);
                        }
                    });
                }
            });
            packageFlickrData(photosUsingLensData, cb)
        })
        .catch((err) => {
            return err;
        });
};



// entry point for searching flickr database, and hard checking each photos EXIF to see if photo
// was actually shot with the searched lens
export const searchFlickrApi = (searchString, method, photoId, cb) => {
    const requestParameters = {
        text: searchString,
        per_page: 30,
        method: method,
        api_key: flickr_config.apiKey,
        photo_id: photoId,
        format: 'json'
    };

    const fullApiUrl = `${buildUrl(flickr_config.apiURL, requestParameters)}&nojsoncallback=?`;

    axios.get(fullApiUrl)
        .then((response) => {
            const unfilteredSearchResults = response.data.photos.photo;
            buildFlickrData(searchString, unfilteredSearchResults, cb);
        })
        .catch(function (error) {
            return error;
        });
};

export default searchFlickrApi;
