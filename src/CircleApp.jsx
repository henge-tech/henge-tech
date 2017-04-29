import 'babel-polyfill';
import React from 'react';
import I from 'immutable';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import circleReducer from './CircleReducer.jsx';
import CircleContainer from './components/CircleContainer.jsx';
import StoryWordToggles from './models/StoryWordToggles.jsx';
import { windowResize } from './actions/Actions.jsx';
import mySaga from './CircleSagas.jsx';
import Word from './models/Word.jsx';

document.getElementById('staticBody').style.display = 'none';

const circleAppElement = document.getElementById('CircleApp');
const pattern = circleAppElement.getAttribute('data-circle-pattern');

const initialState = {
  window: {
    // Do not use innerWidth
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  },
  circle: {
    pattern: pattern,
    mode: 'circle',
    wordBehaviorType: 'speech',
    wordSearchKeyword: '意味',
    words: Word.createListFromHTML(pattern, document.getElementById('words')),
    storyLines: null,
    storyWordToggles: new StoryWordToggles(),
  }
};

if (process.env.NODE_ENV == 'development' && process.env.INITIAL_MODE) {
  initialState.circle.mode = process.env.INITIAL_MODE;
}

const sagaMiddleware = createSagaMiddleware()
const store = createStore(circleReducer, initialState, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(mySaga);

render(
  <Provider store={store}>
    <CircleContainer />
  </Provider>,
  circleAppElement
);

window.addEventListener('resize', () => {
  store.dispatch(windowResize(document.documentElement.clientWidth, document.documentElement.clientHeight));
});

store.dispatch({type: 'STORY_FETCH_REQUESTED', pattern});
