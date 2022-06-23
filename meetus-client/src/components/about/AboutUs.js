import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import StaffDisplayer from './StaffDisplayer';
import GMap from './GMap';
import EmailMsg from './EmailMsg';
import themeList from '../header/themeList';

export default function AboutUs() {
    const AboutStyle = styled.div`
    .showBtn{
        background-color: var(--mediumSlateBlue);
        color: var(--white);
        height:30px;
        font-size:0.8rem;
        font-weight:bold;
        font-color:black;
        padding:0 10px;
        border-radius:10px;
        border:1px solid var(--mediumSlateBlue);
    }
    .textThemeSwitch{
        color:${(props) =>
        props.theme.theme === themeList.light
            ? "var(--black)"
            : "var(--lightBlue_1)"};
    }

    `

    const Qianqian = {
        name: "Qianqian Zheng",
        title: "Chief Designer",
        slogon: "I have beautiful eyes to find beauty as well as the ability to make the world beautiful!",
        skill1: "Creativity and proactivity.",
        skill2: "Excellent sewing skills.",
        skill3: "Visualisation and sketching skills.",
        imageURL: "images/member2.jpeg",
    }
    const Ran = {
        name: "Ran Zhu",
        title: "Chief Executive Officer",
        slogon: "As a CEO, I am not only good at execution, but also good at video games!",
        skill1: "Clear communication",
        skill2: "Open-mindedness",
        skill3: "Creativity and innovation",
        imageURL: "images/mem1.jpg",
    }
    const Zhaolong = {
        name: "Zhaolong Wang",
        title: "Chief Technology Officer",
        slogon: "Impossible is nothing. Let's do it in a smart way!",
        // skills: "OOP Developer,Big Data Engineer,MS Certified Azure Architect",
        // skills: ["OOP Developer","Big Data Engineer","MS Certified Azure Architect"],
        skill1: "OOP Developer",
        skill2: "Big Data Engineer",
        skill3: "MS Certified Azure Architect",
        imageURL: "images/mem3.gif",
    }

    return (
        <AboutStyle>
            <Container className="mt-5 col-8">
                <Row className="mt-4">
                    <Col>
                        <p className="eventTitle myCenter mt-4 textThemeSwitch">We are <span className='eventTime'>Dev Start</span> Team!</p>
                        <p className="eventTitle myCenter mt-1 textThemeSwitch">We are here to provide you with a <span className='eventTime'>Meet Us</span> Platform.</p>
                        <p className="eventTitle myCenter my-1 textThemeSwitch">Interesting events happen every day!</p>
                    </Col>
                    {/* <Col className="col-4"><GMap /></Col> */}
                </Row>
                <br />
            </Container>
            <Container>
                <StaffDisplayer resume={Ran} />
                <StaffDisplayer resume={Qianqian} />
                <StaffDisplayer resume={Zhaolong} />
            </Container>
            <br />
            <Container className=""><GMap /></Container>
            <br />
            <Container><EmailMsg /></Container>
            <br />
            <br />
        </AboutStyle>
    )
}