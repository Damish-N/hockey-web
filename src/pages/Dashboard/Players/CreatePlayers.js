import React from "react";
import {
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { Button, Divider, Paper } from "@material-ui/core";
import Styles from "./CreatePlayers.module.css";
import playerImage from "../../../asserts/player_dummy.png";
import { useFormik } from "formik";

function CreatePlayers(props) {
  const validates = (values) => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = "Required";
    } else if (values.firstName.length > 15) {
      errors.firstName = "Must be 15 characters or less";
    }
    if (!values.lastName) {
      errors.lastName = "Required";
    } else if (values.lastName.length > 20) {
      errors.lastName = "Must be 20 characters or less";
    }
    if (!values.jerseyNumber) {
      errors.jerseyNumber = "Required";
    } else if (values.jerseyNumber > 32 || values.jerseyNumber < 0) {
      errors.jerseyNumber = "Must be 32 or less";
    }
    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    if (!values.school) {
      errors.school = "Required";
    } else if (values.school.length > 20) {
      errors.school = "Must be 20 characters or less";
    }
    return errors;
  };
  //Formik Form
  const form = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      jerseyNumber: 1,
      email: "",
      school: "",
      year: 1,
      faculty: "UCSC",
      active: true,
    },
    validate: validates,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Grid container className={Styles.mainContainer} style={{ width: "85%" }}>
      <Grid item xs={12} className={Styles.headingContainer}>
        <h2 style={{ margin: "2.5rem 0 " }}>Create Player</h2>
        <Button
          disabled={form.isSubmitting}
          type={"submit"}
          variant="contained"
          style={{ background: "#750077FF", color: "white" }}
          onClick={() => form.handleSubmit()}
        >
          Add Player
        </Button>
      </Grid>
      <Divider />
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Paper className={Styles.formArea}>
            <form onSubmit={form.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    name={"firstName"}
                    fullWidth
                    id="firstName"
                    label="First Name"
                    type="text"
                    value={form.values.firstName}
                    onChange={form.handleChange}
                    variant="outlined"
                    error={
                      form.touched.firstName && Boolean(form.errors.firstName)
                    }
                    helperText={form.touched.firstName && form.errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name={"lastName"}
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    type="text"
                    variant="outlined"
                    value={form.values.lastName}
                    onChange={form.handleChange}
                    error={
                      form.touched.lastName && Boolean(form.errors.lastName)
                    }
                    helperText={form.touched.lastName && form.errors.lastName}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    name={"jerseyNumber"}
                    fullWidth
                    id="JerseyNumber"
                    label="Jersey Number"
                    type="number"
                    variant="outlined"
                    value={form.values.jerseyNumber}
                    onChange={form.handleChange}
                    error={
                      form.touched.jerseyNumber &&
                      Boolean(form.errors.jerseyNumber)
                    }
                    helperText={
                      form.touched.jerseyNumber && form.errors.jerseyNumber
                    }
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Year</InputLabel>
                    <Select
                      name={"year"}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={form.values.year}
                      label="Year"
                      variant="outlined"
                      onChange={form.handleChange}
                    >
                      <MenuItem value={1}>First Year</MenuItem>
                      <MenuItem value={2}>Second Year</MenuItem>
                      <MenuItem value={3}>Third Year</MenuItem>
                      <MenuItem value={4}>Forth Year</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label-faculty">
                      Faculty
                    </InputLabel>
                    <Select
                      name={"faculty"}
                      labelId="demo-simple-select-label-faculty"
                      id="demo-simple-select-faculty"
                      value={form.values.faculty}
                      label="Faculty"
                      onChange={form.handleChange}
                    >
                      <MenuItem value={"UCSC"}>UCSC</MenuItem>
                      <MenuItem value={"Medicine"}>Medicine</MenuItem>
                      <MenuItem value={"Science"}>Science</MenuItem>
                      <MenuItem value={"Management"}>Management</MenuItem>
                      <MenuItem value={"Law"}>Law</MenuItem>
                      <MenuItem value={"Teach"}>Teach</MenuItem>
                      <MenuItem value={"SriPalee"}>SriPalee</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name={"email"}
                    fullWidth
                    id="email"
                    label="Email"
                    type="email"
                    variant="outlined"
                    value={form.values.email}
                    onChange={form.handleChange}
                    error={form.touched.email && Boolean(form.errors.email)}
                    helperText={form.touched.email && form.errors.email}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name={"school"}
                    id="school"
                    label="School"
                    type="text"
                    variant="outlined"
                    value={form.values.school}
                    onChange={form.handleChange}
                    error={form.touched.school && Boolean(form.errors.school)}
                    helperText={form.touched.school && form.errors.school}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        name={"active"}
                        checked={form.values.active}
                        onChange={form.handleChange}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                    label="Active Player"
                  />
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className={Styles.playerPhoto}>
            <img className={Styles.picture} src={playerImage} alt=""></img>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CreatePlayers;
