import { connect } from 'react-redux'
import StoryLines from './StoryLines.jsx';
import * as actions from '../actions/Actions.jsx'

const mapStateToProps = (state) => {
  return {
    words: state.circle.words,
    lines: state.circle.storyLines,
    toggle: state.circle.storyWordsToggle,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickSpeakButton: (words, part) => {
      dispatch(actions.speakStoryWords(words, part));
    },
    onClickToggleWordsButton: (index = -1) => {
      dispatch(actions.toggleStoryWords(index));
    },
    onClickWord: (word) => {
      dispatch(actions.actionWord(word));
    },
  }
}

const StoryLinesContainer = connect(mapStateToProps, mapDispatchToProps)(StoryLines);
export default StoryLinesContainer;
