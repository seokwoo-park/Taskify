import React from "react";
import styled from "styled-components";
import { InputField } from "./components/index";

type Props = {};

const App = (props: Props) => {
  return (
    <Container>
      <Header>Taskify</Header>
      <InputField />
    </Container>
  );
};

const Container = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Neucha&display=swap");

  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2f74c0;
  font-family: "Neucha", cursive;
`;

const Header = styled.header`
  text-transform: uppercase;
  font-size: 2.5em;
  margin: 2em 0;
  color: #fff;
  text-align: center;
  z-index: 1;

  @media (max-width: 768px) {
    margin: 1em 0;
    font-size: 2em;
  }
`;

export default App;
