import { Button, Spinner, ButtonGroup } from "react-bootstrap";
import React, { useState, useContext, useEffect } from "react";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import axios from "axios";
import { registerByXlsx } from "../api/gift";
import { AuthContext } from "../appContext";
import Header from "../components/Header";
import "./Admin.css";
import BrandIntro from "../components/BrandIntro";

function ShowQR(props) {
  return (
    <div className="sq-div">
      <h3>
        <b>禮盒對應 QR Code</b>
      </h3>
      <br />
      <table className="sq-table">
        <tbody>
          <tr>
            <td>
              <p>
                <b>銷日芒果</b>
              </p>
              <img src={require("../img/qr-mango.png").default}></img>
            </td>
            <td>
              <p>
                <b>銷日鳳梨</b>
              </p>
              <img src={require("../img/qr-pineapple.png").default}></img>
            </td>
            <td>
              <p>
                <b>銷日荔枝</b>
              </p>
              <img src={require("../img/qr-lychee.png").default}></img>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default function Admin(props) {
  const [uploaded, setUploaded] = useState(false);
  const { authState, authDispatch } = useContext(AuthContext);

  useEffect(() => {}, [uploaded]);

  function UploadPanel() {
    const [xlsxFile, setXlsxFile] = useState([]);
    const [uploading, setUploading] = useState(false);
    const handleXlsxChange = ({ meta, file }, status) => {
      console.log("cfile", file);
      if (status === "removed") {
        setXlsxFile([]);
      }
      if (status === "preparing") {
        setXlsxFile(file);
      }
    };

    const handleSubmit = (e) => {
      const xlsxData = new FormData();
      if (xlsxFile !== null && typeof xlsxFile !== null) {
        xlsxData.append("xlsx", xlsxFile);
        console.log("-------");
        setUploading(true);
        registerByXlsx(xlsxData).then((r) => {
          if (r.length === 0) {
            alert("something wrong");
          } else {
            alert("上傳成功");
            setUploaded(true);
          }
          setUploading(false);
        });
      }
    };
    return (
      <div className="ul-div">
        <h3>
          <b>訂單 Excel 上傳</b>
        </h3>
        <br />
        <div className="ul-dz">
          <Dropzone
            // getUploadParams={getUploadParams}
            onChangeStatus={handleXlsxChange}
            // onSubmit={handleSubmit}
            inputContent={<span>點擊上傳～</span>}
            submitButtonContent={<span>上傳</span>}
            maxFiles={1}
            inputWithFilesContent={<span>增加檔案</span>}
            accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          />
          <div className="mt-3">
            {!uploading && <Button onClick={handleSubmit}>上傳</Button>}
            {uploading && (
              <Button variant="primary" disabled>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Loading...
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const logOutEvent = (event) => {
    authDispatch({
      type: "LOGOUT",
    });
  };

  return (
    <div>
      <Header menu={null} logOutEvent={logOutEvent}></Header>
      {!uploaded && <UploadPanel></UploadPanel>}
      {uploaded && <ShowQR></ShowQR>}
      <BrandIntro lang={props.lang}></BrandIntro>
    </div>
  );
}
