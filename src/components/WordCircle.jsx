import React, { PropTypes} from 'react';
import Word from './Word.jsx';

export default class WordCircle extends React.Component {

  render() {
    let wordList = [];
    let unit = Math.PI * 2.0 / this.props.words.length;
    let r = this.props.r;
    let ox = this.props.center.x;
    let oy = this.props.center.y;
    let coreFirst = '';
    let coreFirstGroup = 'b';

    for (let i = 0; i < this.props.words.length; i++) {
      let word = this.props.words[i];
      let x = Math.cos(unit * i - Math.PI / 2.0) * r + ox;
      let y = Math.sin(unit * i - Math.PI / 2.0) * r + oy;
      let fontSize = r * 0.1;
      if (word.core[0] !== coreFirst) {
        coreFirst = word.core[0];
        if (coreFirstGroup === 'a') {
          coreFirstGroup = 'b';
        } else {
          coreFirstGroup = 'a';
        }
      }
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
          onClickWord={this.props.onClickWord}
          coreFirstGroup={coreFirstGroup}
          />
      );
    }

    return (
        <ul style={{ margin: 0, height: (oy + r + 80) + 'px' }}>
          {wordList}
        </ul>
    );
  }
}

WordCircle.propTypes = {
  center: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  r: PropTypes.number.isRequired,
  words: PropTypes.arrayOf(PropTypes.shape({
    index: PropTypes.number.isRequired,
    word: PropTypes.string.isRequired
  })).isRequired,
  pattern: PropTypes.string.isRequired,
  onClickWord: PropTypes.func.isRequired
};
