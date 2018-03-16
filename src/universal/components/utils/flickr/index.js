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
export const searchFlickr = async (searchString, method, photoId, populatePhotoDataFunc) => {

    const requestParameters = {
        method: method,
        api_key: flickr_config.apiKey,
        text: searchString,
        format: 'json',
        per_page: 100,
    };


    // Build Url to access Flickr api
    const fullApiUrl = buildUrl(requestParameters);
    
    // Build array of API calls
    // const fullApiUrl = searchResults.map((photo) => {
    //     requestParameters.photo_id = photo.id;
    //     return `${buildUrl(requestParameters)}&nojsoncallback=?`;
    // });

console.log('FULL API URL======: ', fullApiUrl)
// const fullApiUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=553290f690cf2f6bba54bcb5f169d405&text=Canon+EF+24-70mm+f%2F4L+IS+USM&format=json&per_page=100&nojsoncallback=1';
    // axios.get(fullApiUrl)
    //     .then((response) => {
    //         console.log(response, ' ======================response')
    //         const unfilteredSearchResults = response.data.photos.photo;
    //         buildFlickrData(searchString, unfilteredSearchResults, populatePhotoDataFunc);
    //     })
    //     .catch(function (error) {
    //         console.error(error);
    //         return error;
    //     });

    try {
        const res = await axios(fullApiUrl);
        const photoSearchResults = res.data.photos.photo;
        const photoExifData = await buildFlickrData(searchString, photoSearchResults, populatePhotoDataFunc);
        console.log(photoExifData, ':::::: EXIF DATA');
    } catch (err) {
        console.error(err);
    }

};

/**
 * buildFlickrData
 * 
 * Takes in results from initial flickr.photos.search, grabs individual
 * photo id and research Flickr with flickr.photos.getExif to get camera data of each photo
 * 
 * @param {string} - searchString
 * @param {array} - searchResults
 * @param {callback} - populatePhotoDataFunc
 * 
 * @return {array} - stack of photos passing critera of being shot with searchString as lens
 */

const buildFlickrData = async (searchString, searchResults = [], populatePhotoDataFunc) => {

    const requestParameters = {
        text: searchString,
        per_page: 100,
        method: 'flickr.photos.getExif',
        api_key: flickr_config.apiKey,
        format: 'json'
    };


    // let photosUsingLensData = [];
    // const promiseArray = exifApiUrl.map(exifUrl => axios.get(exifUrl));



        // Build array of API calls
        const exifApiUrl = searchResults.map((photo) => {
            requestParameters.photo_id = photo.id;
            return `${buildUrl(requestParameters)}`;
        });

    //    const photosUsingLensData = exifApiUrl.map( async (exifUrl) => {
       const photosUsingLensData = new Promise( (resolve) => { 
           exifApiUrl.map( async (exifUrl) => {
        
            // search each on at a time
                const res = await axios(exifUrl);
                const exif = (res.data && res.data.photo) ? res.data.photo.exif : [];
                
                const foundTag = exif.some( tag => {
                    return ((tag.tag === 'LensModel') && (tag.raw._content == searchString))
                });
                
                if (foundTag) {
                    resolve(res.data.photo);
                }
                
            });
        });

        // const jawn = new Promise(() => photosUsingLensData);
        console.log(await photosUsingLensData);
        return photosUsingLensData

            // exif.forEach(tag => {
            //     if (tag.tag === 'LensModel' && searchString === tag.raw._content) {
            //         // debugger;
            //         console.log(photo,'":::::::photo"');
            //         return res.data.photo;
            //     }
            // })
        // console.warn(tag);
        // console.log('====')
        //     if (tag && tag.tag === 'LensModel' && searchString === tag.raw._content) {
        //         // debugger;
        //         console.log(photo,'":::::::photo"');
        //         return res.data.photo;
        //     }
        // });

    // axios.all(promiseArray)
    //     .then((res) => {
    //         res.map((lensRes) => {
    //             console.warn(lensRes, '{{{{{{}}}};');
    //             if (lensRes.data.stat !== 'fail') {
    //                 lensRes.data.photo.exif.map((tag) => {
    //                     if (tag.tag === 'LensModel') {
    //                         console.warn(tag.raw._content, '<===== Lens result for searched: ', searchString)
    //                     }
    //                     if (tag.tag === 'LensModel' && searchString === tag.raw._content) {
    //                         // debugger;
    //                         photosUsingLensData.push(lensRes.data.photo);
    //                     }
    //                 });
    //             }
    //         });
            
    //         packageFlickrData(photosUsingLensData, populatePhotoDataFunc)
    //     })
    //     .catch((err) => {
    //         return err;
    //     });
};

/**
 *  buildUrl - construct proper url from search value to search Flickr API
 * 
 * @param {*} parameters - options for Flickr api
 * @return string - full url
 */
const buildUrl = (parameters) => {
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

const packageFlickrData = (photoData, populatePhotoDataFunc) => {
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

    populatePhotoDataFunc(flickrData);
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
