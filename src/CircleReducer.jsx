import I from 'immutable';
import { combineReducers } from 'redux';
import * as types from './ActionTypes.jsx';
import StoryLine from './models/StoryLine.jsx';

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
  case types.STORY_MODE:
    return Object.assign({}, state, {
      mode: 'story'
    });
  case types.START_3D_MODE:
    return Object.assign({}, state, {
      mode: '3d'
    });
  case types.CIRCLE_MODE:
    return Object.assign({}, state, {
      mode: 'circle'
    });
  case types.STORY_FETCH_SUCCEEDED:
    let storyLines =[];
    let unit = state.words.size / 4;

    action.story.forEach((line, i) => {
      storyLines.push(new StoryLine(line, i, unit));
    });
    return Object.assign({}, state, {
      storyLines: storyLines
    });
  case types.SPEAK_STORY_WORDS:
    return state;
  case types.TOGGLE_STORY_WORDS:
    return Object.assign({}, state, {
      storyWordToggles: action.toggles
    });
  default:
    return state;
  }
}

const index = (state = {}, action) => {
  switch (action.type) {
  case types.STORY_INDEX_FETCH_SUCCEEDED:
    const newIndex = state.index.map((index) => {
      if (action.stories.indexOf(index.pattern) >= 0) {
        return index.set('hasStory', true);
      }
      return index;
    });
    return Object.assign({}, state, {
      index: newIndex
    });
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

const storyIndex = (state = {}, action) => {
  switch (action.type) {
  case types.TOGGLE_STORY_INDEX_WORDS:
    return  Object.assign({}, state, {
      toggles: state.toggles.set(action.storyPos, action.toggles)
    });
  default:
    return state;
  }
}

const circleReducer = combineReducers({
  window,
  circle,
  index,
  storyIndex
})

export default circleReducer;
