import { createGlobalStyle } from "styled-components";

import "@fontsource/poppins";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import themeList from "./header/themeList";

const GlobalStyles = createGlobalStyle`
    :root{
        --darkBlue_1:#3b447a;
        --darkBlue_2:#222B5F;
        --darkBlue_3:#0a0f19;
        --darkBlue_4:#101826;
        --mediumSlateBlue:#6c62e2;
        --lightBlue_1:#f3f1fe;
        --lightBlue_2:#adbde3;
        --white:#ffffff;
        --black:#000000;

        --header-height:50px;
    }
    html{
        /* font-size:20px; */
    }
    body{
        background-color:${(props) =>
        props.theme.theme === themeList.light
            ? "var(--lightBlue_1)"
            : "var(--darkBlue_3)"};
        font-family:'Poppins',sans-serif;
    }
    *, *::after, *::before{
        margin:0;
        padding:0;
        box-sizing:border-box;
    }
    a{
        text-decoration:none;
        cursor:pointer;
    }
    user-select, li{
        list-style:none;
    }
    .containers{
        max-width:1200px;
        width:90%;
        margin:0 auto;
    }
    img , svg{
        width:100%;
        height:100%;
    }
    .events {
        border-top: 1px solid var(--mediumSlateBlue);
    }
    .eventTitle{
        font-weight: bold;
        margin-top:20px;
    }
    .eventTime{
    font-weight: bold;
    color: var(--mediumSlateBlue);
    }
    .createBtn{
        background-color: var(--lightBlue_1);
        color: var(--mediumSlateBlue);
        height:30px;
        font-size:0.8rem;
        font-weight:bold;
        padding:0 10px;
        border-radius:10px;
        border:1px solid var(--mediumSlateBlue);
    }
    .myCenter{
        // display:flex;
        justify-content:center;
    }
    .logobkg{
        background-image: url('images/logo.png')
    }
    .rmTitle{
        font-size:1.5rem;
        font-weight: bold;
        color: var(--mediumSlateBlue);
    }
`;

export default GlobalStyles;
