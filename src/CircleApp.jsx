import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import circleReducer from './CircleReducer.jsx';
import CircleContainer from './components/CircleContainer.jsx';
import { windowResize } from './Actions.jsx';

document.getElementById('staticBody').style.display = 'none';

let initialState = {
  window: {
    width: document.body.clientWidth,
    height: document.body.clientHeight,
  },
  circle: {
    words: []
  },
};

let wordList = document.getElementById('words').childNodes;
let word = '';
let idx = 0;
let circleApp = document.getElementById('CircleApp');
let pattern = circleApp.getAttribute('data-circle-pattern');
initialState.circle.pattern = pattern;

let patterns = pattern.split(/_/, 2);
let patternsRex = new RegExp('^(' + patterns[0] + ')(.*)(' + patterns[1] + ')$', 'i');
let match, wobj;
for (let i = 0; i < wordList.length; i++) {
  word = wordList[i].textContent;
  if (word != "\n") {
    wobj = { word: word, index: idx, prefix: '', core: '', suffix: '' };
    if ((match = patternsRex.exec(word)) !== null) {
      wobj.prefix = match[1];
      wobj.core = match[2]
      wobj.suffix = match[3];
    } else {
      wordCore = word;
    }
    initialState.circle.words.push(wobj);
    idx += 1;
  }
}

let store = createStore(circleReducer, initialState);

render(
    <Provider store={store}>
      <CircleContainer />
    </Provider>,
    circleApp
);

window.addEventListener('resize', () => {
  store.dispatch(windowResize(document.body.clientWidth, document.body.clientHeight));
});
