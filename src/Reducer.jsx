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
  case types.SPEAK_WORD:
    return Object.assign({}, state, {
      floorStatus: state.floorStatus.switchSingleImageResolution(action.word.index, false)
    });
  case types.SPEAK_QUATER_WORDS:
    return Object.assign({}, state, {
      floorStatus: state.floorStatus.switchQuaterImagesResolution(action.part, false)
    });
  case 'SHOW_MODAL_IMAGE':
    return Object.assign({}, state, {
      floorStatus: state.floorStatus.update({modalImage: action.word.index})
    });
  case 'HIDE_MODAL_IMAGE':
    return Object.assign({}, state, {
      floorStatus: state.floorStatus.update({modalImage: null})
    });
  case 'NEXT_MODAL_IMAGE':
    return Object.assign({}, state, {
      floorStatus: state.floorStatus.nextModalImage()
    });
  case types.EXEC_WORD_BEHAVIOR:
    // console.log(action)
    return state;
  case types.OPEN_EXTERNAL_SERVICE:
    return state;
  case types.TOGGLE_WORD_SELECTION:
    return Object.assign({}, state, {
      floorStatus: state.floorStatus.toggleWordSelection(action.word.index)
    });
  case types.TOGGLE_ALL_WORDS_SELECTION:
    return Object.assign({}, state, {
      floorStatus: state.floorStatus.toggleAllWordsSelection()
    });
  case types.SWITCH_WORD_BEHAVIOR:
    return Object.assign({}, state, {
      floorStatus: state.floorStatus.switchWordBehavior(action.name)
    });
  case types.SWITCH_WORD_BEHAVIOR_SERVICE:
    return Object.assign({}, state, {
      floorStatus: state.floorStatus.switchWordBehaviorService(action.name)
    });
  case types.UPDATE_WORD_SEARCH_KEYWORD:
    return Object.assign({}, state, {
      floorStatus: state.floorStatus.update({
        behaviorName: 'keyword',
        wordSearchKeyword: action.keyword
      })
    });
  case types.SET_SPEECH_SPEED:
    return Object.assign({}, state, {
      floorStatus: state.floorStatus.setSpeechSpeed(action.speed)
    });
  case types.SWITCH_INDEX_PICKUP_IMAGE:
    return Object.assign({}, state, {
      floorStatus: state.floorStatus.setIndexPickupImage(action.quater)
    });
  case types.START_3D_MODE:
    return Object.assign({}, state, {
      floorStatus: state.floorStatus.switchMode('3d')
    });
  case types.CIRCLE_MODE:
    return Object.assign({}, state, {
      floorStatus: state.floorStatus.switchMode('circle')
    });
  case types.GO_TO_ROOM:
    return Object.assign({}, state, {
      redirectURL: null,
      floorStatus: action.floorStatus.gotoRoom(action.pattern)
    });
  case types.GO_TO_FLOOR:
    return Object.assign({}, state, {
      redirectURL: null,
      floorStatus: action.floorStatus.gotoFloor(action.floor)
    });
  case 'REDIRECT':
    return Object.assign({}, state, {
      redirectURL: action.href
    });
  case types.TOGGLE_CIRCLE_IMAGES:
    return Object.assign({}, state, {
      floorStatus: state.floorStatus.toggleShowImage()
    });
  case types.TOGGLE_CIRCLE_IMAGES_RESOLUTION:
    return Object.assign({}, state, {
      floorStatus: state.floorStatus.toggleCircleImagesResolution()
    });
  case types.CHANGE_CIRCLE_IMAGES_RESOLUTION:
    return Object.assign({}, state, {
      floorStatus: state.floorStatus.changeCircleImagesResolution()
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
