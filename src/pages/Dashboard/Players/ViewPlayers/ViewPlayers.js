import React, { useEffect, useState } from "react";
import Styles from "../ViewPlayers/ViewPlayers.module.css";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import {
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import playersServices from "../../../../services/PlayersServices";
import LoadingComponent from "../../../../shared/components/LoadingComponent/LoadingComponent";

function ViewPlayers(props) {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
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
      id: "active",
      label: "Active",
      minWidth: 170,
      buttons: [
        { id: "true", label: "yes" },
        { id: "false", label: "No" },
      ],
    },
  ];
  const createRows = (players) => {
    const rows = [];
    players.forEach((player) => {
      rows.push(
        createData(
          player.firstName,
          player.lastName,
          player.year,
          player.faculty,
          player.active.toString()
        )
      );
    });
    return rows;
  };
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("call");
    playersServices.getPlayers().then((data) => {
      if (data.status === 200) {
        const rows = createRows(data.data);
        setPlayers(rows);
        setLoading(false);
      }
    });
  }, []);

  function createData(first, last, year, fac, active) {
    return { first, last, year, fac, active };
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Grid container className={Styles.mainContainer} style={{ width: "85%" }}>
      <Grid item xs={12} className={Styles.headingContainer}>
        <h2 style={{ margin: "2.5rem 0 " }}>All Players</h2>
        <Button
          variant="contained"
          style={{ background: "#750077FF", color: "white" }}
          onClick={() => navigate("createPlayer")}
        >
          To Create Player
        </Button>
      </Grid>
      <Divider />
      <Grid className={Styles.detailsContainer}>
        <Grid item xs={12} md={12}>
          {loading === true ? (
            <LoadingComponent />
          ) : (
            <Grid className={Styles.tableContainer}>
              {/*Search filters*/}
              {/* TODO Remove Commit Paper Container when Filter enables Lines 111-216 */}
              {/*<Paper sx={{ padding: "5px", marginBottom: "10px" }}>*/}
              {/*  <Grid container sx={{ margin: "auto 0" }} spacing={2}>*/}
              {/*    <Grid item md={9}>*/}
              {/*      <form className={Styles.formContainer}>*/}
              {/*        <Grid item container spacing={1}>*/}
              {/*          <Grid item xs={12} md={3}>*/}
              {/*            <TextField*/}
              {/*              name={"firstName"}*/}
              {/*              fullWidth*/}
              {/*              id="firstName"*/}
              {/*              label="First Name"*/}
              {/*              type="text"*/}
              {/*            />*/}
              {/*          </Grid>*/}
              {/*          <Grid item xs={12} md={3}>*/}
              {/*            <TextField*/}
              {/*              name={"lastName"}*/}
              {/*              fullWidth*/}
              {/*              id="lastName"*/}
              {/*              label="Last Name"*/}
              {/*              type="text"*/}
              {/*            />*/}
              {/*          </Grid>*/}
              {/*          <Grid item xs={12} md={3}>*/}
              {/*            <FormControl fullWidth>*/}
              {/*              <InputLabel id="demo-simple-select-label-faculty">*/}
              {/*                Faculty*/}
              {/*              </InputLabel>*/}
              {/*              <Select*/}
              {/*                name={"faculty"}*/}
              {/*                labelId="demo-simple-select-label-faculty"*/}
              {/*                id="demo-simple-select-faculty"*/}
              {/*                // value={form.values.faculty}*/}
              {/*                label="Faculty"*/}
              {/*                // onChange={form.handleChange}*/}
              {/*              >*/}
              {/*                <MenuItem value={"UCSC"}>UCSC</MenuItem>*/}
              {/*                <MenuItem value={"Medicine"}>Medicine</MenuItem>*/}
              {/*                <MenuItem value={"Science"}>Science</MenuItem>*/}
              {/*                <MenuItem value={"Management"}>*/}
              {/*                  Management*/}
              {/*                </MenuItem>*/}
              {/*                <MenuItem value={"Law"}>Law</MenuItem>*/}
              {/*                <MenuItem value={"Teach"}>Teach</MenuItem>*/}
              {/*                <MenuItem value={"SriPalee"}>SriPalee</MenuItem>*/}
              {/*              </Select>*/}
              {/*            </FormControl>*/}
              {/*          </Grid>*/}
              {/*          <Grid item xs={12} md={3}>*/}
              {/*            <FormControl fullWidth>*/}
              {/*              <InputLabel id="demo-simple-select-label">*/}
              {/*                Year*/}
              {/*              </InputLabel>*/}
              {/*              <Select*/}
              {/*                name={"year"}*/}
              {/*                labelId="demo-simple-select-label"*/}
              {/*                id="demo-simple-select"*/}
              {/*                label="Year"*/}
              {/*                variant="outlined"*/}
              {/*              >*/}
              {/*                <MenuItem value={1}>First Year</MenuItem>*/}
              {/*                <MenuItem value={2}>Second Year</MenuItem>*/}
              {/*                <MenuItem value={3}>Third Year</MenuItem>*/}
              {/*                <MenuItem value={4}>Forth Year</MenuItem>*/}
              {/*              </Select>*/}
              {/*            </FormControl>*/}
              {/*          </Grid>*/}
              {/*        </Grid>*/}
              {/*      </form>*/}
              {/*    </Grid>*/}
              {/*    <Grid*/}
              {/*      item*/}
              {/*      container*/}
              {/*      spacing={2}*/}
              {/*      md={3}*/}
              {/*      className={Styles.buttonArea}*/}
              {/*    >*/}
              {/*      <Button*/}
              {/*        disabled={loading}*/}
              {/*        // type={"submit"}*/}
              {/*        variant="contained"*/}
              {/*        style={{*/}
              {/*          background: "#750077FF",*/}
              {/*          color: "white",*/}
              {/*          height: "2.3rem",*/}
              {/*        }}*/}
              {/*        // onClick={() => form.handleSubmit()}*/}
              {/*      >*/}
              {/*        Filter*/}
              {/*      </Button>*/}
              {/*      <Button*/}
              {/*        disabled={loading}*/}
              {/*        // type={"submit"}*/}
              {/*        variant="contained"*/}
              {/*        style={{*/}
              {/*          background: "#750077FF",*/}
              {/*          color: "white",*/}
              {/*          height: "2.3rem",*/}
              {/*        }}*/}
              {/*        // onClick={() => form.handleSubmit()}*/}
              {/*      >*/}
              {/*        Reset*/}
              {/*      </Button>*/}
              {/*    </Grid>*/}
              {/*  </Grid>*/}
              {/*</Paper>*/}
              <TableContainer>
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
                    {players
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
                            <TableCell align="left">{row.first}</TableCell>
                            <TableCell align="left">{row.last}</TableCell>
                            <TableCell align="left">{row.year}</TableCell>
                            <TableCell align="left">{row.fac}</TableCell>
                            <TableCell align="left">
                              {row.active === "true" ? (
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
                              ) : (
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
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 100]}
                  component="div"
                  count={players.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableContainer>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ViewPlayers;
