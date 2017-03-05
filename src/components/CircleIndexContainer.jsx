import { connect } from 'react-redux'
import CircleIndex from './CircleIndex.jsx';
import * as actions from '../Actions.jsx'

const mapStateToProps = (state) => {
  return {
    patterns: state.index.patterns,
    stories: state.index.stories,
    q: state.index.q,
    filter: state.index.filter,
    speakingAll: state.index.speakingAll
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeSearchQuery: (q) => {
      dispatch(actions.updateSearchQuery(q));
    },
    onClickFilter: (filter) => {
      dispatch(actions.changeIndexFilter(filter));
    },
    onClickSpeakButton: (id) => {
      dispatch(actions.speakIndexWords(id));
    },
    toggleSpeakAll: (patterns, flag) => {
      dispatch(actions.toggleSpeakAllCircles(patterns, flag));
    }
  }
}

const CircleIndexContainer = connect(mapStateToProps, mapDispatchToProps)(CircleIndex);
export default CircleIndexContainer;
