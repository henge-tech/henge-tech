import React, { PropTypes} from 'react';
import { Well, Grid, Row, Col } from 'react-bootstrap';

export default class WordBehaviorList extends React.Component {

  render() {
    // console.log('render2');
    const onChangeBehavior = this.props.onChangeBehavior;
    const onChangeKeyword = this.props.onChangeKeyword;
    let onClick3D = (e) => {
      this.props.onClick3D();
      e.preventDefault();
    };

    let styles = {
      modeLinks: {
        width:'100%',
        marginTop: '3px'
      },
      circleModeButton: {
        width:'100%',
        marginTop: '3px'
      }
    }

    let cols = [
      {xsHidden: false, xs: 4, md: 3},
      {xsHidden: false, xs: 8, md: 6},
      {xsHidden: false, xs: 4, md: 3}
    ];
    cols[0].xsHidden = true;
    cols[0].xs = 0;

    const type = this.props.floorStatus.get('wordBehaviorType');
    return (
      <Well className="word-behaviors">
        <Grid>
        <Row>
        <Col xsHidden={cols[0].xsHidden} xs={cols[0].xs} md={cols[0].md}>
        </Col>
        <Col xsHidden={cols[1].xsHidden} xs={cols[1].xs} md={cols[1].md}>
          <label><input name="behaviorType" type="radio"
            onChange={() => onChangeBehavior('speech')}
            checked={type === 'speech'}
            /> Speech</label>
          <label><input name="behaviorType" type="radio"
            onChange={() => onChangeBehavior('image')}
            checked={type === 'image'}
            /> Image</label>
          <label><input name="behaviorType" type="radio"
            onChange={() => onChangeBehavior('keyword')}
            checked={type === 'keyword'}
            /> + <input type="text" size="10"
            value={this.props.floorStatus.get('wordSearchKeyword')}
            onFocus={(event) => onChangeBehavior('keyword')}
            onChange={(event) => onChangeKeyword(event.target.value)}/></label>
          <label><input name="behaviorType" type="radio"
            onChange={() => onChangeBehavior('webster')}
            checked={type === 'webster'}
            /> Webster</label>
          <label><input name="behaviorType" type="radio"
            onChange={() => onChangeBehavior('wikipedia')}
            checked={type === 'wikipedia'}
            /> Wikipedia</label>
          <label><input name="behaviorType" type="radio"
            onChange={() => onChangeBehavior('ebay')}
            checked={type === 'ebay'}
            /> eBay</label>
          <label><input name="behaviorType" type="radio"
            onChange={() => onChangeBehavior('twitter')}
            checked={type === 'twitter'}
            /> Twitter</label>
          <label><input name="behaviorType" type="radio"
            onChange={() => onChangeBehavior('tumblr')}
            checked={type === 'tumblr'}
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
}
