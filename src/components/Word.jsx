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

    const styles = {
      word: {
        listStyleType: 'none',
        position: 'absolute',
        top: this.props.y + 'px',
        left: this.props.x - width / 2.0 + 'px',
        fontSize: this.props.fontSize + 'px',
      }
    };
    const word = this.props.word;
    const onClickWord = (event) => {
      this.props.onClickWord(word.text);
      event.preventDefault();
    };

    let imageSize = this.props.imageSize;

    let coreClass = 'word-core-' + this.props.coreFirstGroup;
    let imgRoot = 'http://henge.s3-website-ap-northeast-1.amazonaws.com/words/';

    let wordContent;
    if (this.props.showImage && word.imageExts.size > 0) {
      wordContent = (
        <a href="#" className="word" onClick={onClickWord}><img src={word.imageURL(0)} style={{width: imageSize, height: imageSize, position: 'relative', top: -20}} /></a>
      );
    } else {
      wordContent = (
          <a href="#" className="word" onClick={onClickWord}><span className="word-prefix">{word.prefix}</span><span className={coreClass}>{word.core}</span><span className="word-suffix">{word.suffix}</span></a>
      );
    }

    return (
      <Measure
        onMeasure={(dimensions) => {
          this.setState({dimensions})
        }}
      >
        <li className="word" style={styles.word}>{wordContent}</li>
      </Measure>
    );
  }
}
