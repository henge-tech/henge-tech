import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import I from 'immutable';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducer from './Reducer.jsx';
import CircleContainer from './components/CircleContainer.jsx';
import { windowResize } from './actions/Actions.jsx';
import Word from './models/Word.jsx';
import FloorStatus from './models/FloorStatus.jsx';

document.getElementById('staticBody').style.display = 'none';

const circleAppElement = document.getElementById('CircleApp');
const floor = + circleAppElement.getAttribute('data-floor');
let floorPos = circleAppElement.getAttribute('data-floor-pos');

if (floorPos != 'index') {
  floorPos = + floorPos;
}

const initialState = {
  window: {
    // Do not use innerWidth
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  },
  circle: {
  }
};

if (process.env.NODE_ENV == 'development' && process.env.INITIAL_MODE) {
  initialState.circle.mode = process.env.INITIAL_MODE;
}

fetch('/floors/' + floor + '.json').then((response) => {
  return response.json();
}).then((floorData) => {
  let floorStatus = new FloorStatus();
  if (floorPos == 'index') {
    floorPos = 0;
    floorStatus = floorStatus.setFloorData(floorData, floorPos, 'circle').goNextRoom('back');
  } else {
    floorStatus = floorStatus.setFloorData(floorData, floorPos, 'circle');
  }
  initialState.circle.floorStatus = floorStatus;

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
});
