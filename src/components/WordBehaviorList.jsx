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
      {xsHidden: true, xs: 0, md: 2},
      {xsHidden: false, xs: 10, md: 8},
      {xsHidden: false, xs: 2, md: 2}
    ];
    // cols[0].xsHidden = true;
    // cols[0].xs = 0;

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
    const serviceName = this.props.floorStatus.get('behaviorServiceName');
    const speechSpeed = this.props.floorStatus.get('speechSpeed');
    const onChangeService = (e) => {
      const serviceName = e.target.options[e.target.selectedIndex].text;
      this.props.onChangeService(serviceName);
    }
    const onChangeSpeed = (e) => {
      const speed = + e.target.options[e.target.selectedIndex].value;
      this.props.onChangeSpeechSpeed(speed);
    }
    let align = 'text-center';
    if (this.props.width <= 768) {
      align = 'text-left';
    }

    return (
      <Well className="word-behaviors">
        <Grid>
        <Row>
        <Col xsHidden={cols[0].xsHidden} xs={cols[0].xs} md={cols[0].md}>
        </Col>
        <Col xsHidden={cols[1].xsHidden} xs={cols[1].xs} md={cols[1].md} className={align}>
          <label><input name="behaviorType" type="radio"
            onChange={() => onChangeBehavior('speak')}
            checked={name === 'speak'}
            /> <select onChange={(e) => onChangeSpeed(e)}
            defaultValue={speechSpeed}>
              <option value={2}>Speak &raquo;&raquo;</option>
              <option value={1}>Speak &raquo;</option>
              <option value={0}>Speak</option>
              <option value={-1}>Speak &laquo;</option>
              <option value={-2}>Speak &laquo;&laquo;</option>
           </select></label>
          <label><input name="behaviorType" type="radio"
            onChange={() => onChangeBehavior('image')}
            checked={name === 'image'}
            /> Image</label>
          <label><input name="behaviorType" type="radio"
            onChange={() => onChangeBehavior('keyword')}
            checked={name === 'keyword'}
            /> <input type="text" size="10"
            value={this.props.floorStatus.get('wordSearchKeyword')}
            onFocus={(event) => onChangeBehavior('keyword')}
            onChange={(event) => onChangeKeyword(event.target.value)}/></label>
          <label><input name="behaviorType" type="radio"
            onChange={() => onChangeBehavior('webster')}
            checked={name === 'webster'}
            /> Webster</label>
          <label><input name="behaviorType" type="radio"
            onChange={() => onChangeBehavior('services')}
            checked={name === 'services'}
        /> <select onChange={(e) => onChangeService(e)}
             defaultValue={serviceName}
        >
              <option>Twitter*</option>
              <option>Google News*</option>
              <option>BrainyQuote</option>
              <option>Wikipedia</option>
              <option>Wikipedia Image</option>
              <option>Shutterstock</option>
              <option>Pixabay</option>
              <option>Flickr</option>
              <option>eBay</option>
              <option>Tumblr</option>
              <option>Instagram</option>
              <option>YouTube</option>
           </select></label>
        </Col>
        <Col xsHidden={cols[2].xsHidden} xs={cols[2].xs} md={cols[2].md}>
        <div style={styles.modeLinks} className="text-right">
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
    const speechSpeed = this.props.floorStatus.get('speechSpeed');
    const indexPickupImage = this.props.floorStatus.get('indexPickupImage');
    const onChangeSpeed = (e) => {
      const speed = + e.target.options[e.target.selectedIndex].value;
      this.props.onChangeSpeechSpeed(speed);
    }
    const onChangeIndexPickupImage = (e) => {
      const quater = e.target.options[e.target.selectedIndex].value;
      this.props.onChangeIndexPickupImage(quater);
    }
    return (
      <Well className="word-behaviors">
        <Grid>
        <Row>
        <Col xsHidden={cols[0].xsHidden} xs={cols[0].xs} md={cols[0].md}>
        </Col>
        <Col xsHidden={cols[1].xsHidden} xs={cols[1].xs} md={cols[1].md}>
          <label><input name="behaviorType" type="radio"
            onChange={() => onChangeBehavior('speak')}
            checked={name === 'speak'}
            /> <select onChange={(e) => onChangeSpeed(e)}
            defaultValue={speechSpeed}>
              <option value={2}>Speak &raquo;&raquo;</option>
              <option value={1}>Speak &raquo;</option>
              <option value={0}>Speak</option>
              <option value={-1}>Speak &laquo;</option>
              <option value={-2}>Speak &laquo;&laquo;</option>
           </select></label>
          <label><input name="behaviorType" type="radio"
            onChange={() => onChangeBehavior('move')}
            checked={name === 'move'}
            /> Move</label>
          <label><select onChange={(e) => onChangeIndexPickupImage(e)}
            defaultValue={indexPickupImage}>
            <option value={0}>Random</option>
            <option value={1}>1Q</option>
            <option value={2}>2Q</option>
            <option value={3}>3Q</option>
            <option value={4}>4Q</option>
          </select></label>
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
