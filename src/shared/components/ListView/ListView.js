import React from "react";
import Styles from "./ListView.module.css";
import { Grid } from "@material-ui/core";

function ListView(props) {
  let d = new Date().toLocaleDateString("de-DE");
  let day = d.split(".")[0];
  let month = d.split(".")[1];
  let year = d.split(".")[2];
  let monthName = new Date(year, month, 0).toLocaleString("default", {
    month: "long",
  });
  //get date name
  let dateName = new Date(year, month, day).toLocaleString("default", {
    weekday: "long",
  });

  return (
    <Grid>
      <Grid className={Styles.frame}>
        <section className={Styles.todo_cmp}>
          <header className={Styles.todo_cmp__header}>
            <h2>{dateName}</h2>
            <p>{monthName + " " + day + "," + year} </p>
          </header>
          <ul className={Styles.todo_cmp__list}>
            <li>
              <label htmlFor="todo-01">
                <input
                  id="todo-01"
                  type="checkbox"
                  onClick={() => {
                    console.log("hello");
                  }}
                ></input>
                <span>Open template</span>
              </label>
            </li>
            <li>
              <label htmlFor="todo-02">
                <input id="todo-02" type="checkbox"></input>
                <span>Build a to-do list</span>
              </label>
            </li>
            <li>
              <label htmlFor="todo-02">
                <input id="todo-02" type="checkbox"></input>
                <span>Build a to-do list</span>
              </label>
            </li>
            <li>
              <label htmlFor="todo-02">
                <input id="todo-02" type="checkbox"></input>
                <span>Build a to-do list</span>
              </label>
            </li>
            <li>
              <label htmlFor="todo-03">
                <input id="todo-03" type="checkbox"></input>
                <span>Write something</span>
              </label>
            </li>
            <li>
              <label htmlFor="todo-03">
                <input id="todo-03" type="checkbox"></input>
                <span>Write something</span>
              </label>
            </li>
            <li>
              <label htmlFor="todo-03">
                <input id="todo-03" type="checkbox"></input>
                <span>Write something</span>
              </label>
            </li>
            <li>
              <label htmlFor="todo-04">
                <input id="todo-04" type="checkbox"></input>
                <span>Complete the task</span>
              </label>
            </li>
            <li>
              <label htmlFor="todo-05">
                <input id="todo-05" type="checkbox"></input>
                <span>Open template</span>
              </label>
            </li>
          </ul>
        </section>
      </Grid>
    </Grid>
  );
}

export default ListView;
