import { connect } from 'react-redux'
import CircleIndex from './CircleIndex.jsx';
import * as actions from '../actions/Actions.jsx'

const mapStateToProps = (state) => {
  return {
    stories: state.index.stories,
    filter: state.index.filter,
    allWords: state.index.allWords,
    speaker: state.index.speaker,
    speakingAll: state.index.speakingAll,
    index: state.index.index,
    selected: state.index.selected
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeFilter: (speaker, filter, index, allWords) => {
      dispatch(actions.changeIndexFilter(speaker, filter, index, allWords));
    },
    onClickSpeakButton: (speaker, words) => {
      dispatch(actions.speakIndexWords(speaker, words));
    },
    toggleSpeakAll: (speaker, selected, allWords) => {
      dispatch(actions.toggleSpeakAllCircles(speaker, selected, allWords));
    }
  }
}

const CircleIndexContainer = connect(mapStateToProps, mapDispatchToProps)(CircleIndex);
export default CircleIndexContainer;
