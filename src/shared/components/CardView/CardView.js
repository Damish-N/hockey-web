import React from "react";
import Styles from "./CardView.module.css";
import { Grid, Paper, Typography } from "@material-ui/core";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import ViewDayIcon from "@mui/icons-material/ViewDay";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

function CardView(props) {
  return (
    <Grid className={Styles.itemContainer} xs={10} md={4}>
      <Paper className={Styles.item_paper}>
        <div className={Styles.item_paper_Container}>
          {props.childComponent === "AccessibilityNewIcon" ? (
            <AccessibilityNewIcon />
          ) : props.childComponent === "ViewDayIcon" ? (
            <ViewDayIcon></ViewDayIcon>
          ) : (
            <MonetizationOnIcon></MonetizationOnIcon>
          )}
          <div className={Styles.item_paper_Container_Secondry}>
            <Typography variant={"h5"} className={Styles.textColor}>
              {props.value}
            </Typography>
            <Typography
              variant={"subtitle2"}
              className={Styles.secondTextColor}
            >
              {props.description}
            </Typography>
          </div>
        </div>
      </Paper>
    </Grid>
  );
}

export default CardView;
