import React, { useState } from "react";
import Styles from "./CreateMatchDialog.module.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

function CreateMatchDialog(props) {
  return (
    <Dialog open={props.open}>
      <DialogTitle>Create Match</DialogTitle>
      <DialogContent>
        <DialogContentText>Hello</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.changeTheDialogState}>Cancel</Button>
        <Button onClick={props.changeTheDialogState}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateMatchDialog;
