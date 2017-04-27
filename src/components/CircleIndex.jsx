import React, { PropTypes } from 'react';
import CirclePageNavBar from './CirclePageNavBar.jsx';
import { FormGroup, ControlLabel, FormControl, Grid, Row, Col, InputGroup, Glyphicon} from 'react-bootstrap';

export default class CircleIndex extends React.Component {
  onChangeSearchQuery(e) {
    const q = e.target.value;
    const newFilter = this.props.filter.set('q', q);
    this.props.onChangeFilter(newFilter, this.props.index, this.props.allWords);
  }

  onClickFilter(e, filter) {
    const newFilter = this.props.filter.set('filter', filter);
    this.props.onChangeFilter(newFilter, this.props.index, this.props.allWords);
    e.preventDefault();
  }

  onClickToggleSpeakAll(e) {
    this.props.toggleSpeakAll(this.props.selected, this.props.allWords);
    e.preventDefault();
  }

  render() {
    // sel [allWordsIndex, wordsIndex]
    const selected = this.props.selected.map((sel, idx) => {
      const circleID = sel.get(0);
      const words = this.props.allWords.get(circleID);
      const indexEntry = this.props.index.get(circleID);
      const word = words.get(sel.get(1));

      const label = (
          <span className="word-list-base"><span className="word-prefix">{word.prefix}</span><span>{word.core}</span><span className="word-suffix">{word.suffix}</span></span>
      );

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
          <svg role="img" style={iconStyle} key={'index-icon-size-' + circleID}>
          <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={'/imgs/svg/sprite.svg#d' + (words.size / 4)}></use>
          </svg>
      );

      if (indexEntry.hasStory) {
        patternAttr.push(
          <svg role="img" style={iconStyle} key={'index-icon-story-' + circleID}>
            <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/imgs/svg/sprite.svg#s"></use>
          </svg>
);
      }
      if (indexEntry.pickup) {
        patternAttr.push(
          <svg role="img" style={iconStyle} key={'index-icon-pickup-' + circleID}>
            <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/imgs/svg/sprite.svg#p"></use>
          </svg>
        );
      }

      const onClickSpeakButton = (e) => {
        // indexEntry.index
        this.props.onClickSpeakButton(words);
        e.preventDefault();
      }

      return (
          <li value={circleID + 1} key={'pattern-' + circleID}><span style={{width: '150px', display: 'inline-block'}}><a href={word.pattern + '.html'}>{label}</a></span>
          <a href="#" onClick={e => onClickSpeakButton(e)}><Glyphicon glyph="volume-up" style={{marginRight: '5px'}}/></a>
          {patternAttr}</li>
      );
    });

    const filterItemClass = (filter) => {
      if (this.props.filter.filter == filter) {
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
        <FormControl type="text" value={this.props.filter.q} placeholder="Search" onChange={e => { this.onChangeSearchQuery(e) }}/>
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
        {selected}
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
