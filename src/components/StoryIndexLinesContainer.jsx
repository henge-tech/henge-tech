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
    onClickToggleWordsButton: (index = -1) => {
      dispatch(actions.toggleStoryIndexWords(ownProps.index, index))
    },
    onClickWord: (word) => {
      dispatch(actions.actionWord(word))
    },
  }
}

const StoryIndexLinesContainer = connect(mapStateToProps, mapDispatchToProps)(StoryLines);
export default StoryIndexLinesContainer;
