import { combineReducers } from 'redux';
import * as types from './ActionTypes.jsx';
import Speaker from './Speaker.jsx';
import WordActions from './WordActions.jsx';
import StoryLine from './StoryLine.jsx';

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
    let storyLines =[];
    let unit = state.words.length / 4;
    let words;
    action.story.forEach((line, i) => {
      words = state.words.slice(i * unit, (i + 1) * unit);
      storyLines.push(new StoryLine(line, words));
    });
    return Object.assign({}, state, {
      storyLines: storyLines
    });
  case types.TOGGLE_STORY_WORDS:
    let toggle = toggleStoryWords(state, action);
    return Object.assign({}, state, {
      storyWordsToggle: toggle
    });
  default:
    return state;
  }
}

const toggleStoryWords = (state, action) => {
  let index = action.index;
  let toggle = state.storyWordsToggle;
  if (index == -1) {
    if (toggle == [false, false, false, false]) {
      toggle = [true, true, true, true];
    } else if (toggle == [true, true, true, true]) {
      toggle = [false, false, false, false];
    } else {
      let b = !toggle[0];
      toggle = [b, b, b, b];
    }
  } else {
    toggle = [].concat(toggle);
    toggle[index] = !toggle[index];
  }
  return toggle;
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
