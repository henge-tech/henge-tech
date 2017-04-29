import React, { PropTypes } from 'react';
import CirclePageNavBar from './CirclePageNavBar.jsx';
import { Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap';

import WordBehaviorListContainer from './WordBehaviorListContainer.jsx';
import StoryLinesContainer from './StoryLinesContainer.jsx';

export default class StoryMode extends React.Component {
  render() {
    let styles = {
      container: {position: 'relative', height: '100px', width: '100%'},
    };

    let margin = 200;
    if (this.props.width < 768) {
      margin = 80;
    }

    return (
      <div style={styles.container} className="container">
        <Grid style={{marginTop: margin + 'px', marginBottom: margin + 'px' }}>
          <Row>
            <Col md={2} sm={2}></Col>
            <Col md={10} sm={10}>
              <StoryLinesContainer />
            </Col>
          </Row>
        </Grid>
        <WordBehaviorListContainer />
        <CirclePageNavBar />
      </div>
    );
  }
}
