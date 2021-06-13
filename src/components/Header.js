import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-scroll";
import "./Header.css";
import { wording, LangContext } from "../wording";

export default function Header(props) {
  return (
    <LangContext.Consumer>
      {({ lang, changeLang }) => (
        <Navbar sticky="top" bg="light" expand="lg">
          <Navbar.Brand>
            <table className="hd-brand-table">
              <tbody>
                <tr>
                  <td className="hd-img-col">
                    <img
                      className="hd-brand-img"
                      src={require("../img/logo.png").default}
                    ></img>
                  </td>
                  {lang !== "jp" && (
                    <td className="hd-text-col">
                      <h3>
                        <b>
                          <span class="hd-brand-text-1">
                            {wording[lang]["title-line-1"]}
                          </span>
                          <br />
                          <span class="hd-brand-text-2">
                            {wording[lang]["title-line-2"]}
                          </span>
                        </b>
                      </h3>
                    </td>
                  )}
                  {lang === "jp" && (
                    <td className="hd-text-col-jp">
                      <h3>
                        <b>
                          <span class="hd-brand-text-1-jp">
                            {wording[lang]["title-line-1"]}
                          </span>
                          <br />
                          <span class="hd-brand-text-1-jp">
                            {wording[lang]["title-line-2"]}
                          </span>
                          <br />
                          <span class="hd-brand-text-2-jp">
                            {wording[lang]["title-line-3"]}
                          </span>
                          <br />
                          <span class="hd-brand-text-2-jp">
                            {wording[lang]["title-line-4"]}
                          </span>
                        </b>
                      </h3>
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
          </Navbar.Brand>
          <Navbar.Toggle className="ml-auto" aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {props.menu &&
                props.menu.map((item, index) => {
                  if (item.show) {
                    return (
                      <Nav.Link>
                        <Link
                          to={item.id}
                          spy={true}
                          smooth={true}
                          offset={lang === "jp" ? -150 : -100}
                          duration={500}
                        >
                          {item.name}
                        </Link>
                      </Nav.Link>
                    );
                  }
                })}
              <NavDropdown title="Language" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={changeLang.bind(this, "zh-tw")}>
                  正體中文
                </NavDropdown.Item>
                <NavDropdown.Item onClick={changeLang.bind(this, "jp")}>
                  日本語
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          {props.logOutEvent && (
            <Button size="sm" variant="secondary" onClick={props.logOutEvent}>
              登出
            </Button>
          )}
        </Navbar>
      )}
    </LangContext.Consumer>
  );
}
