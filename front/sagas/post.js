import {
  all,
  fork,
  put,
  takeLatest,
  throttle,
  call,
  debounce,
  takeEvery,
  race,
  take,
} from 'redux-saga/effects';
import axios from 'axios';
import {
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  LOAD_MAIN_POSTS_REQUEST,
  LOAD_MAIN_POSTS_SUCCESS,
  LOAD_MAIN_POSTS_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  EDIT_POST_REQUEST,
  EDIT_POST_SUCCESS,
  EDIT_POST_FAILURE,
  LOAD_EXPLORE_POSTS_REQUEST,
  LOAD_EXPLORE_POSTS_SUCCESS,
  LOAD_EXPLORE_POSTS_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  LOAD_USER_POSTS_REQUEST,
  LOAD_USER_POSTS_SUCCESS,
  LOAD_USER_POSTS_FAILURE,
  FIND_HASHTAG_SUCCESS,
  FIND_HASHTAG_REQUEST,
  FIND_HASHTAG_FAILURE,
  LOAD_HASHTAG_POSTS_REQUEST,
  LOAD_HASHTAG_POSTS_SUCCESS,
  LOAD_HASHTAG_POSTS_FAILURE,
  REMOVE_COMMENT_REQUEST,
  REMOVE_COMMENT_SUCCESS,
  REMOVE_COMMENT_FAILURE,
  LOAD_LIKE_POSTS_REQUEST,
  LOAD_LIKE_POSTS_SUCCESS,
  LOAD_LIKE_POSTS_FAILURE,
} from '../reducers/post';
import { ADD_POST_TO_ME } from '../reducers/user';

