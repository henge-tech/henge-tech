import { connect } from 'react-redux';
import ModalImage from './ModalImage.jsx';
import * as actions from '../actions/Actions.jsx'

const mapStateToProps = (state) => {
  return {
    width: state.window.width,
    floorStatus: state.circle.floorStatus,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hideModalImage: () => {
      dispatch({ type: 'HIDE_MODAL_IMAGE' });
    },
    nextModalImage: (floorStatus, direction) => {
      dispatch(actions.nextModalImage(floorStatus, direction));
    }
  }
}

const ModalImageContainer = connect(mapStateToProps, mapDispatchToProps)(ModalImage);
export default ModalImageContainer;
