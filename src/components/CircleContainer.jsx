import { connect } from 'react-redux'
import Circle from './Circle.jsx';
import * as actions from '../Actions.jsx'

const mapStateToProps = (state) => {
  return {
    mode: state.circle.mode,
    width: state.window.width,
    height: state.window.height,
    words: state.circle.words,
    pattern: state.circle.pattern,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickSpeakButton: (words, part) => {
      dispatch(actions.speakWords(words, part))
    },
    onClickWord: (word) => {
      dispatch(actions.actionWord(word))
    },
    render3D: (words, w, h) => {
      dispatch(actions.render3D(words, w, h));
    }
  }
}

const CircleContainer = connect(mapStateToProps, mapDispatchToProps)(Circle);
export default CircleContainer;
