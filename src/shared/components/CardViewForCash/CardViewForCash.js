import React from "react";
import { Grid, Icon, Paper, Typography } from "@mui/material";

function CardViewForCash(props) {
  return (
    <Grid item md={4}>
      <Paper
        elevation={3}
        sx={{
          padding: "10px 10px",
          boxShadow: "0px 3px 5px " + props.contentColor,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <Typography variant="h6">{props.contentTitle}</Typography>
            <Typography variant="h5">{props.contentValue}</Typography>
          </Grid>
          <Grid item xs={2} sx={{ margin: "auto 0px" }}>
            <Icon style={{ color: props.contentColor }}>
              {props.contentIcon}
            </Icon>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default CardViewForCash;
