import { connect } from 'react-redux'
import StoryLines from './StoryLines.jsx';
import * as actions from '../actions/Actions.jsx'

const mapStateToProps = (state) => {
  return {
    words: state.circle.words,
    lines: state.circle.storyLines,
    toggles: state.circle.storyWordToggles,
    wordAction: state.circle.wordAction,
    wordActionKeyword: state.circle.wordActionKeyword,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClickSpeakButton: (words, part) => {
      dispatch(actions.speakStoryWords(words, part));
    },
    onClickToggleWordsButton: (toggles, index = -1) => {
      dispatch(actions.toggleStoryWords(toggles, index));
    },
    onClickWord: (word, wordAction, wordActionKeyword) => {
      dispatch(actions.actionWord(word, wordAction, wordActionKeyword));
    },
  }
}

const StoryLinesContainer = connect(mapStateToProps, mapDispatchToProps)(StoryLines);
export default StoryLinesContainer;
