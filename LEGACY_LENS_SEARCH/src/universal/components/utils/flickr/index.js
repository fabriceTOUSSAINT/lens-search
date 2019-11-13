import axios from 'axios';
import * as flickr_config from '../../../config/Flickr';
/**
 * TODO: ORGANIZE THIS FILE
 *
 * *********************
 * ****** Update logic,  searchString = 'Fujifilm XF 35mm' returns much more
 * ****** Than Offical name 'Fujifilm XF 35mm F2 R WR'
 * ******
 * ****** And Lens_model on flickr is equal to 'XF35mmF1.4 R', 'XF35mmF1.4 WR', 'XF35mmF2 R', etc...
 * ****** Thus returning close to no results even on popular lens since they don't ===
 * *********************
 * - clean file
 * - make call to flickr retrieving photos
 * - check retrieved photos exif if the photo was actually shot with searched lens
 * - save that photo id and data
 * - send and store that data response
 * - store data response in store so whole application has access to it.
 */

// entry point for searching flickr database, and hard checking each photos EXIF to see if photo
// was actually shot with the searched lens
export const searchFlickr = async (lensDetail) => {

    try {
        //Canon EF 15mm f/2.8 Fisheye test searchstring

        // remove Brand and any extra white space from lens mount

        // Remove 'f' from fstop to better regex against results for fstop. (implied without 'f');
        const lens = {
            fstop: lensDetail.f_stop_max.replace(/(f|\/)/gi, ''),
            focalLength: lensDetail.focal_length.replace(/\s/g, ''),
            mount: lensDetail.lens_mount.replace(lensDetail.lens_brand, '').replace(/\s/g, ''),
            name: lensDetail.lens_name,
            brand: lensDetail.lens_brand,
            other: null,
        }

        const regexMatchEverythingPossible = new RegExp(`(${lens.mount}|${lens.brand}|${lens.focalLength}|${lens.fstop}|(f|\/)|mm)`, 'gi');

        lens.other = lens.name.replace(regexMatchEverythingPossible, '').replace(/\s/g, '');

        const search = {
            simple: `${lens.brand} ${lens.mount} ${lens.focalLength}mm ${lens.fstop}`
        }

        const method = 'flickr.photos.search';
        const fullApiUrl = buildUrl(search.simple, method);
        const res = await axios(fullApiUrl);
        const photoSearchResults = res.data.photos.photo;
        const photosUsingSearchedLens = await filterPhotosShotWithLens(search.simple, photoSearchResults, lens);

        return packageFlickrData(photosUsingSearchedLens)
    } catch (err) {
        console.log(err);
    }

};

/**
 * filterPhotosShotWithLens
 *
 * Takes in results from initial flickr.photos.search, grabs individual
 * photo id and research Flickr with flickr.photos.getExif to get camera data of each photo
 *
 * @param {string} - searchString
 *
 * @return {array} - stack of photos passing critera of being shot with searchString as lens
 */

const filterPhotosShotWithLens = async (searchString, searchResults = [], lens = {}) => {

    const method = 'flickr.photos.getExif';

    // Build array of API endpoints for each photo in searchResult
    const exifApiUrl = searchResults.map((photo) => {
        return `${buildUrl(searchString, method, photo.id)}`;
    });

    /**
     *  TODO: Below we need to find an accurate way to determine which photos were exactly shot with the lens
     *
     * - problem
     * -- Not getting enough accurate results to go through?
     * -- initial search too specefic? start broad and dig through more later?
     * -- maybe some limit for Flickr Api when searching for results? I'm expecting much more from some of these
     *      lens and on avg receiving 0 - 5 most of the time being 0
     */
    const regexMatchFocalLength = new RegExp( `${lens.focalLength}`, 'gi');
    const regexMatchGeneralLensName = new RegExp(`(${lens.mount}|${lens.focalLength}|${lens.fstop}|${lens.other})`, 'gi');
    const regexMatchOtherDetails = new RegExp(`${lens.other}`, 'gi');
    // const regexMatchEverythingPossible = new RegExp(`(${lens.mount}|${lens.brand}|${lens.focalLength}|${lens.fstop}|(f|\/)|mm)`, 'gi');

   const exifDataPromise =  exifApiUrl.map( async (exifUrl, index) => {
        const res = await axios(exifUrl);
        const exif = (res.data && res.data.photo) ? res.data.photo.exif : [];

        const foundTag = exif.some( tag => {
                // console.log(tag, ' === ', typeof tag);


            if ((tag.tag === 'LensModel') && (regexMatchFocalLength.test(tag.raw._content))) {
                console.warn(tag.raw._content, 'tag content');
                if ((regexMatchGeneralLensName.test(tag.raw._content))) {
                    if(regexMatchOtherDetails.test(tag.raw._content)) {

                    console.log(tag.raw._content, ' :: TC | SS :: ', lens.name);

                    return true;
                    }

                } else {
                    return false;
                }
            }
        });

        if (foundTag) {
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
        photo_id: photoId,
        per_page: 500
    };

    let queryString = '';

    for (const key in parameters) {
        if (parameters.hasOwnProperty(key)) {
            queryString += `${encodeURIComponent(key)}=${encodeURIComponent(parameters[key])}&`;
        }
    }

    queryString += 'nojsoncallback=1';

    return `${flickr_config.apiURL}?${queryString}`;
}

/**
 * Helpers
 */
const packageFlickrData = (photoData) => {
    const flickrData = photoData.map(photo => {
        return (
            {
                'thumbnail': buildThumbnailUrl(photo),
                'imageUrl': buildPhotoUrl(photo),
                'imageUrl-large': buildPhotoLargeUrl(photo),
                'camera': photo.camera,
                'exif': photo.exif,
                'id': photo.id,
            }
        );
    });

    return flickrData;
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
