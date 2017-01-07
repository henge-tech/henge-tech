import React, { PropTypes} from 'react';
import { Well, Grid, Row, Col } from 'react-bootstrap';

export default class WordActionsList extends React.Component {

  render() {
    // console.log('render2');
    let onClick = this.props.onClickWordAction;
    let onChange = this.props.onChangeWordActionKeyword;
    let onClickStory = (event) => {
      this.props.onClickStory();
      event.preventDefault();
    };

    let styles = {
      storyModeButton: {
        width:'100%',
        marginTop: '3px'
      },
      circleModeButton: {
        width:'100%',
        marginTop: '3px'
      }
    }
    if (!this.props.story) {
      styles.storyModeButton.display = 'none';
      styles.circleModeButton.display = 'none';
    } else {
      if (this.props.mode == 'circle') {
        styles.circleModeButton.display = 'none';
      } else {
        styles.storyModeButton.display = 'none';
      }
    }

    let onClickCircleModeButton = (event) => {
      this.props.onClickCircleModeButton();
      event.preventDefault();
    };

    return (
      <Well className="word-actions">
        <Grid>
        <Row>
        <Col xs={4} md={3}>
          <div style={styles.circleModeButton}>
            <a href="#" onClick={onClickCircleModeButton}>&#x25C2; Circle</a>
          </div>
        </Col>
        <Col xs={8} md={6}>
          <label><input name="actionType" type="radio"
            onChange={() => onClick('image')}
            checked={this.props.wordAction === 'image'}
            /> Image</label>
          <label><input name="actionType" type="radio"
            onChange={() => onClick('speech')}
            checked={this.props.wordAction === 'speech'}
            /> Speech</label>
          <label><input name="actionType" type="radio"
            onClick={() => onClick('keyword')}
            checked={this.props.wordAction === 'keyword'}
            /> + <input type="text" size="10"
            value={this.props.wordActionKeyword}
            onChange={(event) => onChange(event.target.value)}/></label>
          <label><input name="actionType" type="radio"
            onClick={() => onClick('wikipedia')}
            checked={this.props.wordAction === 'wikipedia'}
            /> Wikipedia</label>
          <label><input name="actionType" type="radio"
            onClick={() => onClick('twitter')}
            checked={this.props.wordAction === 'twitter'}
            /> Twitter</label>
          <label><input name="actionType" type="radio"
            onClick={() => onClick('tumblr')}
            checked={this.props.wordAction === 'tumblr'}
            /> Tumblr</label>
        </Col>
        <Col xs={4} md={3}>
        <div style={styles.storyModeButton} className='text-right'>
        <a href="#" onClick={onClickStory}>Story &#x25B8;</a>
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
