import React, { Component } from "react";

import styled from "styled-components";

import usermale from "../../views/logos/user_male.png";
import userfemale from "../../views/logos/user_female.png";

export const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 7rem;
  background-color: white;
  border-radius: 5px;
  border: 2px solid black;
  padding: 5px;
  margin-top: 2rem;
  margin-left: 3rem;
  margin-right: 3rem;
`;

export default class PlayerBox extends Component {
  render() {
    return (
      <div>
        <PlayerContainer>
          <img src={usermale} height="60rem" width="50rem" />
          <h4 style={{ margin: "0" }}>Player Name</h4>
        </PlayerContainer>
      </div>
    );
  }
}
