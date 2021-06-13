import React, { useState } from "react";
import "./GiftInfo.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useMediaQuery } from "react-responsive";
import { itemProductsMap, detailDict } from "../api/gift";
import { wording } from "../wording";

function GiftDetail(props) {
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

  if (!props.show) {
    return null;
  }

  const productInfo = detailDict[props.product][props.lang];

  function certificate(cts) {
    if (!cts || cts.length < 1) return null;
    return (
      <div>
        <h5>
          <b>檢驗證書</b>
        </h5>
        <div className="gd-cr-div">
          <Carousel responsive={responsive}>
            {cts.map((item, index) => {
              return (
                <div className="gd-cr-item">
                  <img src={item}></img>
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h4>
        <b>{productInfo.productName}</b>
      </h4>
      {productInfo["media-info"] === "vid" && (
        <div className="gd-jp-div">
          <video className="gd-vid" controls>
            <source
              src="https://storage.googleapis.com/agchain/80f106ea-8811-42c4-9bdd-a9665f785e7b-720p.mp4"
              type="video/mp4"
            />
          </video>
          <p className="gd-text">{productInfo.productText}</p>
        </div>
      )}
      {productInfo["media-info"] === "img" && (
        <div>
          {props.isWideScreen && (
            <div>
              <table className="gd-table">
                <tr>
                  <td className="gd-table-img">
                    <img
                      className="gd-img"
                      src={productInfo.productPhoto}
                    ></img>
                  </td>
                  <td className="gd-table-text">
                    <p>{productInfo.productText}</p>
                  </td>
                </tr>
              </table>
              <br />
              <br />
              <table className="gd-table">
                <tr>
                  <td className="gd-table-text">
                    <h5>
                      <b>{productInfo.farmName}</b>
                    </h5>
                    <p>{productInfo.farmText}</p>
                  </td>
                  <td className="gd-table-img">
                    <img className="gd-img" src={productInfo.farmPhoto}></img>
                  </td>
                </tr>
              </table>
            </div>
          )}

          {!props.isWideScreen && (
            <div>
              <img className="gd-img" src={productInfo.productPhoto}></img>
              <p className="gd-text">{productInfo.productText}</p>
              <br />
              <br />
              <h5>
                <b>{productInfo.farmName}</b>
              </h5>
              <p className="gd-text">{productInfo.farmText}</p>
              <img className="gd-img" src={productInfo.farmPhoto}></img>
            </div>
          )}
        </div>
      )}

      {certificate(productInfo.certificates)}
    </div>
  );
}

export default function GiftInfo(props) {
  const [selectedPIndex, setSelectedPIndex] = useState(0);
  const isWideScreen = useMediaQuery({ query: "(min-device-width: 500px)" });
  const item = props.item ? props.item : "mango";
  const products =
    props.orderInfo && props.orderInfo.products
      ? props.orderInfo.products
      : itemProductsMap(item);

  const productOnClick = (index) => {
    setSelectedPIndex(index);
  };

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

  if (!products) {
    return null;
  }

  return (
    <div className="gi-div" id="gift-info">
      <h3>
        <b>{wording[props.lang]["gift-intro-and-blockchain"]}</b>
      </h3>
      <br />
      <div className="gi-cr-div">
        <Carousel responsive={responsive}>
          {products.map((item, index) => {
            return (
              <div
                className={
                  "gi-cr-item" +
                  (index === selectedPIndex ? " item-selected" : "")
                }
                action
                key={"list-item-" + (index + 1).toString()}
                href={"#link" + (index + 1).toString()}
                onClick={productOnClick.bind(null, index)}
              >
                <span className="gi-cr-item-helper"></span>
                <img
                  className="gi-cr-item-img"
                  src={detailDict[item][props.lang].productPhoto}
                ></img>
              </div>
            );
          })}
        </Carousel>
      </div>
      <br />
      <br />
      <br />
      {products.map((item, index) => {
        return (
          <GiftDetail
            show={index === selectedPIndex}
            product={item}
            isWideScreen={isWideScreen}
            lang={props.lang}
          ></GiftDetail>
        );
      })}
    </div>
  );
}
