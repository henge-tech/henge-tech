import 'babel-polyfill';
import React from 'react';
import I from 'immutable';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './Reducer.jsx';
import CircleContainer from './components/CircleContainer.jsx';
import StoryWordToggles from './models/StoryWordToggles.jsx';
import { windowResize } from './actions/Actions.jsx';
import saga from './Saga.jsx';
import Word from './models/Word.jsx';

document.getElementById('staticBody').style.display = 'none';

const circleAppElement = document.getElementById('CircleApp');
const floorPos = circleAppElement.getAttribute('data-floor-pos');
const circleData = floorData['circles'][floorPos];
const pattern = circleData.pattern;

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
    words: Word.createListFromArray(pattern, circleData.words, circleData.imageExts, true),
    storyLines: null,
    storyWordToggles: new StoryWordToggles(),
  }
};

if (process.env.NODE_ENV == 'development' && process.env.INITIAL_MODE) {
  initialState.circle.mode = process.env.INITIAL_MODE;
}

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer, initialState, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(saga);

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
