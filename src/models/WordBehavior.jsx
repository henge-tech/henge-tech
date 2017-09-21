import speechSynth from '../models/SpeechSynth.jsx';

export default class WordBehavior {
  constructor() {
  }

  exec(word, name, keyword = '') {
    let q = encodeURIComponent(word);
    switch(name) {
    case 'image':
      window.open('https://www.google.com/search?safe=off&source=lnms&tbm=isch&q=' + q);
      break;
    case 'speak':
      speechSynth.speakWord(word);
      break;
    case 'keyword':
      keyword = encodeURIComponent(keyword);
      window.open('https://www.google.com/search?safe=off&q=' + q + '+' + keyword);
      break;
    case 'webster':
      window.open('https://www.merriam-webster.com/dictionary/' + q);
      break;
    case 'Wikipedia':
      window.open('https://en.wikipedia.org/wiki/' + q);
      break;
    case 'Twitter':
      window.open('https://twitter.com/search?q=' + q);
      break;
    case 'Tumblr':
      window.open('https://www.tumblr.com/search/' + q);
      break;
    case 'eBay':
      window.open('http://www.ebay.com/sch/?_nkw=' + q);
      break;
    case 'Instagram':
      window.open('https://www.instagram.com/explore/tags/' + q + '/');
      break;
    case 'YouTube':
      window.open('https://www.youtube.com/results?search_query=' + q);
      break;
    case 'Pixabay':
      window.open('https://pixabay.com/en/photos/?q=' + q);
      break;
    case 'Wikipedia Image':
      window.open('https://www.google.com/search?safe=off&source=lnms&tbm=isch&q=site:wikipedia.org%20' + q);
      break;
    case 'Shutterstock':
      window.open('https://www.google.com/search?safe=off&source=lnms&tbm=isch&q=site:shutterstock.com%20' + q);
      break;
    }
  }
}

