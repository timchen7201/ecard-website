import "./CardTemplate1.css";

export default function CardTemplate1() {
  return (
    <div className="ct1-canvas">
      <div className="ct1-card">
        <div className="ct1-card-inner">
          <table className="ct1-card-table">
            <tr>
              <td className="ct1-left-td">
                <video className="ct1-card-video" controls>
                  <source
                    src="http://www.exit109.com/~dnn/clips/RW20seconds_1.mp4"
                    type="video/mp4"
                  />
                </video>
              </td>
              <td className="ct1-right-td">
                <h5>來自</h5>
                <h5>商田 林董</h5>
                <h5>的祝福</h5>
                <p>
                  南方艷陽的沐浴下 屏東縣吃龍蝦長大的愛文芒果們
                  果皮更鮮紅、果肉更香甜
                </p>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}
