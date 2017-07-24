import * as types from '../ActionTypes.jsx';
import Word from '../models/Word.jsx';

// 3D Button clicked
export const threeDMode = () => {
  return { type: types.START_3D_MODE };
};

export const exit3DMode = () => {
  return { type: types.CIRCLE_MODE };
}

export const goNextRoom = (floorPos, direction, threeD) => {
  if (direction == 'back') {
    const floorNum = floorData.floor;
    const words = Word.createFloorIndex();
    return { type: types.GO_INDEX_ROOM, floorNum, words, threeD };
  }

  if (direction == 'left') {
    floorPos -= 1;
    if (floorPos < 0) {
      floorPos = floorData.circles.length - 1;
    }
  } else if (direction == 'right') {
    floorPos += 1;
    if (floorData.circles.length <= floorPos) {
      floorPos = 0;
    }
  } else {
    floorPos = direction;
  }

  const circleData = floorData.circles[floorPos];
  const pattern = circleData.pattern;
  const words = Word.createListFromArray(pattern, circleData.words, circleData.imageExts, true);
  return { type: types.GO_NEXT_ROOM, floorPos, pattern, words, threeD };
}
