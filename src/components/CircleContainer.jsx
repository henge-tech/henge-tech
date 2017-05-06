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
    wordBehaviorType: state.circle.wordBehaviorType,
    wordSearchKeyword: state.circle.wordSearchKeyword,
    floorPos: state.circle.floorPos
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickSpeakButton: (words, part) => {
      dispatch(actions.speakWords(words, part))
    },
    onClickWord: (word, wordBehaviorType, wordSearchKeyword) => {
      dispatch(actions.execWordBehavior(word, wordBehaviorType, wordSearchKeyword))
    },
    render3D: (words, w, h) => {
      dispatch(actions.render3D(words, w, h));
    },
    onClick3DBackButton: () => {
      dispatch(actions.exit3DMode());
    },
    goNextRoom: (floorPos, direction) => {
      dispatch(actions.goNextRoom(floorPos, direction));
    }
  }
}

const CircleContainer = connect(mapStateToProps, mapDispatchToProps)(Circle);
export default CircleContainer;
