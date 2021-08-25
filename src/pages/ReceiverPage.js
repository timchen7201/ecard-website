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
} from "../api/gift";

import { Button, Form, ProgressBar } from "react-bootstrap";

function CardForm(props) {
  const [sender, setSender] = useState("");
  const [videoInfo, setVideoInfo] = useState(null);
  const [greetText, setGreetText] = useState("");
  const [uploadProgress, setUploadProgress] = useState(null);
  const hiddenFileInput = React.useRef(null);

  useEffect(() => {
    if (props.show) {
      if (props.sender) setSender(props.sender);
      if (props.videoInfo) setVideoInfo(props.videoInfo);
      if (props.greetText) setGreetText(props.greetText);
    }
  }, [props.sender, props.videoInfo, props.greetText, props.show]);

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
    if (event.target.files.length > 0) {
      console.log(event.target.files);
      if (event.target.files[0].name.split(".").pop() === "mp4") {
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
      } else alert("僅支援 .mp4 影片格式");
    } else alert("檔案為空");
  }

  function submitHandler(event) {
    event.preventDefault(); //prevent the form from submitting
    UploadReturn({
      password: props.password,
      videoID: videoInfo.fileId,
      giftText: greetText,
      giftFrom: sender,
    })
      .then((response) => {
        console.log(response);
        alert(
          wording[props.lang]["send-tcard-succeed-part-1"] +
            (props.receiver ? props.receiver : wording[props.lang]["sender"]) +
            wording[props.lang]["send-tcard-succeed-part-2"]
        );
      })
      .catch((err) => {
        alert(wording[props.lang]["tcard-save-fail"]);
        console.error(err);
      });
  }

  const exambleOnclick = () => {
    var items = gratitudeExamples;
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
        videoUrl={
          videoInfo && videoInfo.fileId
            ? VideoPreviewUrl(videoInfo.fileId)
            : null
        }
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
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>{wording[props.lang]["upload-thank-vid"]}</Form.Label>
          <br />
          <Button size="sm" variant="danger" onClick={handleClick}>
            <AiFillCamera />
            立即拍攝
          </Button>
          <input
            type="file"
            accept=".mp4"
            capture
            ref={hiddenFileInput}
            onChange={videoHandelChange}
            style={{ display: "none" }}
          />{" "}
          或{" "}
          <Button size="sm" variant="primary" onClick={handleClick}>
            <AiFillFolderOpen />
            選擇檔案
          </Button>
          <input
            type="file"
            accept=".mp4"
            ref={hiddenFileInput}
            onChange={videoHandelChange}
            style={{ display: "none" }}
          />
          {uploadProgress && (
            <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} />
          )}
          {uploadProgress === 100 && (
            <p>{wording[props.lang]["upload-vid-complete"]}</p>
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
          />
        </Form.Group>
        <div className="cf-buttons-div">
          <Button variant="success" type="submit">
            {wording[props.lang]["save-and-send"]}
          </Button>
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

  const pwEnterEvent = (pw) => {
    if (!pw) {
      alert(wording[props.lang]["enter-gift-code"]);
    } else {
      IsPasswordValid(pw).then((valid) => {
        if (!valid) {
          alert(wording[props.lang]["enter-code-error"]);
        } else {
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
        show: false,
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
      ></CardForm>
      <BrandIntro lang={props.lang}></BrandIntro>
    </div>
  );
}
