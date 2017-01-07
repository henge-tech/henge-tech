import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import CircleAPI from './CircleAPI.jsx'

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

function* mySaga() {
  yield takeLatest("STORY_FETCH_REQUESTED", fetchStory);
}

export default mySaga;
