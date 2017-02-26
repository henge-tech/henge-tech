import React, { PropTypes } from 'react';
import SpeakButtons from './SpeakButtons.jsx';
import WordCircle from './WordCircle.jsx';
import WordActionsListContainer from './WordActionsListContainer.jsx';
import CirclePageNavBar from './CirclePageNavBar.jsx';
import StoryModeContainer from './StoryModeContainer.jsx';
import { Button, Glyphicon } from 'react-bootstrap';

export default class Circle extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    let center = { x: this.props.width / 2 };
    let r = center.x * 0.8;
    if (r > 240) {
      r = 240;
    } else if (r < 120) {
      r = 120;
    }
    center.y = r + 90;

    if (this.props.mode == 'circle') {
      return this.renderCircle(center, r);
    } else if (this.props.mode == 'story') {
      return (
        <StoryModeContainer center={center} r={r} />
      );
    } else if (this.props.mode == '3d') {
      return this.render3D();
    }
  }

  render3D() {
    let w = this.props.width;
    let h = this.props.height;

    let x = () => {
      this.props.render3D(this.props.words, w, h);
    }
    if (this.render3DTimer) {
      clearTimeout(this.render3DTimer);
    }
    this.render3DTimer = setTimeout(x, 200);

    let styles = {
      container: {position: 'relative', height: h + 'px', width: '100%', padding: 0 },
      canvas: { width: '100%', height: h + 'px' },
      buttons0: { left: '50px', bottom: '50px', position: 'absolute' },
      buttons1: { left: '90px', bottom: '50px', position: 'absolute' },
      buttons2: { left: '130px', bottom: '50px', position: 'absolute' }
    };
    return (
      <div style={styles.container} className="container">
        <div id="stage" style={styles.canvas}></div>
        <Button
            onClick={() => this.props.onClick3DBackButton()}
            style={styles.buttons0}
            className="btn-circle"
          ><Glyphicon glyph="chevron-left" /></Button>
        <Button
            onClick={() => this.props.onClickSpeakButton(this.props.words, -1)}
            style={styles.buttons1}
            className="btn-circle"
          ><Glyphicon glyph="volume-up" /></Button>
        <Button
            style={styles.buttons2}
            className="btn-circle"
          ><Glyphicon glyph="question-sign" /></Button>
        <CirclePageNavBar />
      </div>
    );
  }

  renderCircle(center, r) {
    // console.log('render');
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
