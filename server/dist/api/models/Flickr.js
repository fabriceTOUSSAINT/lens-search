"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_datasource_rest_1 = require("apollo-datasource-rest");
class FlickrModel extends apollo_datasource_rest_1.RESTDataSource {
    constructor() {
        super();
        this.buildThumbnailUrl = (photo) => `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`;
        this.buildPhotoUrl = (photo) => `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
        this.buildPhotoLargeUrl = (photo) => `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;
        this.packageResponseData = (photoData) => {
            const flickrData = photoData.map((photo) => {
                return ({
                    'thumbnail': this.buildThumbnailUrl(photo),
                    'imageUrl': this.buildPhotoUrl(photo),
                    'imageUrlLarge': this.buildPhotoLargeUrl(photo),
                    'camera': photo.camera,
                    'exif': photo.exif,
                    'id': photo.id,
                });
            });
            return flickrData;
        };
        this.httpCache = new apollo_datasource_rest_1.HTTPCache();
        this.baseURL = 'https://api.flickr.com/services/rest/';
        this.apiKey = 'd0c9d161fb97ea74829b27d4a29f1296';
        this.method = {
            search: 'flickr.photos.search',
            getExif: 'flickr.photos.getExif',
        };
    }
    makeApiPath(searchString, method = this.method.search, photoId = 0) {
        const parameters = {
            method,
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
    async filterPhotosShotWithLens(photos, lensInfo) {
        const searchString = lensInfo.simple;
        const lensDetail = lensInfo.lens;
        const exifApiUrl = photos.map((photo) => {
            return `${this.makeApiPath(searchString, this.method.getExif, photo.id)}`;
        });
        const regexMatchFocalLength = new RegExp(`${lensDetail.focalLength}`, 'gi');
        const regexMatchGeneralLensName = new RegExp(`(${lensDetail.mount}|${lensDetail.focalLength}|${lensDetail.fstop}|${lensDetail.other})`, 'gi');
        const regexMatchOtherDetails = new RegExp(`${lensDetail.other}`, 'gi');
        const exifDataPromise = exifApiUrl.map(async (exifUrl, index) => {
            if (index >= 20)
                return;
            const res = await this.get(exifUrl);
            const exif = (res && res.photo) ? res.photo.exif : [];
            const foundTag = exif.some((tag) => {
                if ((tag.tag === 'LensModel') && (regexMatchFocalLength.test(tag.raw._content))) {
                    if ((regexMatchGeneralLensName.test(tag.raw._content))) {
                        if (regexMatchOtherDetails.test(tag.raw._content)) {
                            return true;
                        }
                    }
                    else {
                        return false;
                    }
                }
            });
            if (foundTag) {
                return Promise.resolve(res.photo);
            }
        });
        return Promise.all(exifDataPromise).then((exifData) => {
            const photosUsingLens = exifData.filter(test => {
                return test !== undefined;
            });
            return photosUsingLens;
        });
    }
    ;
    pullOutPhotoRes(response) {
        if (!response && !response.photos) {
            return [];
        }
        return response.photos.photo;
    }
    async fuzzySearchWithQuery(query) {
        const fuzzyApiPath = this.makeApiPath(query);
        const fuzzyNestedResponse = await this.get(fuzzyApiPath);
        const fuzzyResponse = this.pullOutPhotoRes(fuzzyNestedResponse);
        return fuzzyResponse;
    }
    async getPhotosShotWithLens(lensInfo) {
        try {
            const fuzzySearchRes = await this.fuzzySearchWithQuery(lensInfo.simple);
            const photosShotWithLens = await this.filterPhotosShotWithLens(fuzzySearchRes, lensInfo);
            return this.packageResponseData(photosShotWithLens);
        }
        catch (err) {
            console.error(`Error in photoShotWithLensSearch(): ${err}`);
        }
    }
}
exports.default = FlickrModel;
