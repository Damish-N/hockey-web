import React, { useEffect, useState } from "react";
import { Grid, Table, TableBody, TableContainer } from "@mui/material";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import VerticalAlignTopIcon from "@mui/icons-material/VerticalAlignTop";
import CardViewForCash from "../../../shared/components/CardViewForCash/CardViewForCash";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import Styles from "../CashMangement/CashMangement.module.css";
import { Button, TableCell, TableHead, TableRow } from "@material-ui/core";
import cashManagementServices from "../../../services/CashManagementServices";

function CashMangement(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const columns = [
    { id: "id", label: "Transaction ID", minWidth: 100 },
    { id: "date", label: "Date", minWidth: 100 },
    {
      id: "description",
      label: "Description",
      minWidth: 100,
    },
    { id: "amount", label: "Amount", minWidth: 50 },
    {
      id: "active",
      label: "Active",
      minWidth: 170,
      buttons: [
        { id: "true", label: "yes" },
        { id: "false", label: "No" },
      ],
    },
    { id: "total", label: "Total", minWidth: 100 },
  ];
  const createRows = (transaction) => {
    // console.log(transaction);
    const rows = [];
    transaction.forEach((element) => {
      //set previous value and add current value
      setTotal((total) => total + element.amount);
      let val = total;
      console.log(val);
      rows.push(
        createData(
          element.id,
          element.date,
          element.description,
          element.amount,
          element.active,
          val
        )
      );
    });
    return rows;
  };
  function createData(id, date, description, amount, active, total) {
    return { id, date, description, amount, active, total };
  }

  useEffect(() => {
    cashManagementServices.getTransactions().then((res) => {
      console.log(res);
      if (res.status === 200) {
        const rows = createRows(res.data);
        setTransaction(rows);
      } else {
        console.log("error");
      }
      setLoading(false);
    });
  }, []);

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
      <Grid
        item
        xs={12}
        className={Styles.headingContainer}
        sx={{ margin: "auto 1.5rem" }}
      >
        <h2 style={{ margin: "2.5rem 0 " }}>All Transactions</h2>
        <Button
          variant="contained"
          style={{ background: "#750077FF", color: "white" }}
          onClick={() => {
            console.log("clicked management");
          }}
        >
          Add a transaction
        </Button>
      </Grid>
      <Grid item xs={12} sx={{ margin: "auto 1.5rem" }}>
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
              {transaction
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, key) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={key}>
                      <TableCell align="left">{row.id}</TableCell>
                      <TableCell align="left">{row.date}</TableCell>
                      <TableCell align="left">{row.description}</TableCell>
                      <TableCell align="left">{row.amount}</TableCell>
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
                      <TableCell align="left">{row.total}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

export default CashMangement;
