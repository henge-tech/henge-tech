import React, { PropTypes } from 'react';
import { Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap';

import CirclePageNavBar from './CirclePageNavBar.jsx';
import StoryIndexLinesContainer from './StoryIndexLinesContainer.jsx';

export default class StoryIndex extends React.Component {

  render() {
    let stories = [];
    const style = {fontSize: '1.8em', marginTop: '50px', marginBottom: '30px' };

    this.props.stories.forEach((lines, storyPos) => {
      const patternID = this.props.patternIDs.get(storyPos);
      const words = this.props.storyWords.get(storyPos);
      const toggles = this.props.toggles.get(storyPos);

      const pattern = words.get(0).pattern;
      stories.push(
        <div key={'story-' + patternID}>
          <h2 style={style}>{patternID}. <a href={'/circles/' + pattern + '.html'}>{pattern}</a></h2>
          <StoryIndexLinesContainer storyPos={storyPos} lines={lines} words={words} toggles={toggles} />
        </div>
      );
    });
    return (
        <div  style={{marginTop: '100px'}}>
        <Grid>
        <Row>
        <Col xs={1}></Col>
        <Col xs={10}>
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
