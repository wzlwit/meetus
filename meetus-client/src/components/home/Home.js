import React from "react";
import Category from "./Category";
import Slider from "./slider/Slider";
import UpcomingEvent from "./UpcomingEvent";

export default function Home() {
    return <div>
        <Slider/>
        <Category/>
        <UpcomingEvent/>
    </div>
}