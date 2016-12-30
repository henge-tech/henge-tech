import React, { PropTypes} from 'react';
import { Button } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';
import CirclePageNavBar from './CirclePageNavBar.jsx';
import Word from './Word.jsx';

export default class Circle extends React.Component {
  render() {
    let unit = Math.PI * 2.0 / this.props.words.length;
    let center = { x: this.props.width / 2, y: 300 };
    let r = center.x * 0.8;
    if (r > 240) {
      r = 240;
    } else if (r < 120) {
      r = 120;
    }
    let styles = {
      container: {position: 'relative', height: '200px'},
      speakButton: {
        position: 'absolute',
        left: center.x - 15 + 'px',
        top: center.y + 'px',
      },
      partialSpeakButtons: []
    };

    let diff = [[1, -1], [1, 1], [-1, 1], [-1, -1]];
    for (let i = 0; i < 4; i++) {
      let d = 250;
      styles.partialSpeakButtons[i] = {
        position: 'absolute',
        left: center.x + r * diff[i][0] + 'px',
        top:  center.y + r * diff[i][1] + 'px',

      }
    }

    let wordList = [];
    for (let i = 0; i < this.props.words.length; i++) {
      let word = this.props.words[i];
      let x = Math.cos(unit * i - Math.PI / 2.0) * r + center.x;
      let y = Math.sin(unit * i - Math.PI / 2.0) * r + center.y;
      let fontSize = r * 0.1;
      if (fontSize > 24) {
        fontSize = 24;
      } else if (fontSize < 12) {
        fontSize = 12;
      }
      wordList[i] = (
        <Word
          key={'word-' + i}
          word={word}
          x={x}
          y={y}
          fontSize={fontSize}
          />
      );
    }

    return (
      <div style={styles.container}>
        <Button
            onClick={() => this.props.onSpeakButtonClick(this.props.words, -1)}
            style={styles.speakButton}
            className="btn-circle"
          ><Glyphicon glyph="volume-up" /></Button>
        <Button
            onClick={() => this.props.onSpeakButtonClick(this.props.words, 0)}
            style={styles.partialSpeakButtons[0]}
            className="btn-circle"
          ><Glyphicon glyph="volume-up" /></Button>
        <Button
            onClick={() => this.props.onSpeakButtonClick(this.props.words, 1)}
            style={styles.partialSpeakButtons[1]}
            className="btn-circle"
          ><Glyphicon glyph="volume-up" /></Button>
        <Button
            onClick={() => this.props.onSpeakButtonClick(this.props.words, 2)}
            style={styles.partialSpeakButtons[2]}
            className="btn-circle"
          ><Glyphicon glyph="volume-up" /></Button>
        <Button
            onClick={() => this.props.onSpeakButtonClick(this.props.words, 3)}
            style={styles.partialSpeakButtons[3]}
            className="btn-circle"
          ><Glyphicon glyph="volume-up" /></Button>

        <ul>
          {wordList}
        </ul>
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
  onSpeakButtonClick: PropTypes.func.isRequired
};
