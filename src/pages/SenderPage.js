import React, { useState, useEffect } from "react";
import "./SenderPage.css";
import CardTemplate1 from "../components/CardTemplates/CardTemplate1";
import BrandIntro from "../components/BrandIntro";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { wording } from "../wording";
import { AiFillCamera, AiFillFolderOpen } from "react-icons/ai";
import Carousel from "react-multi-carousel";

// import { Modal } from "react-bootstrap/";
// import ReactPlayer from "react-player";
import {
  IsOrderNumberValid,
  GetPassword,
  GetOrderInfo,
  GetText,
  GetPreviewVideoInfo,
  VideoUploadInstance,
  VideoPreviewUrl,
  UploadGift,
  detailDict,
  exampleGreets,
  GetViewNumber,
  GetReturnVideoInfo,
  GetReturnText,
  GetReturnCardExist,
  /*otherPlatform,*/
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
  Spinner,
} from "react-bootstrap";

function OrderInfo(props) {
  if (!props.show || !props.orderInfo) {
    return null;
  }

  const receiver = props.orderInfo.receiver
    ? props.orderInfo.receiver
    : wording[props.lang]["receiver"];
  const products =
    props.orderInfo.products && props.orderInfo.products.length !== 0
      ? props.orderInfo.products
      : ["銷日芒果", "銷日鳳梨", "銷日荔枝"];

  function certificate(cts) {
    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2,
      },
    };
    if (!cts || cts.length < 1) return null;
    return (
      <Tab eventKey="certificates" title={wording[props.lang]["certificate"]}>
        <div className="oi-cr-div">
          <Carousel responsive={responsive}>
            {cts.map((item, index) => {
              return (
                <div className="oi-cr-item">
                  <img src={item} alt=""></img>
                </div>
              );
            })}
          </Carousel>
        </div>

        {/*<table>
          <tbody>
            <tr>
              {cts.map((item, index) => {
                return (
                  <td>
                    <img className="oi-img" src={item} alt=""></img>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>*/}
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
                                <td className="oi-table-text">
                                  <h4>
                                    <b>
                                      {detailDict[item][props.lang].productName}
                                    </b>
                                  </h4>
                                </td>
                                <td className="oi-table-img">
                                  <img
                                    className="oi-img"
                                    src={
                                      detailDict[item][props.lang].productPhoto
                                    }
                                    alt=""
                                  ></img>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <p>{detailDict[item][props.lang].productText}</p>
                        </Tab>
                        <Tab
                          eventKey="farm"
                          title={wording[props.lang]["farm-info"]}
                        >
                          <video
                            className="oi-card-video"
                            src={
                              detailDict[item][props.lang]["vid-link"] +
                              "#t=0.1"
                            }
                            controls
                            preload="auto"
                          ></video>
                          {/*<div className="player-wrapper">
                            <ReactPlayer
                              className="oi-react-player"
                              url={detailDict[item][props.lang]["vid-link"]}
                              width="100%"
                              height="100%"
                              controls={true}
                            />
                          </div>*/}
                          {/*<table>
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
                                    alt=""
                                  ></img>
                                </td>
                              </tr>
                            </tbody>
                          </table>*/}
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
        alt=""
      ></img>
    </div>
  );
}

