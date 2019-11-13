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


 class SearchPhotos extends RESTDataSource {
     constructor(lensDetail) {
         super();

         this.baseURL = 'https://api.flickr.com/services/rest/'
        this.method = 'flickr.photos.search';
        this.apiKey = 'd0c9d161fb97ea74829b27d4a29f1296';

        // const searchOptions = makeSearchOptionsFromLens(lensDetail);
        // findPhotosShotWithLens(searchOptions)
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
            MatchAllPossible = new RegExp(`(${lens.mount}|${lens.brand}|${lens.focalLength}|${lens.fstop}|(f|\/)|mm)`, 'gi'),
        }

        lens.other = lens.name.replace(regex.MatchAllPossible, '').replace(/\s/g, '');

        const searchOptions = {
            simple: `${lens.brand} ${lens.mount} ${lens.focalLength}mm ${lens.fstop}`,
            moderate: '',
            complex: '',
        };

        return searchOptions;
    }

    /**
     *  flickrAPIEndpoint - construct proper url from search value to search Flickr API
     *
     * @param {*} parameters - options for Flickr api
     * @return string - full url
     */
    flickrAPIEndpoint( searchString, method, photoId = 0 ) {
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


    // TODO: This could be my entry point for the api
    async findPhotosShotWithLens(lens) {
        const searchOptions = makeSearchOptionsFromLens(lens);
        const apiEndpoint = flickrAPIEndpoint(searchOptions.simple, this.method)
        const response = await this.get(apiEndpoint);
        const photoResults = response.data.photos.photo;

        console.log(photoResults);


        const photosUsingLens = await filterPhotosShotWithLens(searchOptions.simple, photoResults, lens);
        return packageFlickrData(photosUsingLens)
    }
 }
