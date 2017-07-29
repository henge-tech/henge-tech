import 'babel-polyfill';
import React from 'react';
import I from 'immutable';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducer from './Reducer.jsx';
import CircleContainer from './components/CircleContainer.jsx';
import { windowResize } from './actions/Actions.jsx';
import Word from './models/Word.jsx';

document.getElementById('staticBody').style.display = 'none';

const circleAppElement = document.getElementById('CircleApp');
const floorPos = + circleAppElement.getAttribute('data-floor-pos');
const circleData = floorData.circles[floorPos];
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
    floorPos: floorPos,
    showImage: true,
  }
};

if (process.env.NODE_ENV == 'development' && process.env.INITIAL_MODE) {
  initialState.circle.mode = process.env.INITIAL_MODE;
}

const store = createStore(reducer, initialState);

render(
  <Provider store={store}>
    <CircleContainer />
  </Provider>,
  circleAppElement
);

window.addEventListener('resize', () => {
  store.dispatch(windowResize(document.documentElement.clientWidth, document.documentElement.clientHeight));
});
