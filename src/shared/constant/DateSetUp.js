import dayjs from "dayjs";

export class DateSetUp {
  format(inputDate) {
    // let inputDate = new Date();
    // let date, month, year;
    const date = dayjs(inputDate);
    return date.format("YYYY-MM-DD");
    // date = inputDate.getDate();
    // month = inputDate.getMonth() + 1;
    // year = inputDate.getFullYear();
    //
    // date = date.toString().padStart(2, "0");
    //
    // month = month.toString().padStart(2, "0");
    //
    // return `${year}-${month}-${date}`;
  }
}

export default new DateSetUp();
