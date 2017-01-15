import * as types from './ActionTypes.jsx';

export const windowResize = (width, height) => ({ type: types.WINDOW_RESIZE, width, height });
export const speakWords = (words, part) => ({ type: types.SPEAK_WORDS, words, part });
export const actionWord = (word) => ({ type: types.ACTION_WORD, word });
export const switchWordAction = (name) => ({ type: types.SWITCH_WORD_ACTION, name });
export const updateWordActionKeyword = (keyword) => ({ type: types.UPDATE_WORD_ACTION_KEYWORD, keyword });
export const storyMode = () => ({ type: types.STORY_MODE });
export const circleMode = () => ({ type: types.CIRCLE_MODE });

export const updateSearchQuery = (q) => ({ type: types.UPDATE_SEARCH_QUERY, q});
export const changeIndexFilter = (filter) => ({ type: types.CHANGE_INDEX_FILTER, filter});
