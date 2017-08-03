import * as types from '../ActionTypes.jsx';
import speechSynth from '../models/SpeechSynth.jsx';
import WordBehavior from '../models/WordBehavior.jsx';

export const speakWords = (words, part) => {
  speechSynth.speak(words, part);
  return { type: types.SPEAK_WORDS };
};

export const execWordBehavior = (floorStatus, word) => {
  const behavior = new WordBehavior();
  let name;
  if (floorStatus.roomType() == 'index') {
    name = floorStatus.get('indexBehaviorName');
    if (name == 'move') {
      return { type: types.GO_NEXT_ROOM, direction: word.index };
    } else if (name == 'speech') {
      let words = floorStatus.createWordList(word.index);
      speechSynth.speak(words, -1);
      return { type: types.SPEAK_WORDS };
    }
  } else {
    name = floorStatus.get('behaviorName');
    behavior.exec(word.text, name, floorStatus.get('wordSearchKeyword'));
    return { type: types.EXEC_WORD_BEHAVIOR };
  }
};

export const toggleCircleImages = () => {
  return { type: types.TOGGLE_CIRCLE_IMAGES };
}

export const switchWordBehavior = (name) => ({ type: types.SWITCH_WORD_BEHAVIOR, name });
export const updateWordSearchKeyword = (keyword) => ({ type: types.UPDATE_WORD_SEARCH_KEYWORD, keyword });
