import React, { PropTypes } from 'react';
import CirclePageNavBar from './CirclePageNavBar.jsx';

export default class CircleIndex extends React.Component {
  render() {
    let patternsList = [];
    let i = 0;
    let stories = this.props.stories;
    this.props.patterns.forEach((pattern) => {
      if (stories.indexOf(pattern) >= 0) {
        patternsList.push(
          <li key={'pattern-' + i}><a href={pattern + '.html'}>{pattern}</a> (s)</li>
        );
      } else {
        patternsList.push(
          <li key={'pattern-' + i}><a href={pattern + '.html'}>{pattern}</a></li>
        );
      }
      i += 1;
    });

    return (
        <div>
        <ol style={{marginTop: '100px'}}>
        {patternsList}
        </ol>
        <CirclePageNavBar />
      </div>
    );
  }
}
