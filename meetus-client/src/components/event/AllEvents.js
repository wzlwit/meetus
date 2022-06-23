import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import themeList from "../header/themeList";

const EventStyles = styled.div`
  // .events {
  //   border-top: 1px solid var(--mediumSlateBlue);
  // }
  // .eventTime{
  //   font-weight: bold;
  //   color: var(--mediumSlateBlue);
  // }
  // .eventTitle{
  //   font-weight: bold;
  //   margin-top:20px;
  // }
  .detailBtn{
    background-color: var(--mediumSlateBlue);
    color: var(--lightBlue_1);
    height:35px;
    font-size:0.8rem;
    font-weight:bold;
    padding:0 10px;
    border-radius:5px;
    border:1px solid var(--mediumSlateBlue);
  }
  .eventTitle,.eventLocation, .eventAttendees{
    color:${(props) =>
        props.theme.theme === themeList.light
            ? "var(--black)"
            : "var(--lightBlue_1)"};
  }
  .eventAttendees{
    margin-right:50px;
  }
`;

function AllEvents({ events }) {
  const navigate = useNavigate();

  return (
    <EventStyles>
      <Container className="mt-3 col-8">
        {events.map((event) => {
          return (
            <Row className="events" key={event._id}>
              <Col className="col-4"><img src={event.imageURL} alt="images" className="py-4"/></Col>
              <Col className="col-8">
                <Row className="offset-2 mt-4 eventTime">{event.date} {event.time}</Row>
                <Row className="offset-2 eventTitle mt-4">{event.title}</Row>
                <Row className="offset-2 mt-2 eventLocation">{event.location}</Row>
                <Row className="mt-2">
                  <Col className="mt-5 eventAttendees">{event.user.length} attendees</Col>
                  <Col className="mt-5 text-end">
                    <button className="detailBtn" 
                    onClick={()=>{navigate('/eventDetails',{state:{id:event._id}})}}>
                    Details</button>
                  </Col>
                </Row>
              </Col>
            </Row>
          );
        })}
      </Container>
    </EventStyles>
  );
}

export default AllEvents;
