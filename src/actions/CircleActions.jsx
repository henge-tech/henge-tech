import * as types from '../ActionTypes.jsx';

export const windowResize = (width, height) => ({ type: types.WINDOW_RESIZE, width, height });
export const circleMode = () => ({ type: types.CIRCLE_MODE });

