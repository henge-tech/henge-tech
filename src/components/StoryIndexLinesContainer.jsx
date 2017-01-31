import { connect } from 'react-redux'
import StoryLines from './StoryLines.jsx';
import { speakStoryWords, actionWord, toggleStoryIndexWords } from '../Actions.jsx'

const mapStateToProps = (state, ownProps) => {
  return {
    lines: ownProps.story.lines,
    toggle: state.storyIndex.toggles[ownProps.story.id]
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClickSpeakButton: (words, part) => {
      dispatch(speakStoryWords(words, part))
    },
    onClickWord: (word) => {
      dispatch(actionWord(word))
    },
    onClickToggleWordsButton: (index = -1) => {
      dispatch(toggleStoryIndexWords(ownProps.story.id, index))
    },
  }
}

const StoryIndexLinesContainer = connect(mapStateToProps, mapDispatchToProps)(StoryLines);
export default StoryIndexLinesContainer;
