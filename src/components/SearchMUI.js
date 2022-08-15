import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import VideoCardMUI from "./ui/VideoCardMUI";
import axios from "../axios-instance";
import InfiniteScroll from "react-infinite-scroll-component";
import { Snackbar } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import Loading from "./ui/Loading";

import {
  ADD_SEARCH_COUNT,
  CHANNEL_DATA,
  CLEAR_SEARCH_HISTORY_ARRAY,
  NEXT_PAGE_TOKEN,
  SEARCH_DATA_ARRAY,
  SUM_OF_FOLLOWERS,
  SUM_OF_VIDEOS_FETCHED,
} from "../types";

export default function SearchMUI() {
  let data = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const API_KEY = process.env.REACT_APP_API_KEY;
  const searchArray = data.searchArray;

  const [searchText, setSearchText] = useState("");
  const [videoStatsArray, setVideoStatsArray] = useState([]);
  const [channelID, setChannelId] = useState(null);
  const [searchMore, setSearchMore] = useState(
    data.channelData.id ? true : false
  );
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onChangeHandler = (e) => {
    setSearchText(e.target.value);
  };

  const gotError = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchVideos = async (channelId) => {
    if (!channelId) {
      channelId = data.channelData.id;
    }
    let channelVideos;

    try {
      if (data.nextPageToken !== null) {
        channelVideos = await axios.get(
          `https://youtube.googleapis.com/youtube/v3/search?part=snippet&pageToken=${data.nextPageToken}&channelId=${channelId}&key=${API_KEY}&maxResults=10`
        );
      } else {
        channelVideos = await axios.get(
          `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&key=${API_KEY}&maxResults=10`
        );
      }

      dispatch({
        type: NEXT_PAGE_TOKEN,
        payload: channelVideos.data.nextPageToken,
      });

      // Fetching video statistics
      let vidArr = [...channelVideos.data.items];

      for (var i = 0; i < vidArr.length; i++) {
        if (vidArr[i].id.kind === "youtube#channel") {
          const index = vidArr.indexOf(vidArr[i]);
          vidArr.splice(index, 1);
        }
      }

      for (var i = 0; i < vidArr.length; i++) {
        let vidDetails;
        try {
          vidDetails = await axios.get(
            `/videos?part=snippet, statistics&id=${vidArr[i].id.videoId}&key=${API_KEY}`
          );
        } catch (error) {
          console.log(error.message);
        }
        vidArr[i] = vidDetails.data.items[0];
      }

      dispatch({ type: SUM_OF_VIDEOS_FETCHED, payload: vidArr.length });
      dispatch({ type: SEARCH_DATA_ARRAY, payload: vidArr });
      setSearchMore(true);
    } catch (error) {
      gotError();
      console.log(error.message);
    }
  };

  const onSearchHandler = async () => {
    dispatch({ type: ADD_SEARCH_COUNT });
    dispatch({ type: CLEAR_SEARCH_HISTORY_ARRAY });
    setIsLoading(true);
    try {
      let channelData = await axios.get(
        `/search?part=snippet&q=${searchText}&key=${API_KEY}&maxResults=10`
      );

      const channelId = channelData.data.items[0].id.channelId;
      setChannelId(channelId);
      let channelStatisticsData = await axios.get(
        `/channels?part=snippet, statistics&id=${channelId}&key=${API_KEY}`
      );

      // dispatch({ type: CHANNEL_DATA, payload: channelData.data.items[0] });

      fetchVideos(channelId);

      dispatch({
        type: SUM_OF_FOLLOWERS,
        payload: channelStatisticsData.data.items[0].statistics.subscriberCount,
      });
      dispatch({
        type: CHANNEL_DATA,
        payload: channelStatisticsData.data.items[0],
      });
      setIsLoading(false);
    } catch (error) {
      gotError();
      setIsLoading(false);
      console.log(error.message);
    }
  };

  return (
    <div>
      <h1>Search Channels</h1>
      {/* Input */}
      <Grid container spacing={2}>
        <Grid xs={12}>
          <TextField
            fullWidth
            label="Enter Channel Name"
            id="fullWidth"
            style={{ maxWidth: "80%" }}
            onChange={onChangeHandler}
          />
        </Grid>
        <Grid xs={12}>
          <Button
            variant="contained"
            style={{
              padding: "14px 40px",
              margin: "10px",
              backgroundColor: "red",
            }}
            onClick={onSearchHandler}
          >
            Search
          </Button>
        </Grid>
      </Grid>
      {/* Data cards */}
      {isLoading && <Loading />}
      {data.channelData.id ? (
        <div>
          <h1>Channel Data</h1>
          <VideoCardMUI
            thumbnail={data.channelData.snippet.thumbnails.default.url}
            name={data.channelData.snippet.title}
            description={data.channelData.snippet.description}
            isFavourite={true}
            subscriberCount={data.channelData.statistics.subscriberCount}
            videoCount={data.channelData.statistics.videoCount}
            channelViewCount={data.channelData.statistics.videoCount}
            type="channel"
          />
        </div>
      ) : (
        ""
      )}
      {searchArray.length !== 0 ? <h1>List of videos</h1> : ""}

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Please try again and check entered data."
      />

      <InfiniteScroll
        dataLength={searchArray.length}
        next={() => fetchVideos(channelID)}
        hasMore={searchMore}
        loader={
          <div style={{ textAlign: "center" }}>
            <h4>
              Loading...
              <Loading />
            </h4>
          </div>
        }
      >
        <div>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {searchArray.map((video) => (
              <Grid
                key={video.id}
                item
                xs={12}
                md={6}
                style={{ padding: "5px" }}
              >
                <VideoCardMUI
                  videoId={video.id}
                  thumbnail={video.snippet.thumbnails.default.url}
                  name={video.snippet.title}
                  description={video.snippet.description}
                  totalLikesCount={video.statistics.likeCount}
                  totalCommentsCount={video.statistics.commentCount}
                  totalViewsCount={video.statistics.viewCount}
                  isFavourite={true}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </InfiniteScroll>
    </div>
  );
}
