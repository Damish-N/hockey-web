import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import dateSetUp from "../../constant/DateSetUp";

function CreateMatchDialog(props) {
  const dateObject = new Date();
  const date = dayjs(dateObject); // Convert the Date object to a Day.js object

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
    },
    validate: validates,
    onSubmit: (values) => {
      // setLoading(true);
      console.log(values);
      console.log(dateSetUp.format(values.date));
      // alert(JSON.stringify(values, null, 2));
      form.resetForm();
    },
  });
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
                    onChange={form.handleChange}
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
    </Grid>
  );
}

export default CreateMatchDialog;
