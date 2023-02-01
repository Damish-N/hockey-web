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
            {props.list.map((todo, key) => {
              return (
                todo.status === "pending" && (
                  <li key={key}>
                    <label htmlFor={key}>
                      <input
                        id={key}
                        type="checkbox"
                        onClick={() => {
                          todo.status = "completed";
                          console.log(todo);
                        }}
                      ></input>
                      {/*<span>{todo.task}</span>*/}
                      <span>{todo.detail}</span>
                    </label>
                  </li>
                )
              );
            })}
          </ul>
        </section>
      </Grid>
    </Grid>
  );
}

export default ListView;
