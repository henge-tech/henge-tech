import I from 'immutable';
import escapeStringRegexp from 'escape-string-regexp';

const CircleIndexFilterRecord = I.Record({
  q: '',
  filter: 'all'
});

export default class CircleIndexFilter extends CircleIndexFilterRecord {
  constructor(q, filter) {
    const props = { q, filter }
    super(props);
  }

  execute(index, allWords) {
    let rex = null;
    if (this.q.length > 1) {
      let strRex = escapeStringRegexp(this.q);
      strRex = strRex.replace(/\t/g, '');
      strRex = '(?:^|\t)([^\t]*' + strRex + '[^\t]*)';
      rex = new RegExp(strRex);
    }

    return index.reduce((a, indexEntry) => {
      let wordIdx = 0;
      if (rex !== null) {
        let match = rex.exec(indexEntry.text);
        if (match === null) return a;
        if (match.index > 0) {
          wordIdx = indexEntry.text.substr(0, match.index).split(/\t/).length;
        }
      }
      // console.log(indexEntry);
      const words = allWords.get(indexEntry.index);
      if (this.filter == 'pickup') {
        if (!indexEntry.pickup) return a;
      } else if (this.filter == 'story') {
        if (!indexEntry.hasStory) return a;
      } else if (this.filter == '8') {
        if (words.size != 8) return a;
      } else if (this.filter == '12') {
        if (words.size != 12) return a;
      } else if (this.filter == '16') {
        if (words.size != 16) return a;
      } else if (this.filter == '20') {
        if (words.size != 20) return a;
      }
      return a.push(new I.List([indexEntry.index, wordIdx]));
    }, new I.List());
  }
}
