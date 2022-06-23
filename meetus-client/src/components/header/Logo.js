import React from 'react'
import styled from 'styled-components';

const LogoStyle = styled.div`
    max-width:100px;
    img{
        width:100%;
        height:100%;
        object-fit: contain;
    }
`;


function Logo() {
  return (
    <LogoStyle>
        <img src="images/logo.png" alt="logo" />
    </LogoStyle>
  )
}

export default Logo