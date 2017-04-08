import { connect } from 'react-redux';
import StoryLines from './StoryLines.jsx';
import { speakStoryWords, actionWord, toggleStoryIndexWords } from '../Actions.jsx';

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClickSpeakButton: (words, part) => {
      dispatch(speakStoryWords(words, part))
    },
    onClickToggleWordsButton: (index = -1) => {
      dispatch(toggleStoryIndexWords(ownProps.index, index))
    },
    onClickWord: (word) => {
      dispatch(actionWord(word))
    },
  }
}

const StoryIndexLinesContainer = connect(mapStateToProps, mapDispatchToProps)(StoryLines);
export default StoryIndexLinesContainer;
