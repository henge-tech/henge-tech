import * as types from '../ActionTypes.jsx';

export const speakStoryWords = (words, part) => {
  return { type: types.SPEAK_STORY_WORDS, words, part };
};

export const toggleStoryWords = index => ({ type: types.TOGGLE_STORY_WORDS, index: index });
