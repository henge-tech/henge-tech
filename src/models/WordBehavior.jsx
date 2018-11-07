import speechSynth from '../models/SpeechSynth.jsx';

export default class WordBehavior {
  constructor() {
  }

  exec(word, name, floorStatus, keyword = '') {
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
      let dummyUserName = '@dummy_' + Math.random().toString(36).slice(-10);
      q = encodeURIComponent('lang:en ' + word + ' OR ' + dummyUserName);
      window.open('https://twitter.com/search?q=' + q);
      break;
    case 'eBay':
      window.open('http://www.ebay.com/sch/?_nkw=' + q);
      break;
    case 'YouTube':
      window.open('https://www.youtube.com/results?search_query=' + q);
      break;
    case 'Instagram':
      // window.open('https://www.instagram.com/explore/tags/' + q + '/');
      window.open('https://www.google.com/search?safe=off&source=lnms&tbm=isch&q=site:instagram.com%20' + q);
      break;
    case 'Tumblr':
      // window.open('https://www.tumblr.com/search/' + q);
      window.open('https://www.google.com/search?safe=off&source=lnms&tbm=isch&q=site:tumblr.com%20' + q);
      break;
    case 'Pixabay':
      // window.open('https://pixabay.com/en/photos/?q=' + q);
      window.open('https://www.google.com/search?safe=off&source=lnms&tbm=isch&q=site:pixabay.com%20' + q);
      break;
    case 'Wikipedia Image':
      window.open('https://www.google.com/search?safe=off&source=lnms&tbm=isch&q=site:wikipedia.org%20' + q);
      break;
    case 'Shutterstock':
      window.open('https://www.google.com/search?safe=off&source=lnms&tbm=isch&q=site:shutterstock.com%20' + q);
      break;
    case 'Flickr':
      window.open('https://www.google.com/search?safe=off&source=lnms&tbm=isch&q=site:flickr.com%20' + q);
      break;
    case 'BrainyQuote':
      window.open('https://www.brainyquote.com/search_results?q=' + q);
      break;
    }
  }

  openService(name, floorStatus) {
    const words = floorStatus.selectedWords();

    switch(name) {
    case 'Twitter*':
      let dummyUserName = '@dummy_' + Math.random().toString(36).slice(-10);

      let multiQ = encodeURIComponent('lang:en ' + words.join(' OR ') + ' OR ' + dummyUserName);
      window.open('https://twitter.com/search?q=' + multiQ);
      break;
    case 'Google News*':
      multiQ = encodeURIComponent(words.join(' OR '));
      window.open('https://news.google.com/search?hl=en-US&gl=US&ceid=US%3Aen&q=' + multiQ);
      break;
    }
  }
}
