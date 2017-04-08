import Immutable from 'immutable';

const CircleIndexEntryRecord = Immutable.Record({
  pattern: null,
  index: 0,
  text: '',
  pickup: false,
  hasStory: false
});

export default class CircleIndexEntry extends CircleIndexEntryRecord {
  constructor(pattern, index, words, pickup, hasStory = false) {
    const props = {
      pattern: pattern,
      index: index,
      text: words.join("\t"),
      pickup: pickup
    }
    super(props);
  }
}
