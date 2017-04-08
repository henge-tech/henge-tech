import { connect } from 'react-redux'
import StoryMode from './StoryMode.jsx';

const mapStateToProps = (state) => {
  return {
    width: state.window.width,
    height: state.window.height,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const StoryModeContainer = connect(mapStateToProps, mapDispatchToProps)(StoryMode);
export default StoryModeContainer;
