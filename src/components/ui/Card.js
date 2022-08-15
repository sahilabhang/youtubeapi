import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";

export default function VideoCard(props) {
  const dispatch = useDispatch();

  const addToFavouritesHandler = (video) => {
    dispatch({ type: "ADD_TO_FAVOURITES", payload: video });
  };

  return (
    <Card sx={{ display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        src={props.thumbnail}
        alt="Live from space album cover"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {props.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {props.description.split('. ')[0]}
          </Typography>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            pl: 1,
            pb: 1,
          }}
        >
          <Typography>like count - {props.totalViewsCount}</Typography>
          <Typography>comment count - {props.totalCommentsCount}</Typography>
          <Typography>view count - {props.totalViewsCount}</Typography>
          <Typography onClick={() => addToFavouritesHandler(props)}>
            Add to favourites
          </Typography>
          <Typography onClick={() => props.removeFavouriteHandler(props.videoId)}>
            Remove from favourites
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
