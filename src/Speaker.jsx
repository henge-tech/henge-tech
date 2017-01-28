
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

    unit = words.length / 4;
    repeat = 4;

    let speechTexts = [];
    for (let i = 0; i < repeat; i++) {
      if (part >= 0 && part != i) {
        continue;
      }

      let unitWords = [];
      for (let j = 0; j < unit; j++) {
        let w = words[i * unit + j];
        if (w.word) {
          w = w.word;
        }
        unitWords.push(w);
        // unitWords.push(words[i * unit + j].word.toUpperCase().replace(/(.)/g, '$1 '));
        // unitWords.push(', ')
      }

      speechTexts.push(unitWords.join(' '));
    }

    let text = speechTexts.join(', ');

    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      this.speech.rate = 0.6;
    }

    this.speech.text = text;
    speechSynthesis.speak(this.speech);
  }

  speakWord(word) {
    word = word + ",\n" + word.toUpperCase().replace(/(.)/g, '$1 ');
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      this.speech.rate = 0.6;
    }
    this.speech.text = word;
    speechSynthesis.speak(this.speech);
  }
}
