import * as types from '../ActionTypes.jsx';
import speechSynth from '../models/SpeechSynth.jsx';
import WordBehavior from '../models/WordBehavior.jsx';

export const speakWords = (floorStatus, part) => {
  if (floorStatus.roomType() == 'index') {
    const sequence = floorStatus.wordSequenceForSpeaking(part);
    speechSynth.speakSequence(sequence);
  } else {
    speechSynth.speakWords(floorStatus.get('words'), part);
  }
  return { type: types.SPEAK_WORDS };
};

export const execWordBehavior = (floorStatus, word) => {
  const behavior = new WordBehavior();
  let name;
  if (floorStatus.roomType() == 'index') {
    name = floorStatus.get('indexBehaviorName');
    if (name == 'move') {
      return { type: types.GO_NEXT_ROOM, direction: word.index };
    } else if (name == 'speak') {
      let words = floorStatus.createWordList(word.index);
      speechSynth.speakWords(words, -1);
      return { type: types.SPEAK_WORDS };
    }
  } else {
    name = floorStatus.get('behaviorName');
    if (name == 'services') {
      name = floorStatus.get('behaviorServiceName');
    }
    const keyword = floorStatus.get('wordSearchKeyword');
    behavior.exec(word.text, name, keyword);
    return { type: types.EXEC_WORD_BEHAVIOR };
  }
};

export const toggleCircleImages = () => {
  return { type: types.TOGGLE_CIRCLE_IMAGES };
}

export const changeCircleImagesResolution = () => {
  return { type: types.CHANGE_CIRCLE_IMAGES_RESOLUTION };
}

export const toggleCircleImagesResolution = () => {
  return { type: types.TOGGLE_CIRCLE_IMAGES_RESOLUTION };
}

export const switchWordBehavior = (name) => ({ type: types.SWITCH_WORD_BEHAVIOR, name });
export const switchWordBehaviorService = (name) => ({ type: types.SWITCH_WORD_BEHAVIOR_SERVICE, name });

export const updateWordSearchKeyword = (keyword) => ({ type: types.UPDATE_WORD_SEARCH_KEYWORD, keyword });

export const setSpeechSpeed = (speed) => {
  speechSynth.setSpeed(speed);
  return {
    type: types.SET_SPEECH_SPEED,
    speed
  };
};
