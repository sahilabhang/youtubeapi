import React, { useState } from "react";
import { Grid, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import VideoCardMUI from "./ui/VideoCardMUI";
import { REMOVE_FROM_FAVOURITES } from "../types";

export default function Favourites() {
  const data = useSelector((state) => state.favourites);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const removeFavouriteHandler = (id) => {
    dispatch({ type: REMOVE_FROM_FAVOURITES, payload: id });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <h1>Favourites</h1>
      {data.favourites.length === 0 && <h1>No favourites yet</h1>}
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {data.favourites.map((video) => (
          <Grid key={video.videoId} item xs={12} md={6} style={{ padding: "5px" }}>
            <VideoCardMUI
              key={video.videoId}
              videoId={video.videoId}
              thumbnail={video.thumbnail}
              name={video.name}
              description={video.description}
              totalLikesCount={video.totalLikesCount}
              totalCommentsCount={video.totalCommentsCount}
              totalViewsCount={video.totalViewsCount}
              removeFavouriteHandler={removeFavouriteHandler}
              isFavourite={false}
            />
          </Grid>
        ))}
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Removed from favourites."
      />
    </div>
  );
}
