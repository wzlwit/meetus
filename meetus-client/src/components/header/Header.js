import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "./Logo";
import ThemeSwitcher from "./ThemeSwitcher";
import { FiMenu, FiX } from "react-icons/fi";
import themeList from "./themeList.js";
import Register from "./Register";
import Login from "./Login";

const HeaderStyle = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  background-color: ${(props) =>
    props.theme.theme === themeList.light
      ? "var(--lightBlue_1)"
      : "var(--darkBlue_3)"};
  border-bottom: 1px solid var(--mediumSlateBlue);

  .navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* margin-bottom: 50px; */
  }

  .navMenu {
    display: block;
    margin: 0 auto;
  }

  nav ul li {
    display: inline-block;
    margin: 0 0.5rem;
    a {
      font-size: 1rem;
      font-weight: 500;
      display: inline-block;
      padding: 0.5rem 1rem;
      color: ${(props) =>
        props.theme.theme === themeList.light
          ? "var(--darkBlue_2)"
          : "var(--lightBlue_1)"};
    }
    &:hover {
      a {
        text-decoration: underline;
      }
    }
  }
  .navMenu {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .menuIcon,
  .closeIcon {
    width: 30px;
    height: 30px;
    cursor: pointer;
    margin-left: 10px;
    padding: 3px;
    svg {
      color: ${(props) =>
        props.theme.theme === themeList.light
          ? "var(--darkBlue_2)"
          : "var(--lightBlue_1)"};
    }
    &:hover {
      background-color: #8080803b;
    }
  }
  .closeIcon {
    position: absolute;
    right: 10px;
    top: 10px;
    &:hover {
      svg {
        color: var(--white);
      }
    }
  }
  @media only screen and (max-width: 768px) {
    nav {
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: fixed;
      width: 90%;
      max-width: 250px;
      top: 0;
      right: 0%;
      background-color: ${(props) =>
        props.theme.theme === themeList.light
          ? "var(--lightBlue_2)"
          : "var(--darkBlue_4)"};
      height: 100vh;
      z-index: 100;
      transform: translateX(100%);
      transition: 0.3s ease transform;
      overflow: hidden;
    }
    nav.open {
      transform: translateX(0);
    }
    nav ul li {
      display: block;
      text-align: right;
      width: 100%;
      margin: 0.5rem 0;
      a {
        display: block;
        width: 100%;
      }
    }
  }
  #loginBtn {
    background-color: var(--lightBlue_1);
    color: var(--mediumSlateBlue);
    height: 30px;
    font-size: 0.8rem;
    font-weight: bold;
    padding: 0 10px;
    /* border-radius:10px; */
    border: 1px solid var(--mediumSlateBlue);
  }
`;

function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 768px)").matches
  );

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    });
  }, []);

  return (
    <HeaderStyle>
      <div className="containers">
        <div className="navigation">
          <Logo />
          <div className="navMenu">
            <nav className={isMobile && isNavOpen ? "open" : undefined}>
              {isMobile && (
                <div
                  className="closeIcon"
                  tabIndex="0"
                  role="button"
                  onClick={() => setIsNavOpen(false)}
                  onKeyDown={() => setIsNavOpen(false)}
                >
                  <FiX />
                </div>
              )}
              <ul >
                <li className="mt-2">
                  <Link to="home">Home</Link>
                </li>
                <li>
                  <Link to="event">Event</Link>
                </li>
                <li>
                  <Link to="about">About Us</Link>
                </li>
              </ul>
            </nav>
          </div>
          <Register/>
          <Login/>
          <ThemeSwitcher />
          {isMobile && (
            <div
              className="menuIcon"
              tabIndex="0"
              role="button"
              onClick={() => setIsNavOpen(true)}
              onKeyDown={() => setIsNavOpen(true)}
            >
              <FiMenu />
            </div>
          )}
        </div>
      </div>
    </HeaderStyle>
  );
}

export default Header;
