import React from 'react';
import { Well, Grid, Row, Col } from 'react-bootstrap';

export default class WordBehaviorList extends React.Component {

  render() {
    const onClick3D = (e) => {
      this.props.onClick3D();
      e.preventDefault();
    };

    const styles = {
      modeLinks: {
        width:'100%',
        marginTop: '3px'
      },
    }

    const cols = [
      {xsHidden: false, xs: 4, md: 3},
      {xsHidden: false, xs: 8, md: 6},
      {xsHidden: false, xs: 4, md: 3}
    ];
    cols[0].xsHidden = true;
    cols[0].xs = 0;

    if (this.props.floorStatus.roomType() == 'circle') {
      return this.renderWell(onClick3D, cols, styles);
    } else {
      return this.renderWellForIndex(onClick3D, cols, styles);
    }
  }

  renderWell(onClick3D, cols, styles) {
    const onChangeBehavior = this.props.onChangeBehavior;
    const onChangeKeyword = this.props.onChangeKeyword;
    const name = this.props.floorStatus.get('behaviorName');
    return (
      <Well className="word-behaviors">
        <Grid>
        <Row>
        <Col xsHidden={cols[0].xsHidden} xs={cols[0].xs} md={cols[0].md}>
        </Col>
        <Col xsHidden={cols[1].xsHidden} xs={cols[1].xs} md={cols[1].md}>
          <label><input name="behaviorType" type="radio"
            onChange={() => onChangeBehavior('speech')}
            checked={name === 'speech'}
            /> Speech</label>
          <label><input name="behaviorType" type="radio"
            onChange={() => onChangeBehavior('image')}
            checked={name === 'image'}
            /> Image</label>
          <label><input name="behaviorType" type="radio"
            onChange={() => onChangeBehavior('keyword')}
            checked={name === 'keyword'}
            /> + <input type="text" size="10"
            value={this.props.floorStatus.get('wordSearchKeyword')}
            onFocus={(event) => onChangeBehavior('keyword')}
            onChange={(event) => onChangeKeyword(event.target.value)}/></label>
          <label><input name="behaviorType" type="radio"
            onChange={() => onChangeBehavior('webster')}
            checked={name === 'webster'}
            /> Webster</label>
          <label><input name="behaviorType" type="radio"
            onChange={() => onChangeBehavior('wikipedia')}
            checked={name === 'wikipedia'}
            /> Wikipedia</label>
          <label><input name="behaviorType" type="radio"
            onChange={() => onChangeBehavior('ebay')}
            checked={name === 'ebay'}
            /> eBay</label>
          <label><input name="behaviorType" type="radio"
            onChange={() => onChangeBehavior('twitter')}
            checked={name === 'twitter'}
            /> Twitter</label>
          <label><input name="behaviorType" type="radio"
            onChange={() => onChangeBehavior('tumblr')}
            checked={name === 'tumblr'}
            /> Tumblr</label>
        </Col>
        <Col xsHidden={cols[2].xsHidden} xs={cols[2].xs} md={cols[2].md}>
        <div style={styles.modeLinks} className='text-right'>
        <a href="#" onClick={onClick3D}>3D &#x25B8;</a>
        </div>
        </Col>
        </Row>
        </Grid>
      </Well>
    )
  }

  renderWellForIndex(onClick3D, cols, styles) {
    const onChangeBehavior = this.props.onChangeBehavior;
    const name = this.props.floorStatus.get('indexBehaviorName');
    return (
      <Well className="word-behaviors">
        <Grid>
        <Row>
        <Col xsHidden={cols[0].xsHidden} xs={cols[0].xs} md={cols[0].md}>
        </Col>
        <Col xsHidden={cols[1].xsHidden} xs={cols[1].xs} md={cols[1].md}>
          <label><input name="behaviorType" type="radio"
            onChange={() => onChangeBehavior('move')}
            checked={name === 'move'}
            /> Move</label>
          <label><input name="behaviorType" type="radio"
            onChange={() => onChangeBehavior('speech')}
            checked={name === 'speech'}
            /> Speech</label>
        </Col>
        <Col xsHidden={cols[2].xsHidden} xs={cols[2].xs} md={cols[2].md}>
        <div style={styles.modeLinks} className='text-right'>
        <a href="#" onClick={onClick3D}>3D &#x25B8;</a>
        </div>
        </Col>
        </Row>
        </Grid>
      </Well>
    );
  }
}
