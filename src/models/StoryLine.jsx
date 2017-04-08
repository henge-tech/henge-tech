import Immutable from 'immutable';

const StoryLineRecord = Immutable.Record({
  tokens: null,
  lineNum: -1
});

export default class StoryLine extends StoryLineRecord {
  constructor(text, lineNum, unit) {
    const rex = /([^\[]*)\[([^\]]+)\]([^\[]*)/g;
    let match;
    let wordIndex = lineNum * unit;
    const tokens = [];
    while((match = rex.exec(text)) !== null) {
      if (match[1]) {
        tokens.push(new Immutable.Map({type: 'text', text: match[1]}));
      }
      if (match[2]) {
        tokens.push(new Immutable.Map({type: 'word', text: match[2], wordIndex: wordIndex}));
      }
      if (match[3]) {
        tokens.push(new Immutable.Map({type: 'text', text: match[3]}));
      }
      wordIndex ++;
    }
    super({tokens: new Immutable.List(tokens), lineNum: lineNum});
  }
}
