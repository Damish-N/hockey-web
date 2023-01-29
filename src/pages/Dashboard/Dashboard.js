import React from "react";
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
import MyCalendar from "../../shared/components/Calender/Calender";
import ListView from "../../shared/components/ListView/ListView";
import CardView from "../../shared/components/CardView/CardView";

function Dashboard(props) {
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    console.log("close");
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className={Styles.dashboardContainer}>
      <Grid
        xs={12}
        className={Styles.item}
        container
        direction={"row"}
        justifyContent={"space-around"}
        spacing={2}
      >
        <CardView
          value={15}
          childComponent={"AccessibilityNewIcon"}
          description={"PLAYERS"}
        ></CardView>
        <CardView
          value={25}
          childComponent={"ViewDayIcon"}
          description={"SEASONED PLAYED MATCHES"}
        ></CardView>
        <CardView
          value={25650}
          childComponent={"MonetizationOnIcon"}
          description={"HASH IN HAND"}
        ></CardView>
      </Grid>

      <Grid className={Styles.detailsContainer}>
        <Grid xs={12} md={8}>
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
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
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

        <Grid xs={12} md={4} className={Styles.calanderView}>
          <Grid
            style={{
              overflow: "hidden",
            }}
          >
            <Paper
              style={{
                maxWidth: "100%",
                margin: "1rem 0",
                border: "2px solid rgba(117, 0, 119, 0.5)",
                overflow: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ListView></ListView>
            </Paper>
          </Grid>
          <Grid>
            <MyCalendar />
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
          <Button onClick={handleClose} color={"secondary"}>
            Disagree
          </Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Dashboard;
