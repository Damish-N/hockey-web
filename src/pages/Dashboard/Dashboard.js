import React from 'react';
import Styles from './Dashboard.module.css';
import {Grid, Paper, Typography} from "@material-ui/core";

function Dashboard(props) {
    return (
        <div className={Styles.dashboardContainer}>
            <Grid className={Styles.item} container direction={"row"} justifyContent={"space-around"} spacing={2}>
                <Grid className={Styles.itemContainer} xs={10} md={4}>
                    <Paper className={Styles.item_paper}>
                        <Typography variant={"h5"} className={Styles.textColor}>
                            25
                        </Typography>
                        <Typography variant={"subtitle2"} className={Styles.secondTextColor}>
                            PLAYERS
                        </Typography>
                    </Paper>
                </Grid>
                <Grid className={Styles.itemContainer} xs={10} md={4}>
                    <Paper className={Styles.item_paper}>
                        <Typography variant={"h5"} className={Styles.textColor}>
                            25
                        </Typography>
                        <Typography variant={"subtitle2"} className={Styles.secondTextColor}>
                            SEASONED PLAYED MATCHES
                        </Typography>
                    </Paper>
                </Grid>
                <Grid className={Styles.itemContainer} xs={10} md={4}>
                    <Paper className={Styles.item_paper}>
                        <Typography variant={"h5"} className={Styles.textColor}>
                            25,500
                        </Typography>
                        <Typography variant={"subtitle2"} className={Styles.secondTextColor}>
                            CASH IN HAND(Rs)
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>

    );
}

export default Dashboard;