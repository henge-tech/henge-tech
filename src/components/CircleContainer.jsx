import 'babel-polyfill';
import 'whatwg-fetch';
import { connect } from 'react-redux'
import Circle from './Circle.jsx';
import * as actions from '../actions/Actions.jsx'
import { withRouter } from "react-router";

const mapStateToProps = (state, ownProps) => {
  return {
    width: state.window.width,
    height: state.window.height,

    floorStatus: state.circle.floorStatus,
    urlFloor: ownProps.match.params.floor,
    urlPattern: ownProps.match.params.pattern,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickSpeakButton: (floorStatus, part) => {
      dispatch(actions.speakWords(floorStatus, part));
    },
    onClickImageButton: () => {
      dispatch(actions.toggleCircleImages());
    },
    onClickToggleResolutionButton: () => {
      dispatch(actions.toggleCircleImagesResolution());
    },
    onClickToggleSelectionButton: () => {
      dispatch(actions.toggleAllWordsSelection());
    },
    onClickChangeResolutionButton: () => {
      dispatch(actions.changeCircleImagesResolution());
    },
    onClickOpenServiceButton: (floorStatus) => {
      dispatch(actions.openService(floorStatus));
    },
    onClickWord: (floorStatus, word) => {
      dispatch(actions.execWordBehavior(floorStatus, word));
    },
    render3D: (words, w, h) => {
      dispatch(actions.render3D(words, w, h));
    },
    onClick3DBackButton: () => {
      dispatch(actions.exit3DMode());
    },
    gotoRoom: (floorStatus, pattern) => {
      if (floorStatus.floorData) {
        dispatch(actions.gotoRoom(floorStatus, pattern));
      } else {
        floorStatus.loadFloorData(floorStatus.floor, (newFloorStatus) => {
          dispatch(actions.gotoRoom(newFloorStatus, pattern));
        });
      }
    },
    gotoFloor: (floorStatus, floor) => {
      if (floorStatus.floorData && floorStatus.floor == floor) {
        dispatch(actions.gotoFloor(floorStatus, floor));
      } else {
        floorStatus.loadFloorData(floor, (newFloorStatus) => {
          dispatch(actions.gotoFloor(newFloorStatus, floor));
        });
      }
    }
  }
}

const CircleContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Circle));
export default CircleContainer;
