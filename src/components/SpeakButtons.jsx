import React, { PropTypes} from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

export default class SpeakButtons extends React.Component {
  render() {
    const centerButtonMargin = 60;
    const buttonSize = 30;
    const d = buttonSize / 2.0;

    let styles = {
      speakButton: {
        position: 'absolute',
        left: this.props.center.x - d + 'px',
        top: this.props.center.y -d + 'px',
      },
      imageTextSwitchButton: {
        position: 'absolute',
        left: this.props.center.x - d + 'px',
        top: this.props.center.y - d - centerButtonMargin + 'px',
      },
      navArrowButton: [
        {
          position: 'absolute',
          left: this.props.center.x - d - centerButtonMargin + 'px',
          top: this.props.center.y - d + 'px',
        },
        {
          position: 'absolute',
          left: this.props.center.x - d + centerButtonMargin + 'px',
          top: this.props.center.y - d + 'px',
        },
        {
          position: 'absolute',
          left: this.props.center.x - d + 'px',
          top: this.props.center.y - d + centerButtonMargin + 'px',
        },
      ],

      partialSpeakButtons: []
    };

    let diff = [[1, -1], [1, 1], [-1, 1], [-1, -1]];

    for (let i = 0; i < 4; i++) {
      let left = this.props.center.x + this.props.r * diff[i][0] - d;
      let top  = this.props.center.y + this.props.r * diff[i][1] - d;
      styles.partialSpeakButtons[i] = {
        position: 'absolute',
        left: left + 'px',
        top:  top + 'px',
      }
    }

    let buttonDown;
    let buttonLeft;
    let buttonRight;
    if (this.props.mode == 'circle') {
      buttonLeft = (
        <Button
            onClick={() => this.props.onClickMoveButton('left')}
            style={styles.navArrowButton[0]}
            className="btn-circle"
          ><Glyphicon glyph="triangle-left" /></Button>
      );
      buttonRight = (
        <Button
            onClick={() => this.props.onClickMoveButton('right')}
            style={styles.navArrowButton[1]}
            className="btn-circle"
          ><Glyphicon glyph="triangle-right" /></Button>
      );
      buttonDown = (
        <Button
          onClick={() => this.props.onClickMoveButton('back')}
            style={styles.navArrowButton[2]}
            className="btn-circle"
          ><Glyphicon glyph="triangle-bottom" /></Button>
      );
    } else {
      buttonLeft = (
        <Button
            onClick={() => this.props.onClickMoveButton('left')}
            style={styles.navArrowButton[0]}
            className="btn-circle"
          ><Glyphicon glyph="triangle-top" /></Button>
      );
      buttonRight = (
        <Button
            onClick={() => this.props.onClickMoveButton('right')}
            style={styles.navArrowButton[1]}
            className="btn-circle"
          ><Glyphicon glyph="triangle-bottom" /></Button>
      );
    }

    return (
      <div className="speak-buttons">
        <Button
            onClick={() => this.props.onClickSpeakButton(this.props.words, -1)}
            style={styles.speakButton}
            className="btn-circle"
          ><Glyphicon glyph="volume-up" /></Button>
        <Button
            onClick={() => this.props.onClickImageButton()}
            style={styles.imageTextSwitchButton}
            className="btn-circle"
          ><Glyphicon glyph="picture" /></Button>

        {buttonLeft}
        {buttonRight}
        {buttonDown}

        <Button
            onClick={() => this.props.onClickSpeakButton(this.props.words, 0)}
            style={styles.partialSpeakButtons[0]}
            className="btn-circle"
          ><Glyphicon glyph="volume-up" /></Button>
        <Button
            onClick={() => this.props.onClickSpeakButton(this.props.words, 1)}
            style={styles.partialSpeakButtons[1]}
            className="btn-circle"
          ><Glyphicon glyph="volume-up" /></Button>
        <Button
            onClick={() => this.props.onClickSpeakButton(this.props.words, 2)}
            style={styles.partialSpeakButtons[2]}
            className="btn-circle"
          ><Glyphicon glyph="volume-up" /></Button>
        <Button
            onClick={() => this.props.onClickSpeakButton(this.props.words, 3)}
            style={styles.partialSpeakButtons[3]}
            className="btn-circle"
        ><Glyphicon glyph="volume-up" /></Button>
      </div>
    );
    // <div style={{background:'red', width:'1px', height:'1px',position:'absolute', top:this.props.center.y, left:this.props.center.x}}><img src="" width="1" height="1"/></div>
  }
}
