import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import themeList from "../header/themeList";
import Contact from "./Contact";
import MsgForm from "./MsgForm";

export default function EmailMsg() {
    const EmailStyle = styled.div`
    .searchBtn {
        background-color: var(--mediumSlateBlue);
        color: var(--lightBlue_1);
        height: 30px;
        font-size: 0.8rem;
        font-weight: bold;
        padding: 0 10px;
        border-radius: 5px;
        border: none;
    }
    .msgBorder{
        border:1px solid ${(props) =>
        props.theme.theme === themeList.light
            ? "var(--mediumSlateBlue)"
            : "var(--lightBlue_1)"};;
        border-radius:0.5rem;
    }
    `

    return (
        <EmailStyle>
            <br />
            <Row mt-4><p className="eventTime">Have Questions?</p></Row>
            <Row mt-4><h1 className="textThemeSwitch">Drop US a Line </h1></Row>
            <Container mt-4>
                <Row>
                    <Col className="offset-1 col-6 mt-4"><MsgForm /></Col>
                    <Col className="col-4 mt-4"><Contact /></Col>
                </Row>
            </Container>

        </EmailStyle>
    )
}