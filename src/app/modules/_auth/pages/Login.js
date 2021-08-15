/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import * as CONST from "../../../../Constant";
import { makeStyles } from "@material-ui/core/styles";
// import { Box } from "@material-ui/core";
import LockOpenIcon from '@material-ui/icons/LockOpen';

function Login(props) {
  const useStyle = makeStyles((theme) => ({
    logo: {
      width: 150,
      height: 150,
    },
    bg: {
      width: 700,
      height: 500,
    },
  }));
  const classes = useStyle();

  return (
    <Grid container item xs={12} lg={12} >
      <Grid item xs={12} lg={6}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <img
            className={classes.bg}
            alt=""
            src={process.env.PUBLIC_URL + "/media/bg2.png"}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} lg={6} style={{ marginTop: 150 }}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} lg={12} >
            <img
              className={classes.logo}
              alt=""
              src={process.env.PUBLIC_URL + "/logo192.png"}
            />
          </Grid>
          <Grid item xs={12} lg={12} >
            <Button
              size="large"
              variant="contained"
              color="primary"
              endIcon={<LockOpenIcon />}
              disableElevation
              onClick={() => {
                let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=300,height=500,left=200,top=200`;
                window.open(CONST.SSO_URL, "login", params);
              }}
            >
              login to siamsmile
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>

  );
}

export default Login
