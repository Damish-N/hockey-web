import React from 'react';
import {Button, Grid, TextField} from '@mui/material';
import Style from './Login.module.css'
import image from '../../asserts/logo.png'
import {useFormik} from 'formik'
import {Link} from "react-router-dom";


function Login(props) {
    const validations = (values) => {
        const errors = {};
        if (!values.email) {
            errors.email = 'Required';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
            errors.email = 'Invalid email address';
        }
        if (!values.password) {
            errors.password = 'Required';
        } else if (values.password.length < 8) {
            errors.password = 'Password must be at least 8 characters';
        }
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate: validations,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        }
    });


    return (
        <Grid className={Style.LoginContainer}>
            <Grid className={Style.LoginBox}>
                <Grid className={Style.LoginHeading}>
                    <img className={Style.logo} src={image} alt=""/>
                    <h4>Welcome Back</h4>
                    <h6>Enter your credentials to access your account</h6>
                </Grid>
                <Grid className={Style.LoginForm}>
                    <form className={Style.form} onSubmit={formik.handleSubmit}>
                        <TextField
                            sx={{width: '80%', margin: '5px'}}
                            id="email"
                            name="email"
                            label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            inputProps={{style: {fontSize: 15, borderColor: '#750077'}}}
                            variant={"outlined"}
                            className={Style.input}
                        />
                        <TextField
                            sx={{width: '80%', margin: '5px'}}
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            variant={"outlined"}
                        />
                        <Button className={Style.btnSubmit}
                                sx={{width: "80%", marginTop: '10px', background: "#750077"}} variant="contained"
                                type="submit">
                            Login
                        </Button>
                        <Grid className={Style.forgetPassword}>
                            <h6>Forget your password? </h6>
                            <Link to={"/"}>
                                <h6 className={Style.reset}>Reset Password</h6>
                            </Link>
                        </Grid>
                    </form>

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