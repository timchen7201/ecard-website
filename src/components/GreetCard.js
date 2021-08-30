import React, { useState } from "react";
import "./GreetCard.css";
import CardTemplate1 from "./CardTemplates/CardTemplate1";
import { Button, Tooltip, OverlayTrigger, Form } from "react-bootstrap";
import { VideoPreviewUrl } from "../api/gift";
import { wording } from "../wording";

function EnterCode(props) {
  const [password, setPassword] = useState("");

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <table>
        <tr>
          <td className="ec-tip-table-left">
            <img src={require("../img/sms-icon.png").default} alt=""></img>
          </td>
          <td>
            <span>{wording[props.lang]["sms-hint-part-1"]}</span>
            <br />
            <span>{wording[props.lang]["sms-hint-part-2"]}</span>
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
          <img src={require("../img/card-icon.png").default} alt=""></img>
        </td>
        <td className="ec-td-right">
          <h6>
            <b>{wording[props.lang]["watch-gcard-from-sender"]}</b>
          </h6>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="GiftCode">
              <Form.Label>
                {wording[props.lang]["enter-gift-code-part-1"]}{" "}
              </Form.Label>
              {props.lang === "jp" && <br />}
              <Form.Label>
                {wording[props.lang]["enter-gift-code-part-2"]}{" "}
              </Form.Label>
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip({ lang: props.lang })}
              >
                <img
                  className="qm-img"
                  src={require("../img/questmark-icon.png").default}
                  alt=""
                ></img>
              </OverlayTrigger>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <Form.Control
                        placeholder={wording[props.lang]["gift-code"]}
                        size="sm"
                        onChange={inputOnChange}
                        id="pw-input"
                      />
                    </td>
                    <td>
                      <Button size="sm" variant="success" type="submit">
                        {wording[props.lang]["send-gift-code"]}
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
    props.videoInfo && props.videoInfo.fileId
      ? props.videoInfo.standardDefinition
        ? props.videoInfo.standardDefinition
        : VideoPreviewUrl(props.videoInfo.fileId)
      : null;

  return (
    <div className="gc-div" id="greet-card">
      <h3>
        <b>{wording[props.lang]["gift-slogan-part-1"]}</b>
      </h3>
      <h3>
        <b>{wording[props.lang]["gift-slogan-part-2"]}</b>
      </h3>
      <br />
      <EnterCode
        show={!props.pwEntered}
        pwEnterEvent={(pw) => props.pwEnterEvent(pw)}
        lang={props.lang}
      ></EnterCode>
      {props.pwEntered && (
        <div className="card-div">
          <CardTemplate1
            sender={props.sender}
            videoUrl={videoUrl}
            greetText={props.greetText}
            returnCard={false}
            lang={props.lang}
          ></CardTemplate1>
        </div>
      )}
    </div>
  );
}
