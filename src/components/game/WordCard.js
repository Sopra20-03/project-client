import React, { Component } from "react";
import styled from "styled-components";
import Colors from "../../views/design/Colors";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: 20 rem;
  background-color: white;
  border-radius: 5px;
  border: 2px solid black;
  margin: 2rem;
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.25);
  padding: 0.5rem;
  justify-content: center;
`;

export const Word = styled.div`
  display: flex;
  direction: row;
  justify-content: center;
  border-radius: 5px;
  margin: 2px;
  font-size: 20px;
  width: 12rem;
  text-transform: uppercase;
`;

export default class WordCard extends Component {
  render() {
    return (
      <div>
        <CardContainer>
          <Word style={{border: `2px solid ${Colors.blue}`}}>
            jackson
          </Word>
          <Word style={{border: `2px solid ${Colors.green}`}}>
            CIGARETTE
          </Word>
          <Word style={{border: `2px solid ${Colors.red}`}}>
            BRACELET
          </Word>
          <Word style={{border: `2px solid ${Colors.orange}`}}>
            WEATHER FORCAST
          </Word>
          <Word style={{border: `2px solid ${Colors.yellow}`}}>
            TOWER
          </Word>
        </CardContainer>
      </div>
    );
  }
}
