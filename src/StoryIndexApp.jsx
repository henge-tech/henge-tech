import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import circleReducer from './CircleReducer.jsx';
import StoryIndexContainer from './components/StoryIndexContainer.jsx';
import Speaker from './Speaker.jsx'

let staticBody = document.getElementById('static-body');
staticBody.style.display = 'none';

let storyIndexApp = document.getElementById('story-index-app');

let initialState = {
  storyIndex: {
    allWords: allWords,
    speaker: new Speaker()
  }
};

let stories = document.getElementsByClassName('story');

const store = createStore(circleReducer, initialState);

render(
  <Provider store={store}>
    <StoryIndexContainer />
  </Provider>,
  storyIndexApp
);
