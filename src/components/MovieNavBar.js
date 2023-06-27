//import "bootstrap/dist/css/bootstrap.min.css";

import { Container, Navbar } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { Link } from "react-router-dom";

const MovieNavBar = (props) => {
  return (
    <>
      <Navbar className="bg-dark" expand="lg">
        <Container fluid>
          <Navbar.Brand className="text-danger">
            <h3>
              <Link to="/">Movie Suggester</Link>
            </h3>
          </Navbar.Brand>
          <h5>
            <NavbarCollapse className="justify-content-end gap-2 ">
              <Navbar.Text>
                <Link to="add" className="text-white ">
                  Add Movie
                </Link>
              </Navbar.Text>
              <Navbar.Text>
                {localStorage.getItem("accessToken") ? (
                  <>
                    <Link to="profile" className="text-white">
                      Profile
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="login" className="text-white">
                      Login
                    </Link>
                  </>
                )}
              </Navbar.Text>
            </NavbarCollapse>
          </h5>
        </Container>
      </Navbar>
    </>
  );
};
export default MovieNavBar;
