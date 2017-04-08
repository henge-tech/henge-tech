import * as types from '../ActionTypes.jsx';

export const speakWords = (words, part) => ({ type: types.SPEAK_WORDS, words, part });
export const actionWord = (word) => ({ type: types.ACTION_WORD, word });
export const switchWordAction = (name) => ({ type: types.SWITCH_WORD_ACTION, name });
export const updateWordActionKeyword = (keyword) => ({ type: types.UPDATE_WORD_ACTION_KEYWORD, keyword });
