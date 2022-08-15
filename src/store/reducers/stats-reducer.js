import { ADD_SEARCH_COUNT, SUM_OF_FOLLOWERS, SUM_OF_VIDEOS_FETCHED } from "../../types";

let stats = localStorage.getItem("stats");
stats = JSON.parse(stats);

if (!stats) {
  stats = {
    totalNumberOfSearches: 0,
    sumOfFollowers: 0,
    sumOfVideosFetched: 0,
  };
}
const initialState = {
  ...stats,
};

const statsReducer = (state = initialState, action) => {
  if (action.type === ADD_SEARCH_COUNT) {
    let stats = {
      ...state,
      totalNumberOfSearches: state.totalNumberOfSearches + 1,
    };
    localStorage.setItem("stats", JSON.stringify(stats));
    return {
      ...stats,
    };
  }
  if (action.type === SUM_OF_FOLLOWERS) {
    let stats = {
      ...state,
      sumOfFollowers: state.sumOfFollowers + parseInt(action.payload),
    };
    localStorage.setItem("stats", JSON.stringify(stats));
    return {
      ...stats,
    };
  }
  if (action.type === SUM_OF_VIDEOS_FETCHED) {
    let stats = {
      ...state,
      sumOfVideosFetched: state.sumOfVideosFetched + parseInt(action.payload),
    };
    localStorage.setItem("stats", JSON.stringify(stats));
    return {
      ...stats,
    };
  }
  return state;
};

export default statsReducer;

