import * as types from '../ActionTypes.jsx';
import speechSynth from '../models/SpeechSynth.jsx';
import WordActions from '../models/WordActions.jsx';

export const speakWords = (words, part) => {
  speechSynth.speak(words, part);
  return { type: types.SPEAK_WORDS };
};

export const actionWord = (word) => {
  return { type: types.ACTION_WORD, word };
};

export const switchWordAction = (name) => ({ type: types.SWITCH_WORD_ACTION, name });
export const updateWordActionKeyword = (keyword) => ({ type: types.UPDATE_WORD_ACTION_KEYWORD, keyword });
