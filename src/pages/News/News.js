import { Grid } from "@mui/material";
import React from "react";
import Carousel from "../../shared/components/Carousel/Carousel";
import NewsCard from "../../shared/components/NewsCard/NewsCard";
import style from "./News.module.css";

function News() {
  return (
    <Grid container className={style.wrapper}>
      <Grid item xs={12}>
        <Carousel />
      </Grid>
      <Grid item xs={3}>
        <NewsCard />
      </Grid>
      <Grid item xs={3}>
        <NewsCard />
      </Grid>
      <Grid item xs={3}>
        <NewsCard />
      </Grid>
      <Grid item xs={3}>
        <NewsCard />
      </Grid>
    </Grid>
  );
}

export default News;
