import React, { useState } from "react";
import Styles from "./Matches.module.css";
import { Button, Chip, Grid, Paper } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import MatchStats from "../../../shared/components/MatchStats/MatchStats";
import CreateMatchDialog from "../../../shared/components/CreateMatchDialog/CreateMatchDialog";

ChartJS.register(ArcElement, Tooltip, Legend);
export const data = {
  labels: ["Win", "LOSS", "DRAWS"],
  datasets: [
    {
      label: "# of Number",
      data: [12, 19, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
      ],
      borderWidth: 0.1,
    },
  ],
};

function Matches(props) {
  const [openCreatDialog, setOpenCreatDialog] = useState(false);
  const changeDialogState = () => {
    setOpenCreatDialog(false);
  };
  return (
    <Grid container spacing={2} sx={{ margin: "0 auto", width: "95%" }}>
      <Grid item xs={12} md={8}>
        <Paper
          sx={{ maxHeight: "100%", minHeight: "80%", overflow: "auto" }}
          className={Styles.paperPadding}
        >
          <Grid className={Styles.headingButtonArea}>
            <h1 style={{ color: "#ffffff" }}>Matches</h1>
            <Button
              color={"secondary"}
              variant="contained"
              onClick={() => {
                setOpenCreatDialog(true);
              }}
              className={Styles.button}
              sx={{ color: "white" }}
            >
              Add New Match
            </Button>
          </Grid>{" "}
          <MatchStats />
          <MatchStats />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper className={Styles.paperPadding}>
          <h1 style={{ color: "#ffffff" }}>Match Stats</h1>
        </Paper>
        <Paper sx={{ padding: "15px" }}>
          <Pie data={data} />
          <Paper className={Styles.status}>
            <Chip
              color={"primary"}
              sx={{
                color: "#ffffff",
                padding: "0.2rem",
              }}
              size="small"
              label="Played-40"
            />
            <Chip
              color={"primary"}
              sx={{
                color: "#ffffff",
                padding: "0.2rem",
              }}
              size="small"
              label="Won-12"
            />
            <Chip
              color={"primary"}
              sx={{
                color: "#ffffff",
                padding: "0.2rem",
              }}
              size="small"
              label="Lost-12"
            />
            <Chip
              color={"primary"}
              sx={{
                color: "#ffffff",
                padding: "0.2rem",
              }}
              size="small"
              label="Draw-12"
            />
          </Paper>
        </Paper>
      </Grid>
      <CreateMatchDialog
        open={openCreatDialog}
        changeTheDialogState={changeDialogState}
      ></CreateMatchDialog>
    </Grid>
  );
}

export default Matches;
