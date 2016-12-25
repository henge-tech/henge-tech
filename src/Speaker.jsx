
export default class Speaker {

  constructor() {
    this.speech = new SpeechSynthesisUtterance();
    this.speech.lang = 'en-US';
    this.speech.voiceURI = 'native';
    this.speech.volume = 1;
    this.speech.rate = 1;
    this.speech.pitch = 1;
  }

  speak(words, part = -1) {
    let unit, repeat;

    if (words.length == 8) {
      unit = 4;
      repeat = 2;
    } else {
      unit = words.length / 4;
      repeat = 4;
    }

    let speechTexts = [];
    for (let i = 0; i < repeat; i++) {
      if (part >= 0 && part != i) {
        continue;
      }

      let unitWords = [];
      for (let j = 0; j < unit; j++) {
        unitWords.push(words[i * unit + j].word);
      }

      speechTexts.push(unitWords.join(' '));
    }

    let text = speechTexts.join(', ');

    this.speech.text = text;
    speechSynthesis.speak(this.speech);
  }
}
