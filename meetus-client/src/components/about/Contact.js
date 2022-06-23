import { Row } from "react-bootstrap"
import styled from "styled-components"
export default function Contact() {
    const ContactStyle = styled.div`
        ctHeader{
            font-size: 1.5rem;
            font-weight: bold;
        }
    `
    return (
        <ContactStyle>
            <div className="msgBorder pt-3 textThemeSwitch">
                <h5>Let's Call or Email</h5>
                <p>contact@meetus.com</p>
                <p>+00 129 345 678</p>
                <h5>Our Creative Team</h5>
                <p>creative@meetus.com</p>
                <p>+00 123 456 7890</p>
            </div>
        </ContactStyle>
    )
}