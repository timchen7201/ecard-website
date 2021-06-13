import React, { useState, useEffect } from "react";
import "./SenderPage.css";
import CardTemplate1 from "../components/CardTemplates/CardTemplate1";
import BrandIntro from "../components/BrandIntro";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { wording } from "../wording";

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
    : wording[props.lang]["receiver"];
  const products =
    props.orderInfo.products && props.orderInfo.products.length != 0
      ? props.orderInfo.products
      : ["銷日芒果", "銷日鳳梨", "銷日荔枝"];

  function certificate(cts) {
    if (!cts || cts.length < 1) return null;
    return (
      <Tab eventKey="certificates" title={wording[props.lang]["certificate"]}>
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
        <b>{wording[props.lang]["order-info"]}</b>
      </h2>
      <span className="oi-title">
        {wording[props.lang]["oi-explain-part-1"]} <b>{receiver}</b>{" "}
        {wording[props.lang]["oi-explain-part-2"]}
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
                      {detailDict[item][props.lang].productName}
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
                        <Tab
                          eventKey="intro"
                          title={wording[props.lang]["gift-intro"]}
                        >
                          <table>
                            <tbody>
                              <tr>
                                <td className="oi-table-img">
                                  <img
                                    className="oi-img"
                                    src={
                                      detailDict[item][props.lang].productPhoto
                                    }
                                  ></img>
                                </td>
                                <td className="oi-table-text">
                                  <h4>
                                    <b>
                                      {detailDict[item][props.lang].productName}
                                    </b>
                                  </h4>
                                  <p>
                                    {detailDict[item][props.lang].productText}
                                  </p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </Tab>
                        <Tab
                          eventKey="farm"
                          title={wording[props.lang]["farm-info"]}
                        >
                          <table>
                            <tbody>
                              <tr>
                                <td className="oi-table-text">
                                  <h4>
                                    <b>
                                      {detailDict[item][props.lang].farmName}
                                    </b>
                                  </h4>
                                  <p>{detailDict[item][props.lang].farmText}</p>
                                </td>
                                <td className="oi-table-img">
                                  <img
                                    className="oi-img"
                                    src={detailDict[item][props.lang].farmPhoto}
                                  ></img>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </Tab>
                        {certificate(detailDict[item][props.lang].certificates)}
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
        <b>{wording[props.lang]["illustration-title"]}</b>
      </h2>
      {props.lang !== "jp" && (
        <span>
          {wording[props.lang]["il-explain-part-1"]} <b>{props.receiver}</b>{" "}
          {wording[props.lang]["il-explain-part-2"]}
          <br />
          {wording[props.lang]["il-explain-part-3"]}
          <br />
          {wording[props.lang]["il-explain-part-4"]}
          <br />
        </span>
      )}
      {props.lang === "jp" && (
        <span>
          <b>{props.receiver}</b> {wording[props.lang]["il-explain-part-1"]}{" "}
          <br />
          <b>{props.receiver}</b> {wording[props.lang]["il-explain-part-2"]}
          <br />
          {wording[props.lang]["il-explain-part-3"]}
        </span>
      )}
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
            wording[props.lang]["gcard-sent-part-1"] +
            (props.receiver
              ? props.receiver
              : wording[props.lang]["receiver"]) +
            wording[props.lang]["gcard-sent-part-2"],
          message: wording[props.lang]["ask-for-preview"],
          buttons: [
            {
              label: wording[props.lang]["agree-preview"],
              onClick: () => window.open("/preview/" + props.orderNumber),
            },
            {
              label: wording[props.lang]["refuse-preview"],
              onClick: () => {},
            },
          ],
        });
      })
      .catch((err) => {
        alert(wording[props.lang]["gcard-save-fail"]);
        console.error(err);
      });
  }

  const examples = () => {
    if (!exampleGreets || Object.keys(exampleGreets).length < 1) return null;
    const types = Object.keys(exampleGreets);
    return (
      <div className="cf-greet-example">
        <span>{wording[props.lang]["use-example"]}</span>
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
        <b>
          {wording[props.lang]["make-gcard-part-1"]}{" "}
          {props.receiver ? props.receiver : wording[props.lang]["receiver"]}{" "}
          {wording[props.lang]["make-gcard-part-2"]}
        </b>
      </h2>
      <br />
      <h6>{wording[props.lang]["gcard-instant-preview"]}</h6>
      <CardTemplate1
        sender={sender}
        videoUrl={
          videoInfo && videoInfo.fileId
            ? VideoPreviewUrl(videoInfo.fileId)
            : null
        }
        greetText={greetText}
        returnCard={false}
        lang={props.lang}
      ></CardTemplate1>
      <Form className="cf-form" onSubmit={submitHandler}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>{wording[props.lang]["sender-name"]}</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder={wording[props.lang]["sender-name-example"]}
            defaultValue={sender}
            onChange={senderHandelChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>{wording[props.lang]["upload-greet-vid"]}</Form.Label>
          <br />
          <input
            type="file"
            accept=".mp4"
            capture="user"
            onChange={videoHandelChange}
          ></input>
          {uploadProgress && (
            <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} />
          )}
          {uploadProgress === 100 && (
            <p>{wording[props.lang]["upload-vid-complete"]}</p>
          )}
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>{wording[props.lang]["greet-content"]}</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder={wording[props.lang]["greet-content-example"]}
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
            {wording[props.lang]["save-and-send"]}
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
        <b>
          {wording[props.lang]["received-notification-part-1"]} {props.receiver}{" "}
          {wording[props.lang]["received-notification-part-2"]}
        </b>
      </h3>
      <h3 className="sf-color">
        <b>
          {wording[props.lang]["received-notification-part-3"]}{" "}
          {props.viewNumber}{" "}
          {wording[props.lang]["received-notification-part-4"]}
        </b>
      </h3>
      <br />
      {props.returnCardExist && (
        <div className="sf-card-div">
          <CardTemplate1
            sender={props.sender}
            videoUrl={videoUrl}
            greetText={props.greetText}
            returnCard={true}
            lang={props.lang}
          ></CardTemplate1>
        </div>
      )}
    </div>
  );
}

