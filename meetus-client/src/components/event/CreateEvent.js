import React, { useContext, useState, useRef } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { LoggedInContext } from "../../App";

export default function CreateEvent({ setEvents }) {
  const url = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";
  const {
    login: [isLoggedIn, setIsLoggedIn],
    user: [user, setUser],
  } = useContext(LoggedInContext);
  const [show, setShow] = useState(false);
  const [categoryname, setCategoryname] = useState('Outdoors')
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const titleRef = useRef();
  const locationRef = useRef();
  const descriptionRef = useRef();
  const dateRef = useRef();
  const timeRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    let imageURL = ''
    switch (categoryname) {
      case "Outdoors": imageURL = 'images/category_outdoors.jpeg'
        break;
      case "Foods": imageURL = 'images/category_food.jpeg'
        break;
      case "Connect Over Tech": imageURL = 'images/category_virtual.jpeg'
        break;
      case "Share Language + Culture":imageURL = 'images/category_culture.jpeg'
        break;
      default:
        break;
    }
    fetch(`${url}/createEvent`, {
      method: "POST",
      body: JSON.stringify({
        username: user.username,
        title: titleRef.current.value,
        location: locationRef.current.value,
        description: descriptionRef.current.value,
        categoryname,
        date: dateRef.current.value,
        time: timeRef.current.value,
        imageURL,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((data) => data.json())
      .then((result) => {
        setEvents(result.events)
        handleClose()
      });
  };

  const selectionHandler = e => {
    e.preventDefault()
    setCategoryname(e.target.value)
  }

  return (
    <>
      {isLoggedIn && (
        <Button
          variant="primary"
          onClick={handleShow}
          className="float-end createBtn mt-3"
          id="loginBtn"
        >
          Create Event
        </Button>
      )}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body className="bg-light">
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                ref={titleRef}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <input
                type="text"
                className="form-control"
                id="location"
                ref={locationRef}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                ref={descriptionRef}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Category
              </label>
              <select className="form-select" aria-label="Default select example" name="category" onChange={selectionHandler}>
                <option value="Outdoors">Outdoors</option>
                <option value="Foods">Foods</option>
                <option value="Connect Over Tech">Connect Over Tech</option>
                <option value="Share Language + Culture">Share Language + Culture</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <input
                type="text"
                className="form-control"
                id="date"
                ref={dateRef}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="time" className="form-label">
                Time
              </label>
              <input
                type="text"
                className="form-control"
                id="time"
                ref={timeRef}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="bg-light">
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
