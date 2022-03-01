import React from "react";
import styled from "styled-components";

const InputField = () => {
  return (
    <StyledInput>
      <input type="input" placeholder="Enter a Task" />
      <button type="submit">Go</button>
    </StyledInput>
  );
};

const StyledInput = styled.form`
  display: flex;
  width: 90%;
  position: relative;
  align-items: center;

  input {
    width: 100%;
    border-radius: 50px;
    padding: 1em 2em;
    font-size: 1.5em;
    border: none;
    transition: 0.2s;
    box-shadow: inset 0 0 5px black;

    &:focus {
      outline: none;
      box-shadow: 0 0 10px 1000px rgba(0, 0, 0, 0.5);
    }
  }
  button {
    position: absolute;
    width: 50px;
    height: 50px;
    margin: 1em;
    border-radius: 50px;
    border: none;
    background-color: #2f74c0;
    color: #fff;
    transition: 0.2s all;
    box-shadow: 0 0 10px #000;

    &:hover {
      background-color: #388ae2;
    }
    &:active {
      transform: scale(0.9);
      box-shadow: 0 0 5px #000;
    }
  }
`;

export default InputField;
