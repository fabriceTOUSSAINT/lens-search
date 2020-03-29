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

interface Lens {
  fStopMax?: string;
  fStopMin?: string;
  lensType?: string;
  lensMount?: string;
  dpReviewLink?: string;
  focalLength?: string;
  yearReleased?: string;
  lensBrand?: string;
  msrp?: string;
  msrp_002?: string;
  lensName?: string;
}

export interface LensSearchOptions extends Lens {
  lensModel?: string;
  searchString?: string;
}

class SearchPhotosAPI extends RESTDataSource {
  Flickr: any;

  constructor() {
    super();

    this.httpCache = new HTTPCache();
    this.Flickr = new FlickrModel();

    this.baseURL = 'https://api.flickr.com/services/rest/';
  }

  /**
   *
   * @returns lensInfo - { Object } - Holds meta data related to lens and searching of lens
   */
  lensSearchOptionsSerializer(lens: Lens): LensSearchOptions {
    const { fStopMax, focalLength, lensMount, lensName, lensBrand = '' } = lens;

    const serializedLens: LensSearchOptions = {
      fStopMax: fStopMax?.replace(/(f|\/)/gi, ''),
      focalLength: focalLength?.replace(/\s/g, ''),
      lensMount,
      lensName,
      lensBrand,
      lensModel: lensName?.replace(lensBrand, ''),
      searchString: `${lensMount} ${focalLength?.replace(
        /\s/g,
        '',
      )}mm ${fStopMax}`,
    };

    return serializedLens;
  }

  async photosShotWith(lens: Lens) {
    // Builds an object of searchable "string" options for flickr.
    const lensSearchOptions: LensSearchOptions = this.lensSearchOptionsSerializer(
      lens,
    );

    const photosShotWithLens = await this.Flickr.getPhotosShotWithLens(
      lensSearchOptions,
    );

    return photosShotWithLens;
  }
}

export default SearchPhotosAPI;
