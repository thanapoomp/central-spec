/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React from "react";
import { Paper, Grid, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import * as unitAxios from "../_redux/unitAxios";
import StandardDataTable from "../../_common/components/DataTable/StandardDataTable";
import ColumnDateTime from "../../_common/components/DataTable/ColumnDateTime";
import ColumnIsActive from "../../_common/components/DataTable/ColumnIsActive";
import EditButton from "../../_common/components/Buttons/EditButton";
import * as swal from "../../_common/components/SweetAlert";
import ViewButton from "../../_common/components/Buttons/ViewButton";
import DeleteButton from "../../_common/components/Buttons/DeleteButton";

var flatten = require("flat");

require("dayjs/locale/th");
var dayjs = require("dayjs");
dayjs.locale("th");

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
    height: "auto",
  },
}));

function UnitTable(props) {
  const classes = useStyles();

  const [paginated, setPaginated] = React.useState({
    page: 1,
    recordsPerPage: 1000,
    orderingField: "",
    ascendingOrder: true,
  });

  const [totalRecords, setTotalRecords] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  //load Data
  const loadData = () => {
    setLoading(true);
    unitAxios
      .getUnits()
      .then((res) => {
        if (res.data.isSuccess) {
          let flatData = [];
          res.data.data.forEach((element) => {
            flatData.push(flatten(element));
          });
          setData(flatData);
          setTotalRecords(res.data.totalAmountRecords);
        } else {
          swal.swalError("error", res.data.message);
        }
      })
      .catch((err) => {
        swal.swalError("Error", err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // column
  const columns = [
    {
      name: "id",
      label: "รหัสรายการ",
    },
    {
      name: "name",
      label: "รายการ",
      option: {
        sort: false,
      },
    },
    {
      name: "isActive",
      label: "สถานะ",
      options: {
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <ColumnIsActive
              value={data[dataIndex].isActive}
              activeText="ใช้งาน"
              inActiveText="ไม่ใช้งาน"
            ></ColumnIsActive>
          );
        },
      },
    },
    {
      name: "วันที่สร้าง",
      options: {
        sort: false,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <ColumnDateTime
              value={data[dataIndex].createdDate}
            ></ColumnDateTime>
          );
        },
      },
    },

    {
      name: "",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <Grid
              style={{ padding: 0, margin: 0 }}
              container
              spacing={1}
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Grid item xs={12} lg={4}>
                <EditButton
                  onClick={() => {
                    handleButtonClick("edit", data[dataIndex].id);
                  }}
                ></EditButton>
              </Grid>
              <Grid item xs={12} lg={4}>
                <DeleteButton
                  onClick={() => {
                    handleButtonClick("delete", data[dataIndex].id);
                  }}
                ></DeleteButton>
              </Grid>
            </Grid>
          );
        },
      },
    },
  ];

  const handleButtonClick = (action, id) => {
    swal.swalInfo("clicked info", action + " " + id);
  };

  React.useEffect(() => {
    loadData();
  }, [paginated]);

  return (
    <Paper elevation={3} className={classes.paper}>
      {loading && <CircularProgress />}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <StandardDataTable
            name="unitTable"
            title=""
            denseTable
            columns={columns}
            data={data}
            paginated={paginated}
            setPaginated={setPaginated}
            totalRecords={totalRecords}
          ></StandardDataTable>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default UnitTable;
