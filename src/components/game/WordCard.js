import React from "react";
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

function WordCard(props) {
  let words = props.wordCard;
    return (
      <div>
        <CardContainer>
          <Word style={{border: `2px solid ${Colors.blue}`}}>
            {words.word1}
          </Word>
          <Word style={{border: `2px solid ${Colors.green}`}}>
            {words.word2}
          </Word>
          <Word style={{border: `2px solid ${Colors.red}`}}>
            {words.word3}
          </Word>
          <Word style={{border: `2px solid ${Colors.orange}`}}>
            {words.word4}
          </Word>
          <Word style={{border: `2px solid ${Colors.yellow}`}}>
            {words.word5}
          </Word>
        </CardContainer>
      </div>
    );
  }

export default WordCard;
