import React, { PropTypes} from 'react';
import { Button } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';
import CirclePageNavBar from './CirclePageNavBar.jsx';
import Word from './Word.jsx';

export default class Circle extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    // console.log('render');
    let unit = Math.PI * 2.0 / this.props.words.length;
    let center = { x: this.props.width / 2, y: 310 };
    let r = center.x * 0.8;
    if (r > 240) {
      r = 240;
    } else if (r < 120) {
      r = 120;
    }
    let styles = {
      container: {position: 'relative', height: '100px', width: '100%'},
      speakButton: {
        position: 'absolute',
        left: center.x - 15 + 'px',
        top: center.y + 'px',
      },
      partialSpeakButtons: []
    };

    let diff = [[1, -1], [1, 1], [-1, 1], [-1, -1]];
    for (let i = 0; i < 4; i++) {
      let d = 250;
      styles.partialSpeakButtons[i] = {
        position: 'absolute',
        left: center.x + r * diff[i][0] + 'px',
        top:  center.y + r * diff[i][1] + 'px',
      }
    }

    let wordList = [];
    for (let i = 0; i < this.props.words.length; i++) {
      let word = this.props.words[i];
      let x = Math.cos(unit * i - Math.PI / 2.0) * r + center.x;
      let y = Math.sin(unit * i - Math.PI / 2.0) * r + center.y;
      let fontSize = r * 0.1;
      if (fontSize > 24) {
        fontSize = 24;
      } else if (fontSize < 12) {
        fontSize = 12;
      }
      wordList[i] = (
        <Word
          key={'word-' + i}
          word={word}
          x={x}
          y={y}
          fontSize={fontSize}
          onClickWord={this.props.onClickWord}
          />
      );
    }
    let dummy = () => {
      alert(123);
    };

    let onClickWordAction = (name) => {
      this.props.onClickWordAction(name);
      // console.log(this.props.wordAction);
      // this.forceUpdate();
    }

    let onChangeWordActionKeyword = (event) => {
      this.props.onChangeWordActionKeyword(event.target.value);
    }

    return (
      <div style={styles.container} className="container">
        <Button
            onClick={() => this.props.onClickSpeakButton(this.props.words, -1)}
            style={styles.speakButton}
            className="btn-circle"
          ><Glyphicon glyph="volume-up" /></Button>
        <Button
            onClick={() => this.props.onClickSpeakButton(this.props.words, 0)}
            style={styles.partialSpeakButtons[0]}
            className="btn-circle"
          ><Glyphicon glyph="volume-up" /></Button>
        <Button
            onClick={() => this.props.onClickSpeakButton(this.props.words, 1)}
            style={styles.partialSpeakButtons[1]}
            className="btn-circle"
          ><Glyphicon glyph="volume-up" /></Button>
        <Button
            onClick={() => this.props.onClickSpeakButton(this.props.words, 2)}
            style={styles.partialSpeakButtons[2]}
            className="btn-circle"
          ><Glyphicon glyph="volume-up" /></Button>
        <Button
            onClick={() => this.props.onClickSpeakButton(this.props.words, 3)}
            style={styles.partialSpeakButtons[3]}
            className="btn-circle"
          ><Glyphicon glyph="volume-up" /></Button>
        <ul style={{ margin: 0, height: '640px' }}>
          {wordList}
      </ul>
        <div className="word-actions">
          <label><input name="actionType" type="radio"
            onChange={() => onClickWordAction('image')}
            checked={this.props.wordAction === 'image'}
            /> Image</label>
          <label><input name="actionType" type="radio"
            onChange={() => onClickWordAction('speech')}
            checked={this.props.wordAction === 'speech'}
            /> Speech</label>
          <label><input name="actionType" type="radio"
            onClick={() => onClickWordAction('keyword')}
            checked={this.props.wordAction === 'keyword'}
            /> + <input type="text" size="10"
            value={this.props.wordActionKeyword}
            onChange={onChangeWordActionKeyword}/></label>
          <label><input name="actionType" type="radio"
            onClick={() => onClickWordAction('wikipedia')}
            checked={this.props.wordAction === 'wikipedia'}
            /> Wikipedia</label>
          <label><input name="actionType" type="radio"
            onClick={() => onClickWordAction('twitter')}
            checked={this.props.wordAction === 'twitter'}
            /> Twitter</label>
          <label><input name="actionType" type="radio"
            onClick={() => onClickWordAction('tumblr')}
            checked={this.props.wordAction === 'tumblr'}
            /> Tumblr</label>
        </div>
        <CirclePageNavBar />
      </div>
    );
  }
}

Circle.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  words: PropTypes.arrayOf(PropTypes.shape({
    index: PropTypes.number.isRequired,
    word: PropTypes.string.isRequired
  })).isRequired,
  pattern: PropTypes.string.isRequired,
  wordAction: PropTypes.string.isRequired,
  wordActionKeyword: PropTypes.string.isRequired,
  onClickSpeakButton: PropTypes.func.isRequired,
  onClickWord: PropTypes.func.isRequired,
  onClickWordAction: PropTypes.func.isRequired,
  onChangeWordActionKeyword: PropTypes.func.isRequired,
};
