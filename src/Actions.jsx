import * as types from './ActionTypes.jsx';

export const windowResize = (width, height) => ({ type: types.WINDOW_RESIZE, width, height });
export const speakWords = (words, part) => ({ type: types.SPEAK_WORDS, words, part });
export const actionWord = (word) => ({ type: types.ACTION_WORD, word });
export const switchWordAction = (name) => ({ type: types.SWITCH_WORD_ACTION, name });
export const updateWordActionKeyword = (keyword) => ({ type: types.UPDATE_WORD_ACTION_KEYWORD, keyword });
export const storyMode = () => ({ type: types.STORY_MODE });
export const circleMode = () => ({ type: types.CIRCLE_MODE });
export const toggleStoryWords = index => ({ type: types.TOGGLE_STORY_WORDS, index: index });

export const start3DMode = () => ({ type: types.START_3D_MODE });
export const prepare3DCanvas = () => ({ type: types.PREPARE_3D_CANVAS });
export const render3D = (words, w, h) => ({ type: types.RENDER_3D, words, w, h });

export const updateSearchQuery = (q) => ({ type: types.UPDATE_SEARCH_QUERY, q});
export const changeIndexFilter = (filter) => ({ type: types.CHANGE_INDEX_FILTER, filter});
export const speakIndexWords = id => ({ type: types.SPEAK_INDEX_WORDS, id});
export const toggleSpeakAllCircles = (patterns) => ({ type: types.TOGGLE_SPEAK_ALL_CIRCLES, patterns});

export const speakStoryWords = (words, part) => ({ type: types.SPEAK_STORY_WORDS, words, part });
export const toggleStoryIndexWords = (id, index) => ({ type: types.TOGGLE_STORY_INDEX_WORDS, id, index });
