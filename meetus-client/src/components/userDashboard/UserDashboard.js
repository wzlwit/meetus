import { Button, Col, InputGroup, FormLabel, Row } from 'react-bootstrap';
import Aside from './Aside';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { LoggedInContext } from '../../App';
import { useNavigate } from "react-router-dom";

import './UserDashboard.css';
import ThemeSwitcher from '../header/ThemeSwitcher';
import TotalCard from './TotalCard';
import styled from 'styled-components';
import themeList from '../header/themeList';

export default function UserDashboard() {
    const url = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";
    const navigate = useNavigate()
    const {
        login: [isLoggedIn, setIsLoggedIn],
        user: [user, setUser],
    } = useContext(LoggedInContext);

    const [events, setEvents] = useState([])
    const [attended, setAttended] = useState(0)
    const [created, setCreated] = useState(0)

    const [comments, setComments] = useState([])
    const [cmtNum, setCmtNum] = useState(0)

    const [edited, setEdited] = useState(false)

    const usernameRef = useRef();
    const passwordRef = useRef();
    const emailRef = useRef();
    const descriptionRef = useRef();
    const btnList = ['username', 'password', 'email', 'description']

    const [unDisabled, setUndisabled] = useState(false)

    useEffect(() => {
        fetch(url + "/events", { method: "GET" }).then(data => data.json()).then(json => {
            setEvents(json)
        })
    }, [])

    useEffect(() => {
        fetch(url + "/comments", { method: "GET" }).then(data => data.json()).then(json => {
            setComments(json)
        })
    }, []);

    useEffect(() => {
        setAttended(events.filter(ele => ele.user.includes(user._id)).length)
        setCreated(events.filter(ele => ele.user[0] == user._id).length)
    }, [events]);

    useEffect(() => {
        // setCmtNum(comments.filter(ele =>ele.user.includes(user._id)).length)
        setCmtNum(comments.filter(ele => ele.user = user._id).length)
    }, [comments]);

    if (!isLoggedIn) {
        // alert('You must login or register to view Dashboard!'); //removed, otherwise, there will be too many alerts
        navigate('/')
    }

    var editCount = 0;
    const handleEdit = (event) => {
        event.preventDefault();
        const eleName = event.target.value
        // console.log(eleName)

        var ele = document.getElementById(eleName);
        ele.disabled = !ele.disabled;

        if (ele.disabled) {
            ele.value = '';
            event.target.innerText = 'edit';
            editCount--;
        } else {
            event.target.innerText = 'cancel';
            editCount++;
        }

        if ((!ele.value) && eleName !== 'password') { ele.value = user[eleName]; }

        if (editCount === 0) { setEdited(false) } else { setEdited(true) }

        ele.focus();


    }


    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(url + '/update', {
            method: 'PATCH',
            body: JSON.stringify({
                _id: user._id,
                username: usernameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
                description: descriptionRef.current.value,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((data) => data.json())
            .then((json) => {
                if (json.success) {
                    setUser(json.user)
                } else {
                    alert(json.msg);
                }
            }
            );
    }


    const DashboardStyles = styled.form`
        .textThemeSwitch{
            color:${(props) =>
            props.theme.theme === themeList.light
                ? "var(--darkBlue_3)"
                : "var(--lightBlue_1)"};
        font-family:'Poppins',sans-serif;
        }
    `;

    return (
        <>
            <DashboardStyles>
                <Row>
                    <Col className="col-3">
                        <Aside />
                    </Col>
                    <Col>
                        {/* <br /> */}
                        <Row className="mt-3 offset-2 flex-space float">
                            <Col><h1 className='textThemeSwitch text-start'>DashBoard</h1></Col>
                            <Col><ThemeSwitcher /></Col>
                        </Row>
                        <br />
                        <br />
                        <Row className="mt-10">
                            <Col className="col-3"><TotalCard item="My Created Events" total={created} /></Col>
                            <Col className="col-3"><TotalCard item="Total Comments" total={cmtNum} /></Col>
                            <Col className="col-3"><TotalCard item="Attended Events" total={attended} /></Col>
                        </Row>
                        <br />
                        <Row>
                            <Col className='col-3 text-center'><img src={user.photoURL} alt="images" className="py-4 profileImg" />
                                {/* <Button className="createBtn">change photo</Button> */}
                            </Col>
                            <Col className='m-5 col-6'>
                                <br />
                                <form>
                                    <Row>
                                        <label className='m-2 col-2 textThemeSwitch' htmlFor='username'>Username</label>
                                        <input className='m-2 col-6' id='username' type='text' ref={usernameRef} disabled placeholder={user.username} />
                                        <button className='m-2 col-2 createBtn' value='username' onClick={handleEdit}>edit</button>
                                    </Row>
                                    <Row>
                                        <label className='m-2 col-2 textThemeSwitch' htmlFor='password'>Password</label>
                                        <input className='m-2 col-6' id='password' type='password' ref={passwordRef} disabled placeholder='*******' />
                                        <button className='m-2 col-2 createBtn' value='password' onClick={handleEdit}> edit</button>
                                    </Row>
                                    <Row>
                                        <label className='m-2 col-2 textThemeSwitch' htmlFor='email'>Email</label>
                                        <input className='m-2 col-6' id='email' type='text' ref={emailRef} disabled placeholder={user.email} />
                                        <button className='m-2 col-2 createBtn' value='email' onClick={handleEdit}> edit</button>
                                    </Row>
                                    <Row>
                                        <label className='m-2 col-2 textThemeSwitch' htmlFor='description'>About me</label>
                                        <textarea className='m-2 col-6' id='description' type='text' ref={descriptionRef} disabled placeholder={user.description} />
                                        <button className='m-2 col-2 createBtn' value='description' onClick={handleEdit}> edit</button>
                                    </Row>
                                    <Row className='m-2 text-center'>

                                        {edited && <button className="offset-4 col-2 createBtn" onClick={handleSubmit}>update</button>}
                                    </Row>

                                </form>
                            </Col>
                        </Row>
                    </Col>
                </Row >
            </DashboardStyles>
        </>
    )
}