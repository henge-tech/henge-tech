import I from 'immutable';
import { combineReducers } from 'redux';
import * as types from './ActionTypes.jsx';
import Speaker from './models/Speaker.jsx';
import WordActions from './models/WordActions.jsx';
import StoryLine from './models/StoryLine.jsx';
import Circle3DRenderer from './Circle3DRenderer.jsx';

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
    state.speaker.speak(action.words, action.part);
    return state;
  case types.ACTION_WORD:
    let actions = new WordActions(state.speaker);
    actions.exec(action.word, state.wordAction, state.wordActionKeyword);
    return state;
  case types.SWITCH_WORD_ACTION:
    return Object.assign({}, state, {
      wordAction: action.name
    });
  case types.UPDATE_WORD_ACTION_KEYWORD:
    return Object.assign({}, state, {
      wordActionKeyword: action.keyword
    });
  case types.STORY_MODE:
    return Object.assign({}, state, {
      mode: 'story'
    });
  case types.PREPARE_3D_CANVAS:
    return Object.assign({}, state, {
      mode: '3d'
    });
  case types.RENDER_3D:
    if (state.circle3dRenderer) {
      state.circle3dRenderer.stop();
      state.circle3dRenderer = null;
    }

    const renderer = new Circle3DRenderer(state.pattern, state.words, action.w, action.h, state.speaker);
    renderer.execute();
    return Object.assign({}, state, {
      circle3dRenderer: renderer
    });
  case types.CIRCLE_MODE:
    if (state.circle3dRenderer) {
      state.circle3dRenderer.stop();
      state.circle3dRenderer = null;
    }

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
    state.speaker.speak(action.words, action.part);
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
      speakingAll: state.speaker.speakingSequence
    });
  default:
    return state;
  }
}

const storyIndex = (state = {}, action) => {
  switch (action.type) {
  case types.TOGGLE_STORY_INDEX_WORDS:
    return  Object.assign({}, state, {
      toggles: state.toggles.set(action.id, action.toggles)
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
