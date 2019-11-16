import { RESTDataSource, HTTPCache } from 'apollo-datasource-rest';

class FlickrModel extends RESTDataSource {
    baseURL: string;
    apiKey: string;
    method: any;

    constructor() {
        super();

        this.httpCache = new HTTPCache();
        this.baseURL = 'https://api.flickr.com/services/rest/';
        this.apiKey = 'd0c9d161fb97ea74829b27d4a29f1296';
        this.method = {
            search: 'flickr.photos.search',
            getExif: 'flickr.photos.getExif',
        };
    }

    /**
     *  flickrAPIEndpoint - construct proper url from search value to search Flickr API
     *
     * @param {*} parameters - options for Flickr api
     * @return string - full url
     */
    // flickrAPIEndpoint( searchString: string, photoId = 0 )
    // setAPIEndpoint(searchString: string, photoId: number = 0) {
    makeApiPath(searchString: string, method: string = this.method.search, photoId: number = 0) {

        const parameters: any = {
            method,
            api_key: this.apiKey,
            text: searchString,
            format: 'json',
            photo_id: photoId,
            per_page: 500
        };

        let queryString: string = '';

        for (const key in parameters) {
            if (parameters.hasOwnProperty(key)) {
                queryString += `${encodeURIComponent(key)}=${encodeURIComponent(parameters[key])}&`;
            }
        }

        queryString += 'nojsoncallback=1';

        return `?${queryString}`;
    }

    buildThumbnailUrl = (photo: any) => `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`;
    buildPhotoUrl = (photo: any) => `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
    buildPhotoLargeUrl = (photo: any) => `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;

    packageResponseData = (photoData: any) => {
        const flickrData = photoData.map((photo: any) => {
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
        
        return flickrData;
    }

    async filterPhotosShotWithLens(photos: Array<any>, lensInfo: any) {
    // async filterPhotosShotWithLens(searchString: string, searchResults = [], lens: any = {}) {
        const searchString = lensInfo.simple;
        const lensDetail = lensInfo.lens;

        // const method = 'flickr.photos.getExif';
    
        // Build array of API endpoints for each photo in searchResult
        const exifApiUrl = photos.map((photo: any) => {
            return `${this.makeApiPath(searchString, this.method.getExif, photo.id)}`;
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
        const regexMatchFocalLength = new RegExp( `${lensDetail.focalLength}`, 'gi');
        const regexMatchGeneralLensName = new RegExp(`(${lensDetail.mount}|${lensDetail.focalLength}|${lensDetail.fstop}|${lensDetail.other})`, 'gi');
        const regexMatchOtherDetails = new RegExp(`${lensDetail.other}`, 'gi');
        // const regexMatchEverythingPossible = new RegExp(`(${lensDetail.mount}|${lensDetail.brand}|${lensDetail.focalLength}|${lensDetail.fstop}|(f|\/)|mm)`, 'gi');
    
        const exifDataPromise =  exifApiUrl.map( async (exifUrl, index) => {
            if (index  >= 20 ) return; //TODO: set cap for quick testing purposes only, delete for production
    
            // const res = await axios(exifUrl);
            const res = await this.get(exifUrl);
            const exif = (res && res.photo) ? res.photo.exif : [];
    
            const foundTag = exif.some( (tag: any) => {
                    // console.log(tag, ' === ', typeof tag);
    
    
                if ((tag.tag === 'LensModel') && (regexMatchFocalLength.test(tag.raw._content))) {
                    // console.warn(tag.raw._content, 'tag content');
                    if ((regexMatchGeneralLensName.test(tag.raw._content))) {
                        if(regexMatchOtherDetails.test(tag.raw._content)) {
    
                        // console.log(tag.raw._content, ' :: TC | SS :: ', lensDetail.name);
    
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

    pullOutPhotoRes(response: any): Array<any> {
        if (!response && !response.photos) {
            return []
        }

        return response.photos.photo
    }

    async fuzzySearchWithQuery(query: string): Promise<any> {
        const fuzzyApiPath: string = this.makeApiPath(query);
        const fuzzyNestedResponse: any = await this.get(fuzzyApiPath);
        const fuzzyResponse = this.pullOutPhotoRes(fuzzyNestedResponse);

        return fuzzyResponse;
    }

    async getPhotosShotWithLens(lensInfo: any): Promise<any> {
        // if (!this.lensInfo) throw  Error(`this.lensInfo is Null, FlickrModel Class was not constructed with Lens object.`)

        try {
        // Weak general search flickr with simple query
        const fuzzySearchRes = await this.fuzzySearchWithQuery(lensInfo.simple);



        // filter results by checking each photos EXIF and save any shot with lens
        const photosShotWithLens = await this.filterPhotosShotWithLens(fuzzySearchRes, lensInfo)
        
        return this.packageResponseData(photosShotWithLens);
        // format data to adhere to type Photo
        } catch (err) {
            console.error(`Error in photoShotWithLensSearch(): ${err}`);
        }

    }
}

export default FlickrModel;