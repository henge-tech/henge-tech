import { connect } from 'react-redux';
import WordBehaviorList from './WordBehaviorList.jsx';
import * as actions from '../actions/Actions.jsx';

const mapStateToProps = (state) => {
  return {
    floorStatus: state.circle.floorStatus,
    mode: state.circle.mode,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeBehavior: (name) => {
      dispatch(actions.switchWordBehavior(name));
    },
    onChangeService: (name) => {
      dispatch(actions.switchWordBehaviorService(name));
    },
    onChangeSpeechSpeed: (speed) => {
      dispatch(actions.setSpeechSpeed(speed));
    },
    onChangeKeyword: (keyword) => {
      dispatch(actions.updateWordSearchKeyword(keyword));
    },
    onClick3D: () => {
      dispatch(actions.threeDMode());
    },
    onChangeIndexPickupImage: (quater) => {
      dispatch(actions.switchIndexPickupImage(quater));
    },
  }
}

const WordBehaviorListContainer = connect(mapStateToProps, mapDispatchToProps)(WordBehaviorList);
export default WordBehaviorListContainer;
