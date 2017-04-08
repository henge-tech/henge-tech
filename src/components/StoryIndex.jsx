import React, { PropTypes } from 'react';
import { Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap';

import CirclePageNavBar from './CirclePageNavBar.jsx';
import StoryIndexLinesContainer from './StoryIndexLinesContainer.jsx';

export default class StoryIndex extends React.Component {

  render() {
    let stories = [];
    const style = {fontSize: '1.8em', marginTop: '50px', marginBottom: '30px' };

    this.props.stories.forEach((lines, index) => {
      const storyID = this.props.storyIDs.get(index);
      const words = this.props.storyWords.get(index);
      const toggle = this.props.toggles.get(index);

      const pattern = words.get(0).pattern;
      stories.push(
        <div key={'story-' + storyID}>
          <h2 style={style}>{storyID}. <a href={'/circles/' + pattern + '.html'}>{pattern}</a></h2>
          <StoryIndexLinesContainer index={index} storyID={storyID} lines={lines} words={words} toggle={toggle} />
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
