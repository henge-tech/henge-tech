import * as types from '../ActionTypes.jsx';
import I from 'immutable';

export const changeIndexFilter = (speaker, filter, index, allWords) => {
  speaker.reset();
  const selected = filter.execute(index, allWords);
  return {
    type: types.CHANGE_INDEX_SELECTION,
    filter: filter,
    selected: selected
  };
};

export const speakIndexWords = (speaker, words) => {
  speaker.reset();
  speaker.speak(words);

  return { type: types.SPEAK_INDEX_WORDS };
};

export const toggleSpeakAllCircles = (speaker, selected, allWords) => {
  if (speaker.speakingSequence) {
    speaker.reset();
  } else {
    speaker.reset();
    const sequence = selected.map((index) => {
      return allWords.get(index.get(0));
    });
    speaker.speakSequence(sequence);
  }
  return { type: types.TOGGLE_SPEAK_ALL_CIRCLES };
};
