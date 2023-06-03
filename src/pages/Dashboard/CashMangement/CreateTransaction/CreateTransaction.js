import React, { useEffect, useState } from "react";
import Style from "./CreateTransaction.module.css";
import {
  Alert,
  Grid,
  Input,
  LinearProgress,
  Paper,
  Snackbar,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import Styles from "../../Players/CreatePlayers/CreatePlayers.module.css";
import { Button, Divider } from "@material-ui/core";
import { useFormik } from "formik";
import dayjs from "dayjs";
import defaultImage from "../../../../asserts/noBill.png";
import cashManagementServices, {
  CashManagementServices,
} from "../../../../services/CashManagementServices";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import dateSetUp from "../../../../shared/constant/DateSetUp";

function CreateTransaction(props) {
  const dateObject = new Date();
  const date = dayjs(dateObject);
  const [setImg, setImgState] = useState({
    imageUrl: defaultImage,
    imageObject: null,
  });
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [open, setOpen] = React.useState(false);
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState("");
  let imageBase =
    "https://tjelkiwfbrbhhugapbkk.supabase.co/storage/v1/object/public/images/receipts/";

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setOpenError(false);
  };

  useEffect(() => {
    // cashManagementServices.getTransactionWithUser().then((res) => {
    //   console.log(res);
    // });
    sessionStorage.getItem("user")
      ? setCurrentUser(JSON.parse(sessionStorage.getItem("user")))
      : setCurrentUser({});
    return () => {};
  }, []);

  const validates = (values) => {
    const errors = {};
    if (!values.amount) {
      errors.amount = "Required";
    }
    return errors;
  };

  const form = useFormik({
    initialValues: {
      date: date,
      description: "No Description",
      amount: 0,
    },
    validate: validates,
    onSubmit: (values) => {
      setLoading(true);
      form.resetForm();
      if (setImg.imageObject) {
        let nameOfId = "receipt" + date.format("YYYYMMDDHHmmss");
        let transaction = {
          date: dateSetUp.format(values.date),
          description: values.description,
          amount: values.amount,
          url: imageBase + nameOfId,
          created: currentUser.id,
        };
        cashManagementServices
          .putSlip(nameOfId, setImg.imageObject)
          .then((res) => {
            console.log(res);
            if (res.data) {
              cashManagementServices
                .insertCashManagement(transaction)
                .then((result) => {
                  if (result.status === 201) {
                    setOpen(true);
                    setLoading(false);
                    setMessage("Transaction Added Successfully");
                    setImgState({
                      imageUrl: defaultImage,
                      imageObject: null,
                    });
                  } else {
                    setOpenError(true);
                    setLoading(false);
                    setMessage(result.error.details);
                  }
                });
            } else {
              setOpenError(true);
              setLoading(false);
              setMessage(res.error.message);
            }
          });
      } else {
        console.log("no image");
        let transaction = {
          date: dateSetUp.format(values.date),
          description: values.description,
          amount: values.amount,
          url: "https://drive.google.com/file/d/1mgPh28cO_xEjc0hTuxM_dms7nyb_GTVs/view?usp=sharing",
          created: currentUser.id,
        };
        cashManagementServices.insertCashManagement(transaction).then((res) => {
          if (res.status === 201) {
            form.resetForm();
            setOpen(true);
            setLoading(false);
            setMessage("Transaction Added Successfully");
          } else {
            console.log(res);
            setMessage(res.error.details);
            setOpenError(true);
            setLoading(false);
          }
        });
      }
      // form.resetForm();

      // let nameOfId = "receipt" + date.format("YYYYMMDDHHmmss");
      // cashManagementServices.putSlip(nameOfId, setImg).then(
      //   (res) => {
      //     console.log(res);
      //   },
      //   (err) => {
      //     console.log(err);
      //   }
      // );
    },
  });

  function fileInput(e) {
    console.log(currentUser.email);
    console.log(e.target);
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    let fileContent;
    //reader set results to variable
    reader.onload = () => {
      fileContent = reader.result;
      setImgState({ imageUrl: fileContent, imageObject: e.target.files[0] });
      console.log(reader.result);
    };
  }

  return (
    <>
      {loading && (
        <Grid sx={{ width: "100%", margin: "0", top: "10" }}>
          <LinearProgress sx={{ color: "#750077" }} />
        </Grid>
      )}
      <Grid container className={Styles.mainContainer} style={{ width: "85%" }}>
        <Grid item xs={12} className={Styles.headingContainer}>
          <h2 style={{ margin: "2.5rem 0 " }}>Add Transaction</h2>
          <Button
            // disabled={loading}
            type={"submit"}
            variant="contained"
            style={{ background: "#750077FF", color: "white" }}
            onClick={() => {
              form.handleSubmit();
            }}
          >
            Add Transaction
          </Button>
        </Grid>
        <Divider />
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Paper className={Styles.formArea}>
              <form onSubmit={form.handleSubmit}>
                <Grid container spacing={2}>
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
                  <Grid item xs={12} md={6}>
                    <TextField
                      name={"amount"}
                      fullWidth
                      id="amount"
                      label="Amount"
                      type="number"
                      variant="outlined"
                      value={form.values.amount}
                      onChange={form.handleChange}
                      error={form.touched.amount && Boolean(form.errors.amount)}
                      helperText={form.touched.amount && form.errors.amount}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <TextField
                      name={"description"}
                      fullWidth
                      id="description"
                      label="description"
                      type="text"
                      variant="outlined"
                      value={form.values.description}
                      onChange={form.handleChange}
                      error={
                        form.touched.description &&
                        Boolean(form.errors.description)
                      }
                      helperText={
                        form.touched.description && form.errors.description
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Input
                      type="file"
                      id="file-input"
                      variant="outlined"
                      sx={{
                        border: "1px solid #FFFFFF",
                        padding: "0.5rem",
                        borderRadius: "5px",
                      }}
                      onInput={(event) => {
                        fileInput(event);
                      }}
                    />
                    {/*<input type="file" id="file-input" style="display: none;" />*/}
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={Styles.formArea}>
              <img className={Styles.picture} src={setImg.imageUrl} />
            </Paper>
          </Grid>
        </Grid>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
        <Snackbar
          open={openError}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
      </Grid>
    </>
  );
}

export default CreateTransaction;
