import React, { useState, useEffect } from "react";
import "./SenderPage.css";
import CardTemplate1 from "../components/CardTemplates/CardTemplate1";
import BrandIntro from "../components/BrandIntro";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import {
  IsOrderNumberValid,
  GetPassword,
  GetOrderInfo,
  GetText,
  GetVideoInfo,
  VideoUploadInstance,
  VideoPreviewUrl,
  UploadGift,
  detailDict,
  exampleGreets,
  GetViewNumber,
  GetReturnVideoInfo,
  GetReturnText,
  GetReturnCardExist,
} from "../api/gift";

import {
  Tab,
  Row,
  Col,
  ListGroup,
  Button,
  Tabs,
  Form,
  ProgressBar,
} from "react-bootstrap";

function OrderInfo(props) {
  if (!props.show || !props.orderInfo) {
    return null;
  }

  const receiver = props.orderInfo.receiver
    ? props.orderInfo.receiver
    : "收禮者";
  const products =
    props.orderInfo.products && props.orderInfo.products.length != 0
      ? props.orderInfo.products
      : ["銷日芒果", "銷日鳳梨", "銷日荔枝"];

  function certificate(cts) {
    if (!cts || cts.length < 1) return null;
    return (
      <Tab eventKey="certificates" title="檢驗證書">
        <table>
          <tbody>
            <tr>
              {cts.map((item, index) => {
                return (
                  <td>
                    <img className="oi-img" src={item}></img>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </Tab>
    );
  }

  return (
    <div className="order-info-div" id="orderInfo">
      <h2 className="oi-title">
        <b>訂單資訊</b>
      </h2>
      <span className="oi-title">
        以下是您訂購送給 <b>{receiver}</b> 的禮品內容
      </span>
      <br />
      <br />
      <div className="oi-tab">
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
          <Row>
            <Col sm={3}>
              <ListGroup>
                {products.map((item, index) => {
                  return (
                    <ListGroup.Item
                      action
                      key={"list-item-" + (index + 1).toString()}
                      href={"#link" + (index + 1).toString()}
                    >
                      {detailDict[item].productName}
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Col>
            <Col sm={8}>
              <Tab.Content>
                {products.map((item, index) => {
                  return (
                    <Tab.Pane
                      eventKey={"#link" + (index + 1).toString()}
                      key={"tab-pane-" + (index + 1).toString()}
                    >
                      <Tabs defaultActiveKey="intro">
                        <Tab eventKey="intro" title="禮品介紹">
                          <table>
                            <tbody>
                              <tr>
                                <td className="oi-table-img">
                                  <img
                                    className="oi-img"
                                    src={detailDict[item].productPhoto}
                                  ></img>
                                </td>
                                <td className="oi-table-text">
                                  <h4>
                                    <b>{detailDict[item].productName}</b>
                                  </h4>
                                  <p>{detailDict[item].productText}</p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </Tab>
                        <Tab eventKey="farm" title="農場資訊">
                          <table>
                            <tbody>
                              <tr>
                                <td className="oi-table-text">
                                  <h4>
                                    <b>{detailDict[item].farmName}</b>
                                  </h4>
                                  <p>{detailDict[item].farmText}</p>
                                </td>
                                <td className="oi-table-img">
                                  <img
                                    className="oi-img"
                                    src={detailDict[item].farmPhoto}
                                  ></img>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </Tab>
                        {certificate(detailDict[item].certificates)}
                      </Tabs>
                    </Tab.Pane>
                  );
                })}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </div>
  );
}

function Illustration(props) {
  return (
    <div className="il-div" id="illust">
      <h2 className="color-white">
        <b>禮重 ‧ 情意濃</b>
      </h2>
      <span>
        錄製給 <b>{props.receiver}</b> 的一段影音
      </span>
      <br />
      <span>讓他/她可以透過掃描禮盒上的QR Code</span>
      <br />
      <span>看見、聽見你的祝福</span>
      <br />
      <img
        className="il-img"
        src={require("../img/illustration.png").default}
      ></img>
    </div>
  );
}

function CardForm(props) {
  const [sender, setSender] = useState("");
  const [videoInfo, setVideoInfo] = useState(null);
  const [greetText, setGreetText] = useState("");
  const [uploadProgress, setUploadProgress] = useState(null);

  useEffect(() => {
    if (props.show) {
      if (props.sender) setSender(props.sender);
      if (props.videoInfo) setVideoInfo(props.videoInfo);
      if (props.greetText) setGreetText(props.greetText);
    }
  }, [props.sender, props.videoInfo, props.greetText]);

  if (!props.show) {
    return null;
  }

  function senderHandelChange(event) {
    setSender(event.target.value);
  }

  function greetTextHandelChange(event) {
    setGreetText(event.target.value);
  }

  function videoHandelChange(event) {
    let formData = new FormData();
    formData.append("file", event.target.files[0]);
    VideoUploadInstance.post("", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (data) => {
        //Set the progress value to show the progress bar
        setUploadProgress(Math.round((100 * data.loaded) / data.total));
      },
    }).then((response) => {
      setVideoInfo(response.data);
    });
  }

  function submitHandler(event) {
    event.preventDefault(); //prevent the form from submitting
    UploadGift({
      orderNumber: props.orderNumber,
      videoID: videoInfo.fileId,
      giftText: greetText,
      giftFrom: sender,
    })
      .then((response) => {
        console.log(response);

        confirmAlert({
          title:
            "您製作給" +
            (props.receiver ? props.receiver : "收禮者") +
            "的賀卡已成功寄出！",
          message: "是否預覽完稿頁面？",
          buttons: [
            {
              label: "是，開啟預覽頁",
              onClick: () => window.open("/preview/" + props.orderNumber),
            },
            {
              label: "否，留在本頁",
              onClick: () => {},
            },
          ],
        });
      })
      .catch((err) => {
        alert("賀卡儲存失敗，請聯繫客服人員，謝謝！");
        console.error(err);
      });
  }

  const examples = () => {
    if (!exampleGreets || Object.keys(exampleGreets).length < 1) return null;
    const types = Object.keys(exampleGreets);
    return (
      <div className="cf-greet-example">
        <span>套用範本</span>
        {types.map((item, index) => {
          return (
            <span>
              {" "}
              <Button
                size="sm"
                variant="secondary"
                onClick={exambleOnclick.bind(null, item)}
              >
                {item}
              </Button>
            </span>
          );
        })}
      </div>
    );
  };

  const exambleOnclick = (type) => {
    var items = exampleGreets[type];
    setGreetText(items[Math.floor(Math.random() * items.length)]);
  };

  return (
    <div className="cf-div" id="card">
      <h2>
        <b>製作給 {props.receiver ? props.receiver : "收禮者"} 的賀卡</b>
      </h2>
      <br />
      <h6>賀卡即時預覽</h6>
      <CardTemplate1
        sender={sender}
        videoUrl={
          videoInfo && videoInfo.fileId
            ? VideoPreviewUrl(videoInfo.fileId)
            : null
        }
        greetText={greetText}
        returnCard={false}
      ></CardTemplate1>
      <Form className="cf-form" onSubmit={submitHandler}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>送禮者署名</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="如：商田公司 林啟森董事長"
            defaultValue={sender}
            onChange={senderHandelChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>祝賀影片拍攝及上傳</Form.Label>
          <br />
          <input
            type="file"
            accept=".mp4"
            capture
            onChange={videoHandelChange}
          ></input>
          {uploadProgress && (
            <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} />
          )}
          {uploadProgress === 100 && <p>影片上傳完成！請於上方即時預覽</p>}
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>祝賀內容</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="如：祝您身體健康、萬事如意"
            defaultValue={greetText}
            onChange={greetTextHandelChange}
            value={greetText}
          />
          {examples()}
        </Form.Group>
        <br />
        <br />
        <div className="cf-buttons-div">
          <Button variant="success" type="submit">
            儲存並寄出
          </Button>
        </div>
      </Form>
    </div>
  );
}

function ShowFeedback(props) {
  const videoUrl =
    props.videoInfo && props.videoInfo.standardDefinition
      ? props.videoInfo.standardDefinition
      : props.videoInfo && props.videoInfo.fileId
      ? VideoPreviewUrl(props.videoInfo.fileId)
      : null;

  return (
    <div className="sf-div" id="receiver-feedback">
      <h3 className="sf-color">
        <b>太好了！ {props.receiver} 已收到您的禮物</b>
      </h3>
      <h3 className="sf-color">
        <b>並觀看了您的祝福賀卡 {props.viewNumber} 次</b>
      </h3>
      <br />
      {props.returnCardExist && (
        <div className="sf-card-div">
          <CardTemplate1
            sender={props.sender}
            videoUrl={videoUrl}
            greetText={props.greetText}
            returnCard={true}
          ></CardTemplate1>
        </div>
      )}
    </div>
  );
}

export default function SenderPage() {
  const { orderNumber } = useParams(); // main KEY in url
  const [isONValid, setIsONValid] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);
  const [greetText, setGreetText] = useState(null);
  const [sender, setSender] = useState(null);
  const [videoInfo, setVideoInfo] = useState(null);
  const [headerMenu, setHeaderMenu] = useState(null);
  const [viewNumber, setViewNumber] = useState(0);
  const [returnCardExist, setReturnCardExist] = useState(false);
  const viewNumberThresh = 1;

  useEffect(() => {
    // Check if orderNumber is valid
    IsOrderNumberValid(orderNumber).then((valid) => {
      setIsONValid(valid);
      if (!valid) {
        alert("系統查無您的訂單，請聯繫客服。");
      } else {
        // Get Order Info
        GetOrderInfo(orderNumber)
          .then((oInfo) => setOrderInfo(oInfo))
          .catch((err) => console.error(err));

        // Use Password to Get previous uploaded Video and Text
        GetPassword(orderNumber)
          .then((pw) => {
            if (pw) {
              GetViewNumber(orderNumber)
                .then((vNumber) => {
                  setViewNumber(vNumber);
                  if (vNumber < viewNumberThresh) {
                    // Get Greet Card Info.
                    GetVideoInfo(pw)
                      .then((vInfo) => {
                        setVideoInfo(vInfo);
                      })
                      .catch((err) => console.error(err));
                    GetText(pw)
                      .then(({ gift_text, gift_from }) => {
                        setGreetText(gift_text);
                        setSender(gift_from);
                      })
                      .catch((err) => console.error(err));
                  } else {
                    GetReturnCardExist(orderNumber)
                      .then((existed) => {
                        setReturnCardExist(existed);
                        if (existed) {
                          // Get Thank Card Info.
                          GetReturnVideoInfo(orderNumber)
                            .then((vInfo) => {
                              setVideoInfo(vInfo);
                            })
                            .catch((err) => console.error(err));
                          GetReturnText(orderNumber)
                            .then(({ gift_text, gift_from }) => {
                              setGreetText(gift_text);
                              setSender(gift_from);
                            })
                            .catch((err) => console.error(err));
                        }
                      })
                      .catch((err) => console.error(err));
                  }
                })
                .catch((err) => console.error(err));
            }
          })
          .catch((err) => console.error(err));
      }
    });
  }, []);

  useEffect(() => {
    if (viewNumber < viewNumberThresh) {
      setHeaderMenu([
        { name: "訂單資訊", id: "orderInfo", show: isONValid },
        { name: "禮重 ‧ 情意濃", id: "illust", show: true },
        { name: "製作賀卡", id: "card", show: isONValid },
        { name: "品牌介紹", id: "brand", show: true },
      ]);
    } else {
      setHeaderMenu([
        { name: "收禮者回饋", id: "receiver-feedback", show: true },
        { name: "訂單資訊", id: "orderInfo", show: isONValid },
        { name: "品牌介紹", id: "brand", show: true },
      ]);
    }
  }, [isONValid, viewNumber]);

  if (viewNumber < viewNumberThresh) {
    return (
      <div>
        <Header menu={headerMenu}></Header>
        <OrderInfo show={isONValid} orderInfo={orderInfo}></OrderInfo>
        <Illustration
          receiver={
            orderInfo && orderInfo.receiver ? orderInfo.receiver : "收禮者"
          }
        ></Illustration>
        <CardForm
          show={isONValid}
          orderNumber={orderNumber}
          receiver={orderInfo && orderInfo.receiver ? orderInfo.receiver : ""}
          sender={
            sender
              ? sender
              : orderInfo && orderInfo.sender
              ? orderInfo.sender
              : null
          }
          videoInfo={videoInfo}
          greetText={greetText}
        ></CardForm>
        <BrandIntro></BrandIntro>
      </div>
    );
  } else {
    return (
      <div>
        <Header menu={headerMenu}></Header>
        <ShowFeedback
          receiver={
            orderInfo && orderInfo.receiver ? orderInfo.receiver : "收禮者"
          }
          viewNumber={viewNumber}
          returnCardExist={returnCardExist}
          sender={sender}
          videoInfo={videoInfo}
          greetText={greetText}
        ></ShowFeedback>
        <OrderInfo show={isONValid} orderInfo={orderInfo}></OrderInfo>
        <BrandIntro></BrandIntro>
      </div>
    );
  }
}