function CardForm(props) {
  const [sender, setSender] = useState("");
  const [videoInfo, setVideoInfo] = useState(null);
  const [greetText, setGreetText] = useState("");
  const [uploadProgress, setUploadProgress] = useState(null);
  const [videoConverting, setVideoConverting] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [cardSaving, setCardSaving] = useState(false);
  const hiddenFileInput = React.useRef(null);
  useEffect(() => {
    if (props.show) {
      if (props.sender) setSender(props.sender);
      if (props.videoInfo) setVideoInfo(props.videoInfo);
      if (props.greetText) setGreetText(props.greetText);
    }
  }, [props.sender, props.videoInfo, props.greetText, props.show]);

  useEffect(() => {
    var vid_u = null;
    if (videoInfo && videoInfo.fileId && !videoInfo.exception) {
      if (videoInfo.standardDefinition) vid_u = videoInfo.standardDefinition;
      else if (videoInfo.highDefinition) vid_u = videoInfo.highDefinition;
      else vid_u = VideoPreviewUrl(videoInfo.fileId);
      /*else if (
        props.platform.toLowerCase() === "windows" ||
        props.platform.toLowerCase() === "android"
      )
        vid_u = VideoPreviewUrl(videoInfo.fileId);
      else vid_u = otherPlatform;*/
    }
    setVideoUrl(vid_u);
  }, [videoInfo, props.platform]);

  if (!props.show) {
    return null;
  }

  function senderHandelChange(event) {
    setSender(event.target.value);
  }

  function greetTextHandelChange(event) {
    setGreetText(event.target.value);
  }

  function videoHandleChange(event) {
    if (event.target.files.length <= 0) {
      alert(wording[props.lang]["no-file"]);
      return;
    }

    var nameLength = event.target.files[0].name.length;
    if (nameLength > 300) {
      alert(
        wording[props.lang]["name-length-exceeded-part-1"] +
          nameLength.toString() +
          wording[props.lang]["name-length-exceeded-part-2"]
      );
      return;
    }

    var extension = event.target.files[0].name.split(".").pop().toLowerCase();
    if (extension !== "mp4" && extension !== "mov") {
      alert(
        wording[props.lang]["extension-violation-part-1"] +
          extension +
          wording[props.lang]["extension-violation-part-2"]
      );
      return;
    }

    var size = event.target.files[0].size;
    if (size > 20971520) {
      alert(
        wording[props.lang]["file-size-exceeded-part-1"] +
          (Math.round((100 * size) / 1024 / 1024) / 100).toString() +
          wording[props.lang]["file-size-exceeded-part-2"]
      );
      return;
    }

    let formData = new FormData();

    formData.append("file", event.target.files[0]);
    VideoUploadInstance.post("", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (data) => {
        //Set the progress value to show the progress bar
        setUploadProgress(Math.round((100 * data.loaded) / data.total));
        if (Math.round((100 * data.loaded) / data.total) >= 99)
          setVideoConverting(true);
      },
    })
      .then((response) => {
        console.log(response.data);
        setVideoConverting(false);
        if (!response.data.exception) {
          setVideoInfo(response.data);
          /*if (props.platform !== otherPlatform) setVideoInfo(response.data);
              else {
                const validateUser = (user) => !!user;
                const POLL_INTERVAL = 1000;
                const pollForNewUser = poll({
                  fn: mockApi,
                  validate: validateUser,
                  interval: POLL_INTERVAL,
                })
                  .then((user) => console.log(user))
                  .catch((err) => console.error(err));
              }*/
        } else {
          alert(wording[props.lang]["video-upload-failed"]);
          setUploadProgress(null);
        }
      })
      .catch((err) => {
        alert(wording[props.lang]["video-upload-failed"]);
        setUploadProgress(null);
      });
  }

  function submitHandler(event) {
    event.preventDefault(); //prevent the form from submitting

    if (!props.orderNumber) {
      alert(wording[props.lang]["empty-order-number"]);
      return;
    }

    if (!sender) {
      alert(
        wording[props.lang]["required-column-part-1"] +
          wording[props.lang]["sender-name"] +
          wording[props.lang]["required-column-part-2"]
      );
      return;
    }

    if (!videoInfo || !videoInfo.fileId) {
      alert(wording[props.lang]["upload-video-first"]);
      return;
    }

    if (!greetText) {
      alert(
        wording[props.lang]["required-column-part-1"] +
          wording[props.lang]["greet-content"] +
          wording[props.lang]["required-column-part-2"]
      );
      return;
    }

    setCardSaving(true);

    UploadGift({
      orderNumber: props.orderNumber,
      videoID: videoInfo.fileId,
      giftText: greetText,
      giftFrom: sender,
    })
      .then((response) => {
        console.log(response);
        setCardSaving(false);
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
              label: wording[props.lang]["refuse-preview"],
              onClick: () => {},
            },
            {
              label: wording[props.lang]["agree-preview"],
              onClick: () =>
                window.open("/preview/" + props.orderNumber, "_self"),
            },
          ],
        });
      })
      .catch((err) => {
        alert(wording[props.lang]["gcard-save-fail"]);
        console.error(err);
        setCardSaving(false);
      });
  }

  const examples = (lang) => {
    if (!exampleGreets[lang] || Object.keys(exampleGreets[lang]).length < 1)
      return null;
    const types = Object.keys(exampleGreets[lang]);

    return (
      <div className="cf-greet-example">
        <span>{wording[lang]["use-example"]}</span>
        {types.map((item, index) => {
          return (
            <span>
              {" "}
              <Button
                size="sm"
                variant="secondary"
                onClick={exampleOnclick.bind(null, item)}
              >
                {item}
              </Button>
            </span>
          );
        })}
      </div>
    );
  };

  const exampleOnclick = (type) => {
    var items = exampleGreets[props.lang][type];
    setGreetText(items[Math.floor(Math.random() * items.length)]);
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
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
        videoUrl={videoUrl}
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
            maxLength="31"
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>
            {wording[props.lang]["upload-greet-vid"] +
              " " +
              wording[props.lang]["vertical-vid-hint"]}
          </Form.Label>
          <br />
          <Button size="sm" variant="danger" onClick={handleClick}>
            <AiFillCamera />
            {wording[props.lang]["shooting-now"]} / <AiFillFolderOpen />
            {wording[props.lang]["choose-file"]}
          </Button>
          <input
            type="file"
            accept=".mp4, .mov"
            capture
            ref={hiddenFileInput}
            onChange={videoHandleChange}
            style={{ display: "none" }}
          />{" "}
          {/*or{" "}
          <Button size="sm" variant="primary" onClick={handleClick}>
            <AiFillFolderOpen />
            {wording[props.lang]["choose-file"]}
          </Button>
          <input
            type="file"
            accept=".mp4, .mov"
            ref={hiddenFileInput}
            onChange={videoHandelChange}
            style={{ display: "none" }}
          />*/}
          {uploadProgress && (
            <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} />
          )}
          {videoConverting && (
            <p>
              <b>{wording[props.lang]["video-converting"]}</b>
            </p>
          )}
          {uploadProgress === 100 && !videoConverting && (
            <p>
              <b>{wording[props.lang]["upload-vid-complete"]}</b>
            </p>
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
            maxLength="143"
          />
          {examples(props.lang)}
        </Form.Group>
        <br />
        <br />
        <br />
        <div className="cf-buttons-div">
          {!cardSaving && (
            <Button variant="success" type="submit">
              {wording[props.lang]["save-and-send"]}
            </Button>
          )}
          {cardSaving && (
            <Button variant="success" disabled>
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
      </Form>
    </div>
  );
}

function ShowFeedback(props) {
  const [videoUrl, setVideoUrl] = useState(null);
  useEffect(() => {
    var vid_u = null;
    if (
      props.videoInfo &&
      props.videoInfo.fileId &&
      !props.videoInfo.exception
    ) {
      if (props.videoInfo.standardDefinition)
        vid_u = props.videoInfo.standardDefinition;
      else if (props.videoInfo.highDefinition)
        vid_u = props.videoInfo.highDefinition;
      else vid_u = VideoPreviewUrl(props.videoInfo.fileId);
      /*else if (
        props.platform.toLowerCase() === "windows" ||
        props.platform.toLowerCase() === "android"
      )
        vid_u = VideoPreviewUrl(props.videoInfo.fileId);
      else vid_u = otherPlatform;*/
    }
    setVideoUrl(vid_u);
  }, [props.videoInfo /*, props.platform*/]);

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
  const [platform, setPlatform] = useState("");
  const viewNumberThresh = 1;

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    // Check if orderNumber is valid
    IsOrderNumberValid(orderNumber).then((valid) => {
      setIsONValid(valid);
      if (!valid) {
        alert(wording[props.lang]["order-not-found"]);
      } else {
        // Get Platform Info
        navigator.userAgentData
          .getHighEntropyValues([
            "architecture",
            "model",
            "platform",
            "platformVersion",
            "uaFullVersion",
          ])
          .then((ua) => {
            console.log(ua);
            if (ua.platform) {
              console.log(ua.platform);
              setPlatform(ua.platform);
            }
          });

        // Get Order Info
        GetOrderInfo(orderNumber)
          .then((oInfo) => setOrderInfo(oInfo))
          .catch((err) => console.error(err));

        // Use Password to Get previous uploaded Video and Text
        GetPassword(orderNumber)
          .then((password) => {
            if (password) {
              var pw = password.toString();
              GetViewNumber(orderNumber)
                .then((vNumber) => {
                  setViewNumber(vNumber);
                  if (vNumber < viewNumberThresh) {
                    // Get Greet Card Info.
                    GetPreviewVideoInfo(pw)
                      .then((vInfo) => {
                        console.log(vInfo);
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
  }, [orderNumber, props.lang]);

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
        {/*<Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>隱私權政策聲明：</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>確認是否已得知以下規定：</p>
            <ol>
              <li>
                本公司為提供您配送服務，需收集、處理、利用您的顧客資料，並因執行配送需求將您的資料提供給相關協力廠商。
              </li>
              <li>
                若您提供的資料不完整或錯誤，將導致本公司無法如期如質到貨，導致您的權益受損。
              </li>
              <li>
                本公司得以利用您提供的資料以郵寄、電話或簡訊方式，提供本公司之行銷宣傳。
              </li>
              <li>依個人資料保護法第三條.您可聯繫本公司行使相關權利。</li>
            </ol>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              了解
            </Button>
          </Modal.Footer>
        </Modal>*/}
        <OrderInfo
          show={isONValid}
          orderInfo={orderInfo}
          lang={props.lang}
        ></OrderInfo>
        <Illustration
          receiver={
            orderInfo && orderInfo.receiver
              ? orderInfo.receiver
              : wording[props.lang]["receiver"]
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
          platform={platform}
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
            orderInfo && orderInfo.receiver
              ? orderInfo.receiver
              : wording[props.lang]["receiver"]
          }
          viewNumber={viewNumber}
          returnCardExist={returnCardExist}
          sender={sender}
          videoInfo={videoInfo}
          greetText={greetText}
          lang={props.lang}
          platform={platform}
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
