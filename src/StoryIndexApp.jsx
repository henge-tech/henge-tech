import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import circleReducer from './CircleReducer.jsx';
import StoryIndexContainer from './components/StoryIndexContainer.jsx';
import Speaker from './Speaker.jsx'
import StoryLine from './StoryLine.jsx'

let staticBody = document.getElementById('static-body');
staticBody.style.display = 'none';

let storyIndexApp = document.getElementById('story-index-app');

let initialState = {
  storyIndex: {
    allWords: allWords,
    speaker: new Speaker()
  }
};

let stories = [];
let storySources = document.getElementsByClassName('story-source');
for (let i = 0; i < storySources.length; i++) {
  let source = storySources[i];
  let patternLink = source.getElementsByClassName('pattern-link')[0];
  let story = {lines: []};
  story.pattern = patternLink.textContent;
  story.href = patternLink.getAttribute('href');
  story.id = source.getAttribute('data-pattern-id');
  let words = allWords[story.id - 1];

  let lines = source.getElementsByTagName('li');
  let unit = words.length / 4;
  for (let j = 0; j < lines.length; j++) {
    let storyLine = new StoryLine(lines[j].textContent, words.slice(unit * j, unit * (j + 1)));
    story.lines.push(storyLine);
  }

  stories.push(story);
}
initialState.storyIndex.stories = stories;

const store = createStore(circleReducer, initialState);

render(
  <Provider store={store}>
    <StoryIndexContainer />
  </Provider>,
  storyIndexApp
);
