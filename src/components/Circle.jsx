import React, { PropTypes } from 'react';
import SpeakButtons from './SpeakButtons.jsx';
import WordCircle from './WordCircle.jsx';
import WordBehaviorListContainer from './WordBehaviorListContainer.jsx';
import CirclePageNavBar from './CirclePageNavBar.jsx';
import { Button, Glyphicon } from 'react-bootstrap';
import Circle3DRenderer from './Circle3DRenderer.jsx';

export default class Circle extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  shouldComponentUpdate(nextProps, nextState) {
    const keys = ['width', 'height', 'floorStatus'];
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
    if (r > 256) {
      r = 256;
    } else if (r < 128) {
      r = 128;
    }
    center.y = r + 120;
    const mode = this.props.floorStatus.get('mode');

    if (mode == 'circle') {
      return this.renderCircle(center, r);
    } else if (mode == 'circleIndex') {
      return this.renderCircle(center, r);
    } else if (mode == '3d' || mode == '3dIndex') {
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
      this.circle3dRenderer =
        new Circle3DRenderer(w, h, this.props.floorStatus, this.props.goNextRoom);
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
            onClick={() => this.props.onClickSpeakButton(this.props.floorStatus.get('words'), -1)}
            style={styles.buttons1}
            className="btn-circle"
          ><Glyphicon glyph="volume-up" /></Button>
        <Button
            style={styles.buttons2}
            className="btn-circle"
          ><Glyphicon glyph="question-sign" /></Button>
        <CirclePageNavBar floor={this.props.floorStatus.get('floor')} patteern={this.props.floorStatus.get('pattern')} />
      </div>
    );
  }

  renderCircle(center, r) {
    // console.log('render');
    let styles = {
      container: {position: 'relative', height: '100px', width: '100%'},
    };

    const floorStatus = this.props.floorStatus;
    const onClickWord = (word) => {
      this.props.onClickWord(floorStatus, word);
    }

    const onClickMoveButton = (direction) => {
      this.props.goNextRoom(this.props.floorStatus, direction, false);
    }

    let creditURL = '/credits/' + this.props.floorStatus.get('floor') + '.html';
    if (this.props.floorStatus.get('mode') == 'circle') {
      creditURL += '#' + this.props.floorStatus.get('pattern');
    }

    return (
      <div style={styles.container} className="container">
        <SpeakButtons
          center={center}
          r={r}
          floorStatus={this.props.floorStatus}
          onClickSpeakButton={this.props.onClickSpeakButton}
          onClickImageButton={this.props.onClickImageButton}
          onClickChangeResolutionButton={this.props.onClickChangeResolutionButton}
          onClickToggleResolutionButton={this.props.onClickToggleResolutionButton}
          onClickOpenServiceButton={this.props.onClickOpenServiceButton}
          goNextRoom={this.props.goNextRoom}
          />
        <WordCircle
          center={center}
          r={r}
          floorStatus={floorStatus}
          onClickWord={onClickWord}
          />
        <WordBehaviorListContainer />
        <CirclePageNavBar credit={creditURL} />
      </div>
    );
  }
}
