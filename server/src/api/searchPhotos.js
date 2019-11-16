/**
 * Class that based on a lens string, search external resources for images shot
 * with this lens string.
 * 
 * - Construct multiple build queries for best results
 * - Find images shot with lens
 * - Filter results for best results
 * - Construct image url endpoints
 * - Format results
 */

 const { RESTDataSource } = require('apollo-datasource-rest');


 class SearchPhotosAPI extends RESTDataSource {
     constructor() {
         super();

        this.baseURL = 'https://api.flickr.com/services/rest/'
        this.method = 'flickr.photos.search';
        this.apiKey = 'd0c9d161fb97ea74829b27d4a29f1296';
     }

     makeSearchOptionsFromLens(lensObj) {
        // Clean up strings and create new object.
        const lens = {
            fstop: lensObj.f_stop_max.replace(/(f|\/)/gi, ''),
            focalLength: lensObj.focal_length.replace(/\s/g, ''),
            mount: lensObj.lens_mount.replace(lensObj.lens_brand, '').replace(/\s/g, ''),
            name: lensObj.lens_name,
            brand: lensObj.lens_brand,
            other: null,
        }

        // Umbrella search option
        const regex = {
            MatchAllPossible: new RegExp(`(${lens.mount}|${lens.brand}|${lens.focalLength}|${lens.fstop}|(f|\/)|mm)`, 'gi'),
        }

        lens.other = lens.name.replace(regex.MatchAllPossible, '').replace(/\s/g, '');

        const searchOptions = {
            simple: `${lens.brand} ${lens.mount} ${lens.focalLength}mm ${lens.fstop}`,
            moderate: '',
            complex: '',
            lens
        };

        return searchOptions;
    }

    /**
     *  flickrAPIEndpoint - construct proper url from search value to search Flickr API
     *
     * @param {*} parameters - options for Flickr api
     * @return string - full url
     */
    flickrAPIEndpoint( searchString, photoId = 0 ) {
        const parameters = {
            method: this.method,
            api_key: this.apiKey,
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

        return `?${queryString}`;
    }

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

async filterPhotosShotWithLens(searchString, searchResults = [], lens = {}){

    const method = 'flickr.photos.getExif';

    // Build array of API endpoints for each photo in searchResult
    const exifApiUrl = searchResults.map((photo) => {
        return `${this.buildUrl(searchString, method, photo.id)}`;
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
       if (index  >= 20 ) return;

        // const res = await axios(exifUrl);
        const res = await this.get(exifUrl);
        const exif = (res && res.photo) ? res.photo.exif : [];

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
            return Promise.resolve(res.photo);
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
    buildUrl = ( searchString, method, photoId = 0 ) => {
        const parameters = {
            method: method,
            api_key: this.apiKey,
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

        // return `${this.baseURL}?${queryString}`;
        return `?${queryString}`;

    }


    /**
     * Helpers
    */
    packageFlickrData = (photoData) => {
        const flickrData = photoData.map(photo => {
            return (
                {
                    'thumbnail': this.buildThumbnailUrl(photo),
                    'imageUrl': this.buildPhotoUrl(photo),
                    'imageUrlLarge': this.buildPhotoLargeUrl(photo),
                    'camera': photo.camera,
                    'exif': photo.exif,
                    'id': photo.id,
                }
            );
        });
        console.log(':::::: ========::: FlickrData', flickrData[5].exif)
        return flickrData;
    };

    buildThumbnailUrl = (photo) => {
        return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`;
    };

    buildPhotoUrl = (photo) => {
        return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
    };

    buildPhotoLargeUrl = (photo) => {
        return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;
    };


    /**
     * Function passed an argument lensName: String and returns an Array of 
     * photos shot with lensName via Flickr Api.  
     *
     * @param {*} lensName
     * @returns     type Photo {
     *                      thumbnail: String
     *                      imageUrl: String
     *                      imageUrlLarge: String
     *                      exif: String
     *                      id: Int
     *                  }
     * @memberof SearchPhotosAPI
     */
    async findPhotosShotWithLens(lensName) {
        // return `${lens}: this hits the api endpoint`;

        // TODO: Build actual function to fetch from database storing all of the lens.
        // const fullLensDetail = await fetchFullLensDetail(lensName);
        const fullLensDetail = {
            "f_stop_max": "F1.4",
            "lens_type": "Prime lens",
            "f_stop_min": "F16",
            "lens_mount": "Fujifilm X",
            "dp_review_link": null,
            "focal_length": "23 ",
            "dp_lens_detail_link": "https://www.dpreview.com/products/fujifilm/lenses/fujifilm_xf_23mm",
            "year_released": [],
            "lens_brand": "Fujifilm",
            "msrp": [ "799.00" ],
            "lens_name": "Fujifilm XF 23mm F1.4 R"
        };

        // return object of different search option strings
        const searchOptions = this.makeSearchOptionsFromLens(fullLensDetail);

        // generate our api endpoints, TODO: add more like 500px
        const apiEndpoint = this.flickrAPIEndpoint(searchOptions.simple)

        // search 3rd party API for photo response.
        const response = await this.get(apiEndpoint);

        // Pull out Flickr api response
        const photoResults = response.photos.photo;

        // Filter photoResults to do deep nested checks agains EXIF for photos shot with lensName
        const photosUsingLens = await this.filterPhotosShotWithLens(searchOptions.simple, photoResults, searchOptions.lens);

        // Format a new object based on results, matching schema: type Photo
        const photosShotWithLens = this.packageFlickrData(photosUsingLens);

        return photosShotWithLens;
    }
 }


 module.exports = SearchPhotosAPI;