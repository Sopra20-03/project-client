import React, { Component } from "react";

import styled from "styled-components";

export const CardContainer = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 5px;
  margin-top: 2rem;
  margin-left: 2rem;
  margin-right: 2rem;
  width: 7rem;
  height: 3rem;
`;

export default class ClueCard extends Component {
  render() {
    return (
      <div>
        <CardContainer style={{border: `2px solid ${this.props.borderColor}`}}/>
      </div>
    );
  }
}
