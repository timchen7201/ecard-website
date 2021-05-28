import React, { useEffect } from "react";
import "./RecieverPage.css";
import CardTemplate1 from "./CardTemplates/CardTemplate1";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import BrandIntro from "./BrandIntro";

import {
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Tooltip,
  OverlayTrigger,
  Form,
} from "react-bootstrap";

class Header extends React.Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

class Slogan extends React.Component {
  render() {
    return (
      <div className="sl-div">
        <h3>
          <b>信賴 ‧ 溫度</b>
        </h3>
        <h3>
          <b>一份精心為您準備的禮物</b>
        </h3>
      </div>
    );
  }
}

class GiftCode extends React.Component {
  render() {
    const renderTooltip = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        <table>
          <tr>
            <td className="gc-tip-table-left">
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
    return (
      <div className="gc-div">
        <table className="gc-tb">
          <tr>
            <td className="gc-td-left">
              <img src={require("../img/card-icon.png").default}></img>
            </td>
            <td className="gc-td-right">
              <h6>
                <b>觀看送禮者給您的影音祝福</b>
              </h6>
              <Form>
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
                    <tr>
                      <td>
                        <Form.Control
                          type="password"
                          placeholder="簡訊禮物密碼"
                          size="sm"
                        />
                      </td>
                      <td>
                        <Button size="sm" variant="success" type="submit">
                          送出
                        </Button>
                      </td>
                    </tr>
                  </table>
                </Form.Group>
              </Form>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

class GiftCard extends React.Component {
  render() {
    return (
      <div className="card-div">
        <CardTemplate1></CardTemplate1>
      </div>
    );
  }
}

class GiftInfo extends React.Component {
  render() {
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

    return (
      <div className="gi-div">
        <h3>禮品介紹 & 區塊鏈溯源</h3>
        <br />
        <div className="gi-cr-div">
          <Carousel responsive={responsive}>
            <div className="gi-cr-item item-selected">
              <span className="gi-cr-item-helper"></span>
              <img
                className="gi-cr-item-img"
                src={require("../img/mango.jpeg").default}
              ></img>
            </div>
            <div className="gi-cr-item">
              <span className="gi-cr-item-helper"></span>
              <img
                className="gi-cr-item-img"
                src={require("../img/dates.jpg").default}
              ></img>
            </div>
            <div className="gi-cr-item">
              <span className="gi-cr-item-helper"></span>
              <img
                className="gi-cr-item-img"
                src={require("../img/pomelo.jpg").default}
              ></img>
            </div>
          </Carousel>
        </div>
        <br />
        <br />
        <GiftDetail></GiftDetail>
      </div>
    );
  }
}

class GiftDetail extends React.Component {
  render() {
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

    return (
      <div>
        <h4>龍蝦芒果</h4>
        <table className="gd-table">
          <tr>
            <td className="gd-table-img">
              <img src={require("../img/mango.jpeg").default}></img>
            </td>
            <td className="gd-table-text">
              <p>
                南方艷陽的沐浴下 屏東縣吃龍蝦長大的愛文芒果們
                果皮更鮮紅、果肉更香甜
              </p>
            </td>
          </tr>
        </table>
        <br />
        <br />
        <table className="gd-table">
          <tr>
            <td className="gd-table-text">
              <h5>台鼎農場</h5>
              <p>
                南方艷陽的沐浴下 屏東縣吃龍蝦長大的愛文芒果們
                果皮更鮮紅、果肉更香甜
              </p>
            </td>
            <td className="gd-table-img">
              <img src="https://media.istockphoto.com/photos/crop-of-sunkissed-mango-fruit-ripening-on-tree-picture-id601122142?k=6&m=601122142&s=612x612&w=0&h=5DWvLxTHIeS7Q52UOQugcTI6qzjTB55ecs7UjeXjfy4="></img>
            </td>
          </tr>
        </table>
        <br />
        <br />
        <h5>檢驗證書</h5>
        <div className="gd-cr-div">
          <Carousel responsive={responsive}>
            <div className="gd-cr-item">
              <img src="https://lh3.googleusercontent.com/proxy/QBrkYY3hbFTGglQErPNoZQOCMEAE70pVwoMC1FdZeZE92wj0g9Oht6yyN-A4tTBQFLVLq9AGVXGxfZEs_mtMy0cI5qahhWPZ8pCDz9vPbTPa"></img>
            </div>
            <div className="gd-cr-item">
              <img src="https://lh3.googleusercontent.com/proxy/QBrkYY3hbFTGglQErPNoZQOCMEAE70pVwoMC1FdZeZE92wj0g9Oht6yyN-A4tTBQFLVLq9AGVXGxfZEs_mtMy0cI5qahhWPZ8pCDz9vPbTPa"></img>
            </div>
            <div className="gd-cr-item">
              <img src="https://lh3.googleusercontent.com/proxy/QBrkYY3hbFTGglQErPNoZQOCMEAE70pVwoMC1FdZeZE92wj0g9Oht6yyN-A4tTBQFLVLq9AGVXGxfZEs_mtMy0cI5qahhWPZ8pCDz9vPbTPa"></img>
            </div>
          </Carousel>
        </div>
      </div>
    );
  }
}

class CardForm extends React.Component {
  render() {
    return (
      <div className="cf-div">
        <h2>製作回禮感謝卡</h2>
        <br />
        <h6>感謝卡即時預覽</h6>
        <CardTemplate1></CardTemplate1>
        <Form className="cf-form">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>回禮者署名</Form.Label>
            <Form.Control type="text" placeholder="回禮者署名" />
            <Form.Text className="text-muted">
              ex. 商田公司 林啟森董事長
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>回禮影片上傳</Form.Label>
            <br />
            <input type="file" accept=".mp4" capture></input>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>回禮內容</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default function RecieverPage() {
  return (
    <div>
      <Header></Header>
      <Slogan></Slogan>
      <GiftCode></GiftCode>
      <GiftCard></GiftCard>
      <GiftInfo></GiftInfo>
      <CardForm></CardForm>
      <BrandIntro></BrandIntro>
    </div>
  );
}
