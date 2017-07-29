import I from 'immutable';
import { combineReducers } from 'redux';
import * as types from './ActionTypes.jsx';

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
    return state;
  case types.ACTION_WORD:
    return state;
  case types.SWITCH_WORD_BEHAVIOR:
    return Object.assign({}, state, {
      wordBehaviorType: action.name
    });
  case types.UPDATE_WORD_SEARCH_KEYWORD:
    return Object.assign({}, state, {
      wordSearchKeyword: action.keyword
    });
  case types.START_3D_MODE:
    return Object.assign({}, state, {
      mode: '3d'
    });
  case types.CIRCLE_MODE:
    return Object.assign({}, state, {
      mode: 'circle'
    });
  case types.GO_NEXT_ROOM:
    let mode = 'circle';
    if (action.threeD) {
      mode = '3d';
    }
    return Object.assign({}, state, {
      mode: mode,
      pattern: action.pattern,
      words: action.words,
      floorPos: action.floorPos,
    });
  case types.GO_INDEX_ROOM:
    let indexMode = 'circleIndex';
    if (action.threeD) {
      indexMode = '3dIndex';
    }
    return Object.assign({}, state, {
      mode: indexMode,
      pattern: 'floor ' + action.floorNum,
      words: action.words,
      floorPos: 0,
    });
  case types.TOGGLE_CIRCLE_IMAGES:
    return Object.assign({}, state, {
      showImage: !state.showImage
    });
  default:
    return state;
  }
}

const index = (state = {}, action) => {
  switch (action.type) {
  case types.CHANGE_INDEX_SELECTION:
    return Object.assign({}, state, {
      filter: action.filter,
      selected: action.selected,
      speakingAll: false
    });
  case types.SPEAK_INDEX_WORDS:
    return Object.assign({}, state, {
      speakingAll: false
    });
  case types.TOGGLE_SPEAK_ALL_CIRCLES:
    return Object.assign({}, state, {
      speakingAll: !state.speakingAll
    });
  default:
    return state;
  }
}

const reducer = combineReducers({
  window,
  circle,
  index
})

export default reducer;
