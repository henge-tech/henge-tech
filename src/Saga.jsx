import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import CircleAPI from './models/CircleAPI.jsx'

// https://github.com/redux-saga/redux-saga

// worker Saga: will be fired on STORY_FETCH_REQUESTED actions
function* fetchStory(action) {
  try {
    const story = yield call(CircleAPI.fetchStory, action.pattern);
    yield put({type: "STORY_FETCH_SUCCEEDED", story: story});
  } catch (e) {
    yield put({type: "STORY_FETCH_FAILED", message: e.message});
  }
}

function* fetchStoryIndex(action) {
  try {
    const stories = yield call(CircleAPI.fetchStoryIndex, action.lang);
    yield put({type: "STORY_INDEX_FETCH_SUCCEEDED", stories: stories});
  } catch (e) {
    yield put({type: "STORY_INDEX_FETCH_FAILED", message: e.message});
  }
}

function* saga() {
  yield takeLatest('STORY_FETCH_REQUESTED', fetchStory);
  yield takeLatest('STORY_INDEX_FETCH_REQUESTED', fetchStoryIndex);
}

export default saga;
