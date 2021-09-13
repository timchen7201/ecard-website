import React, { useState, useEffect } from "react";
import "./ReceiverPage.css";
import CardTemplate1 from "../components/CardTemplates/CardTemplate1";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import GreetCard from "../components/GreetCard";
import GiftInfo from "../components/GiftInfo";
import BrandIntro from "../components/BrandIntro";
import { wording } from "../wording";
import { AiFillCamera, AiFillFolderOpen } from "react-icons/ai";

import {
  IsPasswordValid,
  GetOrderNumber,
  GetOrderInfo,
  GetText,
  GetVideoInfo,
  VideoUploadInstance,
  VideoPreviewUrl,
  gratitudeExamples,
  UploadReturn,
  GetReturnVideoInfo,
  GetReturnText,
  itemProductsMap,
  /*otherPlatform,*/
} from "../api/gift";

import { Button, Form, ProgressBar, Spinner } from "react-bootstrap";

function CardForm(props) {
  const [sender, setSender] = useState("");
  const [videoInfo, setVideoInfo] = useState(null);
  const [greetText, setGreetText] = useState("");
  const [uploadProgress, setUploadProgress] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [videoConverting, setVideoConverting] = useState(false);
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
  }, [videoInfo /*, props.platform*/]);

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

    if (!props.password) {
      alert(wording[props.lang]["enter-gift-code-part-2"]);
      return;
    }

    if (!sender) {
      alert(
        wording[props.lang]["required-column-part-1"] +
          wording[props.lang]["feedback-name"] +
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
          wording[props.lang]["thank-content"] +
          wording[props.lang]["required-column-part-2"]
      );
      return;
    }

    setCardSaving(true);

    UploadReturn({
      password: props.password,
      videoID: videoInfo.fileId,
      giftText: greetText,
      giftFrom: sender,
    })
      .then((response) => {
        setCardSaving(false);
        console.log(response);
        alert(
          wording[props.lang]["send-tcard-succeed-part-1"] +
            (props.receiver ? props.receiver : wording[props.lang]["sender"]) +
            wording[props.lang]["send-tcard-succeed-part-2"]
        );
      })
      .catch((err) => {
        setCardSaving(false);
        alert(wording[props.lang]["tcard-save-fail"]);
        console.error(err);
      });
  }

  const exambleOnclick = () => {
    var items = gratitudeExamples[props.lang];
    setGreetText(items[Math.floor(Math.random() * items.length)]);
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  return (
    <div className="cf-div" id="thanks-card">
      <h2>
        <b>
          {wording[props.lang]["make-tcard-part-1"]}{" "}
          {props.receiver ? props.receiver : wording[props.lang]["sender"]}{" "}
          <br />
          {wording[props.lang]["make-tcard-part-2"]}
        </b>
      </h2>
      <br />
      <h6>{wording[props.lang]["tcard-instant-preview"]}</h6>
      <CardTemplate1
        sender={sender}
        videoUrl={videoUrl}
        greetText={greetText}
        returnCard={true}
        lang={props.lang}
      ></CardTemplate1>
      <Form className="cf-form" onSubmit={submitHandler}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>{wording[props.lang]["feedback-name"]}</Form.Label>
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
            {wording[props.lang]["upload-thank-vid"] +
              " " +
              wording[props.lang]["vertical-vid-hint"]}
          </Form.Label>
          <br />
          <Button size="sm" variant="danger" onClick={handleClick}>
            <AiFillCamera />
            {wording[props.lang]["shooting-now"]} or <AiFillFolderOpen />
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
          /> */}
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
          <Form.Label>{wording[props.lang]["thank-content"]}</Form.Label>
          <Button
            className="cf-ex-button"
            size="sm"
            variant="secondary"
            onClick={exambleOnclick}
          >
            {wording[props.lang]["use-example"]}
          </Button>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder={wording[props.lang]["greet-content-example"]}
            onChange={greetTextHandelChange}
            value={greetText}
            maxLength="143"
          />
        </Form.Group>
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

export default function ReceiverPage(props) {
  const { item } = useParams(); // main KEY in url
  const [orderInfo, setOrderInfo] = useState(null);
  const [password, SetPassword] = useState(null);
  const [greetText, setGreetText] = useState(null);
  const [sender, setSender] = useState(null);
  const [videoInfo, setVideoInfo] = useState(null);
  const [headerMenu, setHeaderMenu] = useState(null);

  const [returnText, setReturnText] = useState(null);
  const [returnSender, setReturnSender] = useState(null);
  const [returnVideoInfo, setReturnVideoInfo] = useState(null);
  const [platform, setPlatform] = useState("");

  const pwEnterEvent = (pw) => {
    if (!pw) {
      alert(wording[props.lang]["enter-gift-code"]);
    } else {
      IsPasswordValid(pw).then((valid) => {
        if (!valid) {
          alert(wording[props.lang]["enter-code-error"]);
        } else {
          // Get Platform Info
          /*navigator.userAgentData
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
            });*/

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

          GetOrderNumber(pw)
            .then((orderNumber) => {
              GetOrderInfo(orderNumber)
                .then((oInfo) => setOrderInfo(oInfo))
                .catch((err) => console.error(err));

              // Get Thank Card Info.
              GetReturnVideoInfo(orderNumber)
                .then((vInfo) => {
                  setReturnVideoInfo(vInfo);
                })
                .catch((err) => console.error(err));
              GetReturnText(orderNumber)
                .then(({ gift_text, gift_from }) => {
                  setReturnText(gift_text);
                  setReturnSender(gift_from);
                })
                .catch((err) => console.error(err));
            })
            .catch((err) => console.error(err));

          SetPassword(pw);
        }
      });
    }
  };

  useEffect(() => {}, [password]);

  useEffect(() => {
    setHeaderMenu([
      {
        name: wording[props.lang]["watch-gcard"],
        id: "greet-card",
        show: true,
      },
      {
        name: wording[props.lang]["gift-intro-and-blockchain"],
        id: "gift-info",
        show: itemProductsMap(item) ? true : false,
      },
      {
        name: wording[props.lang]["make-tcard"],
        id: "thanks-card",
        show: password ? true : false,
      },
      { name: wording[props.lang]["brand-intro"], id: "brand", show: true },
    ]);
  }, [password, props.lang, item]);

  return (
    <div>
      <Header menu={headerMenu}></Header>
      <GreetCard
        pwEntered={password ? true : false}
        pwEnterEvent={(pw) => pwEnterEvent(pw)}
        sender={sender}
        videoInfo={videoInfo}
        greetText={greetText}
        preview={false}
        lang={props.lang}
        platform={platform}
      ></GreetCard>
      <GiftInfo
        item={item}
        orderInfo={orderInfo}
        lang={props.lang}
        domestic={props.domestic}
      ></GiftInfo>
      <CardForm
        show={password ? true : false}
        password={password}
        receiver={sender}
        sender={
          returnSender
            ? returnSender
            : orderInfo && orderInfo.receiver
            ? orderInfo.receiver
            : null
        }
        videoInfo={returnVideoInfo}
        greetText={returnText}
        lang={props.lang}
        platform={platform}
      ></CardForm>
      <BrandIntro lang={props.lang} domestic={props.domestic}></BrandIntro>
    </div>
  );
}
