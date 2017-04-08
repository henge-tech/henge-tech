import * as types from '../ActionTypes.jsx';

export const speakStoryWords = (words, part) => {
  return { type: types.SPEAK_STORY_WORDS, words, part };
};

export const toggleStoryWords = (toggles, index) => {
  return { type: types.TOGGLE_STORY_WORDS, toggles: toggles.switch(index) }
};

export const toggleStoryIndexWords = (id, toggles, index) => {
  return { type: types.TOGGLE_STORY_INDEX_WORDS, id, toggles: toggles.switch(index) };
};