export default function SenderPage(props) {
  const { orderNumber } = useParams(); // main KEY in url
  const [isONValid, setIsONValid] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);
  const [greetText, setGreetText] = useState(null);
  const [sender, setSender] = useState(null);
  const [videoInfo, setVideoInfo] = useState(null);
  const [headerMenu, setHeaderMenu] = useState(null);
  const [viewNumber, setViewNumber] = useState(0);
  const [returnCardExist, setReturnCardExist] = useState(false);
  const viewNumberThresh = 99999999;

  useEffect(() => {
    // Check if orderNumber is valid
    IsOrderNumberValid(orderNumber).then((valid) => {
      setIsONValid(valid);
      if (!valid) {
        alert(wording[props.lang]["order-not-found"]);
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
        {
          name: wording[props.lang]["order-info"],
          id: "orderInfo",
          show: isONValid,
        },
        {
          name: wording[props.lang]["illustration-title"],
          id: "illust",
          show: true,
        },
        {
          name: wording[props.lang]["make-gcard"],
          id: "card",
          show: isONValid,
        },
        { name: wording[props.lang]["brand-intro"], id: "brand", show: true },
      ]);
    } else {
      setHeaderMenu([
        {
          name: wording[props.lang]["receiver-feedback"],
          id: "receiver-feedback",
          show: true,
        },
        {
          name: wording[props.lang]["order-info"],
          id: "orderInfo",
          show: isONValid,
        },
        { name: wording[props.lang]["brand-intro"], id: "brand", show: true },
      ]);
    }
  }, [isONValid, viewNumber, props.lang]);

  if (viewNumber < viewNumberThresh) {
    return (
      <div>
        <Header menu={headerMenu}></Header>
        <OrderInfo
          show={isONValid}
          orderInfo={orderInfo}
          lang={props.lang}
        ></OrderInfo>
        <Illustration
          receiver={
            orderInfo && orderInfo.receiver ? orderInfo.receiver : "收禮者"
          }
          lang={props.lang}
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
          lang={props.lang}
        ></CardForm>
        <BrandIntro lang={props.lang}></BrandIntro>
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
          lang={props.lang}
        ></ShowFeedback>
        <OrderInfo
          show={isONValid}
          orderInfo={orderInfo}
          lang={props.lang}
        ></OrderInfo>
        <BrandIntro lang={props.lang}></BrandIntro>
      </div>
    );
  }
}
