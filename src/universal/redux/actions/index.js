import { sharedActions } from './sharedActions';

// update search term in state
export const updateSearchTerm = lensSearchTerm => {
    return {
        type: sharedActions.SEARCH_TERM_UPDATE,
        payload: lensSearchTerm
    }
}

//update store with exif data retrieved from api calls to flickr, 500px, etc.
export const populatePhotosData = PhotosData => {
    return {
        type: sharedActions.POPULATE_PHOTOS_DATA,
        payload: PhotosData
    }
}