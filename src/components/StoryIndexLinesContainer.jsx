import { connect } from 'react-redux';
import StoryLines from './StoryLines.jsx';
import * as actions from '../actions/Actions.jsx';

const mapStateToProps = (state, ownProps) => {
  return {
    toggles: state.storyIndex.toggles.get(ownProps.storyPos)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClickSpeakButton: (words, part) => {
      dispatch(actions.speakStoryWords(words, part))
    },
    onClickToggleWordsButton: (toggles, wordPos = -1) => {
      dispatch(actions.toggleStoryIndexWords(ownProps.storyPos, toggles, wordPos))
    },
    onClickWord: (word, wordBehaviorType, wordSearchKeyword) => {
      dispatch(actions.execWordBehavior(word, wordBehaviorType, wordSearchKeyword))
    },
  }
}

const StoryIndexLinesContainer = connect(mapStateToProps, mapDispatchToProps)(StoryLines);
export default StoryIndexLinesContainer;
