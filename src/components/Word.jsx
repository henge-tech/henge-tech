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
    const { width, height } = this.state.dimensions;

    const word = this.props.word;
    const onClickWord = (event) => {
      this.props.onClickWord(word);
      event.preventDefault();
    };

    let wordContent;
    if (this.props.showImage && word.imageExts.size > 0) {
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

      let lowres = false;
      if (this.props.mode == 'lowres') {
        lowres = 'thumbs-low' + this.props.lowResLevel;
      }

      let src = word.thumbURL(0, lowres);
      if (this.props.href) {
        wordContent = (
          <li style={liStyle}>
            <Link to={this.props.href}><img src={src} style={imageStyle} /></Link>
          </li>
        );
      } else {
        wordContent = (
          <li style={liStyle}>
            <a href="#" onClick={onClickWord}><img src={src} style={imageStyle} /></a>
          </li>
        );
      }
    } else {
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
        wordContent = (
          <li style={wordStyle}>
            <Link to={this.props.href}><span className="word-prefix">{word.prefix}</span><span className={coreClass}>{word.core}</span><span className={suffixClass}>{word.suffix}</span></Link>
          </li>
        );
      } else {
        wordContent = (
          <li style={wordStyle}>
            <a className={this.props.wordClass} href="#" onClick={onClickWord}><span className="word-prefix">{word.prefix}</span><span className={coreClass}>{word.core}</span><span className={suffixClass}>{word.suffix}</span></a>
          </li>
        );

      }
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
