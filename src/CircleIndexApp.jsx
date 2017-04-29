import 'babel-polyfill';
import React from 'react';
import I from 'immutable';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Word from './models/Word.jsx';
import CircleIndexEntry from './models/CircleIndexEntry.jsx';
import CircleIndexFilter from './models/CircleIndexFilter.jsx';

import createSagaMiddleware from 'redux-saga';
import saga from './Saga.jsx';

import reducer from './Reducer.jsx';
import CircleIndexContainer from './components/CircleIndexContainer.jsx';

const staticBody = document.getElementById('static-body');
staticBody.style.display = 'none';
const circleIndexApp = document.getElementById('circle-index-app');


const d1 = new Date();

const patterns = document.getElementById('patterns').getElementsByTagName('a');

let allWordsList = new I.List();
let indexEntries = new I.List();
let selected = new I.List();

const len = patterns.length;
for (let i = 0; i < len; i++) {
  const pattern = patterns[i].textContent;
  const list = Word.createListFromArray(pattern, allWords[i], true);
  const pickup = patterns[i].getAttribute('data-pickup') == '1';

  allWordsList = allWordsList.push(list);
  indexEntries = indexEntries.push(new CircleIndexEntry(pattern, i, allWords[i], pickup));
  selected = selected.push(new I.List([i, 0]));
}

const initialState = {
  index: {
    filter: new CircleIndexFilter('', 'all'),
    allWords: allWordsList,
    index: indexEntries,
    selected: selected,
    speakingAll: false
  }
};

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer, initialState, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(saga);

render(
  <Provider store={store}>
    <CircleIndexContainer />
  </Provider>,
  circleIndexApp
);

store.dispatch({type: 'STORY_INDEX_FETCH_REQUESTED', lang: 'ja'});
console.log(new Date() - d1);
