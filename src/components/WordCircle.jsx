import React, { PropTypes} from 'react';
import Word from './Word.jsx';

export default class WordCircle extends React.Component {

  render() {
    const r = this.props.r;
    const ox = this.props.center.x;
    const oy = this.props.center.y;

    const words = this.props.floorStatus.get('words');
    const wordsCount = words.size;
    const unit = Math.PI * 2.0 / wordsCount;

    let fontSize = r * 0.1;
    if (fontSize > 24) {
      fontSize = 24;
    } else if (fontSize < 12) {
      fontSize = 12;
    }

    let imageSize = [96, 96, 72, 64][wordsCount / 4 - 2];
    imageSize *= r / 256;

    let items = [];
    for (let i = 0; i < wordsCount; i++) {
      let word = words.get(i);
      let x = Math.cos(unit * i - Math.PI / 2.0) * r + ox;
      let y = Math.sin(unit * i - Math.PI / 2.0) * r + oy;

      items[i] = (
        <Word
          mode={this.props.floorStatus.get('mode')}
          showImage={this.props.floorStatus.get('showImage')}

          key={'word-' + i}

          word={word}
          x={x}
          y={y}
          r={r}
          fontSize={fontSize}
          imageSize={imageSize}
          onClickWord={this.props.onClickWord}
          onClickMoveButton={this.props.onClickMoveButton}
          />
      );
    }

    return (
        <ul style={{ margin: 0, height: (oy + r + 80) + 'px' }}>
          {items}
        </ul>
    );
  }
}
