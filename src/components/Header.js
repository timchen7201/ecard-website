import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-scroll";
import "./Header.css";

export default function Header(props) {
  return (
    <Navbar sticky="top" bg="light" expand="lg">
      <Navbar.Brand>
        <table className="hd-brand-table">
          <tbody>
            <tr>
              <td>
                <img
                  className="hd-brand-img"
                  src={require("../img/logo.png").default}
                ></img>
              </td>
              <td>
                <h3>
                  <b>
                    <span class="hd-brand-text-1">區塊鏈溯源</span>
                    <br />
                    <span class="hd-brand-text-2">賀禮服務平台</span>
                  </b>
                </h3>
              </td>
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
                      offset={-100}
                      duration={500}
                    >
                      {item.name}
                    </Link>
                  </Nav.Link>
                );
              }
            })}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
