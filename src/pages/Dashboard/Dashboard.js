import React from 'react';
import Styles from './Dashboard.module.css';
import {Grid, Paper, Typography} from "@material-ui/core";
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import ViewDayIcon from '@mui/icons-material/ViewDay';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

function Dashboard(props) {
    return (
        <div className={Styles.dashboardContainer}>
            <Grid className={Styles.item} container direction={"row"} justifyContent={"space-around"} spacing={2}>
                <Grid className={Styles.itemContainer} xs={10} md={4}>
                    <Paper className={Styles.item_paper}>
                        <div className={Styles.item_paper_Container}>
                            <AccessibilityNewIcon style={{fontSize:'2.85rem'}} className={Styles.iconDetails}></AccessibilityNewIcon>
                           <div className={Styles.item_paper_Container_Secondry}>
                               <Typography variant={"h5"} className={Styles.textColor}>
                                   25
                               </Typography>
                               <Typography variant={"subtitle2"} className={Styles.secondTextColor}>
                                   SEASONED PLAYED MATCHES
                               </Typography>
                           </div>
                        </div>

                    </Paper>
                </Grid>
                <Grid className={Styles.itemContainer} xs={10} md={4}>
                    <Paper className={Styles.item_paper}>
                        <div className={Styles.item_paper_Container}>
                            <ViewDayIcon style={{fontSize:'2.85rem'}} className={Styles.iconDetails}></ViewDayIcon>
                            <div className={Styles.item_paper_Container_Secondry}>
                                <Typography variant={"h5"} className={Styles.textColor}>
                                    25
                                </Typography>
                                <Typography variant={"subtitle2"} className={Styles.secondTextColor}>
                                    SEASONED PLAYED MATCHES
                                </Typography>
                            </div>
                        </div>

                    </Paper>
                </Grid>
                <Grid className={Styles.itemContainer} xs={10} md={4}>
                    <Paper className={Styles.item_paper}>
                        <div className={Styles.item_paper_Container}>
                            <MonetizationOnIcon style={{fontSize:'2.85rem'}} className={Styles.iconDetails}></MonetizationOnIcon>
                            <div className={Styles.item_paper_Container_Secondry}>
                                <Typography variant={"h5"} className={Styles.textColor}>
                                    25
                                </Typography>
                                <Typography variant={"subtitle2"} className={Styles.secondTextColor}>
                                    SEASONED PLAYED MATCHES
                                </Typography>
                            </div>
                        </div>

                    </Paper>
                </Grid>
            </Grid>
        </div>

    );
}

export default Dashboard;