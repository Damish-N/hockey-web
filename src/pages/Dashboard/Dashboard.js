import React, { useEffect, useState } from "react";
import Styles from "./Dashboard.module.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import ListView from "../../shared/components/ListView/ListView";
import CardView from "../../shared/components/CardView/CardView";
import Style from "../Login/Login.module.css";
import { LinearProgress, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import playersServices from "../../services/PlayersServices";

function Dashboard(props) {
  const [noOfPlayers, setNoOfPlayers] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    playersServices.getNoPlayers().then((res) => {
      console.log(res.data);
      setNoOfPlayers(res.data);
      setLoading(false);
    });
  }, []);
  const navigate = useNavigate();

  function format(inputDate) {
    let date, month, year;

    date = inputDate.getDate();
    month = inputDate.getMonth() + 1;
    year = inputDate.getFullYear();

    date = date.toString().padStart(2, "0");

    month = month.toString().padStart(2, "0");

    return `${year}-${month}-${date}`;
  }

  let toDay = format(new Date());
  const columns = [
    { id: "first", label: "First Name", minWidth: 100 },
    {
      id: "last",
      label: "Last Name",
      minWidth: 100,
    },
    { id: "year", label: "Year", minWidth: 50 },
    { id: "fac", label: "Faculty", minWidth: 100 },
    {
      id: "attend",
      label: "Attend",
      minWidth: 170,
      buttons: [
        { id: "yes", label: "Yes" },
        { id: "no", label: "No" },
        { id: "pending", label: "Pending" },
      ],
    },
  ];

  const [openAddTask, setOpenAddTask] = React.useState(false);

  const handleSetOpenAddTask = () => {
    setOpenAddTask(true);
  };

  const validations = (values) => {
    const errors = {};
    if (!values.task) {
      errors.task = "Required";
    }
    if (!values.completionDate) {
      errors.completionDate = "Required";
    }
    if (values.completionDate < toDay) {
      errors.completionDate = "Please Put Up Coming Date";
    }
    if (values.detail === "") {
      errors.detail = "Required";
    }
    if (values.detail.length >= 25) {
      errors.detail = "Maximum 25 Characters";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      task: "",
      completionDate: toDay,
      detail: "",
    },
    validate: validations,
    onSubmit: (values) => {
      console.log(values);
      formik.resetForm();
      setOpenAddTask(false);
      setTodoList((prevState) => [
        ...prevState,
        {
          task: values.task,
          detail: values.detail,
          date: values.completionDate,
          status: "pending",
        },
      ]);

      // alert(JSON.stringify(values, null, 2));
    },
  });

  function createData(first, last, year, fac, attend) {
    return { first, last, year, fac, attend };
  }

  const rows = [
    createData("Damish", "Nisal", "4th Year", "UCSC", "Yes"),
    createData("China", "CN", 1403500365, 9596961, "No"),
    createData("Italy", "IT", 60483973, 301340, "Pending"),
    createData("United States", "US", 327167434, 9833520, "Yes"),
    createData("Canada", "CA", 37602103, 9984670, "Yes"),
    createData("Australia", "AU", 25475400, 7692024, "Yes"),
    createData("Germany", "DE", 83019200, 357578, "Yes"),
    createData("Ireland", "IE", 4857000, 70273, "Yes"),
    createData("Mexico", "MX", 126577691, 1972550, "Yes"),
    createData("Japan", "JP", 126317000, 377973, "Yes"),
    createData("France", "FR", 67022000, 640679, "Yes"),
    createData("United Kingdom", "GB", 67545757, 242495, "Yes"),
    createData("Russia", "RU", 146793744, 17098246, "Yes"),
    createData("Nigeria", "NG", 200962417, 923768, "Yes"),
    createData("Brazil", "BR", 210147125, 8515767, "Yes"),
  ];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const [todoList, setTodoList] = React.useState([
    {
      task: "test",
      detail: "UOC VS JSP match at our ground",
      date: "2021-10-10",
      status: "pending",
    },
    {
      task: "test",
      detail: "1 VS 3 match at our ground",
      date: "2021-10-10",
      status: "pending",
    },
    {
      task: "test",
      detail: "2 VS JSP match at No ground",
      date: "2021-10-10",
      status: "pending",
    },
    {
      task: "test",
      detail: "6 VS 5 match at 5 ground",
      date: "2021-10-10",
      status: "done",
    },
  ]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenAddTask(false);
    formik.resetForm();
    console.log("close");
  };

  const handleChangeRowsPerPage = (event) => {
    // console.log(event.target.value);
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  return (
    <Grid>
      {loading && (
        <Grid sx={{ width: "100%", margin: "0", top: "10" }}>
          <LinearProgress sx={{ color: "#750077" }} />
        </Grid>
      )}
      <Grid className={Styles.dashboardContainer}>
        <Grid
          item
          xs={12}
          className={Styles.item}
          container
          direction={"row"}
          justifyContent={"space-around"}
          spacing={2}
        >
          <CardView
            value={noOfPlayers}
            childComponent={"AccessibilityNewIcon"}
            description={"PLAYERS"}
            onClick={() => {
              console.log("clicked");
              navigate("players");
              console.log("clicked");
            }}
          ></CardView>
          <CardView
            value={25}
            childComponent={"ViewDayIcon"}
            description={"SEASONED PLAYED MATCHES"}
            onClick={() => {
              console.log("clicked");
              navigate("matches");
              console.log("clicked");
            }}
          ></CardView>
          <CardView
            value={25650}
            childComponent={"MonetizationOnIcon"}
            description={"HASH IN HAND"}
            onClick={() => {
              console.log("clicked");
              navigate("cash");
              console.log("clicked");
            }}
          ></CardView>
        </Grid>

        <Grid container spacing={2} className={Styles.detailsContainer}>
          <Grid item xs={12} md={8}>
            <TableContainer className={Styles.tableContainer}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, key) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={key}>
                          <TableCell align="left">{row.first}</TableCell>
                          <TableCell align="left">{row.last}</TableCell>
                          <TableCell align="left">{row.fac}</TableCell>
                          <TableCell align="left">{row.year}</TableCell>
                          <TableCell align="left">
                            {row.attend === "Yes" ? (
                              <Button
                                variant="contained"
                                disabled={true}
                                style={{
                                  background: "#66BB6A",
                                  color: "white",
                                }}
                              >
                                YES
                              </Button>
                            ) : row.attend === "No" ? (
                              <Button
                                variant="contained"
                                color="secondary"
                                disabled={true}
                                style={{
                                  background: "#EB0014",
                                  color: "white",
                                }}
                              >
                                NO
                              </Button>
                            ) : (
                              <Button
                                variant="contained"
                                color="secondary"
                                style={{
                                  background: "#FFD700",
                                  color: "black",
                                }}
                                onClick={handleClickOpen}
                              >
                                PENDING
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>

          <Grid item xs={12} md={4} className={Styles.calanderView}>
            {/*<Grid>*/}
            {/*  <MyCalendar />*/}
            {/*</Grid>*/}
            <Button
              color={"primary"}
              variant={"contained"}
              style={{
                margin: "1rem 0",
                background: "rgba(117, 0, 119, 1)",
              }}
              onClick={handleSetOpenAddTask}
            >
              ADD NEW TASK
            </Button>
            <Grid
              style={{
                overflow: "hidden",
              }}
            >
              <Paper
                aria-disabled={true}
                style={{
                  maxWidth: "10 0%",
                  border: "2px solid rgba(117, 0, 119, 0.5)",
                  overflow: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ListView list={todoList}></ListView>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant={"contained"}
              onClick={handleClose}
              color={"secondary"}
            >
              Disagree
            </Button>
            <Button
              variant={"contained"}
              style={{
                background: "rgba(117, 0, 119, 1)",
                color: "white",
              }}
              onClick={handleClose}
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openAddTask} onClose={handleClose}>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogContent>
            <DialogContentText>
              What are the task you have to do in next few days or next week? so
              That will handle it.
            </DialogContentText>
            <form className={Style.form} onSubmit={formik.handleSubmit}>
              <TextField
                sx={{ width: "80%", margin: "5px" }}
                id="task"
                name="task"
                label="Task"
                value={formik.values.task}
                onChange={formik.handleChange}
                error={formik.touched.task && Boolean(formik.errors.task)}
                helperText={formik.touched.task && formik.errors.task}
                inputProps={{ style: { fontSize: 15, borderColor: "#750077" } }}
                variant={"outlined"}
                className={Style.input}
              />
              <TextField
                sx={{ width: "80%", margin: "5px" }}
                id="completionDate"
                name="completionDate"
                label="Completion Date"
                type="date"
                maxRows={3}
                value={formik.values.completionDate}
                onChange={formik.handleChange}
                error={
                  formik.touched.completionDate &&
                  Boolean(formik.errors.completionDate)
                }
                helperText={
                  formik.touched.completionDate && formik.errors.completionDate
                }
                inputProps={{ style: { fontSize: 15, borderColor: "#750077" } }}
                variant={"outlined"}
                className={Style.input}
              />
              <TextField
                sx={{ width: "80%", margin: "5px" }}
                id="detail"
                name="detail"
                type={"text"}
                label="Details"
                value={formik.values.detail}
                onChange={formik.handleChange}
                error={formik.touched.detail && Boolean(formik.errors.detail)}
                helperText={formik.touched.detail && formik.errors.detail}
                inputProps={{ style: { fontSize: 15, borderColor: "#750077" } }}
                variant={"outlined"}
                className={Style.input}
              ></TextField>

              <DialogActions>
                <Button
                  color={"secondary"}
                  variant={"contained"}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  style={{
                    background: "rgba(117, 0, 119, 1)",
                    color: "white",
                  }}
                  disabled={formik.isSubmitting}
                  type="submit"
                  variant={"contained"}
                >
                  Add New Task
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
