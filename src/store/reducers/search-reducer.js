import {
  CHANNEL_DATA,
  CLEAR_SEARCH_HISTORY_ARRAY,
  NEXT_PAGE_TOKEN,
  SEARCH_DATA_ARRAY,
} from "../../types";

const initialState = {
  channelData: {},
  searchArray: [],
  nextPageToken: null,
};
const searchReducer = (state = initialState, action) => {
  if (action.type === SEARCH_DATA_ARRAY) {
    return {
      ...state,
      searchArray: [...state.searchArray, ...action.payload],
    };
  }
  if (action.type === CLEAR_SEARCH_HISTORY_ARRAY) {
    return {
      ...state,
      searchArray: [],
    };
  }

  if (action.type === NEXT_PAGE_TOKEN) {
    return {
      ...state,
      nextPageToken: action.payload,
    };
  }

  if (action.type === "CHANNEL_DATA") {
    return {
      ...state,
      channelData: action.payload,
    };
  }

  return state;
};

export default searchReducer;
