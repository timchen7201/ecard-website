import React, { useState, useEffect } from "react";
import "./ReceiverPage.css";
import CardTemplate1 from "../components/CardTemplates/CardTemplate1";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import GreetCard from "../components/GreetCard";
import GiftInfo from "../components/GiftInfo";
import BrandIntro from "../components/BrandIntro";

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
    UploadReturn({
      password: props.password,
      videoID: videoInfo.fileId,
      giftText: greetText,
      giftFrom: sender,
    })
      .then((response) => {
        console.log(response);
        alert(
          "您給" +
            (props.receiver ? props.receiver : "送禮者") +
            "的回禮感謝卡已成功寄出！"
        );
      })
      .catch((err) => {
        alert("回禮感謝卡儲存失敗，請聯繫客服人員，謝謝！");
        console.error(err);
      });
  }

  const exambleOnclick = () => {
    var items = gratitudeExamples;
    setGreetText(items[Math.floor(Math.random() * items.length)]);
  };

  return (
    <div className="cf-div" id="thanks-card">
      <h2>
        <b>
          製作給 {props.receiver ? props.receiver : "送禮者"} 的<br />
          回禮感謝卡
        </b>
      </h2>
      <br />
      <h6>感謝卡即時預覽</h6>
      <CardTemplate1
        sender={sender}
        videoUrl={
          videoInfo && videoInfo.fileId
            ? VideoPreviewUrl(videoInfo.fileId)
            : null
        }
        greetText={greetText}
        returnCard={true}
      ></CardTemplate1>
      <Form className="cf-form" onSubmit={submitHandler}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>回禮者署名</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="如：商田公司 林啟森董事長"
            defaultValue={sender}
            onChange={senderHandelChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>回禮感謝影片上傳</Form.Label>
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
          <Form.Label>回禮內容</Form.Label>
          <Button
            className="cf-ex-button"
            size="sm"
            variant="secondary"
            onClick={exambleOnclick}
          >
            套用範本
          </Button>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="如：祝您身體健康、萬事如意"
            onChange={greetTextHandelChange}
            value={greetText}
          />
        </Form.Group>
        <div className="cf-buttons-div">
          <Button variant="success" type="submit">
            儲存並寄出
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default function ReceiverPage() {
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
      alert("請輸入簡訊禮物密碼");
    } else {
      IsPasswordValid(pw).then((valid) => {
        if (!valid) {
          alert("您輸入的禮物密碼有誤，請檢查後更正。");
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
      { name: "觀看賀卡", id: "greet-card", show: true },
      {
        name: "禮品介紹 & 區塊鏈溯源",
        id: "gift-info",
        show: itemProductsMap(item) ? true : false,
      },
      {
        name: "製作回禮感謝卡",
        id: "thanks-card",
        show: password ? true : false,
      },
      { name: "品牌介紹", id: "brand", show: true },
    ]);
  }, [password]);

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
      ></GreetCard>
      <GiftInfo item={item} orderInfo={orderInfo}></GiftInfo>
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
      ></CardForm>
      <BrandIntro></BrandIntro>
    </div>
  );
}
