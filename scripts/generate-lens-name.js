// const SearchFlickr = require('../src/universal/ ');
const lensData = require('../lens_data.json');
const axios = require('axios');
const apiKey = '553290f690cf2f6bba54bcb5f169d405';
const apiURL = 'https://api.flickr.com/services/rest/';
const lensOptions = [];

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

// const buildFlickrData = (searchString, searchResults, cb) => {
function determineOfficialLensName(searchString, searchResults) {
    const searchMethod = 'flickr.photos.getExif';
    const requestParameters = {
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

    let photosUsingLensData = [];
    const promiseArray = exifApiUrl.map(exifUrl => axios.get(exifUrl));

    function mode(array) {
        if (array.length == 0)
            return null;
        let modeMap = {};
        let maxEl = array[0], maxCount = 1;
        for (let i = 0; i < array.length; i++) {
            let el = array[i];
            if (modeMap[el] == null)
                modeMap[el] = 1;
            else
                modeMap[el]++;
            if (modeMap[el] > maxCount) {
                maxEl = el;
                maxCount = modeMap[el];
            }
        }
        return maxEl;
    }

    axios.all(promiseArray)
        .then((res) => {
            res.forEach((lensRes) => {
                if (lensRes.data.stat !== 'fail') {
                    lensRes.data.photo.exif.forEach((tag) => {
                        if (tag.tag === 'LensModel') {
                            // console.warn(tag.raw._content, '<===== Lens result for searched: ', searchString)
                            photosUsingLensData.push(tag.raw._content);
                            lensOptions.push(tag.raw._content);
                            // console.log(lensOptions, ' |========Lens hot with========| ',searchString);

                        }
                        if (tag.tag === 'LensModel' && searchString === tag.raw._content) {
                            // debugger;
                            lensOptions.push(lensRes.data.photo);
                            // console.log(lensOptions);
                            // photosUsingLensData.push(lensRes.data.photo);
                        }
                    });
                    
                    // console.log(mode(photosUsingLensData), ' |========Lens hot with========| ', searchString);
                    
                }
                
            });
            const jawn = mode(photosUsingLensData);
            if (jawn) {
                console.log(jawn, ' |========Lens hot with========| ', searchString);
            }
            
            // debugger;
            return photosUsingLensData;
            // packageFlickrData(photosUsingLensData, cb)
        })
        .catch((err) => {
            return err;
        });
}



// entry point for searching flickr database, and hard checking each photos EXIF to see if photo
// was actually shot with the searched lens
function searchFlickrApi(searchString, method, photoId) {
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
            const unfilteredSearchResults = response.data.photos.photo;
            determineOfficialLensName(searchString, unfilteredSearchResults);
        })
        .catch(function (error) {
            return error;
        });
}


const lensDataSearchAgainst = lensData.map(lens => {
    return searchFlickrApi(lens.lens_name, 'flickr.photos.search', null, null)
    // return 1;
})

console.log(lensDataSearchAgainst);