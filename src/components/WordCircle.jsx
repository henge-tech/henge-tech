import React, { PropTypes} from 'react';
import Word from './Word.jsx';

export default class WordCircle extends React.Component {

  render() {
    const r = this.props.r;
    const ox = this.props.center.x;
    const oy = this.props.center.y;
    const floorStatus = this.props.floorStatus;

    const words = floorStatus.words;
    const wordsCount = words.size;
    const unit = Math.PI * 2.0 / wordsCount;

    let fontSize = r * 0.1;
    if (fontSize > 24) {
      fontSize = 24;
    } else if (fontSize < 12) {
      fontSize = 12;
    }

    let imageSizeBase = [96, 96, 72, 64][wordsCount / 4 - 2];
    imageSizeBase *= r / 256;

    let items = [];
    let classes = this.coreClasses(words);
    const wordSelectMode = floorStatus.isWordSelectMode();
    for (let i = 0; i < wordsCount; i++) {
      const word = words.get(i);
      let imageSize = imageSizeBase;
      let wordClass = 'word';
      if (i % (wordsCount / 4) == 0) {
        wordClass = 'word-square';
      }
      const x = Math.cos(unit * i - Math.PI / 2.0) * r + ox;
      const y = Math.sin(unit * i - Math.PI / 2.0) * r + oy;

      let mode;
      if (wordSelectMode) {
        mode = floorStatus.selectedImages.get(i) ? 'selected' : 'notselected';
      } else if (floorStatus.mode == 'circleIndex' && floorStatus.indexPickupImage == 'circle') {
        mode = 'circle';
        imageSize *= 1.2;
      } else {
        mode = floorStatus.lowResImages.get(i) ? 'lowres' : 'normal';
      }

      let href = null;
      if (floorStatus.mode == 'circleIndex' && floorStatus.indexBehaviorName == 'move') {
        const pattern = floorStatus.floorData.circles[i].pattern;
        href = '/circles/' + pattern + '.html';
      }

      items[i] = (
        <Word
          mode={mode}
          showImage={floorStatus.showImage}
          lowResLevel={floorStatus.lowResLevel}
          coreClass={classes[i]}
          wordClass={wordClass}

          key={'word-' + i}

          word={word}
          x={x}
          y={y}
          r={r}
          fontSize={fontSize}
          imageSize={imageSize}
          href={href}
          onClickWord={this.props.onClickWord}
          />
      );
    }

    return (
        <ul style={{ margin: 0, height: (oy + r + 80) + 'px' }}>
          {items}
        </ul>
    );
  }

  coreClasses(words) {
    let count = 2;
    let result = [];
    let lastInitial = '';
    let classChanged = false;
    const roomType = this.props.floorStatus.roomType();
    if (roomType == 'index') {
      for (let i = 0; i < words.size; i++) {
        result[i] = 'word-core';
      }
      return result;
    }

    for (let i = 0; i < words.size; i++) {
      let c1 = words.get(i).coreInitial();
      let c0 = null;
      let c2 = null;
      if (i > 0) {
        c0 = words.get(i - 1).coreInitial();
      }
      if (i < words.size - 1) {
        c2 = words.get(i + 1).coreInitial();
      }

      if (c0 === c1 || c1 === c2) {
        if (c1 != lastInitial) {
          count += 1;
          count = count % 3;
          lastInitial = c1;
        }
        result.push('word-core-' + count);

        if (count == 1) {
          classChanged = true;
        }
      } else {
        result.push('word-core');
      }
    }

    if (classChanged && result[0] == 'word-core-0') {
      for (let i = words.size - 1; i >= 0; i--) {
        if (result[i] == 'word-core-0') {
          result[i] = 'word-core-1';
        } else {
          break;
        }
      }
    }

    return result;
  }
}
