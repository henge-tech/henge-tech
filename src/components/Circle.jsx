import React, { PropTypes } from 'react';
import SpeakButtons from './SpeakButtons.jsx';
import WordCircle from './WordCircle.jsx';
import WordBehaviorListContainer from './WordBehaviorListContainer.jsx';
import CirclePageNavBar from './CirclePageNavBar.jsx';
import StoryModeContainer from './StoryModeContainer.jsx';
import { Button, Glyphicon } from 'react-bootstrap';
import Circle3DRenderer from './Circle3DRenderer.jsx';

export default class Circle extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  shouldComponentUpdate(nextProps, nextState) {
    const keys = ['width', 'height', 'mode'];
    for (let i = 0; i < keys.length; i++) {
      if (this.props[keys[i]] != nextProps[keys[i]]) {
        return true;
      }
    }
    return false;
  }

  render() {
    this.reset3DRenderer();

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
        <StoryModeContainer />
      );
    } else if (this.props.mode == '3d') {
      return this.render3D();
    }
  }

  reset3DRenderer() {
    if (this.render3DTimer) {
      clearTimeout(this.render3DTimer);
    }
    if (this.circle3dRenderer) {
      this.circle3dRenderer.stop();
      this.circle3dRenderer = null;
    }
  }

  render3D() {
    let w = this.props.width;
    let h = this.props.height;

    let styles = {
      container: {position: 'relative', height: h + 'px', width: '100%', padding: 0 },
      canvas: { width: '100%', height: h + 'px' },
      buttons0: { left: '50px', bottom: '50px', position: 'absolute' },
      buttons1: { left: '90px', bottom: '50px', position: 'absolute' },
      buttons2: { left: '130px', bottom: '50px', position: 'absolute' }
    };

    this.render3DTimer = setTimeout(() => {
      this.circle3dRenderer = new Circle3DRenderer(this.props.pattern, this.props.words, w, h);
      this.circle3dRenderer.execute();
    }, 200);

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
    const onClickWord = (word) => {
      this.props.onClickWord(word, this.props.wordBehaviorType, this.props.wordSearchKeyword);
    }

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
          onClickWord={onClickWord}
          />
        <WordBehaviorListContainer />
        <CirclePageNavBar />
      </div>
    );
  }
}
