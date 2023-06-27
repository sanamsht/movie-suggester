import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import MovieNavBar from "../components/MovieNavBar";
import { Button, Container, Modal } from "react-bootstrap";

const Profile = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [modalText, setModalText] = useState("");

  useEffect(() => {
    authCheck();
  }, []);
  const searchItem = () => {};
  const authCheck = async () => {
    const getAccessToken = localStorage.getItem("accessToken");
    //e.preventDefault();
    try {
      const response = await axios.get(
        "https://api.dynoacademy.com/test-api/v1/me",

        {
          timeout: 10000,
          headers: { Authorization: `Bearer ${getAccessToken}` },
        }
      );

      if (response.data.status == "success") {
        setUserData(response.data.data);
      } else {
      }
    } catch (error) {
      if (error.response) {
        setModalShow(true);
        setModalText(error.response.data.errors[0].message);
      } else {
        setModalShow(true);
        setModalText("Unknown Error Occured..! Try again later");
      }
    }
  };

  const logoutHandler = () => {
    setModalShow(true);
  };
  return (
    <>
      <MovieNavBar onSearchChange={searchItem} />
      <Container className="m-1 mt-3">
        <h3>My Profile:</h3>

        <div>
          Welcome {userData.name},{" "}
          <Button className="bg-danger" onClick={logoutHandler} type="button">
            Logout
          </Button>
        </div>
      </Container>
      <Modal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>Are you sure?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              localStorage.removeItem("accessToken");
              history.replace("/");
            }}
          >
            Logout
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setModalShow(false);
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Profile;
