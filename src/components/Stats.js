import { Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PieChart } from "react-minimal-pie-chart";

const paperStyle = {
  textAlign: "center",
  height: "230px",
};

const fontStyle = {
  fontSize: "30px",
  padding: "70px",
  fontWeight: "bold",
  overflow: "hidden",
};

export default function Stats() {
  const [statsData, setStatsData] = useState({});
  const data = useSelector((state) => state);

  const calculateFavouriteVideos = () => {
    setStatsData((prevState) => {
      return {
        ...prevState,
        totalFavouriteVideos: data.favourites.favourites.length,
      };
    });
  };
  const getAverageVideos = () => {
    let sumOfViews = 0;
    let sumOfFavouriteVideoLikes = 0;
    if (data.favourites.favourites.length > 0) {
      for (var i = 0; i < data.favourites.favourites.length; i++) {
        sumOfViews =
          sumOfViews + parseInt(data.favourites.favourites[i].totalViewsCount);
        sumOfFavouriteVideoLikes =
          sumOfFavouriteVideoLikes +
          parseInt(data.favourites.favourites[i].totalLikesCount);
      }
    }

    let averageViews = sumOfViews / data.favourites.favourites.length;

    setStatsData((prevState) => {
      return {
        ...prevState,
        sumOfViews,
        avgerageViewOfFavouriteVideos: averageViews,
        sumOfFavouriteVideoLikes,
      };
    });
  };

  useEffect(() => {
    calculateFavouriteVideos();
    getAverageVideos();
  }, []);

  return (
    <div>
      <h1>Statistics</h1>
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Typography style={{ textAlign: "center" }}>
            Total Views Analysis Chart
            {statsData.totalFavouriteVideos === 0 ? (
              <h1>Please add favourites to see analysis</h1>
            ) : (
              ""
            )}
          </Typography>
          <PieChart
            data={[
              {
                title: "Total Views",
                value: statsData.sumOfViews,
                color: "#E38627",
              },
              {
                title: "Average Views",
                value: statsData.avgerageViewOfFavouriteVideos,
                color: "#6A2135",
              },
            ]}
          />
        </Grid>
        <Grid container item xs={12} md={7} spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper style={paperStyle}>
              <Typography>Total Number of searches -</Typography>
              <Typography style={fontStyle}>
                {data.stats.totalNumberOfSearches}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper style={paperStyle}>
              <Typography>Sum of all followers -</Typography>
              <Typography style={fontStyle}>
                {data.stats.sumOfFollowers}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper style={paperStyle}>
              <Typography>Sum of videos fetched - </Typography>
              <Typography style={fontStyle}>
                {data.stats.sumOfVideosFetched}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper style={paperStyle}>
              <Typography>Total favourite videos -</Typography>
              <Typography style={fontStyle}>
                {statsData.totalFavouriteVideos}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper style={paperStyle}>
              <Typography>Sum of favourite Video Like Count -</Typography>
              <Typography style={fontStyle}>
                {statsData.sumOfFavouriteVideoLikes}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper style={paperStyle}>
              <Typography>Average views - </Typography>
              <Typography style={fontStyle}>
                {statsData.avgerageViewOfFavouriteVideos}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
