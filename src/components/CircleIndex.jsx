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

  onClickToggleSpeakAll(e) {
    this.props.toggleSpeakAll(this.filteredPatterns);
    e.preventDefault();
  }

  render() {
    let patternsList = [];
    let i = 0;
    let stories = this.props.stories;
    let strRex, rex;
    if (!this.props.q || this.props.q.length < 2) {
      rex = null;
    } else {
      strRex = escapeStringRegexp(this.props.q);
      strRex = strRex.replace(/\t/g, '');
      strRex = '(?:^|\t)([^\t]*' + strRex + '[^\t]*)';
      rex = new RegExp(strRex);
    }

    let match;
    let label;

    this.filteredPatterns = [];
    this.props.patterns.forEach((pattern) => {
      label = pattern.firstWord;
      if (rex !== null) {
        match = rex.exec(pattern.allWordsText);
        if (match === null) return;

        const w = match[1];
        const prefix = w.substr(0, pattern.prefix.length);
        const core   = w.substr(pattern.prefix.length, w.length - pattern.prefix.length - pattern.suffix.length);
        const suffix = w.substr(w.length - pattern.suffix.length);

        label = (
            <span className="word-list-base"><span className="word-prefix">{prefix}</span><span>{core}</span><span className="word-suffix">{suffix}</span></span>
        );
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

      this.filteredPatterns.push(pattern);
      const patternAttr = [];

      // let iconFill = '#337ab7';
      // iconFill = ['#cc9', '#9cc', '#c9c', '#c99'][pattern.count/4 - 2];
      // iconFill = ['#e5c1a2', '#a2c6e5', '#a2e5c1', '#e5a2c6'][pattern.count/4 - 2];
      let iconFill = '#ccc';

      const iconStyle = {
        width: '18px',
        height: '18px',
        marginTop: '2px',
        marginRight:'5px',
        fill: iconFill
      };

      patternAttr.push(
        <svg role="img" style={iconStyle} key={'index-icon-size-' + i}>
          <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={'/imgs/svg/sprite.svg#d' + (pattern.count / 4)}></use>
        </svg>
      );

      if (stories.indexOf(pattern.pattern) >= 0) {
        patternAttr.push(
          <svg role="img" style={iconStyle} key={'index-icon-story-' + i}>
            <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/imgs/svg/sprite.svg#s"></use>
          </svg>
);
      }
      if (pattern.pickup) {
        patternAttr.push(
          <svg role="img" style={iconStyle} key={'index-icon-pickup-' + i}>
            <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/imgs/svg/sprite.svg#p"></use>
          </svg>
        );
      }

      const onClickSpeakButton = (e) => {
        this.props.onClickSpeakButton(pattern.id);
        e.preventDefault();
      }

      patternsList.push(
        <li value={pattern.id} key={'pattern-' + i}><span style={{width: '150px', display: 'inline-block'}}><a href={pattern.pattern + '.html'}>{label}</a></span>
          <a href="#" onClick={e => onClickSpeakButton(e)}><Glyphicon glyph="volume-up" style={{marginRight: '5px'}}/></a>
          {patternAttr}</li>
      );
      i += 1;
    });
    const filterItemClass = (filter) => {
      if (this.props.filter == filter) {
        return 'index-filter-item index-filter-item-current';
      } else {
        return 'index-filter-item';
      }
    };
    const speakAllGlyph = (this.props.speakingAll) ? 'pause' : 'play';

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
          <li className={filterItemClass('paly')}><a onClick={(e) => { this.onClickToggleSpeakAll(e) }} href="#"><Glyphicon glyph={speakAllGlyph} /></a></li>
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
