import React, { PropTypes } from 'react';
import CirclePageNavBar from './CirclePageNavBar.jsx';
import { FormGroup, ControlLabel, FormControl, Grid, Row, Col, InputGroup, Glyphicon} from 'react-bootstrap';

export default class CircleIndex extends React.Component {
  render() {
    let patternsList = [];
    let i = 0;
    let stories = this.props.stories;
    this.props.patterns.forEach((pattern) => {
      if (stories.indexOf(pattern) >= 0) {
        patternsList.push(
          <li key={'pattern-' + i}><span style={{width: '100px', display: 'inline-block'}}><a href={pattern + '.html'}>{pattern}</a></span>s</li>
        );
      } else {
        patternsList.push(
          <li key={'pattern-' + i}><a href={pattern + '.html'}>{pattern}</a></li>
        );
      }
      i += 1;
    });

    return (
        <div  style={{marginTop: '100px'}}>
        <Grid>
        <Row>
        <Col xs={1}></Col>
        <Col xs={10}>
        <FormGroup controlId="formControlsText" bsClass="index-search-group">
        <InputGroup>
        <FormControl type="text" placeholder="Search" />
        <InputGroup.Addon>
          <Glyphicon glyph="search" />
      </InputGroup.Addon>
        </InputGroup>
        </FormGroup>
        <p style={{marginTop:'10px', marginBottom:'20px'}}><a href="#">Pickup</a> | <a href="#">Story</a> | 8 | 12 | 16 | 20 | <Glyphicon glyph="random" /> | <Glyphicon glyph="star" /></p>
        <ol style={{fontSize: '1.25em'}}>
        {patternsList}
      </ol>
        </Col>
        <Col xs={1}></Col>
        </Row>
        </Grid>
        <CirclePageNavBar />
      </div>
    );
  }
}
