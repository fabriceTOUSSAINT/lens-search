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

// Update store with stored lens data set. used to search against and local data
export const localLensData = (lensData) => {
	return {
		type: sharedActions.LOCAL_LENS_DATA,
		payload: lensData
	}
}

export const activeLensDetail = (lensData) => {
    return {
        type: sharedActions.ACTIVE_LENS_DETAIL,
        payload: lensData
    }
}