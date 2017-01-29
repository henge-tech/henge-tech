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
    let keynum = 0;
    let p = this.props;
    let label, word, onClickWord;

    storyLines.forEach(function(storyLine) {
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
        if (p.storyWords == 'translated') {
          label = token.text;
        } else {
          label = token.word.word;
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
            <Col md={1} sm={1}>
              <p style={{marginTop: '60px'}}>
                <Button
                  onClick={() => this.props.onClickSpeakButton(this.props.words, -1)}
                  className="btn-circle"
        ><Glyphicon glyph="volume-up" /></Button>
              </p>
            </Col>
            <Col md={11} sm={11}>
              <p>
                <Button
                    onClick={() => this.props.onClickSpeakButton(this.props.words, 0)}
                    className="btn-circle"
                  ><Glyphicon glyph="volume-up" /></Button>
        <span style={{marginLeft: '20px'}}>{lines[0]}</span>
              </p>

              <p>
                <Button
                    onClick={() => this.props.onClickSpeakButton(this.props.words, 1)}
                    className="btn-circle"
                  ><Glyphicon glyph="volume-up" /></Button>
                <span style={{marginLeft: '20px'}}>{lines[1]}</span>
              </p>

              <p>
                <Button
                    onClick={() => this.props.onClickSpeakButton(this.props.words, 2)}
                    className="btn-circle"
                  ><Glyphicon glyph="volume-up" /></Button>

                <span style={{marginLeft: '20px'}}>{lines[2]}</span>
              </p>

              <p>
                <Button
                    onClick={() => this.props.onClickSpeakButton(this.props.words, 3)}
                    className="btn-circle"
                  ><Glyphicon glyph="volume-up" /></Button>

                <span style={{marginLeft: '20px'}}>{lines[3]}</span>
              </p>
              <p>
                <Button
                    onClick={() => this.props.onClickToggleWordsButton()}
                    className="btn-circle"
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
