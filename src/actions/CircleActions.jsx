import * as types from '../ActionTypes.jsx';

export const windowResize = (width, height) => ({ type: types.WINDOW_RESIZE, width, height });
export const circleMode = () => ({ type: types.CIRCLE_MODE });


export const goNextRoom = (floorStatus, direction) => {
  return { type: types.GO_NEXT_ROOM, direction };
}

export const updateFloorStatus = (floorStatus) => {
  return { type: types.UPDATE_FLOOR_STATUS, floorStatus };
}
