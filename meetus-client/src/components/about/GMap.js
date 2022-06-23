import React from "react";
import { Row } from "react-bootstrap";
import styled from "styled-components";

export default function GMap() {
    const MapStyle = styled.div`
    .map{
        // height:500px
        height:25vw
    }
    `

    return (
        <MapStyle>

            <Row className="map offset-2 col-8 float-center">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2801.145381516555!2d-73.94391688425185!3d45.406407845318526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc938500caad3a7%3A0xd807d74a59dcffcf!2sJohn%20Abbott%20College!5e0!3m2!1sen!2sca!4v1655560889359!5m2!1sen!2sca"
                    // width="100%" height="100%"
                    width="90%" max-height="300"
                    frameBorder="0"
                    allowFullScreen
                />
            </Row>
            {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2801.145381516555!2d-73.94391688425185!3d45.406407845318526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc938500caad3a7%3A0xd807d74a59dcffcf!2sJohn%20Abbott%20College!5e0!3m2!1sen!2sca!4v1655560889359!5m2!1sen!2sca" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
        </MapStyle>
    );
}