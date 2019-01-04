import { connect } from 'react-redux';
import ModalImage from './ModalImage.jsx';

const mapStateToProps = (state) => {
  return {
    width: state.window.width,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hideModalImage: () => {
      dispatch({ type: 'HIDE_MODAL_IMAGE' });
    },
    nextModalImage: () => {
      dispatch({ type: 'NEXT_MODAL_IMAGE' });
    }
  }
}

const ModalImageContainer = connect(mapStateToProps, mapDispatchToProps)(ModalImage);
export default ModalImageContainer;
