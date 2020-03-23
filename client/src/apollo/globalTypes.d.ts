export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
}

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export interface Lens {
   __typename?: 'Lens';
  fStopMax?: Maybe<Scalars['String']>;
  fStopMin?: Maybe<Scalars['String']>;
  lensType?: Maybe<Scalars['String']>;
  lensMount?: Maybe<Scalars['String']>;
  dpReviewLink?: Maybe<Scalars['String']>;
  focalLength?: Maybe<Scalars['String']>;
  yearReleased?: Maybe<Scalars['String']>;
  lensBrand?: Maybe<Scalars['String']>;
  msrp?: Maybe<Scalars['String']>;
  msrp_002?: Maybe<Scalars['String']>;
  lensName?: Maybe<Scalars['String']>;
}

export interface Photo {
   __typename?: 'Photo';
  thumbnail?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  imageUrlLarge?: Maybe<Scalars['String']>;
  exif?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
}

export interface Query {
   __typename?: 'Query';
  photosShotWith?: Maybe<Array<Maybe<Photo>>>;
  getLens?: Maybe<Lens>;
  getAllLens?: Maybe<Array<Maybe<Lens>>>;
}


export interface QueryPhotosShotWithArgs {
  lensName?: Maybe<Scalars['String']>;
}


export interface QueryGetLensArgs {
  lensName?: Maybe<Scalars['String']>;
}

