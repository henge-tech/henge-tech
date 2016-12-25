import React from 'react';

export default class Word extends React.Component {
  render() {
    let styles = {
      word: {
        listStyleType: 'none',
        position: 'absolute',
        top: this.props.y + 'px',
        left: this.props.x - 10 + 'px',
        fontSize: this.props.fontSize + 'px',
      }
    };

    let word = this.props.word.word.replace(/ab$/, '');

    return (
      <li style={styles.word}>
        <b>{word}</b>ab
      </li>
    );
  }
}
