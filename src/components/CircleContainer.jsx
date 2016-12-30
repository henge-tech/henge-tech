import { connect } from 'react-redux'
import Circle from './Circle.jsx';
import { speakWords } from '../Actions.jsx'

const mapStateToProps = (state) => {
  return {
    width: state.window.width,
    height: state.window.height,
    words: state.circle.words,
    pattern: state.circle.pattern
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSpeakButtonClick: (words, part) => {
      dispatch(speakWords(words, part))
    }
  }
}

const CircleContainer = connect(mapStateToProps, mapDispatchToProps)(Circle);
export default CircleContainer;
