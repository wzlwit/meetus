import React, { useContext, useState, useRef } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";
import { LoggedInContext } from "../../App";
import themeList from "./themeList";
import ThemeContext from "./ThemeContext";

export default function Register() {
  const { login: [isLoggedIn, setIsLoggedIn], user: [user, setUser] } = useContext(LoggedInContext);
  const { theme } = useContext(ThemeContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const photoRef = useRef();

  const submitHandler = (e) => {
    const url = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";
    e.preventDefault();
    fetch(url + "/register", {
      method: "POST",
      body: JSON.stringify({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
        photoURL: photoRef.current.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((data) => data.json())
      .then((result) => {
        if (result.success) {
          alert("user created");
          handleClose()
        } else {
          alert(result.msg + " Please try again");
        }
      });
  };

  const logoutHandler = (e) => {
    e.preventDefault();
    setIsLoggedIn(false);
    setUser({})
  };

  const FormStyles = styled.form`
    .form-label{
      color:${(props) =>
      props.theme.theme === themeList.light
        ? "var(--darkBlue_3)"
        : "var(--lightBlue_1)"};
    }
  `;

  return (
    <>
      {!isLoggedIn && (
        <Button
          variant="primary"
          onClick={handleShow}
          className="me-2"
          id="loginBtn"
        >
          Register Now
        </Button>
      )}
      {isLoggedIn && (
        <Button
          variant="primary"
          onClick={logoutHandler}
          className="me-2"
          id="loginBtn"
        >
          Log Out
        </Button>
      )}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body className={theme === themeList.light ? 'bg-light' : 'bg-dark'}>
          <FormStyles >
            <input
              type="hidden"
              name="photoURL"
              value="images/user.png"
              ref={photoRef}
            />
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
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
