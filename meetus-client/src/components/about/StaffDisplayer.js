import React, { useEffect } from 'react';
import { Col,  Row } from 'react-bootstrap';
import styled from 'styled-components';
import themeList from '../header/themeList';

export default function StaffDisplayer({ resume }) {
    const StaffStyle = styled.div`
    .rmTitle{
        font-size:1.5rem;
        font-weight: bold;
        color: var(--mediumSlateBlue);
    }
    .profileImg{
        max-height:230px;
        max-width:200px;
    }
    .skillList{
        margin:0 5px;
        font-weight:bold;
    }
    .textThemeSwitch{
        color:${(props) =>
        props.theme.theme === themeList.light
            ? "var(--black)"
            : "var(--lightBlue_1)"};
    }

`
    const [show, setShow] = React.useState(false);
    // const [data,setData] = React.useState(resume);

    const handleClick = () => setShow(!show);

    // const skillList = resume.skills.split(",");
    // useEffect(() => {setData(resume.skills)}, [resume]);


    return (
        <StaffStyle>
            <Row className="events">
                <Col className="col-8">
                    <Row className="offset-1 mt-4 rmTitle">{resume.title}</Row>
                    <Row className="offset-1 eventTitle mt-4 textThemeSwitch">{resume.name}</Row>
                    <Row className="offset-2 mt-2 row textThemeSwitch">-- {resume.slogon}</Row>
                    <Row />
                    <br />
                    {show ? <button className="offset-1 float-start showBtn" onClick={handleClick}>skills</button> :
                        <button className="offset-1 float-start createBtn" onClick={handleClick}>skills</button>}
                    <br />
                    {show && <Row className="mt-2">
                        <Col className="offset-2 textThemeSwitch">

                            {/* {skillList} */}
                            {/* {typeof(resume.skills)} */}
                            <Row className="skillList">{resume.skill1}</Row>
                            <Row className="skillList">{resume.skill2}</Row>
                            <Row className="skillList">{resume.skill3}</Row>
                            <br/>
                        </Col>
                    </Row>}
                </Col>
                <Col><img src={resume.imageURL} alt="images" className="py-4 profileImg" /></Col>
            </Row>
        </StaffStyle>
    )
}
