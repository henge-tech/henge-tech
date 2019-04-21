import React from 'react';
import Measure from 'react-measure';
import { Link } from "react-router-dom";

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
    const onClickWord = (event) => {
      this.props.onClickWord(this.props.word);
      event.preventDefault();
    };

    let wordContent;
    if (this.props.showImage && this.props.word.imageExts.size > 0) {
      wordContent = this.renderWithImage(onClickWord);
    } else {
      wordContent = this.renderWithText(onClickWord);
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

  renderWithImage(onClickWord) {
    let imageSize = this.props.imageSize;
    let liStyle = {
      listStyleType: 'none',
      position: 'absolute',
      top: this.props.y - imageSize / 2.0 + 'px',
      left: this.props.x - imageSize / 2.0 + 'px',
      fontSize: this.props.fontSize + 'px',
    };

    let imageStyle = {
      width: imageSize,
      height: imageSize
    };
    if (this.props.mode == 'selected') {
      imageStyle.border = '5px solid #f46842';
    } else if (this.props.mode == 'notselected') {
      imageStyle.WebkitFilter = 'grayscale(100%)';
    }

    let thumbType = false;
    if (this.props.mode == 'lowres') {
      thumbType = 'thumbs-low' + this.props.lowResLevel;
    } else if (this.props.mode == 'circle') {
      thumbType = 'circle';
    }

    let src = this.props.word.thumbURL(0, thumbType);
    if (this.props.href) {
      return (
        <li style={liStyle}>
          <Link to={this.props.href}><img src={src} style={imageStyle} /></Link>
        </li>
      );
    } else {
      return (
        <li style={liStyle}>
          <a href="#" onClick={onClickWord}><img src={src} style={imageStyle} /></a>
        </li>
      );
    }
  }

  renderWithText(onClickWord) {
    const { width, height } = this.state.dimensions;
    const word = this.props.word;
    let coreClass = this.props.coreClass;
    let wordStyle = {
      listStyleType: 'none',
      position: 'absolute',
      top: this.props.y - height / 2.0 + 'px',
      left: this.props.x - width / 2.0 + 'px',
      fontSize: this.props.fontSize + 'px',
    };

    let suffixClass = 'word-suffix';
    if (word.core == '' && coreClass != 'word-core') {
      suffixClass = coreClass;
    }

    if (this.props.mode == 'selected') {
      wordStyle.padding = '0 2px 0 2px';
      wordStyle.border = '3px solid #f46842';
    } else if (this.props.mode == 'notselected') {
      coreClass = '';
      suffixClass = '';
    }

    if (this.props.href) {
      return (
        <li style={wordStyle}>
          <Link to={this.props.href}><span className="word-prefix">{word.prefix}</span><span className={coreClass}>{word.core}</span><span className={suffixClass}>{word.suffix}</span></Link>
        </li>
      );
    } else {
      return (
        <li style={wordStyle}>
          <a className={this.props.wordClass} href="#" onClick={onClickWord}><span className="word-prefix">{word.prefix}</span><span className={coreClass}>{word.core}</span><span className={suffixClass}>{word.suffix}</span></a>
        </li>
      );
    }
  }
}
