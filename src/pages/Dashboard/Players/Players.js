import React from "react";
import { Grid } from "@mui/material";
import { Button, Divider } from "@material-ui/core";
import Styles from "./Players.module.css";

function Players(props) {
  return (
    <Grid container className={Styles.mainContainer} style={{ width: "85%" }}>
      <Grid item xs={12} className={Styles.headingContainer}>
        <h3>CURRENT PLAYERS</h3>
        <Button
          variant="contained"
          style={{ background: "#750077FF", color: "white" }}
        >
          Add Player
        </Button>
      </Grid>
      <Divider />
      <Grid>Hello</Grid>
    </Grid>
  );
}

export default Players;
