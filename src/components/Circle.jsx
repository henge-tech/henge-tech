import React from 'react';
import SpeakButtons from './SpeakButtons.jsx';
import WordCircle from './WordCircle.jsx';
import WordBehaviorListContainer from './WordBehaviorListContainer.jsx';
import CirclePageNavBar from './CirclePageNavBar.jsx';
import ModalImageContainer from './ModalImageContainer.jsx';

import { Button, Glyphicon } from 'react-bootstrap';
import Circle3DRenderer from './Circle3DRenderer.jsx';
import { Redirect } from 'react-router';

export default class Circle extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    console.debug('componentDidMount');
    this.urlChanged();
  }

  componentDidUpdate(prevProps) {
    console.debug('componentDidUpdate');
    // console.debug(this.props);

    if (prevProps.match.url == this.props.match.url) {
      return;
    }
    this.urlChanged();
  }

  urlChanged() {
    if (this.props.urlPattern) {
      this.props.gotoRoom(this.props.floorStatus, this.props.urlPattern);
    } else if (this.props.urlFloor) {
      this.props.gotoFloor(this.props.floorStatus, this.props.urlFloor);
    }
  }

  render() {
    console.debug('render');
    if (this.props.floorStatus.mode == 'loading') return null;

    if (this.props.redirectURL && this.props.match.url != this.props.redirectURL) {
      return (
        <Redirect to={this.props.redirectURL} />
      );
    }

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
      const handlers = {
        gotoRoom: this.props.gotoRoom,
        gotoFloor: this.props.gotoFloor,
        redirect: this.props.redirect
      };
      this.circle3dRenderer =
        new Circle3DRenderer(w, h, this.props.floorStatus, handlers);
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
        <CirclePageNavBar floor={this.props.floorStatus.get('floor')} pattern={this.props.floorStatus.get('pattern')} />
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

    let creditURL = '/credits/' + floorStatus.floor + '.html';
    if (floorStatus.mode == 'circle') {
      creditURL += '#' + floorStatus.pattern;
    }

    const centerIconSize = 45;
    const centerStyle = {
      position: 'absolute',
      top: center.y - centerIconSize / 2,
      left: center.x - centerIconSize / 2,
      width: centerIconSize,
      height: centerIconSize
    };
    const centerIconSize2 = 56;
    const centerStyle2 = {
      position: 'absolute',
      top: center.y - centerIconSize2 / 2,
      left: center.x - centerIconSize2 / 2,
      width: centerIconSize2,
      height: centerIconSize2,
    };
    let centerIconImgs = [];
    let centerIconImgSrc;
    if (floorStatus.mode == 'circleIndex') {
      centerIconImgSrc = '/imgs/center/12-' + ((floorStatus.floor - 1) % 12) + '.svg';
      centerIconImgs.push(<img src={centerIconImgSrc} style={centerStyle} key="centerIconImg0" />);
    } else {
      centerIconImgSrc = '/imgs/center/' + floorStatus.floorData.circles.length + '-' + floorStatus.floorPos + '.svg';
      centerIconImgs.push(<img src={centerIconImgSrc} style={centerStyle} key="centerIconImg0" />);

      centerIconImgSrc = '/imgs/center/floor-' + ((floorStatus.floor - 1) % 12) + '.svg';
      centerIconImgs.push(<img src={centerIconImgSrc} style={centerStyle2} key="centerIconImg1" />);
    }

    let modalImageWord = null;
    if (floorStatus.modalImage !== null) {
      modalImageWord = floorStatus.words.get(floorStatus.modalImage);
    }

    return (
      <div style={styles.container} className="container">
        {centerIconImgs}
        <ModalImageContainer center={center} word={modalImageWord} />
        <SpeakButtons
          center={center}
          r={r}
          floorStatus={floorStatus}
          onClickSpeakButton={this.props.onClickSpeakButton}
          onClickImageButton={this.props.onClickImageButton}
          onClickChangeResolutionButton={this.props.onClickChangeResolutionButton}
          onClickToggleSelectionButton={this.props.onClickToggleSelectionButton}
          onClickToggleResolutionButton={this.props.onClickToggleResolutionButton}
          onClickOpenServiceButton={this.props.onClickOpenServiceButton}
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
