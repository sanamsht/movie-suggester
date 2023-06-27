import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import MovieNavBar from "../components/MovieNavBar";
import { Button, Form, Modal } from "react-bootstrap";
import MovieModal from "../components/MovieModal";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [userPass, setUserPass] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [modalText, setModalText] = useState("");

  const history = useHistory();
  const loginData = {
    email: userName,
    password: userPass,
  };
  const searchItem = () => {};
  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/login",

        loginData,
        { timeout: 1000 }
      );
      localStorage.setItem("accessToken", response.data.accessToken);

      if (response.data.status == "success") {
        setModalShow(true);
        setModalText(`Login ${response.data.status}..!`);
        setTimeout(() => {
          history.replace("/");
        }, 1500);
      } else {
        setModalShow(true);
        setModalText("Username or Password Incorrect. Please Try Again..!");
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        setModalShow(true);
        setModalText(error.response.data.errors[0].message);
      } else {
        setModalShow(true);
        setModalText("Unknown Error Occured..! Try again later");
      }
    }
  };
  return (
    <>
      <div>
        <MovieNavBar onSearchChange={searchItem} />

        <Form className="m-3 col-3" onSubmit={loginHandler}>
          <Form.Label> Username :</Form.Label>
          <Form.Control
            type="text"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <br />
          <Form.Label>Password :</Form.Label>
          <Form.Control
            type="password"
            value={userPass}
            onChange={(e) => {
              setUserPass(e.target.value);
            }}
          />
          <br />
          <br />
          <Button type="submit">Login</Button>
        </Form>
      </div>

      <MovieModal
        data={modalText}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};
export default Login;
