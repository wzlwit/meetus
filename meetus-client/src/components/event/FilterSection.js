import React, { useContext, useState } from "react";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import styled from "styled-components";
import { LoggedInContext } from "../../App";

const FilterSectionStyle = styled.div`
  .resetBtn {
    background-color: var(--lightBlue_1);
    color: var(--mediumSlateBlue);
    height: 30px;
    font-size: 0.8rem;
    font-weight: bold;
    padding: 0 10px;
    /* border-radius:10px; */
    border: 1px solid var(--mediumSlateBlue);
  }

  .dropdown-basic {
    background-color: var(--mediumSlateBlue);
    border: none;
    font-size: 0.8rem;
    /* color:var(--mediumSlateBlue); */
  }
`;

function FilterSection({ setEvents }) {
  const url = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";
  const {
    login: [isLoggedIn, setIsLoggedIn],
    user: [user, setUser],
  } = useContext(LoggedInContext);

  const [type, setType] = useState("");
  const [date, setDate] = useState("");

  const typeHandler = (type) => {
    fetch(url + "/events", { method: "GET" })
      .then((data) => data.json())
      .then((events) => {
        if (type === "") {
          setEvents(events);
        } else {
          if (date !== "") {
            let month = ''
            if (date === 'This Month') month = 'June'
            else month = 'July'
            setEvents(
              events.filter(
                (event) =>
                  event.categoryid.categoryname === type &&
                  event.date.split(" ")[1] === month
              )
            );
          } else {
            setEvents(
              events.filter((event) => event.categoryid.categoryname === type)
            );
          }

          setType(type);
        }
      });
  };

  const dateHandler = (date) => {
    fetch(url + "/events", { method: "GET" })
      .then((data) => data.json())
      .then((events) => {
        if (type !== "") {
          setEvents(
            events.filter((event) => {
              let arr = event.date.split(" ");
              return arr[1] === date && event.categoryid.categoryname === type;
            })
          );
        } else {
          setEvents(
            events.filter((event) => {
              let arr = event.date.split(" ");
              return arr[1] === date;
            })
          );
        }
        if (date === 'June') {
          setDate('This Month');
        } else {
          setDate('Next Month')
        }
      });
  };

  const eventCreatedHandler = () => {
    fetch(url + "/events", { method: "GET" })
      .then((data) => data.json())
      .then((events) => {
        setEvents(events.filter((event) => event.user[0] === user._id));
      });
  };

  const eventAttendedHandler = () => {
    fetch(url + "/events", { method: "GET" })
      .then((data) => data.json())
      .then((events) => {
        setEvents(
          events.filter((event) => {
            let flag = false;
            for (let i = 0; i < event.user.length; i++) {
              if (event.user[i] === user._id) {
                flag = true;
                break;
              }
            }
            return flag;
          })
        );
      });
  };

  const resetHandler = (e) => {
    fetch(url + "/events", { method: "GET" })
      .then((data) => data.json())
      .then((events) => {
        setEvents(events)
        setDate('')
        setType('')
      });
  };

  return (
    <FilterSectionStyle>
      <Container className="mt-3 col-8">
        <Row className="col-8">
          <Col>
            <Dropdown>
              <Dropdown.Toggle variant="success" className="dropdown-basic">
                {date === "" ? "Any Date" : date}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    dateHandler("June");
                  }}
                >
                  This month
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    dateHandler("July");
                  }}
                >
                  Next month
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col>
            <Dropdown>
              <Dropdown.Toggle variant="success" className="dropdown-basic">
                {type === "" ? "Any Category" : type}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    typeHandler("Outdoors");
                  }}
                >
                  Explore the Outdoors
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    typeHandler("Foods");
                  }}
                >
                  Meet Foods
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    typeHandler("Connect Over Tech");
                  }}
                >
                  Connect Over Tech
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    typeHandler("Share Language + Culture");
                  }}
                >
                  Share Languages & Cultures
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col>
            {isLoggedIn && (
              <Dropdown>
                <Dropdown.Toggle variant="success" className="dropdown-basic">
                  My Event
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={eventCreatedHandler}>
                    My Created Event
                  </Dropdown.Item>
                  <Dropdown.Item onClick={eventAttendedHandler}>
                    My Attended Event
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Col>
          <Col className="my-auto">
            <button className="resetBtn" onClick={resetHandler}>
              Reset Filter
            </button>
          </Col>
        </Row>
      </Container>
    </FilterSectionStyle>
  );
}

export default FilterSection;
