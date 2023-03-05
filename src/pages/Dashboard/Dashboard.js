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
import { Alert, LinearProgress, Snackbar, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import playersServices from "../../services/PlayersServices";
import LoadingComponent from "../../shared/components/LoadingComponent/LoadingComponent";
import GenrateUUID from "../../shared/constant/GenrateUUID";

function Dashboard(props) {
  const [noOfPlayers, setNoOfPlayers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState({});
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    playersServices.getNoPlayers().then((res) => {
      setNoOfPlayers(res.data);
    });
    playersServices.getTasks().then((res) => {
      if (res.status === 200) {
        setTodoList(res.data);
      } else {
        setTodoList([]);
      }
    });
    playersServices.getAttendance().then((res) => {
      if (res.data) {
        const data = res.data;
        data.forEach((element) => {
          setRows((prevState) => [
            ...prevState,
            createData(
              element.players.firstName,
              element.players.lastName,
              element.attend,
              element.id
            ),
          ]);
        });
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, []);
  const navigate = useNavigate();

  //show up format function to whole project

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
    {
      id: "attendId",
      label: "Attend Id",
    },
    { id: "first", label: "First Name", minWidth: 100 },
    {
      id: "last",
      label: "Last Name",
      minWidth: 100,
    },
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
      const id = GenrateUUID.uuidv4();
      values = {
        ...values,
        id: id,
      };
      setUpdate(true);
      console.log(values);
      formik.resetForm();
      setOpenAddTask(false);
      playersServices.createATask(values).then((res) => {
        setSnackbar(true);
        if (res.status === 201) {
          if (values.completionDate === toDay) {
            setTodoList((prevState) => [
              ...prevState,
              {
                id: id,
                task: values.task,
                detail: values.detail,
                date: values.completionDate,
                status: false,
              },
            ]);
          }
          console.log(res);
          setStatus({
            open: true,
            status: "success",
            message: "Created Task Successfully",
          });
        } else {
          setStatus({
            open: true,
            status: "success",
            message: "Error Raised",
          });
        }
        setUpdate(false);
        console.log(res);
      });

      // alert(JSON.stringify(values, null, 2));
    },
  });

  function createData(first, last, attend, attendId) {
    return { first, last, attend, attendId };
  }

  // const rows = [
  //   createData("Damish", "Nisal", "Yes"),
  //   createData("China", "CN", "No"),
  //   createData("Italy", "IT", "Pending"),
  // ];
  //
  // {
  //   task: "test",
  //       detail: "UOC VS JSP match at our ground",
  //     date: "2021-10-10",
  //     status: "pending",
  // },
  // {
  //   task: "test",
  //       detail: "1 VS 3 match at our ground",
  //     date: "2021-10-10",
  //     status: "pending",
  // },
  // {
  //   task: "test",
  //       detail: "2 VS JSP match at No ground",
  //     date: "2021-10-10",
  //     status: "pending",
  // },
  // {
  //   task: "test",
  //       detail: "6 VS 5 match at 5 ground",
  //     date: "2021-10-10",
  //     status: "done",
  // },
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const [todoList, setTodoList] = React.useState([]);
  const [snackbar, setSnackbar] = React.useState(false);
  const [status, setStatus] = React.useState({
    open: false,
    status: "",
    message: "center",
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleClickOpen = (row) => {
    setOpen(true);
    setSelected(row);
  };

  const handleCloseStatus = (value: any) => {
    setOpen(false);
    if (value !== "close") {
      setUpdate(true);
      playersServices.updateAttendance(selected.attendId, value).then((res) => {
        setSnackbar(true);
        if (res.status === 204) {
          setStatus({
            open: true,
            status: "success",
            message: "Attendance Updated Successfully",
          });
          setRows((prevState) => {
            const updatedRows = [...prevState];
            const index = updatedRows.findIndex(
              (row) => row.attendId === selected.attendId
            );
            updatedRows[index] = {
              ...updatedRows[index],
              attend: value,
            };
            return updatedRows;
          });
        } else {
          setStatus({
            open: true,
            status: "error",
            message: "Attendance Updated UnSuccessfully",
          });
        }
        setUpdate(false);
      });
    }
    setSelected(null);
  };

  const handleClose = () => {
    setOpenAddTask(false);
    formik.resetForm();
    console.log("close");
  };

  const handleChangeRowsPerPage = (event) => {
    // console.log(event.target.value);
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  function closeSnackBar() {
    setSnackbar(false);
  }

  return (
    <Grid>
      {update && (
        <Grid sx={{ width: "100%", margin: "0", top: "10" }}>
          <LinearProgress sx={{ color: "#750077" }} />
        </Grid>
      )}
      {loading && (
        <Grid sx={{ width: "100%", margin: "0", top: "10" }}>
          <LinearProgress sx={{ color: "#750077" }} />
        </Grid>
      )}
      {loading === true ? (
        <LoadingComponent></LoadingComponent>
      ) : (
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
                navigate("players");
              }}
            ></CardView>
            <CardView
              value={25}
              childComponent={"ViewDayIcon"}
              description={"SEASONED PLAYED MATCHES"}
              onClick={() => {
                navigate("matches");
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
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, key) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={key}
                          >
                            <TableCell align="left">{row.attendId}</TableCell>
                            <TableCell align="left">{row.first}</TableCell>
                            <TableCell align="left">{row.last}</TableCell>
                            <TableCell align="left">
                              {row.attend === true ? (
                                <Button
                                  variant="contained"
                                  // disabled={true}
                                  style={{
                                    background: "#66BB6A",
                                    color: "white",
                                  }}
                                  onClick={() => handleClickOpen(row)}
                                >
                                  YES
                                </Button>
                              ) : row.attend === false ? (
                                <Button
                                  variant="contained"
                                  color="secondary"
                                  // disabled={true}
                                  style={{
                                    background: "#EB0014",
                                    color: "white",
                                  }}
                                  onClick={() => handleClickOpen(row)}
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
                                  onClick={() => handleClickOpen(row)}
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
            onClose={() => handleCloseStatus("close")}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Is he attend ?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Please make sure that you have to select the correct option. If
                he attends then select yes otherwise select no. If you want to
                exit then select close or background.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                variant={"contained"}
                onClick={() => handleCloseStatus(false)}
                style={{
                  background: "#EB0014",
                  color: "white",
                }}
              >
                No
              </Button>
              <Button
                variant={"contained"}
                style={{
                  background: "#66BB6A",
                  color: "white",
                }}
                onClick={() => handleCloseStatus(true)}
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog open={openAddTask} onClose={handleClose}>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogContent>
              <DialogContentText>
                What are the task you have to do in next few days or next week?
                so That will handle it.
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
                  inputProps={{
                    style: { fontSize: 15, borderColor: "#750077" },
                  }}
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
                    formik.touched.completionDate &&
                    formik.errors.completionDate
                  }
                  inputProps={{
                    style: { fontSize: 15, borderColor: "#750077" },
                  }}
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
                  inputProps={{
                    style: { fontSize: 15, borderColor: "#750077" },
                  }}
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
      )}
      <Snackbar open={snackbar} autoHideDuration={6000} onClose={closeSnackBar}>
        <Alert
          onClose={handleClose}
          severity={status.status ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {status.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default Dashboard;
