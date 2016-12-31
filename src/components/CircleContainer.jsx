import { connect } from 'react-redux'
import Circle from './Circle.jsx';
import { speakWords, actionWord, switchWordAction, updateWordActionKeyword } from '../Actions.jsx'

const mapStateToProps = (state) => {
  return {
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
      dispatch(speakWords(words, part))
    },
    onClickWord: (word) => {
      dispatch(actionWord(word))
    },
    onClickWordAction: (name) => {
      dispatch(switchWordAction(name))
    },
    onChangeWordActionKeyword: (name) => {
      dispatch(updateWordActionKeyword(name))
    }
  }
}

const CircleContainer = connect(mapStateToProps, mapDispatchToProps)(Circle);
export default CircleContainer;
