import React, { Component } from "react";

import styled from "styled-components";

export const CardContainer = styled.div`
  background-color: white;
  border-radius: 5px;
  border: 2px solid black;
  padding: 5px;
  margin-top: 2rem;
  margin-left: 3rem;
  margin-right: 3rem;
  width: 7rem;
  height: 3rem;
`;

export default class GuessCard extends Component {
  render() {
    return (
      <div>
        <CardContainer></CardContainer>
      </div>
    );
  }
}
