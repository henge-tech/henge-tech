
export default class Speaker {

  constructor() {
    this.speechDefault = {}
    this.speechDefault.lang = 'en-US';
    this.speechDefault.voiceURI = 'native';
    this.speechDefault.volume = 1;
    this.speechDefault.rate = 1;
    this.speechDefault.pitch = 1;
    this.synth = window.speechSynthesis;
    this.lastText = null;
    this.lastSpeed = null;
    this.defaultSpeeds = { slow: 0.6, normal: 1, fast: 1.8 };
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
    this.speakText(text);
  }

  speakText(text) {
    let speech = new SpeechSynthesisUtterance();
    Object.assign(speech, this.speechDefault);

    if (this.synth.speaking) {
      speechSynthesis.cancel();

      if (this.lastText == text) {
        if (this.lastSpeed == this.defaultSpeeds.slow) {
          this.lastSpeed = this.defaultSpeeds.fast;
        } else if (this.lastSpeed == this.defaultSpeeds.fast) {
          this.lastSpeed = null;
          return;
        } else {
          this.lastSpeed = this.defaultSpeeds.slow;
        }
        speech.rate = this.lastSpeed;
      } else {
        this.lastSpeed = null;
      }
    } else {
      this.lastSpeed = null;
    }

    speech.text = text;
    this.lastText = text;
    this.synth.speak(speech);
  }

  speakWord(word) {
    let text = word + ",\n" + word.toUpperCase().replace(/(.)/g, '$1 ');
    this.speakText(text)
  }
}
