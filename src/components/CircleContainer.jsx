import { connect } from 'react-redux'
import Circle from './Circle.jsx';
import * as actions from '../actions/Actions.jsx'

const mapStateToProps = (state) => {
  return {
    mode: state.circle.mode,
    width: state.window.width,
    height: state.window.height,
    words: state.circle.words,
    pattern: state.circle.pattern,
    wordAction: state.circle.wordAction,
    wordActionKeyword: state.circle.wordActionKeyword,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickSpeakButton: (words, part) => {
      dispatch(actions.speakWords(words, part))
    },
    onClickWord: (word, wordAction, wordActionKeyword) => {
      dispatch(actions.actionWord(word, wordAction, wordActionKeyword))
    },
    render3D: (words, w, h) => {
      dispatch(actions.render3D(words, w, h));
    },
    onClick3DBackButton: () => {
      dispatch(actions.exit3DMode());
    }
  }
}

const CircleContainer = connect(mapStateToProps, mapDispatchToProps)(Circle);
export default CircleContainer;
