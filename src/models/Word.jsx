import I from 'immutable';

const WordRecord = I.Record({
  pattern: null,
  index: 0,
  text: null,
  imageExts: null,

  prefix: null,
  core: null,
  suffix: null
});

export default class Word extends WordRecord {
  constructor(input, setAffix = false) {
    const params = {}

    if (!I.List.isList(input.imageExts)) {
      params.imageExts = new I.List(input.imageExts);
    }

    if (setAffix) {
      const a = Word.splitAffix(input.pattern, input.text);
      params.prefix = a[0];
      params.core = a[1];
      params.suffix = a[2];
    }

    super(Object.assign({}, input, params));
  }

  initAffix() {
    const params = {
      pattern: this.pattern,
      index: this.index,
      text: this.text,
      imageExts: this.imageExts
    }
    return new Word(params, true);
  }

  encodeS3Key(str) {
    return str.replace(/[^-a-zA-Z0-9]/g, (c) => {
      return '_' + c.charCodeAt(0).toString(16).toUpperCase();
    });
  }

  imageURL(index) {
    const imageBaseName = this.encodeS3Key(this.text);
    const baseURL = 'http://henge.s3-website-ap-northeast-1.amazonaws.com/words/';
    return baseURL + imageBaseName + '.' + this.imageExts.get(index);
  }

  static splitAffix(pattern, text) {
    let rex;
    if (Word.patternRex[pattern]) {
      rex = Word.patternRex[pattern];
    } else {
      const patterns = pattern.split(/_/, 2);
      const patternRex = new RegExp('^(' + patterns[0] + ')(.*)(' + patterns[1] + ')$', 'i');
      rex = Word.patternRex[pattern] = patternRex;
    }

    let match;
    if ((match = rex.exec(text)) !== null) {
      return [match[1], match[2], match[3]];
    } else {
      return ['', text, ''];
    }
  }

  static createListFromArray(pattern, array, imgExts, setAffix = false) {
    return new I.List(array.map((word, i) => {
      return new Word({
        pattern: pattern,
        index: i,
        text: word,
        imageExts: imgExts[i],
      }, setAffix);
    }));
  }

  static createFloorIndex() {
    const words = [];
    const patterns = [];
    const imgExts = [];
    floorData.circles.map((entry, i) => {
      words[i] = entry.words[0];
      patterns[i] = entry.pattern;
      imgExts[i] = entry.imageExts[0];
    });

    return new I.List(words.map((word, i) => {
      return new Word({
        pattern: patterns[i],
        index: i,
        text: word,
        imageExts: imgExts[i],
      }, true);
    }));
  }
}

Word.patternRex = {}
