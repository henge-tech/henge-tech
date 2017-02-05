import { connect } from 'react-redux'
import StoryIndex from './StoryIndex.jsx';
import { speakStoryWords, actionWord, toggleStoryWords } from '../Actions.jsx'

const mapStateToProps = (state) => {
  return {
    stories: state.storyIndex.stories,
    toggles: state.storyIndex.toggles
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickSpeakButton: (words, part) => {
      dispatch(speakStoryWords(words, part))
    },
    onClickWord: (word) => {
      dispatch(actionWord(word))
    },
    onClickToggleWordsButton: (index = -1) => {
      dispatch(toggleStoryWords(index))
    },
  }
}

const StoryIndexContainer = connect(mapStateToProps, mapDispatchToProps)(StoryIndex);
export default StoryIndexContainer;
