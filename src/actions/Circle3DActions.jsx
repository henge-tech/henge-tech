import * as types from '../ActionTypes.jsx';

export const start3DMode = () => ({ type: types.START_3D_MODE });
export const prepare3DCanvas = () => ({ type: types.PREPARE_3D_CANVAS });
export const render3D = (words, w, h) => ({ type: types.RENDER_3D, words, w, h });
