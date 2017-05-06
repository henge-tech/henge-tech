import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import I from 'immutable';

import reducer from './Reducer.jsx';
import StoryIndexContainer from './components/StoryIndexContainer.jsx';
import StoryLine from './models/StoryLine.jsx'
import StoryWordToggles from './models/StoryWordToggles.jsx'
import Word from './models/Word.jsx'

const staticBody = document.getElementById('static-body');
staticBody.style.display = 'none';

let stories = new I.List();
let patternIDs = new I.List();
let toggles = new I.List();
let storyWords = new I.List();

const storySources = document.getElementsByClassName('story-source');
for (let i = 0; i < storySources.length; i++) {
  const source = storySources[i];
  const patternLink = source.getElementsByClassName('pattern-link')[0];

  const pattern = patternLink.textContent;
  const patternID = source.getAttribute('data-pattern-id');
  patternIDs = patternIDs.push(patternID);
  const words = Word.createListFromArray(pattern, allWords[patternID - 1], [], true);
  storyWords = storyWords.push(words);

  const lines = source.getElementsByTagName('li');
  const unit = words.size / 4;

  let storyLines = new I.List();
  for (let j = 0; j < lines.length; j++) {
    storyLines = storyLines.push(new StoryLine(lines[j].textContent, j, unit));
  }

  stories = stories.push(storyLines);
  toggles = toggles.push(new StoryWordToggles());
}

const initialState = {
  circle: {
    wordBehaviorType: 'speech',
    wordSearchKeyword: '',
  },
  storyIndex: {
    stories: stories,
    patternIDs: patternIDs,
    storyWords: storyWords,
    toggles: toggles,
  }
};

const store = createStore(reducer, initialState);

const storyIndexApp = document.getElementById('story-index-app');
render(
  <Provider store={store}>
    <StoryIndexContainer />
  </Provider>,
  storyIndexApp
);

