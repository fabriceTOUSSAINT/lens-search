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

import { RESTDataSource, HTTPCache } from 'apollo-datasource-rest'
import { FlickrModel } from './models'

class SearchPhotosAPI extends RESTDataSource {
  Flickr: any

  constructor() {
    super()

    this.httpCache = new HTTPCache()
    this.Flickr = new FlickrModel()

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
  _appendSearchOptionsToLens(lensObj: any): any {
    // Clean up strings and create new object.
    const lens = {
      fstop: lensObj.fStopMax.replace(/(f|\/)/gi, ''),
      focalLength: lensObj.focalLength.replace(/\s/g, ''),
      mount: lensObj.lensMount
        .replace(lensObj.lensBrand, '')
        .replace(/\s/g, ''),
      name: lensObj.lensName,
      brand: lensObj.lensBrand,
      other: null,
    }

    // Umbrella search option
    const regex = {
      MatchAllPossible: new RegExp(
        `(${lens.mount}|${lens.brand}|${lens.focalLength}|${lens.fstop}|(f|\/)|mm)`,
        'gi',
      ),
    }

    lens.other = lens.name
      .replace(regex.MatchAllPossible, '')
      .replace(/\s/g, '')

    const lensInfo = {
      simple: `${lens.brand} ${lens.mount} ${lens.focalLength}mm ${lens.fstop}`,
      moderate: '',
      complex: '',
      lens,
    }

    return lensInfo
  }

  /**
   * Function passed an argument lensName: String and returns an Array of
   * photos shot with lensName via Flickr Api.
   *
   * This is the only MAIN function;
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
  async photosShotWith(lens: any) {
    const lensInfo = this._appendSearchOptionsToLens(lens)
    const photosShotWithLens = await this.Flickr.getPhotosShotWithLens(lensInfo)

    return photosShotWithLens
  }
}

export default SearchPhotosAPI
