import Speaker from './Speaker.jsx';

export default class WordActions {
  exec(word, action, keyword = '') {
    // console.log(word);
    // console.log(action);
    // console.log(keyword);
    let q = encodeURIComponent(word.word);
    switch(action) {
    case 'image':
      window.open('https://www.google.com/search?safe=off&source=lnms&tbm=isch&q=' + q);
      break;
    case 'speech':
      let speaker = new Speaker();
      speaker.speakWord(word.word);
      break;
    case 'keyword':
      keyword = encodeURIComponent(keyword);
      window.open('https://www.google.com/search?safe=off&q=' + q + '+' + keyword);
      break;
    case 'webster':
      window.open('https://www.merriam-webster.com/dictionary/' + q);
      break;
    case 'wikipedia':
      window.open('https://en.wikipedia.org/wiki/' + q);
      break;
    case 'twitter':
      window.open('https://twitter.com/search?q=' + q);
      break;
    case 'tumblr':
      window.open('https://www.tumblr.com/search/' + q);
      break;
    case 'ebay':
      window.open('http://www.ebay.com/sch/?_nkw=' + q);
      break;
    }
  }
}

