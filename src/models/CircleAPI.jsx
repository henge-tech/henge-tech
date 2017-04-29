import 'babel-polyfill';
import 'whatwg-fetch'
import I from 'immutable';

export default class CircleAPI {
  static fetchStory(pattern) {
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

  static fetchStoryIndex(lang) {
    return fetch('/stories/' + lang + '/index.json')
      .then(function(response) {
        if(response.ok) {
          return I.fromJS(response.json());
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
