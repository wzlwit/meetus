import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import themeList from "../header/themeList";

export default function Aside() {
    const navigate = useNavigate()
    const handleClose = () => {
        navigate('/')
    }

    const AsideMenuStyles = styled.div`
        .top,.sidebar{
            background-color:${(props) =>
            props.theme.theme === themeList.light
            ? "var(--lightBlue_1)"
            : "var(--darkBlue_3)"};
        }
        h3{
            color:${(props) =>
            props.theme.theme === themeList.light
            ? "var(--darkBlue_4)"
            : "var(--lightBlue_1)"};
        }
    `;

    return (
        <AsideMenuStyles className="container">
            <aside>
                <div className="top">
                    <div className="logo">
                        <img src="./images/logo.png" alt="logo" />
                    </div>
                    <a className="close mr-3" id="close-btn" onClick={handleClose}>
                        <span className="material-icons-sharp">close</span>
                    </a>
                </div>
                <div className="sidebar">
                    <a href="#" className="active">
                        <span className="material-icons-sharp">grid_view</span>
                        <h3>DashBoard</h3>
                    </a>
                    <a href="/" className="">
                        <span className="material-icons-sharp">logout</span>
                        <h3>Logout</h3>
                    </a>

                </div>

            </aside>
        </AsideMenuStyles>
    )
}