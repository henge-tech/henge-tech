import { connect } from 'react-redux'
import StoryIndex from './StoryIndex.jsx';

const mapStateToProps = (state) => {
  return {
    stories: state.storyIndex.stories,
    storyIDs: state.storyIndex.storyIDs,
    storyWords: state.storyIndex.storyWords,
    toggles: state.storyIndex.toggles
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const StoryIndexContainer = connect(mapStateToProps, mapDispatchToProps)(StoryIndex);
export default StoryIndexContainer;
