import React, { PropTypes } from 'react';
import CirclePageNavBar from './CirclePageNavBar.jsx';
import { FormGroup, ControlLabel, FormControl, Grid, Row, Col, InputGroup, Glyphicon} from 'react-bootstrap';

export default class StoryIndex extends React.Component {
  render() {
    return (
      <div  style={{marginTop: '100px'}}>
        <CirclePageNavBar />
      </div>
    );
  }
}
