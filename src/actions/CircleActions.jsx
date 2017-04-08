import * as types from '../ActionTypes.jsx';

export const windowResize = (width, height) => ({ type: types.WINDOW_RESIZE, width, height });
export const storyMode = () => ({ type: types.STORY_MODE });
export const circleMode = () => ({ type: types.CIRCLE_MODE });

