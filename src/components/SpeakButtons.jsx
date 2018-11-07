import React, { PropTypes} from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

export default class SpeakButtons extends React.Component {
  render() {
    const centerButtonMargin = 60;
    const buttonSize = 30;
    const d = buttonSize / 2.0;

    const x = this.props.center.x - d;
    const y = this.props.center.y - d;
    const diff = [
      [-1, -1], [0,  -1], [1,  -1],
      [-1,  0], [0,   0], [1,   0],
      [-1,  1], [0,   1], [1,   1],
    ];
    let positions = [];
    for (let i = 0; i < 9; i++) {
      positions[i] = {
        position: 'absolute',
        left: x + (centerButtonMargin * diff[i][0]) + 'px',
        top:  y + (centerButtonMargin * diff[i][1]) + 'px',
      };
    }

    const diff2 = [[1, -1], [1, 1], [-1, 1], [-1, -1]];
    let aroundPos = [];
    for (let i = 0; i < 4; i++) {
      const left = this.props.center.x + this.props.r * diff2[i][0] - d;
      const top  = this.props.center.y + this.props.r * diff2[i][1] - d;
      aroundPos[i] = {
        position: 'absolute',
        left: left + 'px',
        top:  top + 'px',
      };
    }

    const roomType = this.props.floorStatus.roomType();
    const goNextRoom = (direction) => {
      this.props.goNextRoom(this.props.floorStatus, direction, false);
    };

    const goFloorIndex = () => {
      window.location.href = '/floors/';
    }

    let buttons = [];
    this.buttonCount = 0;
    if (roomType == 'circle' &&
        this.props.floorStatus.behaviorName == 'services' &&
        this.props.floorStatus.behaviorServiceName.match(/\*$/)) {
      buttons.push(this.circleButton(positions[0], 'check',     () => this.props.onClickToggleSelectionButton()));
      buttons.push(this.circleButton(positions[1], 'share-alt', () => this.props.onClickOpenServiceButton(this.props.floorStatus)));
    } else {
      buttons.push(this.circleButton(positions[0], 'tint',    () => this.props.onClickChangeResolutionButton()));
      buttons.push(this.circleButton(positions[1], 'picture', () => this.props.onClickToggleResolutionButton()));
    }
    buttons.push(this.circleButton(positions[2], 'font', () => this.props.onClickImageButton()));

    if (roomType == 'circle') {
      buttons.push(this.circleButton(positions[3], 'triangle-left',   () => goNextRoom('left')));
      buttons.push(this.circleButton(positions[5], 'triangle-right',  () => goNextRoom('right')));
      buttons.push(this.circleButton(positions[7], 'triangle-bottom', () => goNextRoom('back')));
    } else {
      buttons.push(this.circleButton(positions[3], 'triangle-top',    () => goNextRoom('up')));
      buttons.push(this.circleButton(positions[5], 'triangle-bottom', () => goNextRoom('down')));
      buttons.push(this.circleButton(positions[7], 'triangle-bottom', () => goFloorIndex()));
    }

    buttons.push(this.circleButton(positions[4], 'volume-up', () => this.props.onClickSpeakButton(this.props.floorStatus, -1)));
    for (let i = 0; i < 4; i++) {
      const fn = () => this.props.onClickSpeakButton(this.props.floorStatus, i);
      buttons.push(this.circleButton(aroundPos[i], 'volume-up', fn));
    }

    return (
      <div className="speak-buttons">
        {buttons}
      </div>
    );
    // <div style={{background:'red', width:'1px', height:'1px',position:'absolute', top:this.props.center.y, left:this.props.center.x}}><img src="" width="1" height="1"/></div>
  }

  circleButton(style, glyph, onClick) {
    this.buttonCount += 1;
    const buttonKey = 'circleButton-' + this.buttonCount;
    return (
        <Button
            onClick={onClick}
            style={style}
            className="btn-circle"
            key={buttonKey}
          ><Glyphicon glyph={glyph} /></Button>
    );
  }
}
