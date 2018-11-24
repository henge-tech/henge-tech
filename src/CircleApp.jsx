import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducer from './Reducer.jsx';
import CircleContainer from './components/CircleContainer.jsx';
import { windowResize } from './actions/Actions.jsx';
import FloorStatus from './models/FloorStatus.jsx';

import { BrowserRouter as Router, Route } from 'react-router-dom';

document.getElementById('staticBody').style.display = 'none';

const circleAppElement = document.getElementById('CircleApp');
const floor = + circleAppElement.getAttribute('data-floor');

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

let floorStatus = new FloorStatus({floor});
initialState.circle.floorStatus = floorStatus;

const store = createStore(reducer, initialState);

render(
  <Provider store={store}>
    <Router>
    <div>
    <Route path="/circles/:pattern.html" component={CircleContainer} />
    <Route path="/floors/:floor.html" component={CircleContainer} />
    </div>
    </Router>
  </Provider>,
  circleAppElement
);

window.addEventListener('resize', () => {
  store.dispatch(windowResize(document.documentElement.clientWidth, document.documentElement.clientHeight));
});
