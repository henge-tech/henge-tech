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
    let floor = null;
    let circles = [];
    let match = null;
    let q = this.parseQuery(this.q);

    return index.reduce((a, indexEntry) => {
      let wordIdx = 0;
      if (q.rex) {
        let match = q.rex.exec(indexEntry.text);
        if (match === null) return a;
        if (match.index > 0) {
          wordIdx = indexEntry.text.substr(0, match.index).split(/\t/).length;
        }
      } else if (q.floor) {
        if (q.floor == 83) {
          if (indexEntry.index < 984) {
            return a;
          }
        } else if (Math.floor(indexEntry.index / 12) != q.floor - 1) {
          return a;
        }
      } else if (q.circles) {
        if (q.circles.indexOf(indexEntry.index) < 0) {
          return a;
        }
      }

      // console.log(indexEntry.toJS());
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

  parseQuery(q) {
    if (q.length <= 1) {
      return {};
    }
    let match = /^floor:(\d+)$/.exec(q);
    if (match) {
      return {floor: match[1]};
    }
    match = /^circles:(\d+(,\d+)*),?$/.exec(q);
    if (match) {
      let tmp = match[1].split(/,/);
      let circles = [];
      for (let i = 0; i < tmp.length; i++) {
        circles[i] = tmp[i] - 1;
      }
      return {circles: circles};
    }

    let strRex = escapeStringRegexp(this.q);
    strRex = strRex.replace(/\t/g, '');
    strRex = '(?:^|\t)([^\t]*' + strRex + '[^\t]*)';
    let rex = new RegExp(strRex);
    return {rex: rex};
  }
}
