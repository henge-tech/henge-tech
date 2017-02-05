import React, { PropTypes } from 'react';
import { Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap';

export default class StoryLines extends React.Component {
  buildStoryLines() {
    let lines = [];
    let words = [];

    this.props.lines.forEach((lineObj, lineNum) => {
      let line = [];

      // 4 lines
      lineObj.tokens.forEach((token, i) => {
        if (token.type == 'text') {
          line.push(token.text + ' ');
          return;
        }
        words.push(token.word);
        let word = token.word.word ? token.word.word : token.word;
        let label = this.props.toggle[lineNum] ? word : token.text;
        let onClickWord = e => {
          this.props.onClickWord(word);
          e.preventDefault();
        }

        line.push(
          <a href='#' key={'story-word-' + i} onClick={onClickWord}>{label}</a>
        );
        line.push(' ');
      });
      lines.push(
        <li key={'story-lines-' + lineNum} className="story-line">
          <Button
            onClick={() => this.props.onClickSpeakButton(words, lineNum)}
            className="btn-circle"
            ><Glyphicon glyph="volume-up" /></Button>
          <Button
            onClick={() => this.props.onClickToggleWordsButton(lineNum)}
            className="btn-circle" style={{marginLeft: '10px'}}
            ><Glyphicon glyph="refresh" /></Button>
          <span className="story-line-text">{line}</span>
        </li>
      );
    });

    // Last line
    lines.push(
      <li key={'story-lines-all'} className="story-line">
        <Button
          onClick={() => this.props.onClickSpeakButton(words, -1)}
          className="btn-circle"
          ><Glyphicon glyph="volume-up" /></Button>
        <Button
          onClick={() => this.props.onClickToggleWordsButton()}
          className="btn-circle" style={{marginLeft: '10px'}}
        ><Glyphicon glyph="refresh" /></Button>
      </li>
    );
    return lines;
  }

  render() {
    let lines = this.buildStoryLines(this.props.story);
    return (
      <ul className="story-lines">
        {lines}
      </ul>
    );
  }
}
