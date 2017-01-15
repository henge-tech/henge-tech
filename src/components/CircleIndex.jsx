import React, { PropTypes } from 'react';
import CirclePageNavBar from './CirclePageNavBar.jsx';
import { FormGroup, ControlLabel, FormControl, Grid, Row, Col, InputGroup, Glyphicon} from 'react-bootstrap';
import escapeStringRegexp from 'escape-string-regexp';

export default class CircleIndex extends React.Component {
  onChangeSearchQuery(e) {
    this.props.onChangeSearchQuery(e.target.value);
  }

  render() {
    let patternsList = [];
    let i = 0;
    let stories = this.props.stories;
    let strRex, rex;
    if (!this.props.q) {
      rex = null;
    } else {
      strRex = escapeStringRegexp(this.props.q);
      strRex = strRex.replace(/\t/g, '');
      strRex = '(?:^|\t)([^\t]*' + strRex + '[^\t]*)';
      rex = new RegExp(strRex);
    }

    let match;

    this.props.patterns.forEach((pattern) => {
      if (rex !== null) {
        match = rex.exec(pattern.allWords);
        if (match === null) return;
      }

      let patternAttr = [];
      patternAttr.push(pattern.count);
      if (pattern.pickup) {
        patternAttr.push('p');
      }
      if (stories.indexOf(pattern.pattern) >= 0) {
        patternAttr.push('s');
      }

      patternsList.push(
          <li value={pattern.id} key={'pattern-' + i}><span style={{width: '100px', display: 'inline-block'}}><a href={pattern.pattern + '.html'}>{pattern.pattern}</a></span>{patternAttr.join(',')}</li>
      );
      i += 1;
    });
    let searchQuery = '';

    return (
      <div  style={{marginTop: '100px'}}>
        <Grid>
        <Row>
        <Col xs={1}></Col>
        <Col xs={10}>
        <FormGroup controlId="formControlsText" bsClass="index-search-group">
        <InputGroup>
        <FormControl type="text" placeholder="Search" onChange={(e) => { this.onChangeSearchQuery(e) }}/>
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
