import I from 'immutable';

class SpeechSynth {

  constructor() {
    this.baseSpeed = 1.0;

    this.speechDefault = {}
    this.speechDefault.lang = 'en-US';
    this.speechDefault.voiceURI = 'native';
    this.speechDefault.volume = 1;
    this.speechDefault.rate = this.baseSpeed;
    this.speechDefault.pitch = 1;

    this.synth = window.speechSynthesis;
    this.lastText = null;
    this.queue = [];

    this.speakingSequence = false;
  }

  setSpeed(speed) {
    const defaultSpeed = [
      0.5,
      0.7,
      1.0,
      1.4,
      1.8,
    ];
    this.baseSpeed = defaultSpeed[2 + speed];
    this.speechDefault.rate = this.baseSpeed;
  }

  /**
   * words: List(Word, Word, Word, ...)
   */
  speakWords(words, part = -1) {
    const unit = words.size / 4;
    const repeat = 4;

    if (part < 0) {
      this.queue = [words];
    } else {
      this.queue = [words.slice(part * unit, (part + 1) * unit)];
    }

    this.speakNext();
  }

  speakSequence(wordsSequence) {
    this.queue = wordsSequence.toArray();
    this.speakingSequence = true;
    this.speakNext();
  }

  speakWord(word) {
    // word and S P E L L
    let text = word + ",\n" + word.toUpperCase().replace(/(.)/g, '$1 ');
    this.queue = [text];
    this.speakNext();
  }

  speakText(text) {
    this.queue = [text];
    this.speakNext();
  }

  initVoice() {
    if (this.speechDefault.voice) {
      return;
    }
    let voices = speechSynthesis.getVoices();
    let selectedVoice = null;

    // later is high priority.
    const preferredVoice = ['Alex', 'Tom', 'Samantha'];

    let preferredVoiceIndex = -1;
    for (let v of voices) {
      if (v.lang.match(/^en.US/)) {
        if (!selectedVoice) {
          selectedVoice = v;
        }
        let currentVoiceIndex = preferredVoice.indexOf(v.name);
        if (currentVoiceIndex > preferredVoiceIndex) {
          preferredVoiceIndex = currentVoiceIndex;
          selectedVoice = v;
        }
      }
    }
    if (selectedVoice) {
      console.log('Voice:', selectedVoice.name);
      this.speechDefault.voice = selectedVoice;
    }
  }

  speakNext() {
    if (this.queue.length <= 0) {
      this.speechDefault.rate = this.baseSpeed;
      this.speakingSequence = false;
      return;
    }

    if (this.synth.speaking) {
      if (this.queue.length > 0) {
        let nextText = this.generateText(this.queue[0]);
        if (nextText == this.lastText) {
          if (this.speechDefault.rate == this.baseSpeed) {
            this.speechDefault.rate = this.baseSpeed * 0.6;
          } else {
            this.stop();
            return;
          }
        }
        this.queue[0] = nextText;
      }

      this.synth.cancel(); // => onend()
      return;
    }

    this.initVoice();
    const speech = new SpeechSynthesisUtterance();
    speech.onend = (e) => {
      this.speakNext();
    }
    let text = this.generateText(this.queue.shift());
    Object.assign(speech, this.speechDefault);

    this.lastText = text;
    speech.text = text;

    this.synth.speak(speech);
  }

  stop() {
    this.speechDefault.rate = this.baseSpeed;
    this.speakingSequence = false;
    this.queue = [];
    this.synth.cancel();
  }

  generateText(data) {
    if (Object.prototype.toString.call(data) == '[object String]') {
      return data;
    }
    if (I.List.isList(data)) {
      data = data.toArray();
    }

    const items = [];
    for(let i = 0; i < data.length; i++) {
      if (data[i].text) {
        items.push(data[i].text);
      } else {
        items.push(data[i]);
      }
    }

    if (items.length % 4 == 0 && items.length >= 8) {
      const group = ['', '', '', ''];
      const unit = items.length / 4;
      for (let i = 0; i < items.length; i += 1) {
        const j = Math.floor(i / unit);
        if (i % unit != 0) {
          group[j] += ' ';
        }
        group[j] += items[i];
      }
      return group.join(', ');
    } else {
      return items.join(' ');
    }
  }
}

const speechSynth = new SpeechSynth();
export default speechSynth;
