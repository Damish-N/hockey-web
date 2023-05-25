import React, { Fragment, useContext, useState } from "react";
import style from "./NavBar.module.css";
import x from "../../../asserts/logo-removebg-preview.png";
import user from "../../../asserts/user.png";
import { Link, useNavigate } from "react-router-dom";
import { Grid } from "@material-ui/core";
import loginService from "../../../services/LoginService";
import Context from "../../context/Context";

function NavBar(props) {
  const userStates = useContext(Context);
  const [popUp, setPopUp] = useState(true);

  let navigate = useNavigate();

  function popUpWindow() {
    setPopUp((prevState) => !prevState);
  }

  function logOut() {
    loginService.logout().then((r) => {
      props.changeState();
      sessionStorage.removeItem("user");
      localStorage.removeItem("sb-tjelkiwfbrbhhugapbkk-auth-token");
      navigate("/login");
    });

    // localStorage.removeItem("token");
  }

  return (
    <Grid className={style.container}>
      <Grid
        className={style.leftContainer}
        onClick={() => {
          navigate("/");
        }}
      >
        <Grid className={style.imageContainer}>
          <img className={style.logo} src={x} alt="" />
        </Grid>
        <Grid className={style.vl}></Grid>
        <Grid className={style.heading}>
          <h3>
            UNIVERSITY OF COLOMBO <br />
            HOCKEY
          </h3>
        </Grid>
      </Grid>
      <Grid className={style.rightContainer}>
        <Link
          style={{ textDecoration: "none" }}
          className={style.linkStyle}
          to={"/news"}
        >
          <h3>News & Events</h3>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          className={style.linkStyle}
          to={"/"}
        >
          <h3>Contact Us</h3>
        </Link>
        <img
          onClick={popUpWindow}
          src={user}
          className={style.user}
          alt="user"
        />
        <div className={style.dropdownContent} hidden={popUp}>
          {userStates.login === true || sessionStorage["user"] ? (
            <Fragment>
              <Link to={"login"} style={{ textDecoration: "none" }}>
                <div className={style.dropBox}>
                  <p> My Profile </p>
                </div>
              </Link>
              <Link
                onClick={popUpWindow}
                to={"dashboard"}
                style={{ textDecoration: "none" }}
              >
                <div className={style.dropBox}>
                  <p> Dashboard </p>
                </div>
              </Link>
              <Link
                onClick={logOut}
                to={"login"}
                style={{ textDecoration: "none" }}
              >
                <div className={style.dropBox}>
                  <p> Log out </p>
                </div>
              </Link>
            </Fragment>
          ) : (
            <Fragment>
              <Link
                // onClick={logOut}
                to={"login"}
                style={{ textDecoration: "none" }}
              >
                <div className={style.dropBox}>
                  <p> Log In </p>
                </div>
              </Link>
            </Fragment>
          )}
        </div>
      </Grid>
    </Grid>
  );
}

export default NavBar;
