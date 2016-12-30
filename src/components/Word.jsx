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

    let word = this.props.word.word; // .replace(/ab$/, '');

    return (
      <Measure
        onMeasure={(dimensions) => {
          this.setState({dimensions})
        }}
      >
        <li style={styles.word}>
          {word}
        </li>
      </Measure>
    );
  }
}