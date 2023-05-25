import React from "react";
import { Grid, Skeleton } from "@mui/material";

function LoadingComponent(props) {
  return (
    <Grid>
      <Skeleton height={118} />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton height={85} />
    </Grid>
  );
}

export default LoadingComponent;
