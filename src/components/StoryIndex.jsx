import React, { PropTypes } from 'react';
import { Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap';

import CirclePageNavBar from './CirclePageNavBar.jsx';
import StoryIndexLinesContainer from './StoryIndexLinesContainer.jsx';

export default class StoryIndex extends React.Component {

  render() {
    let stories = [];
    this.props.stories.forEach(story => {
      stories.push(
        <div key={'story-' + story.id}>
          <h2 style={{fontSize: '1.8em', marginTop: '50px', marginBottom: '30px' }}>{story.id}. <a href={story.href}>{story.pattern}</a></h2>
          <StoryIndexLinesContainer storyID={story.id} lines={story.lines} toggle={this.props.toggles[story.id]} />
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