function uploadImagesAPI(formData) {
  return axios.post('/post/images', formData, {
    withCredentials: true,
  });
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchUploadImages() {
  yield takeEvery(UPLOAD_IMAGES_REQUEST, uploadImages);
}

function addPostAPI(postData) {
  return axios.post('/post/', postData, {
    withCredentials: true,
  });
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,
    });
  } catch (e) {
    yield put({
      type: ADD_POST_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function loadMainPostsAPI(lastId = 0, limit = 10) {
  return axios.get(`/posts?lastId=${lastId}&limit=${limit}`, {
    withCredentials: true,
  });
}

function* loadMainPosts(action) {
  try {
    const result = yield call(loadMainPostsAPI, action.lastId);
    yield put({
      type: LOAD_MAIN_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_MAIN_POSTS_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchLoadPosts() {
  yield throttle(2000, LOAD_MAIN_POSTS_REQUEST, loadMainPosts);
}

function addCommentAPI(data) {
  return axios.post(
    `/post/${data.postId}/comment`,
    { content: data.content },
    {
      withCredentials: true,
    },
  );
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: {
        postId: action.data.postId,
        comment: result.data,
      },
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function likePostAPI(postId) {
  return axios.post(
    `/post/${postId}/like`,
    {},
    {
      withCredentials: true,
    },
  );
}

function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: {
        postId: action.data,
        userId: result.data.userId,
      },
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LIKE_POST_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}

function unlikePostAPI(postId) {
  return axios.delete(`/post/${postId}/like`, {
    withCredentials: true,
  });
}

function* unlikePost(action) {
  try {
    const result = yield call(unlikePostAPI, action.data);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: {
        postId: action.data,
        userId: result.data.userId,
      },
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchUnLikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}

function removePostAPI(postId) {
  return axios.delete(`/post/${postId}`, {
    withCredentials: true,
  });
}

function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: REMOVE_POST_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function editPostAPI(postData) {
  return axios.patch(`/post/${postData.postId}`, postData, {
    withCredentials: true,
  });
}

function* editPost(action) {
  try {
    const result = yield call(editPostAPI, action.data);
    yield put({
      type: EDIT_POST_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: EDIT_POST_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchEditPost() {
  yield takeLatest(EDIT_POST_REQUEST, editPost);
}

function loadExplorePostsAPI(lastId = 0, limit = 12) {
  return axios.get(`/posts/explore?lastId=${lastId}&limit=${limit}`, {
    withCredentials: true,
  });
}

function* loadExplorePosts(action) {
  try {
    const result = yield call(loadExplorePostsAPI, action.lastId);
    yield put({
      type: LOAD_EXPLORE_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_EXPLORE_POSTS_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchLoadExplore() {
  yield throttle(2000, LOAD_EXPLORE_POSTS_REQUEST, loadExplorePosts);
}

function loadPostAPI(postId) {
  return axios.get(`/post/${postId}`, {
    withCredentials: true,
  });
}

function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.id);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_POST_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

function loadUserPostsAPI(nickname, lastId = 0, limit = 12) {
  return axios.get(
    `/posts/${encodeURIComponent(nickname)}?lastId=${lastId}&limit=${limit}`,
    {
      withCredentials: true,
    },
  );
}

function* loadUserPosts(action) {
  try {
    const result = yield call(loadUserPostsAPI, action.data, action.lastId);
    yield put({
      type: LOAD_USER_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_USER_POSTS_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchLoadUserPosts() {
  yield throttle(2000, LOAD_USER_POSTS_REQUEST, loadUserPosts);
}

function findHashtagAPI(tag) {
  if (!tag) {
    throw '빈칸입력';
  }
  return axios.post(`/hashtag/find`, { tag });
}

function* findHashtag(action) {
  try {
    const result = yield call(findHashtagAPI, action.data);
    yield put({
      type: FIND_HASHTAG_SUCCESS,
      data: result.data,
      search: action.search ? action.search : undefined,
    });
  } catch (e) {
    yield put({
      type: FIND_HASHTAG_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchFindHashtag() {
  yield debounce(2000, FIND_HASHTAG_REQUEST, findHashtag);
}

function loadHashtagPostsAPI(tag, lastId = 0, limit = 12) {
  return axios.get(
    `/hashtag/${encodeURIComponent(tag)}?lastId=${lastId}&limit=${limit}`,
    {
      withCredentials: true,
    },
  );
}

function* loadHashtagPosts(action) {
  try {
    const result = yield call(loadHashtagPostsAPI, action.data, action.lastId);
    yield put({
      type: LOAD_HASHTAG_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_HASHTAG_POSTS_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchLoadHashtagPosts() {
  yield throttle(2000, LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}

function removeCommentAPI(commentId) {
  return axios.delete(`/post/${commentId}/comment`, {
    withCredentials: true,
  });
}

function* removeComment(action) {
  try {
    const result = yield call(removeCommentAPI, action.data);
    yield put({
      type: REMOVE_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: REMOVE_COMMENT_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchRemoveComment() {
  yield takeLatest(REMOVE_COMMENT_REQUEST, removeComment);
}

function loadLikePostsAPI(lastId = 0, limit = 12) {
  return axios.get(`/posts/like?lastId=${lastId}&limit=${limit}`, {
    withCredentials: true,
  });
}

function* loadLikePosts(action) {
  try {
    const result = yield call(loadLikePostsAPI, action.lastId);
    yield put({
      type: LOAD_LIKE_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_LIKE_POSTS_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchLoadLike() {
  yield throttle(2000, LOAD_LIKE_POSTS_REQUEST, loadLikePosts);
}

export default function* postSaga() {
  yield all([
    fork(watchUploadImages),
    fork(watchAddPost),
    fork(watchLoadPosts),
    fork(watchAddComment),
    fork(watchLikePost),
    fork(watchUnLikePost),
    fork(watchRemovePost),
    fork(watchEditPost),
    fork(watchLoadExplore),
    fork(watchLoadPost),
    fork(watchLoadUserPosts),
    fork(watchFindHashtag),
    fork(watchLoadHashtagPosts),
    fork(watchRemoveComment),
    fork(watchLoadLike),
  ]);
}
