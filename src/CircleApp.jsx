import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'

import circleReducer from './CircleReducer.jsx';
import CircleContainer from './components/CircleContainer.jsx';
import Speaker from './Speaker.jsx'
import { windowResize } from './Actions.jsx';
import mySaga from './CircleSagas.jsx'

document.getElementById('staticBody').style.display = 'none';

let speaker = new Speaker();
let initialState = {
  // Do not use innerWidth
  window: {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  },
  circle: {
    mode: 'circle',
    words: [],
    wordAction: 'speech',
    wordActionKeyword: '意味',
    storyLines: false,
    storyWordsToggle: [false, false, false, false],
    speaker: speaker
  }
};

if (process.env.NODE_ENV == 'development' && process.env.INITIAL_MODE) {
  initialState.circle.mode = process.env.INITIAL_MODE;
}

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
    let imgExt = wordList[i].getAttribute('data-img-ext');
    wobj = { word: word, index: idx, prefix: '', core: '', suffix: '', imgExt: imgExt };
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

const sagaMiddleware = createSagaMiddleware()

const store = createStore(circleReducer, initialState, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(mySaga);

render(
  <Provider store={store}>
    <CircleContainer />
  </Provider>,
  circleApp
);

window.addEventListener('resize', () => {
  store.dispatch(windowResize(document.documentElement.clientWidth, document.documentElement.clientHeight));
});

store.dispatch({type: 'STORY_FETCH_REQUESTED', pattern: initialState.circle.pattern});
