import React from 'react';
import styled from '@emotion/styled';

const Background = styled('div')`
  background-color: #2396CE;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageWrapper = styled('img')`
  height: 100px;
  object-fit: cover;
`;

function App() {
    return (
        <Background>
            <ImageWrapper src="https://www.swikly.com/wp-content/uploads/2020/02/logo-swikly.png" alt="logo"/>
        </Background>
    );
}

export default App;
