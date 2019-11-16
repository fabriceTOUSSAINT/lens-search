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

import { RESTDataSource, HTTPCache } from 'apollo-datasource-rest';
import { FlickrModel } from './models';

 class SearchPhotosAPI extends RESTDataSource {
        Flickr: any;

     constructor() {
         super();
        
         this.httpCache = new HTTPCache();
         this.Flickr = new FlickrModel();

        this.baseURL = 'https://api.flickr.com/services/rest/'
     }

     /**
      * 
      * @param lensObj - lens object, pulled from database
      * 
      * Takes in a lens object, pulled from database, and constructs
      * multiple search phrase queries based on the values of the lens
      * 
      * builds mutiple queries from generic phrases to more specified.
      * 
      * appends results to lens object
      * 
      * @returns lensInfo - { Object } - Holds meta data related to lens and searching of lens
      */
     appendSearchOptionsToLens(lensObj: any): any {
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

        const lensInfo = {
            simple: `${lens.brand} ${lens.mount} ${lens.focalLength}mm ${lens.fstop}`,
            moderate: '',
            complex: '',
            lens
        };

        return lensInfo;
    }

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
    async findPhotosShotWithLens(lensName: string) {
        // TODO: Build actual function to fetch from database storing all of the lens.
        // const fullLensDetail = await fetchFullLensDetail(lensName);
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
            "msrp": [ "799.00" ],
            "lens_name": "Fujifilm XF 23mm F1.4 R"
        };

        // return object of different search option strings
        const lensInfo = this.appendSearchOptionsToLens(lens_db_res_obj);

        const photosShotWithLens = await this.Flickr.getPhotosShotWithLens(lensInfo);

        return photosShotWithLens;
    }
 }

export default SearchPhotosAPI;
 