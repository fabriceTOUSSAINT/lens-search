"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_datasource_rest_1 = require("apollo-datasource-rest");
const models_1 = require("./models");
class SearchPhotosAPI extends apollo_datasource_rest_1.RESTDataSource {
    constructor() {
        super();
        this.httpCache = new apollo_datasource_rest_1.HTTPCache();
        this.Flickr = new models_1.FlickrModel();
        this.baseURL = 'https://api.flickr.com/services/rest/';
    }
    appendSearchOptionsToLens(lensObj) {
        const lens = {
            fstop: lensObj.f_stop_max.replace(/(f|\/)/gi, ''),
            focalLength: lensObj.focal_length.replace(/\s/g, ''),
            mount: lensObj.lens_mount.replace(lensObj.lens_brand, '').replace(/\s/g, ''),
            name: lensObj.lens_name,
            brand: lensObj.lens_brand,
            other: null,
        };
        const regex = {
            MatchAllPossible: new RegExp(`(${lens.mount}|${lens.brand}|${lens.focalLength}|${lens.fstop}|(f|\/)|mm)`, 'gi'),
        };
        lens.other = lens.name.replace(regex.MatchAllPossible, '').replace(/\s/g, '');
        const lensInfo = {
            simple: `${lens.brand} ${lens.mount} ${lens.focalLength}mm ${lens.fstop}`,
            moderate: '',
            complex: '',
            lens
        };
        return lensInfo;
    }
    async findPhotosShotWithLens(lensName) {
        const lens_db_res_obj = {
            "f_stop_max": "F1.4",
            "lens_type": "Prime lens",
            "f_stop_min": "F16",
            "lens_mount": "Fujifilm X",
            "dp_review_link": null,
            "focal_length": "23 ",
            "dp_lens_detail_link": "https://www.dpreview.com/products/fujifilm/lenses/fujifilm_xf_23mm",
            "year_released": [],
            "lens_brand": "Fujifilm",
            "msrp": ["799.00"],
            "lens_name": "Fujifilm XF 23mm F1.4 R"
        };
        const lensInfo = this.appendSearchOptionsToLens(lens_db_res_obj);
        const photosShotWithLens = await this.Flickr.getPhotosShotWithLens(lensInfo);
        return photosShotWithLens;
    }
}
exports.default = SearchPhotosAPI;
