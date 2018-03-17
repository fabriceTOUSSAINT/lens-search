import axios from 'axios';
import * as flickr_config from '../../../config/Flickr';
/**
 * TODO: ORGANIZE THIS FILE
 * 
 * - clean file
 * - make call to flickr retrieving photos
 * - check retrieved photos exif if the photo was actually shot with searched lens
 * - save that photo id and data
 * - send and store that data response
 * - store data response in store so whole application has access to it.
 */

// entry point for searching flickr database, and hard checking each photos EXIF to see if photo
// was actually shot with the searched lens
export const searchFlickr = async (searchString, ActionPopulatePhotoDataFunc) => {

    try {

        const method = 'flickr.photos.search';
        const fullApiUrl = buildUrl(searchString, method);
        const res = await axios(fullApiUrl);
        const photoSearchResults = res.data.photos.photo;
        const photosUsingSearchedLens = await buildFlickrData(searchString, photoSearchResults);
        packageFlickrData(photosUsingSearchedLens, ActionPopulatePhotoDataFunc)

    } catch (err) {
        console.log(err);
    }

};

/**
 * buildFlickrData
 * 
 * Takes in results from initial flickr.photos.search, grabs individual
 * photo id and research Flickr with flickr.photos.getExif to get camera data of each photo
 * 
 * @param {string} - searchString
 * 
 * @return {array} - stack of photos passing critera of being shot with searchString as lens
 */

const buildFlickrData = async (searchString, searchResults = []) => {

    const method = 'flickr.photos.getExif';

    // Build array of API endpoints for each photo in searchResult
    const exifApiUrl = searchResults.map((photo) => {
        return `${buildUrl(searchString, method, photo.id)}`;
    });

   const exifDataPromise =  exifApiUrl.map( async (exifUrl, index) => {
        const res = await axios(exifUrl);
        const exif = (res.data && res.data.photo) ? res.data.photo.exif : [];
        
        const foundTag = exif.some( tag => {
            return ((tag.tag === 'LensModel') && (tag.raw._content == searchString))
        });

        if (foundTag) {
            console.log(res.data.photo);
            return Promise.resolve(res.data.photo);
        }
        
    });

   return Promise.all(exifDataPromise).then((exifData) => {

        const photosUsingLens = exifData.filter( test => {
            return test !== undefined;
        });

        return photosUsingLens;
    });
};

/**
 *  buildUrl - construct proper url from search value to search Flickr API
 * 
 * @param {*} parameters - options for Flickr api
 * @return string - full url
 */
const buildUrl = ( searchString, method, photoId = 0 ) => {

    const parameters = {
        method: method,
        api_key: flickr_config.apiKey,
        text: searchString,
        format: 'json',
        photo_id: photoId
    };

    let queryString = '';

    for (const key in parameters) {
        if (parameters.hasOwnProperty(key)) {
            queryString += `${encodeURIComponent(key)}=${encodeURIComponent(parameters[key])}&`;
        }
    }

    queryString += 'nojsoncallback=1';

    // Clean query string for flickr api call. doesn't like encoded spaces but '-'
    queryString = queryString.replace(/%20/g, '-');

    return `${flickr_config.apiURL}?${queryString}`;
}

/**
 * Helpers
 */
const packageFlickrData = (photoData, ActionPopulatePhotoDataFunc) => {
    const flickrData = photoData.map(photo => {
        return (
            {
                'thumbnail': buildThumbnailUrl(photo),
                'imageUrl': buildPhotoUrl(photo),
                'imageUrl-large': buildPhotoLargeUrl(photo),
                'camera': photo.camera,
                'exif': photo.exif,
                'id': photo.id
            }
        );
    });

    ActionPopulatePhotoDataFunc(flickrData);
};

const buildThumbnailUrl = (photo) => {
    return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`;
};

const buildPhotoUrl = (photo) => {
    return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
};

const buildPhotoLargeUrl = (photo) => {
    return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;
};


export default searchFlickr;
