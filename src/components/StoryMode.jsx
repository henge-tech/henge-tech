import React, { PropTypes } from 'react';
import CirclePageNavBar from './CirclePageNavBar.jsx';
import { Well, Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap';
import WordActionsListContainer from './WordActionsListContainer.jsx';

export default class StoryMode extends React.Component {
  render() {
    let styles = {
      container: {position: 'relative', height: '100px', width: '100%'},
    };

    let storyTexts = this.props.story;
    let lines = [];
    let rex = /([^\[]*)\[([^\]]+)\]([^\[]*)/g;
    let keynum = 0;
    let p = this.props;

    storyTexts.forEach(function(txt) {
      let line = [];
      let match = null;
      let ocw = p.onClickWord;

      while((match = rex.exec(txt)) !== null) {
        let word = p.words[keynum];
        let onClickWord = (event) => {
          ocw(word);
          event.preventDefault();
        };

        line.push(match[1] + ' ');
        line.push(
          <a href='#' key={'story-word-' + keynum} onClick={onClickWord}>{match[2]}</a>
        );
        line.push(' ' + match[3]);
        keynum += 1;
      }
      lines.push(line);
    });

    return (
      <div style={styles.container} className="container">
        <Grid style={{marginTop: '200px', marginBottom: '140px' }}>
          <Row>
            <Col md={1}>
              <p style={{marginTop: '60px', marginLeft: '10px'}}>
                <Button
                  onClick={() => this.props.onClickSpeakButton(this.props.words, -1)}
                  className="btn-circle"
                ><Glyphicon glyph="volume-up" /></Button>
              </p>
            </Col>
            <Col md={11}>
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

            </Col>
          </Row>
        </Grid>
        <WordActionsListContainer />
        <CirclePageNavBar />
      </div>
    );
  }
}
