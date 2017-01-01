import { connect } from 'react-redux'
import WordActionsList from './WordActionsList.jsx';
import { switchWordAction, updateWordActionKeyword } from '../Actions.jsx'

const mapStateToProps = (state) => {
  return {
    wordAction: state.circle.wordAction,
    wordActionKeyword: state.circle.wordActionKeyword,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickWordAction: (name) => {
      dispatch(switchWordAction(name))
    },
    onChangeWordActionKeyword: (name) => {
      dispatch(updateWordActionKeyword(name))
    }
  }
}

const WordActionsListContainer = connect(mapStateToProps, mapDispatchToProps)(WordActionsList);
export default WordActionsListContainer;
