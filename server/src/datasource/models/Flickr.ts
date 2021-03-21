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
  owner?: string;
}
interface ParameterType {
  method: string;
  api_key: string;
  text?: string;
  format: string;
  photo_id?: string | number;
  per_page?: number;
  page?: number;
  privacy_filter?: number;
  content_type?: number;
  media?: string;
  license?: string | any;
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
  httpCache: any;
  get: any;

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
    page = 1,
  }: {
    searchString?: string;
    method?: string;
    photoId?: number;
    page?: number;
  }) {
    const parameters: ParameterType = {
      method,
      api_key: this.apiKey,
      format: 'json',
      privacy_filter: 1,
      content_type: 1,
      per_page: 70,
      license: '1,2,3,4,5,7,9,10', // license codes https://www.flickr.com/groups/51035612836@N01/discuss/72157665503298714/
      media: 'photos',
      page,
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
    const min = 1;
    return Math.floor(Math.random() * (max - min + 1) + min);
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
      const url = `${this.makeApiPath({
        method: this.method.getExif,
        photoId: photo.id,
      })}`;

      return {
        exifUrl: url,
        photoOwner: photo.owner,
        photoTitle: photo.title,
      };
    });

    /**
     * Compares and validates if the exif data from photo matches
     * what our searched lens is. if ratio is above "0.8" it is considered correct
     *
     * Promise.All([])
     */
    const exifDataPromise = exifApiUrlList.map(
      async ({ exifUrl, photoOwner, photoTitle }, index) => {
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
          const jawn = {
            photo: Promise.resolve(res.photo),
            photoOwner,
            photoTitle,
          };

          return Promise.resolve(jawn.photo);
        }
      },
    );

    return Promise.all(exifDataPromise).then((exifData) => {
      const photosUsingLens = exifData.filter((val) => {
        return val !== undefined;
      });

      return photosUsingLens;
    });
  }

  buildPhotographerLink = (photo: any) =>
    `https://flickr.com/people/${photo.owner}/`;

  buildPhotoLink = (photo: any) =>
    `https://flickr.com/photos/${photo.owner}/${photo.id}`;

  async getPhotosShotWithLens(
    lensSearchOptions: LensSearchOptions,
  ): Promise<any> {
    try {
      const { searchString } = lensSearchOptions;

      const searchFlickrLensQuery: string = this.makeApiPath({
        searchString,
      });

      const flickrSearchResponse: any = await this.get(searchFlickrLensQuery)
        .then((res: any) => res?.photos)
        .catch((err: any) => console.error(err));

      let flickrPhotos;

      if (flickrSearchResponse.pages <= 1) {
        flickrPhotos = flickrSearchResponse.photo;
      } else {
        const randomPage = this.getRandomInt(flickrSearchResponse?.pages ?? 1);
        console.log({ randomPage });

        const searchFlickrLensQueryRandomPage: string = this.makeApiPath({
          searchString,
          page: randomPage,
        });

        flickrPhotos = await this.get(searchFlickrLensQueryRandomPage)
          .then((res: any) => res?.photos.photo)
          .catch((err: any) => console.error(err));
      }

      // console.log({ flickrPhotos });

      // filter results by checking each photos EXIF and save any shot with lens
      const photosShotWithLens = await this.filterPhotosShotWithLens(
        flickrPhotos,
        lensSearchOptions,
      );

      const photosShotWithLensRes = photosShotWithLens.map(
        (photo: PhotoDataInput) => {
          console.log('jawn >>>", ', photo.exif);
          return {
            thumbnail: this.buildImageUrl(photo, 'thumbnail'),
            imageUrl: this.buildImageUrl(photo),
            imageUrlLarge: this.buildImageUrl(photo, 'large'),
            linkToPhotographer: this.buildPhotographerLink(photo),
            linkToPhoto: this.buildPhotoLink(photo),
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
