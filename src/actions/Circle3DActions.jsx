import * as types from '../ActionTypes.jsx';

// 3D Button clicked
export const threeDMode = () => {
  return { type: types.START_3D_MODE };
};

export const exit3DMode = () => {
  return { type: types.CIRCLE_MODE };
}
