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

    let styles = {
      word: {
        listStyleType: 'none',
        position: 'absolute',
        top: this.props.y + 'px',
        left: this.props.x - width / 2.0 + 'px',
        fontSize: this.props.fontSize + 'px',
      }
    };
    let word = this.props.word;
    let onClickWord = (event) => {
      this.props.onClickWord(word);
      event.preventDefault();
    };
    let coreClass = 'word-core-' + this.props.coreFirstGroup;

    return (
      <Measure
        onMeasure={(dimensions) => {
          this.setState({dimensions})
        }}
      >
        <li className="word" style={styles.word}>
          <a href="#" className="word" onClick={onClickWord}><span className="word-prefix">{word.prefix}</span><span className={coreClass}>{word.core}</span><span className="word-suffix">{word.suffix}</span></a>
        </li>
      </Measure>
    );
  }
}
