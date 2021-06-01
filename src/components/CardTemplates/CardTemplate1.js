import "./CardTemplate1.css";

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
                      src={props.videoUrl}
                      controls
                    ></video>
                  ) : (
                    <p>
                      <span>請錄製您的祝賀影片</span>
                      <br />
                      <span>，由下方表單上傳</span>
                    </p>
                  )}
                </td>
                <td className="ct1-right-td">
                  <h3 className="ct1-text-1">來自</h3>
                  <h3 className="ct1-text-2">
                    <b>{props.sender ? props.sender : "[送禮者]"}</b>
                  </h3>
                  {!props.returnCard && <h3 className="ct1-text-3">的祝福</h3>}
                  {props.returnCard && <h3 className="ct1-text-3">的感謝</h3>}
                  <br />
                  <b>
                    <p className="ct1-gtext">
                      {props.greetText
                        ? props.greetText
                        : "(範例)祝您身體健康" + "\n" + "萬事如意"}
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
