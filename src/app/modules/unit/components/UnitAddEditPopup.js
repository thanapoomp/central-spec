import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { Grid, Button } from "@material-ui/core/";
import { useHistory } from "react-router";
import FormikTextField from "../../_common/components/CustomFormik/FormikTextField";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import * as unitRedux from "../_redux/unitRedux";
import * as unitAxios from "../_redux/unitAxios";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as swal from "../../_common/components/SweetAlert";
import { reject } from "q";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UnitAddEditPopup() {
  const dispatch = useDispatch();
  const unitReducer = useSelector(({ unit }) => unit);

  const handleClose = () => {
    dispatch(unitRedux.actions.hidePopup());
  };

  const [state] = React.useState({
    name: "",
  });

  const handleAdd = (values) => {
    //todo: add
    let payload = {
      name: values.name,
    };
    unitAxios
      .addUnit(payload)
      .then((res) => {
        if (res.data.isSuccess) {
        } else {
          swal.swalError("error", res.data.message);
        }
      })
      .catch((err) => {
        swal.swalError("error", err.message).then();
      })
      .finally(() => {
        formik.setSubmitting(false);
      });
  };

  const formik = useFormik({
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};

      if (!values.name) {
        errors.name = "Required";
      }

      return errors;
    },
    initialValues: {
      name: state.name,
    },
    onSubmit: (values) => {
      //submit ....
      if (!unitReducer.selectedUnitId) {
        handleAdd(values);
      }
      // formik.setSubmitting(false);
      // formik.resetForm()
      // });
    },
  });

  return (
    <Dialog
      open={unitReducer.showAddEdit}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        {unitReducer.selectedUnitId ? "Edit Unit" : "New Unit"}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit} style={{ margin: 10 }}>
          <Grid container spacing={3}>
            {/* Start name */}
            <Grid item xs={12} lg={12}>
              <FormikTextField
                formik={formik}
                name="name"
                label="Name"
                required
              />
            </Grid>

            <Grid item xs={12} lg={6}>
              <Button
                type="submit"
                disabled={formik.isSubmitting || !formik.dirty}
                fullWidth
                color="primary"
                variant="contained"
              >
                Submit
              </Button>
            </Grid>

            <Grid item xs={12} lg={6}>
              <Button fullWidth onClick={handleClose} variant="contained">
                Back
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
}
