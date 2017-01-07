import React, { PropTypes } from 'react';
import SpeakButtons from './SpeakButtons.jsx';
import WordCircle from './WordCircle.jsx';
import WordActionsListContainer from './WordActionsListContainer.jsx';
import CirclePageNavBar from './CirclePageNavBar.jsx';
import StoryModeContainer from './StoryModeContainer.jsx';

export default class Circle extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    if (this.props.mode == 'circle') {
      return this.renderCircle();
    } else {
      return (
        <StoryModeContainer />
      );
    }
  }

  renderCircle() {
    // console.log('render');
    let center = { x: this.props.width / 2, y: 310 };
    let r = center.x * 0.8;
    if (r > 240) {
      r = 240;
    } else if (r < 120) {
      r = 120;
    }
    let styles = {
      container: {position: 'relative', height: '100px', width: '100%'},
    };

    return (
      <div style={styles.container} className="container">
        <SpeakButtons
          center={center}
          r={r}
          words={this.props.words}
          onClickSpeakButton={this.props.onClickSpeakButton}
          />
        <WordCircle
          center={center}
          r={r}
          words={this.props.words}
          pattern={this.props.pattern}
          onClickWord={this.props.onClickWord}
          />
        <WordActionsListContainer />
        <CirclePageNavBar />
      </div>
    );
  }
}

Circle.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  words: PropTypes.arrayOf(PropTypes.shape({
    index: PropTypes.number.isRequired,
    word: PropTypes.string.isRequired
  })).isRequired,
  pattern: PropTypes.string.isRequired,
  onClickSpeakButton: PropTypes.func.isRequired,
  onClickWord: PropTypes.func.isRequired,
};
