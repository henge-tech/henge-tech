import { connect } from 'react-redux'
import CircleIndex from './CircleIndex.jsx';
import { updateSearchQuery } from '../Actions.jsx'

const mapStateToProps = (state) => {
  return {
    patterns: state.index.patterns,
    stories: state.index.stories,
    q: state.index.q
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeSearchQuery: (q) => {
      dispatch(updateSearchQuery(q));
    }
  }
}

const CircleIndexContainer = connect(mapStateToProps, mapDispatchToProps)(CircleIndex);
export default CircleIndexContainer;
