import React from "react";
import Styles from "./Matches.module.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Badge,
  Button,
  Chip,
  Divider,
  Grid,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import ManIcon from "@mui/icons-material/Man";
import image from "../../../asserts/logo.png";
import { SportsSoccer } from "@material-ui/icons";

function Matches(props) {
  const defaultProps = {
    color: "secondary",
    children: <AccessTimeIcon />,
  };
  return (
    <Grid container spacing={2} sx={{ margin: "0 auto", width: "95%" }}>
      <Grid xs={12} md={8} item>
        <Paper
          sx={{ maxHeight: "100%", minHeight: "80%", overflow: "auto" }}
          className={Styles.paperPadding}
        >
          <Grid className={Styles.headingButtonArea}>
            <h1 style={{ color: "#ffffff" }}>Matches</h1>
            <Button className={Styles.button} sx={{ background: "white" }}>
              Add New Match
            </Button>
          </Grid>
          <Accordion sx={{ margin: "0.5rem" }}>
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon
                  onClick={() => {
                    console.log("hello");
                  }}
                />
              }
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Grid className={Styles.teamArea} container spacing={5}>
                <Grid item>
                  <Chip
                    sx={{
                      color: "black",
                      padding: "0.2rem",
                    }}
                    color={"secondary"}
                    icon={<DateRangeIcon />}
                    label="2023-02-03"
                  />
                </Grid>
                <Grid
                  className={Styles.teamAreaDetails}
                  item
                  sx={{
                    display: "flex",
                    margin: "0 2rem",
                  }}
                >
                  <Avatar
                    src={image}
                    sx={{
                      width: 35,
                      height: 35,
                      padding: "0.2rem",
                      border: "1px solid #ffffff",
                    }}
                  >
                    u
                  </Avatar>
                  <Typography>
                    <b>vs</b>
                  </Typography>
                  <Avatar
                    sx={{
                      width: 35,
                      height: 35,
                      padding: "0.2rem",
                      border: "1px solid #ffffff",
                    }}
                  >
                    H
                  </Avatar>
                  <Divider></Divider>
                  <Chip
                    color={"primary"}
                    sx={{
                      color: "#ffffff",
                      padding: "0.2rem",
                    }}
                    size="small"
                    avatar={<Avatar alt="Natacha" src={image} />}
                    label="UOC WON"
                  />
                </Grid>
                <Grid item>
                  <Badge badgeContent={"40min"} {...defaultProps} />
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Grid className={Styles.details} spacing={2} container>
                <Grid item sx={6}>
                  <Paper className={Styles.detailsItem}>
                    <h3 style={{ textAlign: "center" }}>
                      University Of Colombo
                    </h3>
                    <h2 style={{ textAlign: "center" }}>3</h2>
                  </Paper>
                </Grid>
                <Grid item sx={6}>
                  <Paper className={Styles.detailsItem}>
                    <h3 style={{ textAlign: "center" }}>
                      University Of Jaffna
                    </h3>
                    <h2 style={{ textAlign: "center" }}>2</h2>
                  </Paper>
                </Grid>
              </Grid>
              <Divider sx={{ height: "1.5rem" }}></Divider>
              <Paper className={Styles.detailsItemStat}>
                <Grid className={Styles.detailsContainer} container>
                  <Chip
                    icon={<PlaceIcon></PlaceIcon>}
                    label="Ground Held"
                    variant="outlined"
                  />
                  <h4 style={{ textAlign: "center" }}>UOC premises</h4>
                </Grid>
              </Paper>
              <Paper className={Styles.detailsItemStat}>
                <Grid className={Styles.detailsContainer} container>
                  <Chip
                    icon={<ManIcon></ManIcon>}
                    label="Type Of Match"
                    variant="outlined"
                  />
                  <h4 style={{ textAlign: "center" }}>9 A side</h4>
                </Grid>
              </Paper>
              <Paper className={Styles.detailsItemStat}>
                <Grid className={Styles.detailsContainer} container>
                  <Chip
                    icon={<OndemandVideoIcon></OndemandVideoIcon>}
                    label="Video Link"
                    variant="outlined"
                  />
                  <h6 style={{ textAlign: "center" }}>
                    <Link href={"https://youtu.be/9Em39Nfvlu8"}>
                      https://youtu.be/9Em39Nfvlu8
                    </Link>
                  </h6>
                </Grid>
              </Paper>
              <Paper className={Styles.detailsItemStat}>
                <Accordion>
                  <AccordionSummary
                    sx={{ padding: "0", margin: "0 auto", width: "100%" }}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Grid className={Styles.detailsContainer} container>
                      <Chip
                        icon={<SportsSoccer></SportsSoccer>}
                        label="Goals Scored"
                        variant="outlined"
                      />
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails className={Styles.goals}>
                    <Chip
                      icon={<SportsSoccer></SportsSoccer>}
                      label="2-Damish"
                      variant="outlined"
                    />
                    <Chip
                      icon={<SportsSoccer></SportsSoccer>}
                      label="2-Herath"
                      variant="outlined"
                    />
                    <Chip
                      icon={<SportsSoccer></SportsSoccer>}
                      label="2-Damish"
                      variant="outlined"
                    />
                  </AccordionDetails>
                </Accordion>
              </Paper>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ margin: "0.5rem" }}>
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon
                  onClick={() => {
                    console.log("hello");
                  }}
                />
              }
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Grid className={Styles.teamArea} container spacing={5}>
                <Grid item>
                  <Chip
                    sx={{
                      color: "black",
                      padding: "0.2rem",
                    }}
                    color={"secondary"}
                    icon={<DateRangeIcon />}
                    label="2023-02-03"
                  />
                </Grid>
                <Grid
                  className={Styles.teamAreaDetails}
                  item
                  sx={{
                    display: "flex",
                    margin: "0 2rem",
                  }}
                >
                  <Avatar
                    src={image}
                    sx={{
                      width: 35,
                      height: 35,
                      padding: "0.2rem",
                      border: "1px solid #ffffff",
                    }}
                  >
                    u
                  </Avatar>
                  <Typography>
                    <b>vs</b>
                  </Typography>
                  <Avatar
                    sx={{
                      width: 35,
                      height: 35,
                      padding: "0.2rem",
                      border: "1px solid #ffffff",
                    }}
                  >
                    H
                  </Avatar>
                  <Divider></Divider>
                  <Chip
                    color={"primary"}
                    sx={{
                      color: "#ffffff",
                      padding: "0.2rem",
                    }}
                    size="small"
                    avatar={<Avatar alt="Natacha" src={image} />}
                    label="UOC WON"
                  />
                </Grid>
                <Grid item>
                  <Badge badgeContent={"40min"} {...defaultProps} />
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Grid className={Styles.details} spacing={2} container>
                <Grid item sx={6}>
                  <Paper className={Styles.detailsItem}>
                    <h3 style={{ textAlign: "center" }}>
                      University Of Colombo
                    </h3>
                    <h2 style={{ textAlign: "center" }}>3</h2>
                  </Paper>
                </Grid>
                <Grid item sx={6}>
                  <Paper className={Styles.detailsItem}>
                    <h3 style={{ textAlign: "center" }}>
                      University Of Jaffna
                    </h3>
                    <h2 style={{ textAlign: "center" }}>2</h2>
                  </Paper>
                </Grid>
              </Grid>
              <Divider sx={{ height: "1.5rem" }}></Divider>
              <Paper className={Styles.detailsItemStat}>
                <Grid className={Styles.detailsContainer} container>
                  <Chip
                    icon={<PlaceIcon></PlaceIcon>}
                    label="Ground Held"
                    variant="outlined"
                  />
                  <h4 style={{ textAlign: "center" }}>UOC premises</h4>
                </Grid>
              </Paper>
              <Paper className={Styles.detailsItemStat}>
                <Grid className={Styles.detailsContainer} container>
                  <Chip
                    icon={<ManIcon></ManIcon>}
                    label="Type Of Match"
                    variant="outlined"
                  />
                  <h4 style={{ textAlign: "center" }}>9 A side</h4>
                </Grid>
              </Paper>
              <Paper className={Styles.detailsItemStat}>
                <Grid className={Styles.detailsContainer} container>
                  <Chip
                    icon={<OndemandVideoIcon></OndemandVideoIcon>}
                    label="Video Link"
                    variant="outlined"
                  />
                  <h6 style={{ textAlign: "center" }}>
                    <Link href={"https://youtu.be/9Em39Nfvlu8"}>
                      https://youtu.be/9Em39Nfvlu8
                    </Link>
                  </h6>
                </Grid>
              </Paper>
              <Paper className={Styles.detailsItemStat}>
                <Accordion>
                  <AccordionSummary
                    sx={{ padding: "0", margin: "0 auto", width: "100%" }}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Grid className={Styles.detailsContainer} container>
                      <Chip
                        icon={<SportsSoccer></SportsSoccer>}
                        label="Goals Scored"
                        variant="outlined"
                      />
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails className={Styles.goals}>
                    <Chip
                      icon={<SportsSoccer></SportsSoccer>}
                      label="2-Damish"
                      variant="outlined"
                    />
                    <Chip
                      icon={<SportsSoccer></SportsSoccer>}
                      label="2-Herath"
                      variant="outlined"
                    />
                    <Chip
                      icon={<SportsSoccer></SportsSoccer>}
                      label="2-Damish"
                      variant="outlined"
                    />
                  </AccordionDetails>
                </Accordion>
              </Paper>
            </AccordionDetails>
          </Accordion>
        </Paper>
      </Grid>
      <Grid xs={12} md={4} item>
        <Paper className={Styles.paperPadding}>
          <h1 style={{ color: "#ffffff" }}>Match Stats</h1>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Matches;
