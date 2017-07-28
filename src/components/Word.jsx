import React from 'react';
import Measure from 'react-measure';

export default class Word extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dimensions: {
        width: -1,
        height: -1
      }
    };
  }

  render() {
    const { width, height } = this.state.dimensions;

    const word = this.props.word;
    const onClickWord = (event) => {
      if (this.props.mode == 'circleIndex') {
        this.props.onClickMoveButton(this.props.word.index);
      } else {
        this.props.onClickWord(word.text);
        event.preventDefault();
      }
    };

    let wordContent;
    if (this.props.showImage && word.imageExts.size > 0) {
      let imageSize = this.props.imageSize;
      let imageStyle = {
        listStyleType: 'none',
        position: 'absolute',
        top: this.props.y - imageSize / 2.0 + 'px',
        left: this.props.x - imageSize / 2.0 + 'px',
        fontSize: this.props.fontSize + 'px',
      };
      let src = word.thumbURL(0);
      if (false && this.props.mode != 'circleIndex' && Math.random() * 2 < 1) {
        src = '/imgs/q.png';
      }
      wordContent = (
        <li className="word" style={imageStyle}>
          <a href="#" className="word" onClick={onClickWord}><img src={src} style={{width: imageSize, height: imageSize}} /></a>
        </li>
      );
    } else {
      let coreClass = 'word-core-' + this.props.coreFirstGroup;
      let wordStyle = {
        listStyleType: 'none',
        position: 'absolute',
        top: this.props.y - height / 2.0 + 'px',
        left: this.props.x - width / 2.0 + 'px',
        fontSize: this.props.fontSize + 'px',
      };

      wordContent = (
        <li className="word" style={wordStyle}>
          <a href="#" className="word" onClick={onClickWord}><span className="word-prefix">{word.prefix}</span><span className={coreClass}>{word.core}</span><span className="word-suffix">{word.suffix}</span></a>
        </li>
      );
    }

    return (
      <Measure
        onMeasure={(dimensions) => {
          this.setState({dimensions})
        }}
      >
        {wordContent}
      </Measure>
    );
  }
}
