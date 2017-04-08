import { connect } from 'react-redux';
import StoryLines from './StoryLines.jsx';
import * as actions from '../actions/Actions.jsx';

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClickSpeakButton: (words, part) => {
      dispatch(actions.speakStoryWords(words, part))
    },
    onClickToggleWordsButton: (toggles, index = -1) => {
      dispatch(actions.toggleStoryIndexWords(ownProps.index, toggles, index))
    },
    onClickWord: (word) => {
      dispatch(actions.actionWord(word))
    },
  }
}

const StoryIndexLinesContainer = connect(mapStateToProps, mapDispatchToProps)(StoryLines);
export default StoryIndexLinesContainer;
