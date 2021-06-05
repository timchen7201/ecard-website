import "./BrandIntro.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function BrandIntro() {
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
        <b>品牌介紹</b>
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
                    ></img>
                  </td>
                  <td className="bi-td-right">
                    <h4 className="color-white">清華大學高速網路研究室</h4>
                    <p>
                      研究領域：
                      <br />
                      人工智慧教育大數據 人工智慧物聯網 (AIoT)
                      <br />
                      智慧科技農業 農業區塊鏈服務平台
                      <br />
                      長距離低功耗物聯網無線網路 網路安全
                    </p>
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
                    ></img>
                  </td>
                  <td className="bi-td-right">
                    <h4 className="color-white">商田實業有限公司</h4>
                    <p>
                      商田實業有限公司是一家國際貿易公司，專門進口日本及其他國家的優質農產品。
                      主要通路為台灣高級百貨公司及超級市場。
                    </p>
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
