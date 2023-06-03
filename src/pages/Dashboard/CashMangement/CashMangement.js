import React, { useEffect, useState } from "react";
import { Chip, Grid, Table, TableBody, TableContainer } from "@mui/material";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import VerticalAlignTopIcon from "@mui/icons-material/VerticalAlignTop";
import CardViewForCash from "../../../shared/components/CardViewForCash/CardViewForCash";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import Styles from "../CashMangement/CashMangement.module.css";
import {
  Button,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import cashManagementServices from "../../../services/CashManagementServices";
import { useNavigate } from "react-router-dom";

function CashMangement(props) {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [transactionArray, setTransactionArray] = useState({
    credit: 0,
    debit: 0,
    total: 0,
  });
  const columns = [
    { id: "id", label: "Transaction ID", minWidth: 100, align: "left" },
    { id: "date", label: "Date", minWidth: 100, align: "center" },
    {
      id: "description",
      label: "Description",
      minWidth: 100,
      align: "center",
    },
    { id: "amount", label: "Amount", minWidth: 50, align: "center" },
    {
      id: "status",
      label: "Status",
      minWidth: 170,
      buttons: [
        { id: "true", label: "yes" },
        { id: "false", label: "No" },
      ],
      align: "center",
    },
    { id: "total", label: "Total", minWidth: 100, align: "center" },
    {
      id: "view",
      label: "View",
      minWidth: 100,
      buttons: [
        {
          id: "view",
          label: "View",
        },
      ],
      align: "center",
    },
  ];
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const createRows = (transaction) => {
    // console.log(transaction);
    const rows = [];
    let val = total;
    transaction.forEach((element) => {
      console.log(element.amount);
      if (element.amount > 0) {
        setTransactionArray((transactionArray) => ({
          ...transactionArray,
          credit: transactionArray.credit + element.amount,
          total: transactionArray.total + element.amount,
        }));
      } else if (element.amount < 0) {
        setTransactionArray((transactionArray) => ({
          ...transactionArray,
          debit: transactionArray.debit + element.amount,
          total: transactionArray.total + element.amount,
        }));
      }
      //set previous value and add current value
      setTotal((total) => total + element.amount);
      val = val + element.amount;
      console.log(val);
      rows.push(
        createData(
          element.id,
          element.date,
          element.description,
          element.amount,
          element.active,
          val,
          element.url
        )
      );
    });
    return rows;
  };

  function createData(id, date, description, amount, active, total, url) {
    return { id, date, description, amount, active, total, url };
  }

  useEffect(() => {
    cashManagementServices.getTransactionWithUser().then((res) => {
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
          contentValue={"Rs: " + transactionArray.credit}
          contentIcon={<VerticalAlignBottomIcon />}
        ></CardViewForCash>
        <CardViewForCash
          contentColor={"red"}
          contentTitle={"Debit Amount"}
          contentValue={"Rs: " + transactionArray.debit}
          contentIcon={<VerticalAlignTopIcon />}
        ></CardViewForCash>
        <CardViewForCash
          contentColor={"orange"}
          contentTitle={"Total Amount"}
          contentValue={"Rs: " + transactionArray.total}
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
          onClick={() => navigate("createTransaction")}
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
                      <TableCell align="center">{row.date}</TableCell>
                      <TableCell align="center">{row.description}</TableCell>
                      <TableCell align="center">{row.amount}</TableCell>
                      <TableCell align="center">
                        {row.amount > 0 ? (
                          <Chip
                            label={"Credit"}
                            style={{
                              background: "#5aa82b",
                              color: "white",
                            }}
                          />
                        ) : (
                          <Chip
                            label={"Debit"}
                            style={{
                              background: "rgba(213,151,38,0.82)",
                              color: "white",
                            }}
                          />
                        )}
                      </TableCell>
                      <TableCell align="center">{row.total}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          style={{
                            background: "#750077FF",
                            color: "white",
                          }}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={transaction.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Grid>
    </Grid>
  );
}

export default CashMangement;
