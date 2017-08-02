import 'babel-polyfill';
import 'whatwg-fetch';
import { connect } from 'react-redux'
import Circle from './Circle.jsx';
import * as actions from '../actions/Actions.jsx'

const mapStateToProps = (state) => {
  return {
    width: state.window.width,
    height: state.window.height,

    floorStatus: state.circle.floorStatus,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickSpeakButton: (words, part) => {
      dispatch(actions.speakWords(words, part));
    },
    onClickImageButton: () => {
      dispatch(actions.toggleCircleImages());
    },
    onClickWord: (word, wordBehaviorType, wordSearchKeyword) => {
      dispatch(actions.execWordBehavior(word, wordBehaviorType, wordSearchKeyword));
    },
    render3D: (words, w, h) => {
      dispatch(actions.render3D(words, w, h));
    },
    onClick3DBackButton: () => {
      dispatch(actions.exit3DMode());
    },
    goNextRoom: (floorStatus, direction) => {
      if (direction == 'up' || direction == 'down') {
        floorStatus.goNextFloor(direction, (newStatus) => {
          dispatch(actions.updateFloorStatus(newStatus));
        });
      } else {
        dispatch(actions.goNextRoom(floorStatus, direction));
      }
    }
  }
}

const CircleContainer = connect(mapStateToProps, mapDispatchToProps)(Circle);
export default CircleContainer;
