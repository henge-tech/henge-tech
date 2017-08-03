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
      floorStatus: state.floorStatus.switchWordBehavior(action.name)
    });
  case types.UPDATE_WORD_SEARCH_KEYWORD:
    return Object.assign({}, state, {
      floorStatus: state.floorStatus.update({
        wordBehaviorType: 'keyword',
        wordSearchKeyword: action.keyword
      })
    });
  case types.START_3D_MODE:
    return Object.assign({}, state, {
      floorStatus: state.floorStatus.switchMode('3d')
    });
  case types.CIRCLE_MODE:
    return Object.assign({}, state, {
      floorStatus: state.floorStatus.switchMode('circle')
    });
  case types.GO_NEXT_ROOM:
    return Object.assign({}, state, {
      floorStatus: state.floorStatus.goNextRoom(action.direction)
    });
  case types.UPDATE_FLOOR_STATUS:
    return Object.assign({}, state, {
      floorStatus: action.floorStatus
    });
  case types.TOGGLE_CIRCLE_IMAGES:
    return Object.assign({}, state, {
      floorStatus: state.floorStatus.toggleShowImage()
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
