import * as types from '../ActionTypes.jsx';

export const windowResize = (width, height) => ({ type: types.WINDOW_RESIZE, width, height });
export const circleMode = () => ({ type: types.CIRCLE_MODE });

export const gotoRoom = (floorStatus, pattern) => {
  return { type: types.GO_TO_ROOM, floorStatus, pattern };
}

export const gotoFloor = (floorStatus, floor) => {
  return { type: types.GO_TO_FLOOR, floorStatus, floor };
}
