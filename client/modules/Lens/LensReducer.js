

// Initial State
const initialState = { data: [] };

const LensReducer = (state = initialState) => {
  return state;
};

/* Selectors */

// Get all posts
export const getLens = state => state.lens.data;

// Get post by lens name
export const getPost = (state, lensName) => state.lens.data.filter(lens => lens.lens_name === lensName)[0];

// Export Reducer
export default LensReducer;
