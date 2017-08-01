import * as types from '../ActionTypes.jsx';
import Word from '../models/Word.jsx';

// 3D Button clicked
export const threeDMode = () => {
  return { type: types.START_3D_MODE };
};

export const exit3DMode = () => {
  return { type: types.CIRCLE_MODE };
}

export const goNextRoom = (floorStatus, direction) => {
  return { type: types.GO_NEXT_ROOM, direction };
}
