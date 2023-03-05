import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import playersServices from "../../../services/PlayersServices";
import DeleteIcon from "@mui/icons-material/Delete";
import dateSetUp from "../../constant/DateSetUp";

function CreateMatchDialog(props) {
  const dateObject = new Date();
  const date = dayjs(dateObject); // Convert the Date object to a Day.js object
  const [players, setPlayers] = useState([]);
  const [dupPlayers, setDupPlayers] = useState([]);
  const [scoreList, setScoreList] = useState([]);
  const [homeGoals, setHomeGoals] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState({});
  const [open, setOpen] = useState({ open: false, message: "" });

  useEffect(() => {
    playersServices.getPlayers().then((res) => {
      setPlayers(res.data);
      setDupPlayers(res.data);
    });
  }, []);

  const validates = (values) => {
    const errors = {};
    if (!values.homeSide) {
      errors.homeSide = "Required";
    }
    if (!values.awaySide) {
      errors.awaySide = "Required";
    } else if (values.awaySide.length > 20) {
      errors.awaySide = "Must be 20 characters or less";
    }
    if (values.homeGoals <= -1) {
      errors.homeGoals = "Cannot be minus";
    }
    if (values.awayGoals <= -1) {
      errors.awayGoals = "Cannot be minus";
    }
    if (!values.time) {
      errors.time = "Required";
    } else if (values.time > 60 || values.time < 0) {
      errors.time = "Must be 60 or less";
    }
    return errors;
  };
  const form = useFormik({
    initialValues: {
      homeSide: "UOC",
      awaySide: "",
      homeGoals: 0,
      wonBy: "home",
      awayGoals: 0,
      date: date,
      time: 0,
      homeSideGoalScorers: "",
      currentPlayerGoals: 1,
    },
    validate: validates,
    onSubmit: (values) => {
      if (values.homeGoals > 0 && scoreList.length === 0) {
        setOpen({ open: true, message: "Must add scorers" });
        setTimeout(() => {
          setOpen({ open: false, message: "" });
        }, 2000);
        return;
      } else {
        let goals = 0;
        scoreList.forEach((item) => {
          goals += item.goals;
        });
        if (goals !== values.homeGoals) {
          setOpen({
            open: true,
            message: "Must Be Equal home goals and scorers",
          });
          setTimeout(() => {
            setOpen({ open: false, message: "" });
          }, 2000);
          return;
        }
        setHomeGoals(0);
        setScoreList([]);
        const matchStats = {
          ...values,
          date: dateSetUp.format(values.date),
          homeSideGoalScorers: scoreList,
        };
        console.log(matchStats);
        // alert(JSON.stringify(values, null, 2));
        form.resetForm();
      }
      // setLoading(true);
    },
  });

  function selectGoalScores() {
    let id = form.values.homeSideGoalScorers;
    console.log(form.values.homeSideGoalScorers);
    // console.log(scoreList);
    if (id !== "") {
      let totalGoals = 0;
      //add the total number of goals in the score list
      scoreList.forEach((item) => {
        totalGoals += item.goals;
      });
      if (totalGoals + form.values.currentPlayerGoals <= homeGoals) {
        let player = players.find((player) => player.id === id);
        setPlayers(players.filter((player) => player.id !== id));
        setCurrentPlayer(player);
        form.values.homeSideGoalScorers = "";
        setScoreList([
          ...scoreList,
          {
            id: player.id,
            name: player.firstName + " " + player.lastName,
            goals: form.values.currentPlayerGoals,
          },
        ]);
      } else {
        setOpen({ open: true, message: "Cannot add more goals" });
        setTimeout(() => {
          setOpen(false);
        }, 2000);
      }
    }
  }

  return (
    <Grid>
      <Dialog open={props.open}>
        <DialogTitle>Create Match</DialogTitle>
        <DialogContent>
          {/*<DialogContentText >*/}
          {/*  */}
          {/*</DialogContentText>*/}
          <Grid sx={{ padding: "0.5rem 0.5rem" }}>
            <form onSubmit={form.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Home Side
                    </InputLabel>
                    <Select
                      name={"homeSide"}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={form.values.homeSide}
                      label="Home Side"
                      variant="outlined"
                      onChange={form.handleChange}
                    >
                      <MenuItem value={"UOC"}>UOC</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name={"awaySide"}
                    fullWidth
                    id="awaySide"
                    label="Away Side"
                    type="text"
                    variant="outlined"
                    value={form.values.awaySide}
                    onChange={form.handleChange}
                    error={
                      form.touched.awaySide && Boolean(form.errors.awaySide)
                    }
                    helperText={form.touched.awaySide && form.errors.awaySide}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    name={"homeGoals"}
                    fullWidth
                    id="homeGoals"
                    label="Home Goals"
                    type="number"
                    variant="outlined"
                    value={form.values.homeGoals}
                    // onChange={form.handleChange}
                    onChange={(e) => {
                      form.handleChange(e);
                      setHomeGoals(e.target.value);
                    }}
                    error={
                      form.touched.homeGoals && Boolean(form.errors.homeGoals)
                    }
                    helperText={form.touched.homeGoals && form.errors.homeGoals}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    name={"awayGoals"}
                    fullWidth
                    id="awayGoals"
                    label="Away Goals"
                    type="number"
                    variant="outlined"
                    value={form.values.awayGoals}
                    onChange={form.handleChange}
                    error={
                      form.touched.awayGoals && Boolean(form.errors.awayGoals)
                    }
                    helperText={form.touched.awayGoals && form.errors.awayGoals}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label-faculty">
                      Won By
                    </InputLabel>
                    <Select
                      name={"wonBy"}
                      labelId="demo-simple-select-label-faculty"
                      id="demo-simple-select-faculty"
                      value={form.values.wonBy}
                      label="Won By"
                      onChange={form.handleChange}
                    >
                      <MenuItem value={"home"}>UOC</MenuItem>
                      <MenuItem value={"away"}>Away</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      id={"date"}
                      name={"date"}
                      label="Date"
                      type="date"
                      value={form.values.date}
                      onChange={(date) => form.setFieldValue("date", date)}
                      // onChange={form.setFieldValue("date", date)}
                      renderInput={(params) => (
                        <TextField type="date" {...params} />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    name={"time"}
                    fullWidth
                    id="time"
                    label="Duration (Minutes)"
                    type="number"
                    variant="outlined"
                    value={form.values.time}
                    onChange={form.handleChange}
                    error={form.touched.time && Boolean(form.errors.time)}
                    helperText={form.touched.time && form.errors.time}
                  />
                </Grid>
                {homeGoals > 0 && (
                  <Grid item xs={12} md={12}>
                    <Typography
                      sx={{ paddingBottom: "0.55rem" }}
                      variant={"h6"}
                    >
                      Home Goal Scorers
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={7}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Home Side Goal Scorers
                          </InputLabel>
                          <Select
                            name={"homeSideGoalScorers"}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={form.values.homeSideGoalScorers}
                            label="Home Side Goal Scorers"
                            variant="outlined"
                            // onChange={form.handleChange}
                            onChange={(e) => {
                              form.handleChange(e);
                            }}
                          >
                            {players.map((player, index) => {
                              return (
                                <MenuItem key={index} value={player.id}>
                                  {player.firstName + " " + player.lastName}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={5}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            No Of Goals
                          </InputLabel>
                          <Select
                            name={"currentPlayerGoals"}
                            labelId="demo-simple-select-label-faculty"
                            id="demo-simple-select-faculty"
                            value={form.values.currentPlayerGoals}
                            label="No Of Goals"
                            onChange={form.handleChange}
                          >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          width: "80%",
                        }}
                        item
                        md={12}
                      >
                        {/*  add button with icon*/}
                        <Button
                          variant={"contained"}
                          onClick={() => {
                            selectGoalScores();
                          }}
                        >
                          Add
                        </Button>
                      </Grid>
                      <Grid item md={12}>
                        <TableContainer component={Paper}>
                          <Table
                            sx={{ minWidth: 200 }}
                            aria-label="simple table"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell>Player</TableCell>
                                <TableCell align="right">Goals</TableCell>
                                <TableCell align="right">Action</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {scoreList.map((row) => (
                                <TableRow
                                  key={row.id}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell component="th" scope="row">
                                    {row.name}
                                  </TableCell>
                                  <TableCell align="right">
                                    {row.goals}
                                  </TableCell>
                                  <TableCell align="right">
                                    <IconButton
                                      onClick={() => {
                                        console.log(row.id);
                                        setScoreList(
                                          scoreList.filter(
                                            (item) => item.id !== row.id
                                          )
                                        );
                                        let player = dupPlayers.find(
                                          (player) => player.id === row.id
                                        );
                                        setPlayers([...players, player]);
                                        // removeGoalScore(row.id);
                                      }}
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </form>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant={"contained"}
            color={"secondary"}
            onClick={() => {
              props.changeTheDialogState();
              form.resetForm();
            }}
            sx={{ color: "white" }}
          >
            Cancel
          </Button>
          <Button
            variant={"contained"}
            onClick={() => {
              form.handleSubmit([]);
            }}
          >
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={open.open} autoHideDuration={2000}>
        <Alert severity="warning" sx={{ width: "100%" }}>
          {open.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default CreateMatchDialog;
