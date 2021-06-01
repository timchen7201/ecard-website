import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./PreviewPage.css";
import Header from "../components/Header";
import GreetCard from "../components/GreetCard";
import GiftInfo from "../components/GiftInfo";
import BrandIntro from "../components/BrandIntro";

import {
  IsOrderNumberValid,
  GetPassword,
  GetOrderInfo,
  GetText,
  GetVideoInfo,
} from "../api/gift";

export default function PreviewPage() {
  const { orderNumber } = useParams(); // main KEY in url
  const [orderInfo, setOrderInfo] = useState(null);
  const [greetText, setGreetText] = useState(null);
  const [sender, setSender] = useState(null);
  const [videoInfo, setVideoInfo] = useState(null);

  useEffect(() => {
    // Check if orderNumber is valid
    IsOrderNumberValid(orderNumber).then((valid) => {
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
            }
          })
          .catch((err) => console.error(err));
      }
    });
  }, []);

  const headerMenu = [
    { name: "觀看賀卡", id: "greet-card", show: true },
    { name: "禮品介紹 & 區塊鏈溯源", id: "gift-info", show: true },
    { name: "品牌介紹", id: "brand", show: true },
  ];

  return (
    <div>
      <Header menu={headerMenu}></Header>
      <GreetCard
        pwEntered={true}
        sender={sender}
        videoInfo={videoInfo}
        greetText={greetText}
        preview={true}
      ></GreetCard>
      <GiftInfo item={null} orderInfo={orderInfo}></GiftInfo>
      <BrandIntro></BrandIntro>
    </div>
  );
}
