import React, { useState } from "react";
import { Paper, Typography } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, Calendar } from "@material-ui/pickers";
import frLocale from "date-fns/locale/fr-CA";
import enLocale from "date-fns/locale/en-US";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "@mui/material/styles";

const localeMap: any = {
  en: enLocale,
  fr: frLocale,
};

class Utils extends DateFnsUtils {
  getWeekdays() {
    return ["Su", "M", "Tu", "W", "Th", "F", "Sa"];
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#750077",
    },
    secondary: {
      main: "#ff9800",
    },
    success: {
      main: "#4caf50",
    },
  },
});

export default function MyCalender() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const locale = "en";
  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    console.log("Date is: ", date);
  };
  //
  return (
    <MuiThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={Utils} locale={localeMap[locale]}>
        <Paper
          style={{ border: "0.05rem solid #750077", paddingBottom: "10px" }}
        >
          <Typography
            variant="h6"
            style={{
              textAlign: "center",
              paddingTop: "10px",
              color: "#750077",
            }}
          >
            {"Today is :" + new Date().toLocaleDateString("de-DE")}
          </Typography>
          <Calendar date={selectedDate} onChange={handleDateChange} />
        </Paper>
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
}
