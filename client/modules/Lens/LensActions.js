import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_LENS = 'ADD_LENS';
export const ADD_POSTS = 'ADD_POSTS';

// Export Actions

export function fetchPosts() {
  return (dispatch) => {
    return callApi('LENS').then(res => {
      dispatch(addPosts(res.posts));
    });
  };
}

export function fetchPost(lens_name) {
  return (dispatch) => {
    return callApi(`lens/${lens_name}`).then(res => dispatch(addPost(res.post)));
  };
}
