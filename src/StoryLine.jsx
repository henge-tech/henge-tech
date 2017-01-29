export default class StoryLine {
  constructor(text, words) {
    let rex = /([^\[]*)\[([^\]]+)\]([^\[]*)/g;
    let index = 0;
    let match;
    this.tokens = [];
    while((match = rex.exec(text)) !== null) {
      if (match[1]) {
        this.tokens.push({type: 'text', text: match[1]});
      }
      if (match[2]) {
        this.tokens.push({type: 'word', text: match[2], word: words[index]});
      }
      if (match[3]) {
        this.tokens.push({type: 'text', text: match[3]});
      }
      index += 1;
    }
  }
}
