import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import themeList from "../header/themeList";

const UpcomingEventStyles = styled.div`
  .card {
    width: 18rem;
  }
  img{
    max-height: 160px;
  }
  .eventSectionTitle{
    color:${(props) =>
    props.theme.theme === themeList.light
      ? "var(--mediumSlateBlue)"
      : "var(--lightBlue_1)"};
  }
  .joinBtn{
    background-color: var(--mediumSlateBlue);
    border:none;
  }
  .viewAllEvents{
    background-color: var(--lightBlue_1);
    color: var(--mediumSlateBlue);
    height: 40px;
    width: 150px;
    font-size: 0.9rem;
    font-weight: bold;
    padding: 0 10px;
    border-radius: 10px;
    border: 1px solid var(--mediumSlateBlue);
    margin-bottom: 10px;
  }
  .card{
    background-color: ${(props) =>
    props.theme.theme === themeList.light
      ? "var(--lightBlue_1)"
      : "var(--darkBlue_4)"};
    color:${(props) =>
    props.theme.theme === themeList.light
      ? "var(--black)"
      : "var(--lightBlue_1)"};
  }
`;

function UpcomingEvent() {
  const url = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";
  const [upcomingEvent, setUpcomingEvent] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    fetch(url + "/events", { method: "GET" })
      .then((data) => data.json())
      .then((event) => {
        let events = [event[1], event[3], event[7], event[8]];
        setUpcomingEvent(events);
      });
  }, []);

  const allEventsHandler = e => {
    e.preventDefault()
    navigate('/event')
  }

  return (
    <>
      <UpcomingEventStyles>
        <h4 className="eventSectionTitle">Upcoming Events</h4>
        <Container className="mb-5">
          <Row>
            {upcomingEvent.map((event) => {
              return (
                <Col key={event._id} className="mt-3">
                  <div className="card mx-auto">
                    <img
                      className="card-img-top"
                      src={event.imageURL}
                      alt="Card" />
                    <div className="card-body">
                      <h6 className="card-title">{event.title}</h6>
                      <p className="card-text">
                        {event.date} | {event.time} EDT
                      </p>
                      <Link to="/eventDetails" state={{ id: event._id }} className="btn btn-primary joinBtn">
                        Join
                      </Link>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
          <Row>
            <Col className="mt-5">
              <button className="viewAllEvents" onClick={allEventsHandler}>View All Events</button>
            </Col>
          </Row>
        </Container>
      </UpcomingEventStyles>
    </>
  );
}

export default UpcomingEvent;
