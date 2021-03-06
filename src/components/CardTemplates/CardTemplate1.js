import "./CardTemplate1.css";
import { wording } from "../../wording";

export default function CardTemplate1(props) {
  return (
    <div className="ct1-canvas">
      <div className="ct1-card">
        <div className="ct1-card-inner">
          <table className="ct1-card-table">
            <tbody>
              <tr>
                <td className="ct1-left-td">
                  {props.videoUrl ? (
                    <video
                      className="ct1-card-video"
                      src={props.videoUrl + "#t=0.1"}
                      controls
                      preload="auto"
                    >影片正在上傳中，請稍後。</video>
                  ) : (
                    <p>
                      {!props.returnCard && (
                        <span>
                          {wording[props.lang]["record-greet-vid-hint"]}
                        </span>
                      )}
                      {props.returnCard && (
                        <span>
                          {wording[props.lang]["record-thank-vid-hint"]}
                        </span>
                      )}
                      <br />
                      <span>{wording[props.lang]["upload-below"]}</span>
                    </p>
                  )}
                </td>
                <td className="ct1-right-td">
                  <h3 className="ct1-text-1">
                    {wording[props.lang]["gcard-from-part-1"]}
                  </h3>
                  <b>
                    <p className="ct1-text-2">
                      {props.sender
                        ? props.sender
                        : wording[props.lang]["sender"]}
                    </p>{" "}
                  </b>
                  {!props.returnCard && (
                    <h3 className="ct1-text-3">
                      {wording[props.lang]["gcard-from-part-2"]}
                    </h3>
                  )}
                  {props.returnCard && (
                    <h3 className="ct1-text-3">
                      {wording[props.lang]["tcard-from-part-2"]}
                    </h3>
                  )}
                  <b>
                    <p className="ct1-gtext">
                      {props.greetText
                        ? props.greetText
                        : wording[props.lang]["greet-content-example"]}
                    </p>
                  </b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
