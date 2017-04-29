import { connect } from 'react-redux'
import StoryLines from './StoryLines.jsx';
import * as actions from '../actions/Actions.jsx'

const mapStateToProps = (state) => {
  return {
    words: state.circle.words,
    lines: state.circle.storyLines,
    toggles: state.circle.storyWordToggles,
    wordBehaviorType: state.circle.wordBehaviorType,
    wordSearchKeyword: state.circle.wordSearchKeyword,
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
    onClickWord: (word, wordBehaviorType, wordSearchKeyword) => {
      dispatch(actions.execWordBehavior(word, wordBehaviorType, wordSearchKeyword));
    },
  }
}

const StoryLinesContainer = connect(mapStateToProps, mapDispatchToProps)(StoryLines);
export default StoryLinesContainer;
