import React, { useState, useEffect, useContext, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import { useLocation } from "react-router-dom";
import { LoggedInContext } from "../../App";
import themeList from "../header/themeList";

const EventDetailsStyle = styled.div`
  .eventTime {
    font-size: 0.8rem;
  }
  .eventTitle {
    font-size: 1.1rem;
    font-weight: 600;
  }
  .eventHost {
    font-size: 0.8rem;
  }
  .eventTitle,
  .eventHost {
    color: ${(props) =>
    props.theme.theme === themeList.light
      ? "var(--black)"
      : "var(--lightBlue_1)"};
  }
  .eventBody {
    border-top: 1px solid var(--mediumSlateBlue);
  }
  .center-cropped {
    width: 100px;
    height: 100px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .joinBtn {
    background-color: var(--mediumSlateBlue);
    color: var(--lightBlue_1);
    height: 35px;
    font-size: 0.9rem;
    font-weight: bold;
    padding: 0 10px;
    border-radius: 10px;
    border: 1px solid var(--mediumSlateBlue);
    margin-bottom: 10px;
  }
  .commentBtn {
    background-color: var(--lightBlue_1);
    color: var(--mediumSlateBlue);
    height: 35px;
    font-size: 0.9rem;
    font-weight: bold;
    padding: 0 10px;
    border-radius: 10px;
    border: 1px solid var(--mediumSlateBlue);
    margin-bottom: 10px;
  }
  .comment {
    border-top: 1px solid var(--mediumSlateBlue);
  }
  .infoBox {
    border: 1px solid var(--mediumSlateBlue);
    border-radius: 20px;
  }
  .rightSideDate,
  .rightSideTime,
  .rightSideLocation,
  .description,
  .AttTitle,
  .userName,
  .displayComment {
    color: ${(props) =>
    props.theme.theme === themeList.light
      ? "var(--black)"
      : "var(--lightBlue_1)"};
  }
`;

function EventDetails() {
  const url = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";
  const location = useLocation();
  const id = location.state.id;

  const [event, setEvent] = useState({});
  const [comments, setComments] = useState([]);
  const [showJoinBtn, setShowJoinBtn] = useState(true)
  const [textarea, setTextarea] = useState('')
  const {
    login: [isLoggedIn, setIsLoggedIn],
    user: [user, setUser],
  } = useContext(LoggedInContext);

  useEffect(() => {
    fetch(`${url}/events/${id}`, { method: "GET" })
      .then((data) => data.json())
      .then((result) => {
        for (let i = 0; i < result.event.user.length; i++) {
          if (result.event.user[i]._id === user._id) {
            setShowJoinBtn(false)
            break
          }
          setShowJoinBtn(true)
        }
        setEvent(result.event);
        setComments(result.comments);
      });
  }, [isLoggedIn]);

  const joinHandler = (e) => {
    e.preventDefault();
    fetch(url + "/joinEvent", {
      method: "POST",
      body: JSON.stringify({
        user,
        eventid: id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((data) => data.json())
      .then((result) => {
        if (result.success) {
          setShowJoinBtn(false)
          setEvent(result.event);
        }
      });
  };

  const commentHandler = (e) => {
    e.preventDefault();
    if (textarea.trim() !== "") {
      fetch(url + "/leaveComment", {
        method: "POST",
        body: JSON.stringify({
          user,
          eventid: id,
          comment: textarea,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((data) => data.json())
        .then((result) => {
          if (result.success) {
            setEvent(result.event);
            setComments(result.comments);
            setTextarea('')
          }
        });
    }
  };

  const textareaHandler = e => {
    e.preventDefault()
    setTextarea(e.target.value)
  }

  return (
    <EventDetailsStyle>
      <Container className="col-8">
        <Row className="mt-5">
          <div className="mt-4 text-start eventTime">
            {event.date} {event.time}
          </div>
          <div className="text-start eventTitle">{event.title}</div>
          <div className="text-start eventHost mb-4">
            Hosted By: {event.user === undefined ? "" : event.user[0].username}
          </div>
        </Row>
        <Row className="eventBody">
          <Col className="col-8">
            <div className="py-2 mt-3">
              <img src={event.imageURL} alt="eventImage"></img>
            </div>
            <div>
              <h5 className="text-start details mt-2">Details</h5>
              <p className="text-start fw-lighter mb-5 description">
                {event.description}
              </p>
            </div>
          </Col>
          <Col className="col-4">
            <Col className="infoBox mt-4 col-10 mx-auto">
              <div className="col-10 offset-1 text-start mt-3 rightSideDate">
                {event.date}
              </div>
              <div className="col-10 offset-1 text-start rightSideTime">
                {event.time} EDT
              </div>
              <br />
              <div className="col-10 offset-1 text-start mb-2 rightSideLocation">
                {event.location}
              </div>
            </Col>
          </Col>
        </Row>

        {/* Attendees Section*/}
        {isLoggedIn && (
          <Row>
            <Col className="col-8">
              <Row>
                <h5 className="text-start AttTitle">
                  Attendees({event.user === undefined ? "" : event.user.length})
                </h5>
                {event.user === undefined
                  ? ""
                  : event.user.map((user) => {
                    return (
                      <Col className="col-3" key={user._id}>
                        <div
                          className="center-cropped"
                          style={{ backgroundImage: `url(${user.photoURL})` }}
                        ></div>
                        <p className="text-start userName">{user.username}</p>
                      </Col>
                    );
                  })}
              </Row>
            </Col>

            <Col className="col-4 position-relative">
              {showJoinBtn && <button
                className="position-absolute bottom-0 joinBtn"
                onClick={joinHandler}
              >
                Join Now
              </button>}
            </Col>
          </Row>
        )}

        {/* Comment Section */}
        {isLoggedIn && (
          <Row>
            <Col className="comment mt-4">
              <Form.Group
                className="mb-3 col-10 mt-4"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Control as="textarea" rows={3} placeholder="Leave your comment here" value={textarea} onChange={textareaHandler} />
              </Form.Group>

              {comments === undefined
                ? ""
                : comments.map((comment) => {
                  return (
                    <Row
                      className="col-10"
                      key={comment._id}
                      style={{ height: "50px", lineHeight: "50px" }}
                    >
                      <Col className="col-9 text-start displayComment">
                        {comment.content}
                      </Col>
                      <Col
                        className="text-end displayComment"
                        style={{ height: "50px", lineHeight: "50px" }}
                      >
                        {comment.user.username}
                      </Col>
                    </Row>
                  );
                })}
            </Col>
          </Row>
        )}

        {isLoggedIn && (
          <Row>
            <Col>
              <button
                className="float-start commentBtn mt-3"
                onClick={commentHandler}
              >
                leave comment
              </button>
            </Col>
          </Row>
        )}
      </Container>
    </EventDetailsStyle>
  );
}

export default EventDetails;
