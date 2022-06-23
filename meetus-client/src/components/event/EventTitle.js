import React, { useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import CreateEvent from "./CreateEvent";

const EventTitleStyles = styled.div`
  .eventTitle {
    font-size: 1.2rem;
    color: var(--mediumSlateBlue);
    display: inline-block;
    border-bottom: 1px solid var(--mediumSlateBlue);
  }
  .searchBar {
    height: 30px;
    background-color: var(--lightBlue_1);
    font-size: 0.8rem;
    border: 1px solid var(--mediumSlateBlue);
    color: grey;
    padding: 0 5px;
    border-radius: 5px;
  }
  .searchBtn {
    background-color: var(--mediumSlateBlue);
    color: var(--lightBlue_1);
    height: 30px;
    font-size: 0.8rem;
    font-weight: bold;
    padding: 0 10px;
    border-radius: 10px;
    border: none;
  }
  // .createBtn{
  //     background-color: var(--lightBlue_1);
  //     color: var(--mediumSlateBlue);
  //     height:30px;
  //     font-size:0.8rem;
  //     font-weight:bold;
  //     padding:0 10px;
  //     border-radius:10px;
  //     border:1px solid var(--mediumSlateBlue);
  // }
`;

function EventTitle({ setEvents }) {
  const url = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";
  const searchRef = useRef();

  const searchHandler = (e) => {
    e.preventDefault();
    fetch(url + "/events", { method: "GET" })
      .then((data) => data.json())
      .then((events) => {
        setEvents(
          events.filter((event) =>
            event.title
              .toUpperCase()
              .includes(searchRef.current.value.toUpperCase())
          )
        );
      });
  };
  return (
    <>
      <EventTitleStyles>
        <Container className="mt-5 pt-3 col-8">
          <Row className="mt-2">
            <Col>
              <p className="eventTitle float-start">Events</p>
            </Col>
            <Col>
              <input
                type="text"
                className="searchBar float-start me-2 my-auto mt-3"
                placeholder="Search for keywords"
                ref={searchRef}
                onChange={searchHandler}
              ></input>
              <button className="float-start searchBtn mt-3" onClick={searchHandler}>
                Search
              </button>
            </Col>
            <Col>
              <CreateEvent setEvents={setEvents} />
            </Col>
          </Row>
        </Container>
      </EventTitleStyles>
    </>
  );
}

export default EventTitle;
