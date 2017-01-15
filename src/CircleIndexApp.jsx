import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
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
  }
};

let pattern, pstr;
let patternsList = document.getElementsByClassName('pattern');

for (let i = 0; i < patternsList.length; i++) {
  pattern = {};
  pattern.id = i + 1;
  pattern.pattern = patternsList[i].textContent;
  pattern.count = patternsList[i].getAttribute('data-count');
  pattern.pickup = patternsList[i].getAttribute('data-pickup') == 'true';
  pattern.allWords = allWords[i].join("\t");
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

