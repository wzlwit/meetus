import React, { useRef, useState } from 'react';
import { InputGroup, Row } from 'react-bootstrap';
import styled from 'styled-components';

export default function LoginForm() {
    const url = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";
    // console.log("url used: " + url);

    const [msgSent, setMsgSent] = useState(false);

    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const subjectRef = useRef();
    const msgRef = useRef();

    const FormStyles = styled.div`
        input,textarea{
            border: 1px solid var(--mediumSlateBlue);
        }
    `;

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log("url used: " + url);


        // fetch(`${url}/users/login`, {
        fetch(url + '/contacts', {
            method: 'POST',
            body: JSON.stringify({
                name: nameRef.current.value,
                email: emailRef.current.value,
                phone: phoneRef.current.value,
                subject: subjectRef.current.value,
                msg: msgRef.current.value,
                date: new Date().toISOString(),
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((data) => data.json())
            .then((json) => {
                if (json.success) {
                    setMsgSent(true)
                } else {

                    setMsgSent(false);
                    alert(json.msg);
                }
            }
            );
    };

    return (
        <FormStyles>
            <form onSubmit={handleSubmit}>
                {msgSent && <Row className='offset-1 float-start myCenter'>message sent successfuly!</Row>}
                <InputGroup >
                    <input className='col-5 mt-2 m-1 p-1' type='text' ref={nameRef} required placeholder='Your Name*' />
                    <input className='col-5 mt-2 m-1 p-1' type='email' ref={emailRef} required placeholder='Your Email*' />
                    <input className='col-5 mt-2 m-1 p-1' type='text' ref={phoneRef} placeholder='Phone Number' />
                    <input className='col-5 mt-2 m-1 p-1' type='text' ref={subjectRef} placeholder='Subject' />
                    <textarea className='col-10 mt-2 mb-3 m-1 p-1' type='text' ref={msgRef} placeholder='Your Message' />
                </InputGroup>
                <button className='float-start searchBtn mt=6' type='submit'>Send Message</button>
            </form >
        </FormStyles>

    );
}