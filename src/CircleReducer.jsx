import { combineReducers } from 'redux';
import * as types from './ActionTypes.jsx';
import Speaker from './Speaker.jsx';

const window = (state = {}, action) => {
  switch (action.type) {
  case types.WINDOW_RESIZE:
    return Object.assign({}, state, {
      width: action.width,
      height: action.height
    })
  default:
    return state;
  }
}

const circle =  (state = {}, action) => {
  switch (action.type) {
  case types.SPEAK_WORDS:
    let speaker = new Speaker();
    speaker.speak(action.words, action.part);
    return state;
  default:
    return state;
  }
}

const circleReducer = combineReducers({
  window,
  circle
})

export default circleReducer;
