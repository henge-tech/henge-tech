import { connect } from 'react-redux';
import StoryIndex from './StoryIndex.jsx';

const mapStateToProps = (state) => {
  return {
    stories: state.storyIndex.stories,
    patternIDs: state.storyIndex.patternIDs,
    storyWords: state.storyIndex.storyWords,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const StoryIndexContainer = connect(mapStateToProps, mapDispatchToProps)(StoryIndex);
export default StoryIndexContainer;
