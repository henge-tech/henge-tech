import { connect } from 'react-redux'
import WordActionsList from './WordActionsList.jsx';
import { switchWordAction, updateWordActionKeyword, storyMode, circleMode } from '../Actions.jsx'

const mapStateToProps = (state) => {
  return {
    wordAction: state.circle.wordAction,
    wordActionKeyword: state.circle.wordActionKeyword,
    storyLines: state.circle.storyLines,
    mode: state.circle.mode,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickWordAction: (name) => {
      dispatch(switchWordAction(name))
    },
    onChangeWordActionKeyword: (name) => {
      dispatch(updateWordActionKeyword(name))
    },
    onClickStory: () => {
      dispatch(storyMode())
    },
    onClickCircleModeButton: () => {
      dispatch(circleMode())
    }
  }
}

const WordActionsListContainer = connect(mapStateToProps, mapDispatchToProps)(WordActionsList);
export default WordActionsListContainer;
