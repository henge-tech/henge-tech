import * as types from '../ActionTypes.jsx';
import speechSynth from '../models/SpeechSynth.jsx';
import WordBehavior from '../models/WordBehavior.jsx';

export const speakWords = (floorStatus, part) => {
  if (floorStatus.roomType() == 'index' && floorStatus.indexPickupImage == 'circle') {
    const sequence = floorStatus.wordIndexSequenceForSpeaking(part);
    speechSynth.speakSequence(sequence);
    return { type: types.SPEAK_WORDS };
  }

  speechSynth.speakWords(floorStatus.get('words'), part);
  if (part < 0) {
    return { type: types.SPEAK_WORDS };
  } else {
    return { type: types.SPEAK_QUATER_WORDS, part: part };
  }
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
    const keyword = floorStatus.get('wordSearchKeyword');

    if (name == 'image') {
      speechSynth.speakText(word.text);
      return { type: 'SHOW_MODAL_IMAGE', word: word };
    }
    if (name == 'services') {
      name = floorStatus.get('behaviorServiceName');
    }
    if (name == 'speak') {
      behavior.exec(word.text, name, floorStatus, keyword);
      return { type: types.SPEAK_WORD, word: word };
    } else if (name.match(/\*$/)) {
      speechSynth.speakText(word.text);
      return { type: types.TOGGLE_WORD_SELECTION, word: word };
    } else {
      behavior.exec(word.text, name, floorStatus, keyword);
      return { type: types.EXEC_WORD_BEHAVIOR };
    }
  }
};

export const nextModalImage = (floorStatus, direction) => {
  const word = floorStatus.nextModalImage(direction);

  speechSynth.speakText(word.text);
  return {type: 'SHOW_MODAL_IMAGE', word: word};
}

export const openService = (floorStatus) => {
  const behavior = new WordBehavior();
  const name = floorStatus.get('behaviorServiceName');
  behavior.openService(name, floorStatus);
  return { type: types.OPEN_EXTERNAL_SERVICE };
}

export const toggleCircleImages = () => {
  return { type: types.TOGGLE_CIRCLE_IMAGES };
}

export const changeCircleImagesResolution = () => {
  return { type: types.CHANGE_CIRCLE_IMAGES_RESOLUTION };
}

export const toggleCircleImagesResolution = () => {
  return { type: types.TOGGLE_CIRCLE_IMAGES_RESOLUTION };
}

export const toggleAllWordsSelection = () => {
  return { type: types.TOGGLE_ALL_WORDS_SELECTION };
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
