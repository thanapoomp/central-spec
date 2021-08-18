import React from "react";
import { Typography } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import Axios from "axios";
import fileDownload from "js-file-download";

function Home() {
  const handleDownload = () => {
    Axios.get(
      `http://uat.siamsmile.co.th:9149/api/Report/ExportSMSReport/datedata?SendedDateStart=2021-08-14&SendedDateEnd=2021-08-16`,
      {
        responseType: "blob",
      }
    ).then((res) => {
      console.log(JSON.stringify(res));
      fileDownload(res.data, "test.xlsx");
    });
  };
  return (
    <div>
      <Typography>
        Home sweet Home สวัสดี <Icon>home</Icon>
      </Typography>
      <button onClick={handleDownload}>download</button>
    </div>
  );
}

export default Home;
