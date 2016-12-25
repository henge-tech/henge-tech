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

for (let i = 0; i < wordList.length; i++) {
  word = wordList[i].textContent;
  if (word != "\n") {
    initialState.circle.words.push({ word: word, index: idx });
    idx += 1;
  }
}

let store = createStore(circleReducer, initialState);

render(
    <Provider store={store}>
      <CircleContainer />
    </Provider>,
    document.getElementById('CircleApp')
);

window.addEventListener('resize', () => {
  store.dispatch(windowResize(document.body.clientWidth, document.body.clientHeight));
});
