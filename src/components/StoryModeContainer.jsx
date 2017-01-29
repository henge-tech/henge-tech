import { connect } from 'react-redux'
import StoryMode from './StoryMode.jsx';
import { circleMode, speakWords, actionWord, toggleStoryWords } from '../Actions.jsx'

const mapStateToProps = (state) => {
  return {
    mode: state.circle.mode,
    width: state.window.width,
    height: state.window.height,
    words: state.circle.words,
    pattern: state.circle.pattern,
    storyLines: state.circle.storyLines,
    storyWordsToggle: state.circle.storyWordsToggle
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickSpeakButton: (words, part) => {
      dispatch(speakWords(words, part))
    },
    onClickWord: (word) => {
      dispatch(actionWord(word))
    },
    onClickToggleWordsButton: (index = -1) => {
      dispatch(toggleStoryWords(index))
    },
  }
}

const StoryModeContainer = connect(mapStateToProps, mapDispatchToProps)(StoryMode);
export default StoryModeContainer;
