import { connect } from 'react-redux'
import StoryIndex from './StoryIndex.jsx';
import { speakWords, actionWord, switchWordAction, updateWordActionKeyword } from '../Actions.jsx'

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const StoryIndexContainer = connect(mapStateToProps, mapDispatchToProps)(StoryIndex);
export default StoryIndexContainer;
