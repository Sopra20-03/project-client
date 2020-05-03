import React, { Component } from "react";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  border: 2px black solid;
  border-radius: 5px;
  background-color: white;
  align-items: center;
  margin: 2px;
  padding: 5px;
`;

export default class RoleInfo extends Component {
  render() {
    return (
      <div>
        <div>
          <Container>
            <h1 style={{ margin: "0px" }}>Your role:</h1>
            <h3 style={{ margin: "0px" }}>{this.props.role}</h3>
          </Container>
        </div>
      </div>
    );
  }
}
