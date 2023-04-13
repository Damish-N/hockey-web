import React from "react";
import { Grid } from "@mui/material";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import VerticalAlignTopIcon from "@mui/icons-material/VerticalAlignTop";
import CardViewForCash from "../../../shared/components/CardViewForCash/CardViewForCash";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import Styles from "../CashMangement/CashMangement.module.css";
import { Button } from "@material-ui/core";

function CashMangement(props) {
  return (
    <Grid container>
      <Grid container item spacing={2} md={12} sx={{ margin: "0px auto" }}>
        <CardViewForCash
          contentColor={"green"}
          contentTitle={"Credit Amount"}
          contentValue={"32500.50"}
          contentIcon={<VerticalAlignBottomIcon />}
        ></CardViewForCash>
        <CardViewForCash
          contentColor={"red"}
          contentTitle={"Debit Amount"}
          contentValue={"15800.50"}
          contentIcon={<VerticalAlignTopIcon />}
        ></CardViewForCash>
        <CardViewForCash
          contentColor={"orange"}
          contentTitle={"Total Amount"}
          contentValue={"32500.50"}
          contentIcon={<LocalAtmIcon />}
        ></CardViewForCash>
      </Grid>
      <Grid item xs={12} className={Styles.headingContainer}>
        <h2 style={{ margin: "2.5rem 0 " }}>All Transactions</h2>
        <Button
          variant="contained"
          style={{ background: "#750077FF", color: "white" }}
          onClick={() => "clicked transaction"}
        >
          Add a transaction
        </Button>
      </Grid>
    </Grid>
  );
}

export default CashMangement;
