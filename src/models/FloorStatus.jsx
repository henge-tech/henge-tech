import I from 'immutable';
import Word from './Word.jsx';

const floorStatusDefault = {
  floorData: null,
  floor: -1,
  mode: 'loading',
  words: null,
  pattern: null,
  behaviorName: 'speak',
  behaviorServiceName: 'Twitter*',
  indexBehaviorName: 'move',
  wordSearchKeyword: '意味',
  floorPos: 0,
  speechSpeed: 0,
  showImage: true,
  selectedImages: null,
  lowResImages: null,
  lowResLevel: 0,
  indexPickupImage: 1,
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
      selectedImages: this.selectedImages,
      lowResImages: this.lowResImages,
      lowResLevel: this.lowResLevel,
      speechSpeed: this.speechSpeed,
      indexPickupImage: this.indexPickupImage,
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
    props.lowResImages = this.createImageFlagList(false, props.words.size);
    props.selectedImages = this.createImageFlagList(false, props.words.size);
    return new FloorStatus(props);
  }

  createWordList(floorPos, props = null) {
    if (props === null) {
      props = this.props();
    }
    const circleData = props.floorData.circles[floorPos];
    return Word.createListFromArray(props.pattern, circleData.words, circleData.imageExts, true);
  }


  wordIndexSequenceForSpeaking(part) {
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
      props.words = Word.createFloorIndex(this.floorData, this.indexPickupImage);
      props.pattern = 'floor ' + props.floor;
      props.floorPos = 0;

      if (props.mode == '3d') {
        props.mode = '3dIndex';
      } else {
        props.mode = 'circleIndex';
        let includesLowRes = props.lowResImages.includes(true);
        props.lowResImages = this.createImageFlagList(includesLowRes, props.words.size);
        props.selectedImages = this.createImageFlagList(false, props.words.size);
      }

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
    let includesLowRes = this.lowResImages.includes(true);
    props.lowResImages = this.createImageFlagList(includesLowRes, props.words.size);
    props.selectedImages = this.createImageFlagList(false, props.words.size);

    return new FloorStatus(props);
  }

  toggleShowImage() {
    return this.update({ showImage: !this.showImage });
  }

  toggleCircleImagesResolution() {
    let allLowRes = !this.lowResImages.includes(false);
    let switchToLowRes = !allLowRes;

    let lowResLevel = this.lowResLevel;
    if (switchToLowRes && lowResLevel == 0) {
      lowResLevel = 1;
    }
    return this.update({
      showImage: true,
      lowResImages: this.createImageFlagList(switchToLowRes),
      lowResLevel: lowResLevel
    });
  }

  createImageFlagList(flag, size = null) {
    if (size === null) {
      size = this.words.size;
    }
    let flags = [];
    for (let i = 0; i < size; i++) {
      flags[i] = flag;
    }
    return new I.List(flags);
  }

  changeCircleImagesResolution() {
    let allHighRes = !this.lowResImages.includes(true);

    let lowResLevel;
    if (allHighRes) {
      lowResLevel = 1;
    } else {
      lowResLevel = this.lowResLevel + 1;
      if (lowResLevel > 3) {
        lowResLevel = 0;
      }
    }

    let props = {
      showImage: true,
      lowResImages: this.createImageFlagList(lowResLevel > 0),
      lowResLevel: lowResLevel,
    }
    return this.update(props);
  }

  selectedWords() {
    let words = this.words.map((w) => { return w.text; });

    const isNotSelected = this.selectedImages.includes(false);
    const isSelected = this.selectedImages.includes(true);
    if (isNotSelected && isSelected) {
      words = words.filter((v, i) => {
        return this.selectedImages.get(i);
      });
    }
    return words;
  }

  switchSingleImageResolution(index, isLowRes) {
    let lowResImages = this.lowResImages.set(index, isLowRes);
    return this.update({
      // showImage: true,
      lowResImages: lowResImages
    });
  }

  toggleWordSelection(index) {
    let selected = this.selectedImages.get(index);
    let selectedImages = this.selectedImages.set(index, !selected);
    return this.update({
      selectedImages: selectedImages
    });
  }

  toggleAllWordsSelection() {
    const includesNotSelectedImage = this.selectedImages.includes(false);
    let selectedImages = this.createImageFlagList(includesNotSelectedImage);
    return this.update({
      selectedImages: selectedImages
    });
  }

  switchQuaterImagesResolution(part, isLowRes) {
    let unit = this.words.size / 4;
    let lowResImages = this.lowResImages;
    for (let i = unit * part; i < unit * (part + 1); i++) {
      lowResImages = lowResImages.set(i, isLowRes);
    }
    return this.update({
      // showImage: true,
      lowResImages: lowResImages
    });
  }

  switchWordBehavior(name) {
    if (this.roomType() == 'index') {
      return this.update({ indexBehaviorName: name });
    } else if (name == 'services') {
      return this.update({
        lowResImages: this.createImageFlagList(false),
        behaviorName: name
      });
    } else {
      return this.update({ behaviorName: name });
    }
  }

  isWordSelectMode() {
    return (this.behaviorName == 'services' && this.behaviorServiceName.match(/\*$/) && this.roomType() != 'index');
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

  setIndexPickupImage(quater) {
    let words = Word.createFloorIndex(this.floorData, quater);
    return this.update({
      words: words,
      indexPickupImage: quater
    });
  }
}
