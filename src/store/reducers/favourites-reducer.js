import { ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES } from "../../types";

let favourites = localStorage.getItem("favourites");
favourites = JSON.parse(favourites);

const initialState = {
  favourites: favourites ? favourites : [],
};

const favouriteReducer = (state = initialState, action) => {
  if (action.type === ADD_TO_FAVOURITES) {
    let updatedFavourites = [...state.favourites, action.payload];
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
    return {
      favourites: updatedFavourites,
    };
  }
  if (action.type === REMOVE_FROM_FAVOURITES) {
    let updatedFavourites = state.favourites.filter(
      (ele) => ele.videoId !== action.payload
    );
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
    return {
      favourites: updatedFavourites,
    };
  }
  return state;
};

export default favouriteReducer;
