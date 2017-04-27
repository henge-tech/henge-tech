import { connect } from 'react-redux'
import CircleIndex from './CircleIndex.jsx';
import * as actions from '../actions/Actions.jsx'

const mapStateToProps = (state) => {
  return {
    stories: state.index.stories,
    filter: state.index.filter,
    allWords: state.index.allWords,
    speakingAll: state.index.speakingAll,
    index: state.index.index,
    selected: state.index.selected
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeFilter: (filter, index, allWords) => {
      dispatch(actions.changeIndexFilter(filter, index, allWords));
    },
    onClickSpeakButton: (words) => {
      dispatch(actions.speakIndexWords(words));
    },
    toggleSpeakAll: (selected, allWords) => {
      dispatch(actions.toggleSpeakAllCircles(selected, allWords));
    }
  }
}

const CircleIndexContainer = connect(mapStateToProps, mapDispatchToProps)(CircleIndex);
export default CircleIndexContainer;
