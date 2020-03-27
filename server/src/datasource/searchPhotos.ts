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

interface Photo {
  thumbnail: string
  imageUrl: string
  imageUrlLarge: string
  exif: string
  id: number
}

interface LensDetailType {
  fstop?: string
  focalLength?: string
  mount?: string
  name: string
  brand?: string
  other?: string | null
}
interface LensMetaDataType {
  simple: string
  moderate: string
  complex: string
  lens: LensDetailType
}

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
  _appendSearchOptionsToLens(lensObj: any): LensMetaDataType {
    // Clean up strings and create new object.
    const lens: LensDetailType = {
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

    console.log(lens, '<<<< lens jawn', lensObj)
    const lensInfo: LensMetaDataType = {
      simple: `${lens.brand} ${lens.mount} ${lens.focalLength}mm ${lens.fstop}`,
      moderate: `${lens.brand} ${lens.mount} ${lens.focalLength}mm`,
      complex: `${lens.brand} ${lens.mount} ${lens.focalLength}mm F${lens.fstop}`,
      lens,
    }

    return lensInfo
  }

  /**
   * Function passed an argument lensName: String and returns an Array of
   * photos shot with lensName via Flickr Api.
   *
   * This is the only MAIN function;
   * @memberof SearchPhotosAPI
   */
  async photosShotWith(lens: Photo) {
    // Builds an object of searchable "string" options for flickr.
    const lensSearchOptions: LensMetaDataType = this._appendSearchOptionsToLens(
      lens,
    )
    const photosShotWithLens = await this.Flickr.getPhotosShotWithLens(
      lensSearchOptions,
    )

    return photosShotWithLens
  }
}

export default SearchPhotosAPI
