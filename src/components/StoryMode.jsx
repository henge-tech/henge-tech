import React, { PropTypes } from 'react';
import CirclePageNavBar from './CirclePageNavBar.jsx';
import { Well, Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap';
import WordActionsListContainer from './WordActionsListContainer.jsx';

export default class StoryMode extends React.Component {
  render() {
    let styles = {
      container: {position: 'relative', height: '100px', width: '100%'},
    };

    let storyLines = this.props.storyLines;
    let lines = [];
    let p = this.props;
    let label, word, onClickWord;

    storyLines.forEach(function(storyLine, lineNum) {
      let line = [];
      let ocw = p.onClickWord;

      storyLine.tokens.forEach((token, i) => {
        if (token.type == 'text') {
          line.push(token.text + ' ');
          return;
        }
        word = token.word;
        onClickWord = (event) => {
          ocw(word);
          event.preventDefault();
        };
        if (p.storyWordsToggle[lineNum]) {
          label = token.word.word;
        } else {
          label = token.text;
        }
        line.push(
          <a href='#' key={'story-word-' + i} onClick={onClickWord}>{label}</a>
        );
        line.push(' ');
      });
      lines.push(line);
    });

    let margin = 200;
    if (this.props.width < 768) {
      margin = 80;
    }

    return (
      <div style={styles.container} className="container">
        <Grid style={{marginTop: margin + 'px', marginBottom: margin + 'px' }}>
          <Row>
            <Col md={2} sm={2}>
            </Col>
            <Col md={10} sm={10}>
              <p>
                <Button
                    onClick={() => this.props.onClickSpeakButton(this.props.words, 0)}
                    className="btn-circle"
                  ><Glyphicon glyph="volume-up" /></Button>
                <Button
                    onClick={() => this.props.onClickToggleWordsButton(0)}
                    className="btn-circle" style={{marginLeft: '10px'}}
                  ><Glyphicon glyph="refresh" /></Button>
                <span className="story-line">{lines[0]}</span>
              </p>

              <p>
                <Button
                    onClick={() => this.props.onClickSpeakButton(this.props.words, 1)}
                    className="btn-circle"
                  ><Glyphicon glyph="volume-up" /></Button>
                <Button
                    onClick={() => this.props.onClickToggleWordsButton(1)}
                    className="btn-circle" style={{marginLeft: '10px'}}
                  ><Glyphicon glyph="refresh" /></Button>
                <span className="story-line">{lines[1]}</span>
              </p>

              <p>
                <Button
                    onClick={() => this.props.onClickSpeakButton(this.props.words, 2)}
                    className="btn-circle"
                  ><Glyphicon glyph="volume-up" /></Button>
                <Button
                    onClick={() => this.props.onClickToggleWordsButton(2)}
                    className="btn-circle" style={{marginLeft: '10px'}}
                  ><Glyphicon glyph="refresh" /></Button>
                <span className="story-line">{lines[2]}</span>
              </p>

              <p>
                <Button
                    onClick={() => this.props.onClickSpeakButton(this.props.words, 3)}
                    className="btn-circle"
                  ><Glyphicon glyph="volume-up" /></Button>
                <Button
                    onClick={() => this.props.onClickToggleWordsButton(3)}
                    className="btn-circle" style={{marginLeft: '10px'}}
                  ><Glyphicon glyph="refresh" /></Button>
                <span className="story-line">{lines[3]}</span>
              </p>
              <p>
                <Button
                    onClick={() => this.props.onClickSpeakButton(this.props.words, -1)}
                    className="btn-circle"
                  ><Glyphicon glyph="volume-up" /></Button>
                <Button
                    onClick={() => this.props.onClickToggleWordsButton()}
                    className="btn-circle" style={{marginLeft: '10px'}}
                  ><Glyphicon glyph="refresh" /></Button>
              </p>
            </Col>
          </Row>

        </Grid>
        <WordActionsListContainer />
        <CirclePageNavBar />
      </div>
    );
  }
}
