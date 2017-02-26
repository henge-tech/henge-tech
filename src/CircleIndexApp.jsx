import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Speaker from './Speaker.jsx'
import createSagaMiddleware from 'redux-saga'
import mySaga from './CircleSagas.jsx'

import circleReducer from './CircleReducer.jsx';
import CircleIndexContainer from './components/CircleIndexContainer.jsx';


let staticBody = document.getElementById('static-body');
staticBody.style.display = 'none';

let circleIndexApp = document.getElementById('circle-index-app');

let initialState = {
  index: {
    patterns: [],
    stories: [],
    q: '',
    filter: 'all',
    allWords: allWords,
    speaker: new Speaker()
  }
};

let pattern, pstr;
let patternsList = document.getElementsByClassName('pattern');

for (let i = 0; i < patternsList.length; i++) {
  pattern = {};
  pattern.id = i + 1;
  pattern.pattern = patternsList[i].textContent;
  const tokens = pattern.pattern.split(/_/);
  pattern.prefix = tokens[0];
  pattern.suffix = tokens[1];

  pattern.count = patternsList[i].getAttribute('data-count');
  pattern.pickup = patternsList[i].getAttribute('data-pickup') == 'true';

  const firstWord = allWords[i][0];

  const prefix = firstWord.substr(0, pattern.prefix.length);
  const core = firstWord.substr(pattern.prefix.length, firstWord.length - pattern.prefix.length - pattern.suffix.length);
  const suffix = firstWord.substr(firstWord.length - pattern.suffix.length);

  pattern.firstWord = (
      <span className="word-list-base"><span className="word-prefix">{prefix}</span><span>{core}</span><span className="word-suffix">{suffix}</span></span>
  );
  pattern.allWordsText = allWords[i].join("\t");
  initialState.index.patterns.push(pattern);
}

const sagaMiddleware = createSagaMiddleware()
const store = createStore(circleReducer, initialState, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(mySaga);

render(
  <Provider store={store}>
    <CircleIndexContainer />
  </Provider>,
  circleIndexApp
);

store.dispatch({type: 'STORY_INDEX_FETCH_REQUESTED', lang: 'ja'});
