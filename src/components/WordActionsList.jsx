import React, { PropTypes} from 'react';

export default class WordActionsList extends React.Component {

  render() {
    // console.log('render2');
    let onClick = this.props.onClickWordAction;
    let onChange = this.props.onChangeWordActionKeyword;

    return (
        <div className="word-actions">
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
        </div>
    )
  }
}

WordActionsList.propTypes = {
  wordAction: PropTypes.string.isRequired,
  wordActionKeyword: PropTypes.string.isRequired,
  onClickWordAction: PropTypes.func.isRequired,
  onChangeWordActionKeyword: PropTypes.func.isRequired,
};
