import * as types from '../ActionTypes.jsx';
import speechSynth from '../models/SpeechSynth.jsx';
import WordBehavior from '../models/WordBehavior.jsx';

export const speakWords = (words, part) => {
  speechSynth.speak(words, part);
  return { type: types.SPEAK_WORDS };
};

export const execWordBehavior = (word, wordBehaviorType, wordSearchKeyword) => {
  const behavior = new WordBehavior();
  behavior.exec(word, wordBehaviorType, wordSearchKeyword);
  return { type: types.EXEC_WORD_BEHAVIOR };
};

export const toggleCircleImages = () => {
  return { type: types.TOGGLE_CIRCLE_IMAGES };
}

export const switchWordBehavior = (name) => ({ type: types.SWITCH_WORD_BEHAVIOR, name });
export const updateWordSearchKeyword = (keyword) => ({ type: types.UPDATE_WORD_SEARCH_KEYWORD, keyword });
