import React, { useEffect } from "react";
import "./SenderPage.css";
import CardTemplate1 from "./CardTemplates/CardTemplate1";
import BrandIntro from "./BrandIntro";

import {
  Navbar,
  Nav,
  NavDropdown,
  Tab,
  Row,
  Col,
  ListGroup,
  Button,
  Tabs,
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

class OrderInfo extends React.Component {
  render() {
    return (
      <div className="order-info-div">
        <h2>訂單資訊</h2>
        <span>以下是您訂購要送給[收禮者]的禮品內容</span>
        <br />
        <br />
        <div className="oi-tab">
          <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
            <Row>
              <Col sm={3}>
                <ListGroup>
                  <ListGroup.Item action href="#link1">
                    龍蝦芒果 3盒
                  </ListGroup.Item>
                  <ListGroup.Item action href="#link2">
                    蜜棗 3盒
                  </ListGroup.Item>
                  <ListGroup.Item action href="#link3">
                    麻豆文旦 2盒
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col sm={8}>
                <Tab.Content>
                  <Tab.Pane eventKey="#link1">
                    <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                      <Tab eventKey="home" title="禮品介紹">
                        <table>
                          <tr>
                            <td className="oi-img-width">
                              <img
                                className="oi-img-width"
                                src="https://agfstorage.blob.core.windows.net/misc/FP_es/2021/03/30/emextext.jpeg"
                                alt="Italian Trulli"
                              ></img>
                            </td>
                            <td className="fruit-text">
                              <h4>龍蝦芒果</h4>
                              <p>
                                南方艷陽的沐浴下 屏東縣吃龍蝦長大的愛文芒果們
                                果皮更鮮紅、果肉更香甜
                              </p>
                            </td>
                          </tr>
                        </table>
                      </Tab>
                      <Tab eventKey="profile" title="農場資訊">
                        <table>
                          <tr>
                            <td className="fruit-text">
                              <h4>台鼎農場</h4>
                              <p>
                                南方艷陽的沐浴下 屏東縣吃龍蝦長大的愛文芒果們
                                果皮更鮮紅、果肉更香甜
                              </p>
                            </td>
                            <td className="oi-img-width">
                              <img
                                className="oi-img-width"
                                src="https://media.istockphoto.com/photos/crop-of-sunkissed-mango-fruit-ripening-on-tree-picture-id601122142?k=6&m=601122142&s=612x612&w=0&h=5DWvLxTHIeS7Q52UOQugcTI6qzjTB55ecs7UjeXjfy4="
                                alt="Italian Trulli"
                              ></img>
                            </td>
                          </tr>
                        </table>
                      </Tab>
                      <Tab eventKey="contact" title="檢驗證書">
                        <table>
                          <tr>
                            <td className="fruit-text">
                              <td className="oi-img-width">
                                <img
                                  className="oi-img-width"
                                  src="https://lh3.googleusercontent.com/proxy/QBrkYY3hbFTGglQErPNoZQOCMEAE70pVwoMC1FdZeZE92wj0g9Oht6yyN-A4tTBQFLVLq9AGVXGxfZEs_mtMy0cI5qahhWPZ8pCDz9vPbTPa"
                                  alt="Italian Trulli"
                                ></img>
                              </td>
                            </td>
                            <td className="oi-img-width">
                              <img
                                className="oi-img-width"
                                src="https://lh3.googleusercontent.com/proxy/QBrkYY3hbFTGglQErPNoZQOCMEAE70pVwoMC1FdZeZE92wj0g9Oht6yyN-A4tTBQFLVLq9AGVXGxfZEs_mtMy0cI5qahhWPZ8pCDz9vPbTPa"
                                alt="Italian Trulli"
                              ></img>
                            </td>
                          </tr>
                        </table>
                      </Tab>
                    </Tabs>
                  </Tab.Pane>
                  <Tab.Pane eventKey="#link2">
                    <p>45545</p>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>
    );
  }
}

class Illustration extends React.Component {
  render() {
    return (
      <div className="il-div">
        <h2 className="color-white">禮重 ‧ 情意濃</h2>
        <span>錄製給[收禮者]的一段影音</span>
        <br />
        <span>讓他/她可以透過掃描禮盒上的QR Code</span>
        <br />
        <span>看見、聽見你的祝福</span>
        <br />
        <img
          className="il-img"
          src={require("../img/illustration.png").default}
          alt="Italian Trulli"
        ></img>
      </div>
    );
  }
}

class CardForm extends React.Component {
  render() {
    return (
      <div className="cf-div">
        <h2>錄製賀卡</h2>
        <br />
        <h6>賀卡及時預覽</h6>
        <CardTemplate1></CardTemplate1>
        <Form className="cf-form">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>送禮者署名</Form.Label>
            <Form.Control type="text" placeholder="送禮者署名" />
            <Form.Text className="text-muted">
              ex. 商田公司 林啟森董事長
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>祝賀影片上傳</Form.Label>
            <br />
            <input type="file" accept=".mp4" capture></input>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>祝賀內容</Form.Label>
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

export default function SenderPage() {  

  return (
    <div>
      <Header></Header>
      <OrderInfo></OrderInfo>
      <Illustration></Illustration>
      <CardForm></CardForm>
      <BrandIntro></BrandIntro>
    </div>
  );
}
