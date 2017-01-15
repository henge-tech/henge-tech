import { connect } from 'react-redux'
import CircleIndex from './CircleIndex.jsx';
import { updateSearchQuery, changeIndexFilter } from '../Actions.jsx'

const mapStateToProps = (state) => {
  return {
    patterns: state.index.patterns,
    stories: state.index.stories,
    q: state.index.q,
    filter: state.index.filter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeSearchQuery: (q) => {
      dispatch(updateSearchQuery(q));
    },
    onClickFilter: (filter) => {
      dispatch(changeIndexFilter(filter));
    }
  }
}

const CircleIndexContainer = connect(mapStateToProps, mapDispatchToProps)(CircleIndex);
export default CircleIndexContainer;
