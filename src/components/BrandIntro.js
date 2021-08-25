import "./BrandIntro.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { wording } from "../wording";

export default function BrandIntro(props) {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="bi-div" id="brand">
      <h2 className="color-white">
        <b>{wording[props.lang]["brand-intro"]}</b>
      </h2>
      <br />
      <div className="bi-carousel">
        <Carousel responsive={responsive}>
          <div className="bi-cr-item">
            <table className="bi-table">
              <tbody>
                <tr>
                  <td className="bi-td-left">
                    <img
                      className="bi-img"
                      src={require("../img/HSNL.png").default}
                      alt=""
                    ></img>
                  </td>
                  <td className="bi-td-right">
                    <h4 className="color-white">
                      {wording[props.lang]["nthu-hsnl"]}
                    </h4>
                    {props.lang !== "jp" && (
                      <p>
                        {wording[props.lang]["research-field"]}：
                        <br />
                        {wording[props.lang]["ai-edu"]}{" "}
                        {wording[props.lang]["aiot"]}
                        <br />
                        {wording[props.lang]["smart-agri"]}{" "}
                        {wording[props.lang]["agri-blockchain"]}
                        <br />
                        {wording[props.lang]["lora-wan"]}{" "}
                        {wording[props.lang]["cyber-security"]}
                      </p>
                    )}
                    {props.lang === "jp" && (
                      <p>
                        {wording[props.lang]["research-field"]}：
                        <br />
                        {wording[props.lang]["ai-edu"]}
                        <br />
                        {wording[props.lang]["aiot"]}
                        <br />
                        {wording[props.lang]["smart-agri"]}
                        <br />
                        {wording[props.lang]["agri-blockchain"]}{" "}
                        {wording[props.lang]["cyber-security"]}
                        <br />
                        {wording[props.lang]["lora-wan"]}
                      </p>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bi-cr-item">
            <table className="bi-table">
              <tbody>
                <tr>
                  <td className="bi-td-left">
                    <img
                      className="bi-img"
                      src={require("../img/chia-wei-front.jpg").default}
                      alt=""
                    ></img>
                  </td>
                  <td className="bi-td-right">
                    <h4 className="color-white">
                      {wording[props.lang]["chia-wei"]}
                    </h4>
                    <p>{wording[props.lang]["chia-wei-intro"]}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Carousel>
      </div>
    </div>
  );
}
