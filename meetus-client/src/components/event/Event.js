import React, { useState, useEffect } from 'react'
import EventTitle from './EventTitle'
import FilterSection from './FilterSection'
import AllEvents from './AllEvents';
import { useLocation } from 'react-router-dom';

export default function Event() {
  const url = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";
  const [events, setEvents] = useState([])
  const location = useLocation()

  useEffect(() => {
    fetch(url + "/events", { method: "GET" }).then(data => data.json()).then(events => {
      if (location.state !== null) {
        events = events.filter(event => {
          return event.categoryid.categoryname === location.state.category
        })
      }
      setEvents(events)
    })
  }, [])

  return (
    <>
      <EventTitle setEvents={setEvents} />
      <FilterSection setEvents={setEvents} />
      <AllEvents events={events}></AllEvents>
    </>
  )
}
