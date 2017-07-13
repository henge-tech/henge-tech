import React, { PropTypes} from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

export default class SpeakButtons extends React.Component {
  render() {
    let centerButtonMargin = 60;

    let styles = {
      speakButton: {
        position: 'absolute',
        left: this.props.center.x - 15 + 'px',
        top: this.props.center.y + 'px',
      },
      imageTextSwitchButton: {
        position: 'absolute',
        left: this.props.center.x - 15 + 'px',
        top: this.props.center.y - 60 + 'px',
      },
      navArrowButton: [
        {
          position: 'absolute',
          left: this.props.center.x - 15 - centerButtonMargin + 'px',
          top: this.props.center.y + 'px',
        },
        {
          position: 'absolute',
          left: this.props.center.x - 15 + centerButtonMargin + 'px',
          top: this.props.center.y + 'px',
        },
      ],

      partialSpeakButtons: []
    };

    let diff = [[1, -1], [1, 1], [-1, 1], [-1, -1]];
    for (let i = 0; i < 4; i++) {
      let d = 250;
      styles.partialSpeakButtons[i] = {
        position: 'absolute',
        left: this.props.center.x + this.props.r * diff[i][0] + 'px',
        top:  this.props.center.y + this.props.r * diff[i][1] + 'px',
      }
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
        <Button
            onClick={() => this.props.onClickMoveButton('left')}
            style={styles.navArrowButton[0]}
            className="btn-circle"
          ><Glyphicon glyph="triangle-left" /></Button>
        <Button
            onClick={() => this.props.onClickMoveButton('right')}
            style={styles.navArrowButton[1]}
            className="btn-circle"
          ><Glyphicon glyph="triangle-right" /></Button>

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
  }
}
