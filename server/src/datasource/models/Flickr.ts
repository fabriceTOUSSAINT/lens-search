import { RESTDataSource, HTTPCache } from 'apollo-datasource-rest';
import stringSimilarity from 'string-similarity';

// types
import { LensSearchOptions } from '../searchPhotos';

interface PhotoDataInput {
  id?: string;
  secret?: string;
  server?: string;
  farm?: number;
  camera?: string;
  exif: any[];
}
interface ParameterType {
  method: string;
  api_key: string;
  text?: string;
  format: string;
  photo_id?: string | number;
  per_page?: number;
  page?: number;
}

/**
 *
 *
 * @class FlickrModel
 * @extends {RESTDataSource}
 */
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
   */
  makeApiPath({
    searchString,
    method = this.method.search,
    photoId,
  }: {
    searchString?: string;
    method?: string;
    photoId?: number;
  }) {
    const parameters: ParameterType = {
      method,
      api_key: this.apiKey,
      format: 'json',
      per_page: 30,
      page: this.getRandomInt(100),
      ...(searchString && {
        text: searchString,
      }),
      ...(photoId && {
        photo_id: photoId,
      }),
    };

    const queryString = this.buildQuery(parameters);

    return queryString;
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  buildQuery(queryParams: any) {
    let queryString: string = '';

    for (const key in queryParams) {
      if (queryParams.hasOwnProperty(key)) {
        queryString += `${encodeURIComponent(key)}=${encodeURIComponent(
          queryParams[key],
        )}&`;
      }
    }

    queryString += 'nojsoncallback=1';

    return `?${queryString}`;
  }

  buildImageUrl = (photo: any, type: string = 'regular') => {
    let imgVariant = '';

    switch (type) {
      case 'thumbnail':
        imgVariant = '_q';
        break;
      case 'large':
        imgVariant = '_b';
        break;
      case 'regular':
      default:
        imgVariant = '';
        break;
    }

    return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}${imgVariant}.jpg`;
  };

  async filterPhotosShotWithLens(
    flickrPhotoResponses: Array<{
      id: string;
      owner: string;
      secret: string;
      server: string;
      farm: number;
      title: string;
      ispublic: number;
      isfriend: number;
      isfamily: number;
    }>,
    lensSearchOptions: LensSearchOptions,
  ) {
    // I think this should happen before function. just handle filter in here, not fetch and filter
    // Build array of API endpoints for each photo in searchResult
    const exifApiUrlList = flickrPhotoResponses.map((photo: any) => {
      return `${this.makeApiPath({
        method: this.method.getExif,
        photoId: photo.id,
      })}`;
    });

    /**
     * Compares and validates if the exif data from photo matches
     * what our searched lens is. if ratio is above "0.8" it is considered correct
     *
     * Promise.All([])
     */
    const exifDataPromise = exifApiUrlList.map(async (exifUrl, index) => {
      const res = await this.get(exifUrl);
      const exif = res?.photo?.exif ?? [];

      const isPhotoShotWithLens = exif.some((tag: any) => {
        if (tag.tag === 'LensModel') {
          const similarCheckRatio = stringSimilarity.compareTwoStrings(
            tag.raw._content,
            lensSearchOptions?.lensModel ?? '',
          );

          const passesCheck = similarCheckRatio >= 0.8;

          return passesCheck;
        }
      });

      if (isPhotoShotWithLens) {
        return Promise.resolve(res.photo);
      }
    });

    return Promise.all(exifDataPromise).then((exifData) => {
      const photosUsingLens = exifData.filter((test) => {
        return test !== undefined;
      });

      return photosUsingLens;
    });
  }

  async getPhotosShotWithLens(
    lensSearchOptions: LensSearchOptions,
  ): Promise<any> {
    try {
      const { searchString } = lensSearchOptions;

      const searchFlickrLensQuery: string = this.makeApiPath({
        searchString,
      });
      const flickrSearchResponse: any = await this.get(searchFlickrLensQuery)
        .then((res) => res?.photos?.photo)
        .catch((err) => console.error(err));

      // filter results by checking each photos EXIF and save any shot with lens
      const photosShotWithLens = await this.filterPhotosShotWithLens(
        flickrSearchResponse,
        lensSearchOptions,
      );

      const photosShotWithLensRes = photosShotWithLens.map(
        (photo: PhotoDataInput) => {
          return {
            thumbnail: this.buildImageUrl(photo, 'thumbnail'),
            imageUrl: this.buildImageUrl(photo),
            imageUrlLarge: this.buildImageUrl(photo, 'large'),
            camera: photo.camera,
            exif: photo.exif,
            id: photo.id,
          };
        },
      );

      return photosShotWithLensRes;
    } catch (err) {
      console.error(`Error in photoShotWithLensSearch(): ${err}`);
    }
  }
}

export default FlickrModel;
