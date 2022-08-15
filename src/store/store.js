import { combineReducers, createStore } from "redux";
import favouriteReducer from "./reducers/favourites-reducer";
import statsReducer from "./reducers/stats-reducer";
import searchReducer from "./reducers/search-reducer";

const store = createStore(
  combineReducers({
    favourites: favouriteReducer,
    stats: statsReducer,
    search: searchReducer,
  })
);

export default store;
