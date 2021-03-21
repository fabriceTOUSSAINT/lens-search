/* eslint-disable */
/* @ts-ignore */
// THIS FILE IS GENERATED AUTOMATICALLY DO NOT EDIT DIRECTLY
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export interface Query {
  __typename?: 'Query';
  getAllLens?: Maybe<Array<Maybe<Lens>>>;
  getLens?: Maybe<Lens>;
  getSelectedLens: Lens;
  photosShotWith?: Maybe<Array<Maybe<Photo>>>;
}


export type QuerygetLensArgs = {
  lensName?: Maybe<Scalars['String']>;
};


export type QueryphotosShotWithArgs = {
  lensName?: Maybe<Scalars['String']>;
};

export interface Photo {
  __typename?: 'Photo';
  thumbnail?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  imageUrlLarge?: Maybe<Scalars['String']>;
  exif?: Maybe<Array<Maybe<EXIF>>>;
  id?: Maybe<Scalars['Int']>;
  linkToPhotographer?: Maybe<Scalars['String']>;
  linkToPhoto?: Maybe<Scalars['String']>;
}

export interface EXIF {
  __typename?: 'EXIF';
  tagspace?: Maybe<Scalars['String']>;
  tagspaceid?: Maybe<Scalars['Int']>;
  tag?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  raw?: Maybe<Raw>;
}

export interface Raw {
  __typename?: 'Raw';
  _content?: Maybe<Scalars['String']>;
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

export interface LensInput {
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

export enum CacheControlScope {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE'
}


export type GetAllLensNamesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllLensNamesQuery = (
  { __typename?: 'Query' }
  & { getAllLens?: Maybe<Array<Maybe<(
    { __typename?: 'Lens' }
    & Pick<Lens, 'lensName'>
  )>>> }
);

export type GetLensQueryVariables = Exact<{
  lensName?: Maybe<Scalars['String']>;
}>;


export type GetLensQuery = (
  { __typename?: 'Query' }
  & { getLens?: Maybe<(
    { __typename?: 'Lens' }
    & Pick<Lens, 'fStopMax' | 'fStopMin' | 'lensType' | 'lensMount' | 'dpReviewLink' | 'focalLength' | 'yearReleased' | 'lensBrand' | 'msrp' | 'msrp_002' | 'lensName'>
  )> }
);

export type PhotosShotWithQueryVariables = Exact<{
  lensName?: Maybe<Scalars['String']>;
}>;


export type PhotosShotWithQuery = (
  { __typename?: 'Query' }
  & { photosShotWith?: Maybe<Array<Maybe<(
    { __typename?: 'Photo' }
    & Pick<Photo, 'thumbnail' | 'imageUrl' | 'imageUrlLarge' | 'linkToPhotographer' | 'linkToPhoto'>
    & { exif?: Maybe<Array<Maybe<(
      { __typename?: 'EXIF' }
      & Pick<EXIF, 'tag' | 'tagspace' | 'label'>
      & { raw?: Maybe<(
        { __typename?: 'Raw' }
        & Pick<Raw, '_content'>
      )> }
    )>>> }
  )>>> }
);

export type StoreSelectedLensQueryVariables = Exact<{ [key: string]: never; }>;


export type StoreSelectedLensQuery = (
  { __typename?: 'Query' }
  & { getSelectedLens: (
    { __typename?: 'Lens' }
    & Pick<Lens, 'fStopMax' | 'fStopMin' | 'lensType' | 'lensMount' | 'dpReviewLink' | 'focalLength' | 'yearReleased' | 'lensBrand' | 'msrp' | 'msrp_002' | 'lensName'>
  ) }
);


export const GetAllLensNamesDocument = gql`
    query GetAllLensNames {
  getAllLens {
    lensName
  }
}
    `;

/**
 * __useGetAllLensNamesQuery__
 *
 * To run a query within a React component, call `useGetAllLensNamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllLensNamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllLensNamesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllLensNamesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllLensNamesQuery, GetAllLensNamesQueryVariables>) {
        return Apollo.useQuery<GetAllLensNamesQuery, GetAllLensNamesQueryVariables>(GetAllLensNamesDocument, baseOptions);
      }
export function useGetAllLensNamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllLensNamesQuery, GetAllLensNamesQueryVariables>) {
          return Apollo.useLazyQuery<GetAllLensNamesQuery, GetAllLensNamesQueryVariables>(GetAllLensNamesDocument, baseOptions);
        }
export type GetAllLensNamesQueryHookResult = ReturnType<typeof useGetAllLensNamesQuery>;
export type GetAllLensNamesLazyQueryHookResult = ReturnType<typeof useGetAllLensNamesLazyQuery>;
export type GetAllLensNamesQueryResult = Apollo.QueryResult<GetAllLensNamesQuery, GetAllLensNamesQueryVariables>;
export const GetLensDocument = gql`
    query GetLens($lensName: String) {
  getLens(lensName: $lensName) {
    fStopMax
    fStopMin
    lensType
    lensMount
    dpReviewLink
    focalLength
    yearReleased
    lensBrand
    msrp
    msrp_002
    lensName
  }
}
    `;

/**
 * __useGetLensQuery__
 *
 * To run a query within a React component, call `useGetLensQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLensQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLensQuery({
 *   variables: {
 *      lensName: // value for 'lensName'
 *   },
 * });
 */
export function useGetLensQuery(baseOptions?: Apollo.QueryHookOptions<GetLensQuery, GetLensQueryVariables>) {
        return Apollo.useQuery<GetLensQuery, GetLensQueryVariables>(GetLensDocument, baseOptions);
      }
export function useGetLensLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLensQuery, GetLensQueryVariables>) {
          return Apollo.useLazyQuery<GetLensQuery, GetLensQueryVariables>(GetLensDocument, baseOptions);
        }
export type GetLensQueryHookResult = ReturnType<typeof useGetLensQuery>;
export type GetLensLazyQueryHookResult = ReturnType<typeof useGetLensLazyQuery>;
export type GetLensQueryResult = Apollo.QueryResult<GetLensQuery, GetLensQueryVariables>;
export const PhotosShotWithDocument = gql`
    query PhotosShotWith($lensName: String) {
  photosShotWith(lensName: $lensName) {
    thumbnail
    imageUrl
    imageUrlLarge
    linkToPhotographer
    linkToPhoto
    exif {
      tag
      tagspace
      label
      raw {
        _content
      }
    }
  }
}
    `;

/**
 * __usePhotosShotWithQuery__
 *
 * To run a query within a React component, call `usePhotosShotWithQuery` and pass it any options that fit your needs.
 * When your component renders, `usePhotosShotWithQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePhotosShotWithQuery({
 *   variables: {
 *      lensName: // value for 'lensName'
 *   },
 * });
 */
export function usePhotosShotWithQuery(baseOptions?: Apollo.QueryHookOptions<PhotosShotWithQuery, PhotosShotWithQueryVariables>) {
        return Apollo.useQuery<PhotosShotWithQuery, PhotosShotWithQueryVariables>(PhotosShotWithDocument, baseOptions);
      }
export function usePhotosShotWithLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PhotosShotWithQuery, PhotosShotWithQueryVariables>) {
          return Apollo.useLazyQuery<PhotosShotWithQuery, PhotosShotWithQueryVariables>(PhotosShotWithDocument, baseOptions);
        }
