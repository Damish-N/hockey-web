import React from 'react';
import style from './NavBar.module.css'
import x from '../../../asserts/logo-removebg-preview.png'
import user from "../../../asserts/user.png"
import {Link} from 'react-router-dom';
import {Grid} from "@material-ui/core";

function NavBar(props) {
    return (
        <Grid className={style.container}>
            <Grid className={style.leftContainer}>
                <Grid className={style.imageContainerl}>
                    <img className={style.logo} src={x} alt=""/>
                </Grid>
                <Grid className={style.vl}></Grid>
                <Grid className={style.heading}>
                    <h3>
                        UNIVERSITY OF COLOMBO <br/>
                        HOCKEY
                    </h3>
                </Grid>
            </Grid>
            <Grid className={style.rightContainer}>

                <Link style={{textDecoration:"none"}} className={style.linkStyle} to={"/"}>
                    <h3>News & Events</h3>
                </Link>
                <Link style={{textDecoration:"none"}} className={style.linkStyle} to={"/"}>
                    <h3>Contact Us</h3>
                </Link>
                <img src={user} className={style.user} alt="user"/>

            </Grid>
        </Grid>
    );
}

export default NavBar;