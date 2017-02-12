import React, { PropTypes} from 'react';
import { Well, Grid, Row, Col } from 'react-bootstrap';

export default class WordActionsList extends React.Component {

  render() {
    // console.log('render2');
    let onClick = this.props.onClickWordAction;
    let onChange = this.props.onChangeWordActionKeyword;
    let onClickStory = (e) => {
      this.props.onClickStory();
      e.preventDefault();
    };
    let onClick3D = (e) => {
      this.props.onClick3D();
      e.preventDefault();
    };

    let styles = {
      modeLinks: {
        width:'100%',
        marginTop: '3px'
      },
      storyModeButton: {
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
    if (this.props.mode == 'circle') {
      styles.circleModeButton.display = 'none';
      cols[0].xsHidden = true;
      cols[0].xs = 0;
      if (!this.props.storyLines) {
        styles.storyModeButton.display = 'none';
        styles.circleModeButton.display = 'none';
      }
    } else {
      styles.storyModeButton.display = 'none';
      cols[2].xsHidden = true;
      cols[2].xs = 0;
    }

    let onClickCircleModeButton = (event) => {
      this.props.onClickCircleModeButton();
      event.preventDefault();
    };

    return (
      <Well className="word-actions">
        <Grid>
        <Row>
        <Col xsHidden={cols[0].xsHidden} xs={cols[0].xs} md={cols[0].md}>
          <div style={styles.circleModeButton}>
            <a href="#" onClick={onClickCircleModeButton}>&#x25C2; Circle</a>
          </div>
        </Col>
        <Col xsHidden={cols[1].xsHidden} xs={cols[1].xs} md={cols[1].md}>
          <label><input name="actionType" type="radio"
            onChange={() => onClick('speech')}
            checked={this.props.wordAction === 'speech'}
            /> Speech</label>
          <label><input name="actionType" type="radio"
            onChange={() => onClick('image')}
            checked={this.props.wordAction === 'image'}
            /> Image</label>
          <label><input name="actionType" type="radio"
            onClick={() => onClick('keyword')}
            checked={this.props.wordAction === 'keyword'}
            /> + <input type="text" size="10"
            value={this.props.wordActionKeyword}
            onChange={(event) => onChange(event.target.value)}/></label>
          <label><input name="actionType" type="radio"
            onChange={() => onClick('webster')}
            checked={this.props.wordAction === 'webster'}
            /> Webster</label>
          <label><input name="actionType" type="radio"
            onClick={() => onClick('wikipedia')}
            checked={this.props.wordAction === 'wikipedia'}
            /> Wikipedia</label>
          <label><input name="actionType" type="radio"
            onClick={() => onClick('ebay')}
            checked={this.props.wordAction === 'ebay'}
            /> eBay</label>
          <label><input name="actionType" type="radio"
            onClick={() => onClick('twitter')}
            checked={this.props.wordAction === 'twitter'}
            /> Twitter</label>
          <label><input name="actionType" type="radio"
            onClick={() => onClick('tumblr')}
            checked={this.props.wordAction === 'tumblr'}
            /> Tumblr</label>
        </Col>
        <Col xsHidden={cols[2].xsHidden} xs={cols[2].xs} md={cols[2].md}>
        <div style={styles.modeLinks} className='text-right'>
        <a href="#" style={styles.storyModeButton} onClick={onClickStory}>Story &#x25B8;</a><br/>
        <a href="#" onClick={onClick3D}>3D &#x25B8;</a>
        </div>
        </Col>
        </Row>
        </Grid>
      </Well>
    )
  }
}

WordActionsList.propTypes = {
  wordAction: PropTypes.string.isRequired,
  wordActionKeyword: PropTypes.string.isRequired,
  onClickWordAction: PropTypes.func.isRequired,
  onChangeWordActionKeyword: PropTypes.func.isRequired,
  onClickStory: PropTypes.func.isRequired,
};
