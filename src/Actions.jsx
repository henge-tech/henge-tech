import * as types from './ActionTypes.jsx';

export const windowResize = (width, height) => ({ type: types.WINDOW_RESIZE, width, height });
export const speakWords = (words, part) => ({ type: types.SPEAK_WORDS, words, part });
