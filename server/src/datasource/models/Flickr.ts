import { RESTDataSource, HTTPCache } from 'apollo-datasource-rest'

/**
 *
 *
 * @class FlickrModel
 * @extends {RESTDataSource}
 */
class FlickrModel extends RESTDataSource {
  baseURL: string
  apiKey: string
  method: any

  constructor() {
    super()

    this.httpCache = new HTTPCache()
    this.baseURL = 'https://api.flickr.com/services/rest/'
    this.apiKey = 'd0c9d161fb97ea74829b27d4a29f1296'
    this.method = {
      search: 'flickr.photos.search',
      getExif: 'flickr.photos.getExif',
    }
  }

  /**
   *  flickrAPIEndpoint - construct proper url from search value to search Flickr API
   */
  makeApiPath(
    searchString: string,
    method: string = this.method.search,
    photoId: number = 0,
  ) {
    const parameters: any = {
      method,
      api_key: this.apiKey,
      text: searchString,
      format: 'json',
      photo_id: photoId,
      per_page: 500,
    }

    let queryString: string = ''

    for (const key in parameters) {
      if (parameters.hasOwnProperty(key)) {
        queryString += `${encodeURIComponent(key)}=${encodeURIComponent(
          parameters[key],
        )}&`
      }
    }

    queryString += 'nojsoncallback=1'

    return `?${queryString}`
  }

  pullOutPhotoRes(response: any): Array<any> {
    if (!response && !response.photos) {
      return []
    }

    return response.photos.photo
  }

  async fuzzySearchWithQuery(query: string): Promise<Array<any>> {
    const fuzzyApiPath: string = this.makeApiPath(query)
    const fuzzyNestedResponse: any = await this.get(fuzzyApiPath)
    const fuzzyResponse = this.pullOutPhotoRes(fuzzyNestedResponse)

    return fuzzyResponse
  }

  /**
   * @memberof FlickrModel
   */
  buildImageUrl = (photo: any, type: string = 'regular') => {
    let imgVariant = ''

    switch (type) {
      case 'thumbnail':
        imgVariant = '_q'
        break
      case 'large':
        imgVariant = '_b'
        break
      case 'regular':
      default:
        imgVariant = ''
        break
    }

    return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}${imgVariant}.jpg`
  }

  /**
   * @param photoData - Array of objects representing photos
   * TODO: Find shape of photoData
   */
  packageResponseData = (photoData: any): any[] => {
    const flickrData = photoData.map((photo: any) => {
      return {
        thumbnail: this.buildImageUrl(photo, 'thumbnail'),
        imageUrl: this.buildImageUrl(photo),
        imageUrlLarge: this.buildImageUrl(photo, 'large'),
        camera: photo.camera,
        exif: photo.exif,
        id: photo.id,
      }
    })

    return flickrData
  }

  /**
   *
   * @param photos
   * @param lensInfo
   */
  async filterPhotosShotWithLens(photos: Array<any>, lensInfo: any) {
    const searchString = lensInfo.simple
    const lensDetail = lensInfo.lens

    // Build array of API endpoints for each photo in searchResult
    const exifApiUrl = photos.map((photo: any) => {
      return `${this.makeApiPath(searchString, this.method.getExif, photo.id)}`
    })

    /**
     *  TODO: Below we need to find an accurate way to determine which photos were exactly shot with the lens
     *
     * - problem
     * -- Not getting enough accurate results to go through?
     * -- initial search too specefic? start broad and dig through more later?
     * -- maybe some limit for Flickr Api when searching for results? I'm expecting much more from some of these
     *      lens and on avg receiving 0 - 5 most of the time being 0
     */
    const regexMatchFocalLength = new RegExp(`${lensDetail.focalLength}`, 'gi')
    const regexMatchGeneralLensName = new RegExp(
      `(${lensDetail.mount}|${lensDetail.focalLength}|${lensDetail.fstop}|${lensDetail.other})`,
      'gi',
    )
    const regexMatchOtherDetails = new RegExp(`${lensDetail.other}`, 'gi')
    // const regexMatchEverythingPossible = new RegExp(`(${lensDetail.mount}|${lensDetail.brand}|${lensDetail.focalLength}|${lensDetail.fstop}|(f|\/)|mm)`, 'gi');

    const exifDataPromise = exifApiUrl.map(async (exifUrl, index) => {
      if (index >= 20) return //TODO: set cap for quick testing purposes only, delete for production

      const res = await this.get(exifUrl)
      const exif = res && res.photo ? res.photo.exif : []

      const foundTag = exif.some((tag: any) => {
        // console.log(tag, ' === ', typeof tag);

        if (
          tag.tag === 'LensModel' &&
          regexMatchFocalLength.test(tag.raw._content)
        ) {
          // console.warn(tag.raw._content, 'tag content');
          if (regexMatchGeneralLensName.test(tag.raw._content)) {
            if (regexMatchOtherDetails.test(tag.raw._content)) {
              // console.log(tag.raw._content, ' :: TC | SS :: ', lensDetail.name);

              return true
            }
          } else {
            return false
          }
        }
      })

      if (foundTag) {
        return Promise.resolve(res.photo)
      }
    })

    return Promise.all(exifDataPromise).then((exifData) => {
      const photosUsingLens = exifData.filter((test) => {
        return test !== undefined
      })

      return photosUsingLens
    })
  }

  /**
   *
   * @param lensInfo { simple, lens }
   */
  async getPhotosShotWithLens(lensInfo: any): Promise<any> {
    try {
      // Weak general search flickr with simple query
      const fuzzySearchRes = await this.fuzzySearchWithQuery(lensInfo.simple)

      // filter results by checking each photos EXIF and save any shot with lens
      const photosShotWithLens = await this.filterPhotosShotWithLens(
        fuzzySearchRes,
        lensInfo,
      )

      // return results in format of our type Photo
      return this.packageResponseData(photosShotWithLens)
    } catch (err) {
      console.error(`Error in photoShotWithLensSearch(): ${err}`)
    }
  }
}

export default FlickrModel
