import { connect } from 'react-redux'
import StoryLines from './StoryLines.jsx';
import { speakStoryWords, actionWord, toggleStoryWords } from '../Actions.jsx'

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
      dispatch(speakStoryWords(words, part));
    },
    onClickToggleWordsButton: (index = -1) => {
      dispatch(toggleStoryWords(index));
    },
    onClickWord: (word) => {
      dispatch(actionWord(word));
    },
  }
}

const StoryLinesContainer = connect(mapStateToProps, mapDispatchToProps)(StoryLines);
export default StoryLinesContainer;
