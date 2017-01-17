import React, { PropTypes } from 'react';
import CirclePageNavBar from './CirclePageNavBar.jsx';
import { FormGroup, ControlLabel, FormControl, Grid, Row, Col, InputGroup, Glyphicon} from 'react-bootstrap';
import escapeStringRegexp from 'escape-string-regexp';

export default class CircleIndex extends React.Component {
  onChangeSearchQuery(e) {
    this.props.onChangeSearchQuery(e.target.value);
  }

  onClickFilter(e, filter) {
    this.props.onClickFilter(filter);
    e.preventDefault();
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
        match = rex.exec(pattern.allWordsText);
        if (match === null) return;
      } else if (this.props.filter == 'pickup') {
        if (!pattern.pickup) return;
      } else if (this.props.filter == 'story') {
        if (stories.indexOf(pattern.pattern) < 0) return;
      } else if (this.props.filter == '8') {
        if (pattern.count != 8) return;
      } else if (this.props.filter == '12') {
        if (pattern.count != 12) return;
      } else if (this.props.filter == '16') {
        if (pattern.count != 16) return;
      } else if (this.props.filter == '20') {
        if (pattern.count != 20) return;
      }

      let patternAttr = [];
      patternAttr.push(pattern.count);
      if (pattern.pickup) {
        patternAttr.push('p');
      }
      if (stories.indexOf(pattern.pattern) >= 0) {
        patternAttr.push('s');
      }
      let onClickSpeakButton = (e) => {
        this.props.onClickSpeakButton(pattern.id);
        e.preventDefault();
      }

      patternsList.push(
        <li value={pattern.id} key={'pattern-' + i}><span style={{width: '100px', display: 'inline-block'}}><a href={pattern.pattern + '.html'}>{pattern.pattern}</a></span>
          <a href="#" onClick={e => onClickSpeakButton(e)}><Glyphicon glyph="volume-up" style={{marginRight: '5px'}}/></a>
          {patternAttr.join(',')}</li>
      );
      i += 1;
    });
    let searchQuery = '';
    let filterItemClass = (filter) => {
      if (this.props.filter == filter) {
        return 'index-filter-item index-filter-item-current';
      } else {
        return 'index-filter-item';
      }
    };

    return (
      <div  style={{marginTop: '100px'}}>
        <Grid>
        <Row>
        <Col xs={1}></Col>
        <Col xs={10}>
        <FormGroup controlId="formControlsText" bsClass="index-search-group">
        <InputGroup>
        <FormControl type="text" value={this.props.q} placeholder="Search" onChange={e => { this.onChangeSearchQuery(e) }}/>
        <InputGroup.Addon>
          <Glyphicon glyph="search" />
        </InputGroup.Addon>
        </InputGroup>
        </FormGroup>
        <ul className="index-filters-list">
          <li className={filterItemClass('all')}><a onClick={(e) => { this.onClickFilter(e, 'all') }} href="#">All</a></li>
          <li className={filterItemClass('pickup')}><a onClick={(e) => { this.onClickFilter(e, 'pickup') }} href="#">Pickup</a></li>
          <li className={filterItemClass('story')}><a onClick={(e) => { this.onClickFilter(e, 'story') }} href="#">Story</a></li>
          <li className={filterItemClass('8')}><a onClick={(e) => { this.onClickFilter(e, '8') }} href="#">8</a></li>
          <li className={filterItemClass('12')}><a onClick={(e) => { this.onClickFilter(e, '12') }} href="#">12</a></li>
          <li className={filterItemClass('16')}><a onClick={(e) => { this.onClickFilter(e, '16') }} href="#">16</a></li>
          <li className={filterItemClass('20')}><a onClick={(e) => { this.onClickFilter(e, '20') }} href="#">20</a></li>
          <li className={filterItemClass('star')}><a onClick={(e) => { this.onClickFilter(e, 'all') }} href="#"><Glyphicon glyph="star" /></a></li>
        </ul>
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
