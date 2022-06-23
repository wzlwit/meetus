import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Col, Container } from "react-bootstrap/esm";
import themeList from "./header/themeList";


const FooterStyles = styled.footer`
    background-color:${(props) =>
        props.theme.theme === themeList.light
            ? "var(--lightBlue_2)"
            : "var(--darkBlue_4)"};
    /* background-color:var(--lightBlue_2); */
    padding:3rem 0;
    .footerWrapper{
        text-align:center;
    }
    img{
        width:100px;
        height:50px;
    }
    p{
        color:${(props) =>
        props.theme.theme === themeList.light
            ? "var(--darkBlue_2)"
            : "var(--lightBlue_1)"};
        font-size:0.7rem;
    }
    .footerLinks{
        margin-bottom:2rem;
        li{
            display:inline-block;
            margin:0 1rem;
        }
        a{
            font-size:1.2rem;
            color:${(props) =>
            props.theme.theme === themeList.light
            ? "var(--darkBlue_2)"
            : "var(--lightBlue_1)"};
        }
        li:hover{
            a{
                color:var(--mediumSlateBlue);
                text-decoration:underline;
            }
        }
    }
`;

function Footer() {
    return (
        <FooterStyles>
            <div className="containers">
                <div className="footerWrapper">
                    <Container>
                        <Col md="auto"><Link to="home"><img src="images/logo.png" alt="logo" /></Link></Col>
                    </Container>
                    <p>
                        Whatever you’re looking to do this year, we can help.
                        <br />
                        Thousands of events are happening every day—join the fun.
                    </p>
                    <div className="footerLinks">
                        <ul>
                            <li>
                                <Link to="home">Home</Link>
                            </li>
                            <li>
                                <Link to="event">Event</Link>
                            </li>
                            <li>
                                <Link to="about">About Us</Link>
                            </li>
                        </ul>
                    </div>
                    <p className="footerCopyright">&copy;Dev Star 2022. All Copyrights Reserved.</p>
                </div>
            </div>
        </FooterStyles>
    );
}

export default Footer;
