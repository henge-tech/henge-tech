import I from 'immutable';
import Word from './Word.jsx';

const floorStatusDefault = {
  floorData: null,
  floor: -1,
  mode: 'loading',
  words: null,
  pattern: null,
  behaviorName: 'speak',
  behaviorServiceName: 'Wikipedia',
  indexBehaviorName: 'move',
  wordSearchKeyword: '意味',
  floorPos: 0,
  speechSpeed: 0,
  showImage: true,
  showLowResImage: false,
  lowResLevel: 3,
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
      behaviorName: this.behaviorName,
      behaviorServiceName: this.behaviorServiceName,
      indexBehaviorName: this.indexBehaviorName,
      wordSearchKeyword: this.wordSearchKeyword,
      showImage: this.showImage,
      showLowResImage: this.showLowResImage,
      lowResLevel: this.lowResLevel,
      speechSpeed: this.speechSpeed,
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
    props.words = this.createWordList(floorPos, props);
    return new FloorStatus(props);
  }

  createWordList(floorPos, props = null) {
    if (props === null) {
      props = this.props();
    }
    const circleData = props.floorData.circles[floorPos];
    return Word.createListFromArray(props.pattern, circleData.words, circleData.imageExts, true);
  }


  wordSequenceForSpeaking(part) {
    let result = I.List();
    const size = this.words.size;

    const unit = size / 4;
    if (part == -1) {
      for (let i = 0; i < size; i++) {
        result = result.push(this.createWordList(i));
      }
    } else {
      for (let i = unit * part; i < unit * (part + 1); i++) {
        result = result.push(this.createWordList(i));
      }
    }

    return result;
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
      if (props.mode == '3dIndex') {
        props.mode = '3d';
      } else {
        props.mode = 'circle';
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

  toggleCircleImagesResolution() {
    return this.update({ showLowResImage: !this.showLowResImage });
  }

  changeCircleImagesResolution() {
    let level = this.lowResLevel - 1;
    if (level <= 0) {
      level = 3;
    }
    return this.update({ showLowResImage: true, lowResLevel: level });
  }

  switchWordBehavior(name) {
    if (this.roomType() == 'index') {
      return this.update({ indexBehaviorName: name });
    } else {
      return this.update({ behaviorName: name });
    }
  }

  switchWordBehaviorService(name) {
    return this.update({
      behaviorName: 'services',
      behaviorServiceName: name,
    });
  }

  setSpeechSpeed(speed) {
    if (this.roomType() == 'index') {
      return this.update({
        indexBehaviorName: 'speak',
        speechSpeed: speed
      })
    } else {
      return this.update({
        behaviorName: 'speak',
        speechSpeed: speed
      })
    }
  }

  switchMode(mode) {
    let type = this.roomType();
    let newMode;
    if (type == 'index') {
      if (mode == 'circle') {
        newMode = 'circleIndex';
      } else {
        newMode = '3dIndex';
      }
    } else {
      if (mode == 'circle') {
        newMode = 'circle';
      } else {
        newMode = '3d';
      }
    }
    return this.update({mode: newMode});
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
