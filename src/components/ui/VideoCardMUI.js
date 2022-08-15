import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useDispatch } from "react-redux";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Snackbar from "@mui/material/Snackbar";
import { ADD_TO_FAVOURITES } from "../../types";

export default function VideoCardMUI(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const addToFavouritesHandler = (video) => {
    dispatch({ type: ADD_TO_FAVOURITES, payload: video });
    setOpen(true);
  };

  return (
    <Card sx={{ display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        height="90px"
        width="120px"
        src={props.thumbnail}
        alt="Thumbnail"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "0 0 auto" }}>
          <Typography component="div" variant="h5">
            {props.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {props.description.substring(0, 200) + "..."}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          {props.type !== "channel" ? (
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                Total Likes Count - {props.totalLikesCount}
              </Grid>
              <Grid item xs={6}>
                Total Comments Count - {props.totalCommentsCount}
              </Grid>
              <Grid item xs={6}>
                Total Views Count - {props.totalViewsCount}
              </Grid>
              <Grid item xs={6}>
                {props.isFavourite ? (
                  <IconButton
                    variant="contained"
                    onClick={() => addToFavouritesHandler(props)}
                    title="Fav"
                  >
                    <FavoriteIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    variant="contained"
                    onClick={() => props.removeFavouriteHandler(props.videoId)}
                  >
                    <FavoriteIcon style={{ color: "red" }} />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          ) : (
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                Total Subs Count - {props.subscriberCount}
              </Grid>
              <Grid item xs={6}>
                Total Videos Count - {props.videoCount}
              </Grid>
              <Grid item xs={6}>
                Total Views Count - {props.channelViewCount}
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>
      <div>
        {" "}
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Added to favourites."
        />
      </div>
    </Card>
  );
}
