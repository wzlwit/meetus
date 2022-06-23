import React, { useContext, useState, useRef } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LoggedInContext } from "../../App";
import ThemeContext from "./ThemeContext";
import themeList from "./themeList";

export default function Login() {
  const url = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";
  const {
    login: [isLoggedIn, setIsLoggedIn],
    user: [user, setUser],
  } = useContext(LoggedInContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const FormStyles = styled.form`
  .form-label{
    color:${(props) =>
      props.theme.theme === themeList.light
        ? "var(--darkBlue_3)"
        : "var(--lightBlue_1)"};
  }
`;

  const submitHandler = (e) => {
    e.preventDefault();
    setShow(false);
    fetch(url + "/login", {
      method: "POST",
      body: JSON.stringify({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((data) => data.json())
      .then((result) => {
        if (result.success) {
          setUser(result.user);
          setIsLoggedIn(true);
        } else {
          alert(result.msg);
        }
      });
  };

  const jumpToDashboardHandler = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={isLoggedIn ? jumpToDashboardHandler : handleShow}
        className="me-2"
        id="loginBtn"
      >
        {isLoggedIn ? "Dashboard" : "Login"}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}

      >
        <Modal.Body className={theme === themeList.light ? 'bg-light' : 'bg-dark'}>
          <FormStyles>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                ref={usernameRef}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                ref={passwordRef}
              />
            </div>
          </FormStyles>
        </Modal.Body>
        <Modal.Footer className={theme === themeList.light ? 'bg-light' : 'bg-dark'}>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" id="modalLoginBtn" onClick={submitHandler}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
