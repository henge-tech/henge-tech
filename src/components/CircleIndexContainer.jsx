import { connect } from 'react-redux'
import CircleIndex from './CircleIndex.jsx';
import { speakWords, actionWord, switchWordAction, updateWordActionKeyword } from '../Actions.jsx'

const mapStateToProps = (state) => {
  return {
    patterns: state.index.patterns,
    stories: state.index.stories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const CircleIndexContainer = connect(mapStateToProps, mapDispatchToProps)(CircleIndex);
export default CircleIndexContainer;
