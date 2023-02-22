import React, { useState } from "react";
import { Alert, Button, Grid, LinearProgress, TextField } from "@mui/material";
import Style from "./Login.module.css";
import image from "../../asserts/logo.png";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Icon, IconButton, InputAdornment } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import loginService from "../../services/LoginService";

function Login(props) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validations = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: validations,
    onSubmit: (values) => {
      setLoading(true);
      loginService.login(values).then(
        (res) => {
          if (res.data.user !== null) {
            props.changeState();
            sessionStorage["user"] = JSON.stringify(res.data.user);
            navigate("/home");
          } else {
            setError(res.error.message);
            setTimeout(() => {
              setError("");
            }, 2200);
            // alert(res.error.message);
          }
          setLoading(false);
        },
        (error) => {
          console.log(error);
          setLoading(false);
        }
      );
    },
  });
  const [error, setError] = useState("");

  // const clas = useStyles();
  return (
    <Grid>
      <Grid item sm={12} className={Style.LoginContainer}>
        <Grid className={Style.LoginBox}>
          <Grid className={Style.LoginHeading}>
            <img className={Style.logo} src={image} alt="" />
            <h4>Welcome Back</h4>
            <h6>Enter your credentials to access your account</h6>
          </Grid>
          <Grid className={Style.LoginForm}>
            <form className={Style.form} onSubmit={formik.handleSubmit}>
              <TextField
                sx={{ width: "80%", margin: "5px" }}
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                inputProps={{ style: { fontSize: 15, borderColor: "#750077" } }}
                variant={"outlined"}
                className={Style.input}
              />
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        <Icon style={{ color: "#750077" }}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </Icon>
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ width: "80%", margin: "5px" }}
                id="password"
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                variant={"outlined"}
              />

              <Button
                className={Style.btnSubmit}
                sx={{
                  width: "80%",
                  marginTop: "10px",
                  background: "#750077",
                  color: "#D4D4D4",
                }}
                variant="contained"
                type="submit"
              >
                Login
              </Button>
              {error && (
                <Grid sx={{ marginTop: "1.2rem", width: "80%" }}>
                  <Alert severity="error">{error}</Alert>
                </Grid>
              )}
              <Grid className={Style.forgetPassword}>
                <h6>Forget your password? </h6>
                <Link to={"/home"}>
                  <h6 className={Style.reset}>Reset Password</h6>
                </Link>
              </Grid>
            </form>
          </Grid>
          {loading && (
            <Grid sx={{ width: "100%", margin: "0", top: "10" }}>
              <LinearProgress sx={{ color: "#750077" }} />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Login;

// <Formik
//             initialValues={{
//                 email: '',
//                 password: '',
//             }}
//             validate={(values) => {
//                 const errors: Partial<> = {};
//                 if (!values.email) {
//                     errors.email = 'Required';
//                 } else if (
//                     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
//                 ) {
//                     errors.email = 'Invalid email address';
//                 }
//                 return errors;
//             }}
//             onSubmit={(values, { setSubmitting }) => {
//                 setTimeout(() => {
//                     setSubmitting(false);
//                     alert(JSON.stringify(values, null, 2));
//                 }, 500);
//             }}
//         >
//             {({ submitForm, isSubmitting }) => (
//                 <Form>
//                     <Field
//                         component={TextField}
//                         name="email"
//                         type="email"
//                         label="Email"
//                     />
//                     <br />
//                     <Field
//                         component={TextField}
//                         type="password"
//                         label="Password"
//                         name="password"
//                     />
//                     {isSubmitting && <LinearProgress />}
//                     <br />
//                     <Button
//                         variant="contained"
//                         color="primary"
//                         disabled={isSubmitting}
//                         onClick={submitForm}
//                     >
//                         Submit
//                     </Button>
//                 </Form>
//             )}
//         </Formik>
