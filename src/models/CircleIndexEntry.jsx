import Immutable from 'immutable';

const CircleIndexEntryRecord = Immutable.Record({
  pattern: null,
  index: 0,
  text: '',
});

export default class CircleIndexEntry extends CircleIndexEntryRecord {
  constructor(pattern, index, words) {
    const props = {
      pattern: pattern,
      index: index,
      text: words.join("\t"),
    }
    super(props);
  }
}
