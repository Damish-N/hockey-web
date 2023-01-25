import React from 'react';
import Styles from './Dashboard.module.css';
import {Grid, Paper, Typography} from "@material-ui/core";

function Dashboard(props) {
    return (
        <div className={Styles.dashboardContainer}>
            <Grid className={Styles.item} container direction={"row"} justifyContent={"space-around"} spacing={2}>
                <Grid onClick={() => {
                    console.log("Hello")
                }} className={Styles.itemContainer} xs={10} md={4}>
                    <Paper className={Styles.item_paper}>
                        <Typography variant={"h5"} className={Styles.textColor}>
                            25
                        </Typography>
                        <Typography variant={"h6"} className={Styles.textColor}>
                            PLAYERS
                        </Typography>
                    </Paper>
                </Grid>
                <Grid className={Styles.itemContainer} xs={10} md={4}>
                    <Paper className={Styles.item_paper}>
                        <Typography variant={"h5"} className={Styles.textColor}>
                            15
                        </Typography>
                        <Typography variant={"h6"} className={Styles.textColor}>
                            MATCHES
                        </Typography>
                    </Paper>
                </Grid>
                <Grid className={Styles.itemContainer} xs={10} md={4}>
                    <Paper className={Styles.item_paper}>
                        <Typography variant={"h5"} className={Styles.textColor}>
                            Rs:25,502
                        </Typography>
                        <Typography variant={"h6"} className={Styles.textColor}>
                            CASH IN HAND
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>

    );
}

export default Dashboard;