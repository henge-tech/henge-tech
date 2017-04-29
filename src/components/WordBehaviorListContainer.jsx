import { connect } from 'react-redux';
import WordBehaviorList from './WordBehaviorList.jsx';
import * as actions from '../actions/Actions.jsx';

const mapStateToProps = (state) => {
  return {
    wordBehaviorType: state.circle.wordBehaviorType,
    wordSearchKeyword: state.circle.wordSearchKeyword,
    storyLines: state.circle.storyLines,
    mode: state.circle.mode,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeBehavior: (name) => {
      dispatch(actions.switchWordBehavior(name));
    },
    onChangeKeyword: (keyword) => {
      dispatch(actions.updateWordSearchKeyword(keyword));
    },
    onClickStory: () => {
      dispatch(actions.storyMode());
    },
    onClick3D: () => {
      dispatch(actions.threeDMode());
    },
    onClickCircleModeButton: () => {
      dispatch(actions.circleMode());
    }
  }
}

const WordBehaviorListContainer = connect(mapStateToProps, mapDispatchToProps)(WordBehaviorList);
export default WordBehaviorListContainer;
