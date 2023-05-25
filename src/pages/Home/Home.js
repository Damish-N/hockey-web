import React from "react";
import { Grid } from "@material-ui/core";
import style from "./Home.module.css";

function Home(props) {
  return (
    <Grid style={{ maxWidth: "100%", overflow: "hidden" }}>
      <Grid className={style.background} />
      <Grid className={style.heading}>
        <h5>
          WELCOME TO <br /> UNIVERSITY OF COLOMBO
          <br /> HOCKEY
        </h5>
        <button className={style.headingBtn}>ABOUT US</button>
      </Grid>
    </Grid>
  );
}

export default Home;
