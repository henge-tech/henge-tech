import I from 'immutable';
import Word from './Word.jsx';

const floorStatusDefault = {
  floorData: null,
  floor: -1,
  mode: 'loading',
  words: null,
  pattern: null,
  wordBehaviorType: 'speech',
  wordSearchKeyword: '意味',
  floorPos: 0,
  showImage: true,
};

const FloorStatusRecord = I.Record(floorStatusDefault);

export default class FloorStatus extends FloorStatusRecord {
  constructor(input = null) {
    if (input == null) {
      super();
    } else {
      const props = Object.assign({}, floorStatusDefault, input);
      super(props);
    }
  }

  props() {
    return {
      floorData: this.floorData,
      floor: this.floor,
      floorPos: this.floorPos,
      mode: this.mode,
      words: this.words,
      pattern: this.pattern,
      wordBehaviorType: this.wordBehaviorType,
      wordSearchKeyword: this.wordSearchKeyword,
      showImage: this.showImage,
    };
  }

  update(input) {
    const props = Object.assign({}, this.props(), input);
    return new FloorStatus(props);
  }

  setFloorData(floorData, floorPos, mode) {
    let props = this.props();
    props.mode = mode;
    props.floorData = floorData;
    props.floorPos = floorPos;
    props.floor = floorData.floor;
    const circleData = floorData.circles[floorPos];
    props.pattern = circleData.pattern;
    props.words = Word.createListFromArray(props.pattern, circleData.words, circleData.imageExts, true);
    return new FloorStatus(props);
  }

  goNextRoom(direction) {
    let props = this.props();
    if (direction == 'back') {
      if (props.mode == '3d') {
        props.mode = '3dIndex';
      } else {
        props.mode = 'circleIndex';
      }

      props.words = Word.createFloorIndex(this.floorData);
      props.pattern = 'floor ' + props.floor;
      props.floorPos = 0;

      return new FloorStatus(props);
    }

    if (direction == 'left') {
      props.floorPos -= 1;
      if (props.floorPos < 0) {
        props.floorPos = props.floorData.circles.length - 1;
      }
    } else if (direction == 'right') {
      props.floorPos += 1;
      if (props.floorData.circles.length <= props.floorPos) {
        props.floorPos = 0;
      }
    } else {
      if (props.mode = 'circleIndex') {
        props.mode = 'circle';
      } else if (props.mode = '3dIndex') {
        props.mode = '3d';
      }
      props.floorPos = direction;
    }

    const circleData = props.floorData.circles[props.floorPos];
    props.pattern = circleData.pattern;
    props.words = Word.createListFromArray(props.pattern, circleData.words, circleData.imageExts, true);

    return new FloorStatus(props);
  }

  toggleShowImage() {
    return this.update({ showImage: !this.showImage });
  }

  switchWordBehavior(name) {
    return this.update({ wordBehaviorType: name });
  }

  dimension() {
    if (this.mode == '3d' || this.mode == '3dIndex') {
      return 3;
    }
    return 2;
  }

  roomType() {
    if (this.mode == 'circleIndex' || this.mode == '3dIndex') {
      return 'index';
    }
    return 'circle';
  }

  goNextFloor(direction, cb) {
    const that = this;
    let floor = this.floor;
    if (direction == 'up') {
      floor -= 1;
      if (floor < 1) {
        return;
      }
    } else {
      floor += 1;
      if (floor > 83) {
        return;
      }
    }
    fetch('/floors/' + floor + '.json').then((response) => {
      return response.json();
    }).then((floorData) => {
      cb(this.setFloorData(floorData, 0, 'circleIndex').goNextRoom('back'));
    });
  }
}
