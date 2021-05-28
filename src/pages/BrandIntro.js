import "./BrandIntro.css";
import { Carousel } from "react-bootstrap";

export default function BrandIntro() {
  return (
    <div className="bi-div">
      <h2 className="color-white">品牌介紹</h2>
      <br />
      <Carousel className="bi-carousel">
        <Carousel.Item className="bi-cr-item">
          <table className="bi-table">
            <tr>
              <td className="bi-td-left">
                <img
                  className="bi-img"
                  src={require("../img/HSNL.png").default}
                ></img>
              </td>
              <td className="bi-td-right">
                <h4 className="color-white">清華大學高速網路實驗室</h4>
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
          </table>
        </Carousel.Item>
        <Carousel.Item className="bi-cr-item">
          <table className="bi-table">
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
          </table>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
