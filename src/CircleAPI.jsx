import 'babel-polyfill';
import 'whatwg-fetch'

export default class CircleAPI {
  static fetchStory(pattern) {
    // console.debug('fetchStory');
    return fetch('/stories/ja/' + pattern + '.json')
      .then(function(response) {
        if(response.ok) {
          return response.json();
        } else {
          console.log('Response is not ok');
          return null;
        }
      }).catch(function(error) {
        console.log("ERROR");
        console.log(error);
      });
  }
}