export type PhotosShotWithQueryHookResult = ReturnType<typeof usePhotosShotWithQuery>;
export type PhotosShotWithLazyQueryHookResult = ReturnType<typeof usePhotosShotWithLazyQuery>;
export type PhotosShotWithQueryResult = Apollo.QueryResult<PhotosShotWithQuery, PhotosShotWithQueryVariables>;
export const StoreSelectedLensDocument = gql`
    query StoreSelectedLens {
  getSelectedLens @client {
    fStopMax
    fStopMin
    lensType
    lensMount
    dpReviewLink
    focalLength
    yearReleased
    lensBrand
    msrp
    msrp_002
    lensName
  }
}
    `;

/**
 * __useStoreSelectedLensQuery__
 *
 * To run a query within a React component, call `useStoreSelectedLensQuery` and pass it any options that fit your needs.
 * When your component renders, `useStoreSelectedLensQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStoreSelectedLensQuery({
 *   variables: {
 *   },
 * });
 */
export function useStoreSelectedLensQuery(baseOptions?: Apollo.QueryHookOptions<StoreSelectedLensQuery, StoreSelectedLensQueryVariables>) {
        return Apollo.useQuery<StoreSelectedLensQuery, StoreSelectedLensQueryVariables>(StoreSelectedLensDocument, baseOptions);
      }
export function useStoreSelectedLensLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StoreSelectedLensQuery, StoreSelectedLensQueryVariables>) {
          return Apollo.useLazyQuery<StoreSelectedLensQuery, StoreSelectedLensQueryVariables>(StoreSelectedLensDocument, baseOptions);
        }
export type StoreSelectedLensQueryHookResult = ReturnType<typeof useStoreSelectedLensQuery>;
export type StoreSelectedLensLazyQueryHookResult = ReturnType<typeof useStoreSelectedLensLazyQuery>;
export type StoreSelectedLensQueryResult = Apollo.QueryResult<StoreSelectedLensQuery, StoreSelectedLensQueryVariables>;
export const namedOperations = {
  Query: {
    GetAllLensNames: 'GetAllLensNames',
    GetLens: 'GetLens',
    PhotosShotWith: 'PhotosShotWith',
    StoreSelectedLens: 'StoreSelectedLens'
  }
}