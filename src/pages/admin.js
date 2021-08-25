import { Button, Spinner } from "react-bootstrap";
import React, { useState, useContext, useEffect } from "react";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import { registerByXlsx } from "../api/gift";
import { fetchRecord } from "../api/admin";
import { AuthContext } from "../appContext";
import Header from "../components/Header";
import { Table } from "react-bootstrap";
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
              <img src={require("../img/qr-mango.png").default} alt=""></img>
            </td>
            <td>
              <p>
                <b>銷日鳳梨</b>
              </p>
              <img src={require("../img/qr-pineapple.png").default} alt=""></img>
            </td>
          </tr>
          <tr>
            <td>
              <p>
                <b>銷日荔枝</b>
              </p>
              <img src={require("../img/qr-lychee.png").default} alt=""></img>
            </td>
            <td>
              <p>
                <b>銷日文旦</b>
              </p>
              <img src={require("../img/qr-pomelo.png").default} alt=""></img>
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
  const [records, setRecords] = useState([]);
  
  useEffect(() => {
    fetchRecord().then((data) => {
      setRecords(data);
    });
  }, []);

  function UploadPanel() {
    const [xlsxFile, setXlsxFile] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [fileLoaded, setFileLoaded] = useState(false);
    const handleXlsxChange = ({ meta, file }, status) => {
      console.log("cfile", file);
      if (status === "removed") {
        setFileLoaded(false);
        setXlsxFile([]);
      }
      if (status === "preparing") {
        setFileLoaded(true);
        setXlsxFile(file);
      }
    };

    const handleSubmit = (e) => {
      const xlsxData = new FormData();
      
      if (xlsxFile !== null && typeof xlsxFile !== null) {
        console.log("xlsxFile");
        console.log(xlsxFile);
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
            inputContent={<span>點擊上傳</span>}
            submitButtonContent={<span>上傳</span>}
            maxFiles={1}
            inputWithFilesContent={<span>增加檔案</span>}
            accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          />
          <div className="mt-3">
            {(fileLoaded && !uploading) && <Button onClick={handleSubmit} >上傳</Button>}
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
          <div className="mt-5">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>訂單編號</th>
                  <th>寄件人</th>
                  <th>寄件人電話</th>
                  <th>收件人</th>
                  <th>收件人電話</th>
                  <th>產品</th>
                  <th>影片簡訊</th>
                  <th>密碼簡訊</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => {
                  return (
                    <tr>
                      <td>{record["orderNumber"]}</td>
                      <td>{record["sender"]}</td>
                      <td>{record["sender_phone"]}</td>
                      <td>{record["receiver"]}</td>
                      <td>{record["receiver_phone"]}</td>
                      <td>{record["products"]}</td>
                      <td>
                        {record["sender_sid"] ? (
                          <i class="fas fa-check"></i>
                        ) : (
                          <i class="far fa-times"></i>
                        )}
                      </td>
                      <td>
                        {record["receiver_sid"] ? (
                          <i class="fas fa-check"></i>
                        ) : (
                          <i class="far fa-times"></i>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
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
