import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./PreviewPage.css";
import Header from "../components/Header";
import GreetCard from "../components/GreetCard";
import GiftInfo from "../components/GiftInfo";
import BrandIntro from "../components/BrandIntro";
import { wording } from "../wording";

import {
  IsOrderNumberValid,
  GetPassword,
  GetOrderInfo,
  GetText,
  GetPreviewVideoInfo,
} from "../api/gift";

export default function PreviewPage(props) {
  const { orderNumber } = useParams(); // main KEY in url
  const [orderInfo, setOrderInfo] = useState(null);
  const [greetText, setGreetText] = useState(null);
  const [sender, setSender] = useState(null);
  const [videoInfo, setVideoInfo] = useState(null);
  const [headerMenu, setHeaderMenu] = useState(null);
  const [platform, setPlatform] = useState("");

  useEffect(() => {
    // Check if orderNumber is valid
    IsOrderNumberValid(orderNumber).then((valid) => {
      if (!valid) {
        alert("系統查無您的訂單，請聯繫客服。");
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
          .then((pw) => {
            if (pw) {
              GetPreviewVideoInfo(pw)
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
            }
          })
          .catch((err) => console.error(err));
      }
    });
  }, [orderNumber]);

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
        show: true,
      },
      { name: wording[props.lang]["brand-intro"], id: "brand", show: true },
    ]);
  }, [props.lang]);

  return (
    <div>
      <Header menu={headerMenu}></Header>
      <GreetCard
        pwEntered={true}
        sender={sender}
        videoInfo={videoInfo}
        greetText={greetText}
        preview={true}
        lang={props.lang}
        platform={platform}
      ></GreetCard>
      <GiftInfo item={null} orderInfo={orderInfo} lang={props.lang}></GiftInfo>
      <BrandIntro lang={props.lang}></BrandIntro>
    </div>
  );
}
