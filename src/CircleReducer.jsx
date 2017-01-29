import { combineReducers } from 'redux';
import * as types from './ActionTypes.jsx';
import Speaker from './Speaker.jsx';
import WordActions from './WordActions.jsx';

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
  case types.CIRCLE_MODE:
    return Object.assign({}, state, {
      mode: 'circle'
    });
  case types.STORY_FETCH_SUCCEEDED:
    return Object.assign({}, state, {
      story: action.story
    });
  case types.TOGGLE_STORY_WORDS:
    let storyWords = 'translated';
    if (state.storyWords == 'translated') {
      storyWords = 'english';
    }
    return Object.assign({}, state, {
      storyWords: storyWords
    });
  default:
    return state;
  }
}

const index = (state = {}, action) => {
  switch (action.type) {
  case types.STORY_INDEX_FETCH_SUCCEEDED:
    return Object.assign({}, state, {
      stories: action.stories
    });
  case types.UPDATE_SEARCH_QUERY:
    return Object.assign({}, state, {
      q: action.q,
      filter: 'all'
    });
  case types.CHANGE_INDEX_FILTER:
    return Object.assign({}, state, {
      q: '',
      filter: action.filter
    });
  case types.SPEAK_INDEX_WORDS:
    state.speaker.speak(state.allWords[action.id - 1]);
    return state;
  default:
    return state;
  }
}

const storyIndex = (state = {}, action) => {
  switch (action.type) {
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
