import React, { PropTypes } from 'react';
import CirclePageNavBar from './CirclePageNavBar.jsx';
import { Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap';

export default class StoryIndex extends React.Component {
  buildStoryLines(story) {
    let lines = [];
    let words = [];
    story.lines.forEach((lineObj, lineNum) => {
      let line = [];
      lineObj.tokens.forEach((token, i) => {
        if (token.type == 'text') {
          line.push(token.text + ' ');
          return;
        }
        words.push(token.word);
        let label = token.text;
        line.push(
          <a href='#' key={'story-word-' + i}>{label}</a>
        );
        line.push(' ');
      });
      lines.push(
        <p key={'story-lines-' + story.id + '-' + lineNum}>
          <Button
            onClick={() => this.props.onClickSpeakButton(words, lineNum)}
            className="btn-circle"
            ><Glyphicon glyph="volume-up" /></Button>
          <Button
            onClick={() => this.props.onClickToggleWordsButton(lineNum)}
            className="btn-circle" style={{marginLeft: '10px'}}
            ><Glyphicon glyph="refresh" /></Button>
          <span className="story-line">{line}</span>
        </p>
      );
    });
    lines.push(
      <p key={'story-lines-' + story.id + '-all'}>
        <Button
          onClick={() => this.props.onClickSpeakButton(words, -1)}
          className="btn-circle"
          ><Glyphicon glyph="volume-up" /></Button>
        <Button
          onClick={() => this.props.onClickToggleWordsButton()}
          className="btn-circle" style={{marginLeft: '10px'}}
        ><Glyphicon glyph="refresh" /></Button>
      </p>
    );
    return lines;
  }

  render() {
    let stories = [];
    this.props.stories.forEach(story => {
      let lines = this.buildStoryLines(story);
      stories.push(
        <div key={'story-' + story.id}>
          <h2 style={{fontSize: '1.8em', marginTop: '50px', marginBottom: '30px' }}>{story.id}. <a href={story.href}>{story.pattern}</a></h2>
          {lines}
        </div>
      );
    });
    return (
        <div  style={{marginTop: '100px'}}>
        <Grid>
        <Row>
        <Col xs={1}></Col>
        <Col xs={10}>
        <h1>Stories</h1>
        {stories}
        </Col>
        <Col xs={1}></Col>
        </Row>
        </Grid>

        <CirclePageNavBar />
        </div>
    );
  }
}
