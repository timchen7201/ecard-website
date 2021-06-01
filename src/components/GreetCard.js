import React, { useState } from "react";
import "./GreetCard.css";
import CardTemplate1 from "./CardTemplates/CardTemplate1";
import { Button, Tooltip, OverlayTrigger, Form } from "react-bootstrap";
import { VideoPreviewUrl } from "../api/gift";

function EnterCode(props) {
  const [password, setPassword] = useState("");

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <table>
        <tr>
          <td className="ec-tip-table-left">
            <img src={require("../img/sms-icon.png").default}></img>
          </td>
          <td>
            <span>
              若<b>送禮者</b>有<b>錄製</b>，寄送給您的<b>影音祝福</b>，
            </span>
            <br />
            <span>
              您應已收到一封含有<b>禮物密碼</b>的<b>手機簡訊</b>
            </span>
          </td>
        </tr>
      </table>
    </Tooltip>
  );

  const inputOnChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.pwEnterEvent(password);
  };

  if (!props.show) {
    return null;
  }

  return (
    <table className="ec-tb">
      <tr>
        <td className="ec-td-left">
          <img src={require("../img/card-icon.png").default}></img>
        </td>
        <td className="ec-td-right">
          <h6>
            <b>觀看送禮者給您的影音祝福</b>
          </h6>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="GiftCode">
              <Form.Label>請輸入簡訊禮物密碼 </Form.Label>
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
              >
                <img
                  className="qm-img"
                  src={require("../img/questmark-icon.png").default}
                ></img>
              </OverlayTrigger>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <Form.Control
                        placeholder="簡訊禮物密碼"
                        size="sm"
                        onChange={inputOnChange}
                        id="pw-input"
                      />
                    </td>
                    <td>
                      <Button size="sm" variant="success" type="submit">
                        送出
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Form.Group>
          </Form>
        </td>
      </tr>
    </table>
  );
}

export default function GreetCard(props) {
  const videoUrl =
    props.preview && props.videoInfo && props.videoInfo.fileId
      ? VideoPreviewUrl(props.videoInfo.fileId)
      : props.videoInfo && props.videoInfo.standardDefinition
      ? props.videoInfo.standardDefinition
      : null;

  return (
    <div className="gc-div" id="greet-card">
      <h3>
        <b>信賴 ‧ 溫度</b>
      </h3>
      <h3>
        <b>一份精心為您準備的禮物</b>
      </h3>
      <br />
      <EnterCode
        show={!props.pwEntered}
        pwEnterEvent={(pw) => props.pwEnterEvent(pw)}
      ></EnterCode>
      {props.pwEntered && (
        <div className="card-div">
          <CardTemplate1
            sender={props.sender}
            videoUrl={videoUrl}
            greetText={props.greetText}
            returnCard={false}
          ></CardTemplate1>
        </div>
      )}
    </div>
  );
}
