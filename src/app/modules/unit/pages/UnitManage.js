import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import AddButton from "../../_common/components/Buttons/AddButton";
import UnitTable from "../components/UnitTable";
import * as unitRedux from "../_redux/unitRedux";
import { useSelector, useDispatch } from "react-redux";
import UnitAddEditPopup from "../components/UnitAddEditPopup";

function UnitManage() {
  const dispatch = useDispatch();
  const unitReducer = useSelector(({ unit }) => unit);
  return (
    <Grid container>
      <Paper style={{ width: "100%", padding: 10 }}>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid item xs={6} lg={10}>
            <Typography variant="h6">Manage Units</Typography>
          </Grid>
          <Grid item xs={6} lg={2}>
            <AddButton
              onClick={() => {
                dispatch(unitRedux.actions.showAddPopup());
              }}
            ></AddButton>
          </Grid>
        </Grid>
      </Paper>
      <Grid item xs={12} lg={12}>
        <UnitTable></UnitTable>
      </Grid>
      <UnitAddEditPopup></UnitAddEditPopup>
    </Grid>
  );
}

export default UnitManage;
