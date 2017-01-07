import React, { PropTypes} from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

export default class SpeakButtons extends React.Component {
  render() {
    let styles = {
      speakButton: {
        position: 'absolute',
        left: this.props.center.x - 15 + 'px',
        top: this.props.center.y + 'px',
      },
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

SpeakButtons.propTypes = {
  center: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  r: PropTypes.number.isRequired,
  words: PropTypes.arrayOf(PropTypes.shape({
    index: PropTypes.number.isRequired,
    word: PropTypes.string.isRequired
  })).isRequired,
  onClickSpeakButton: PropTypes.func.isRequired
};
