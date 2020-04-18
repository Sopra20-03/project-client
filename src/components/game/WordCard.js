import React, { Component } from "react";
import styled from "styled-components";
import Colors from "../../views/design/Colors";
//Redux
import { connect } from "react-redux";
import { guesserSelectWord } from "../../redux/actions/gameplayActions";

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
  transition: 0.3s;
  border: 2px solid ${(props) => props.theme};

  &:hover {
    background-color: ${(props) => props.theme};
    cursor: pointer;
  }
`;
//TODO: Get Role for loggedIn User for Each round
const role = 1;

function Guesser(props) {
  async function SelectWord(word) {
    console.log(word);
    const data = {
      gameId: 1,
      roundId: 1,
      selectedWord: word,
    };

    await props.guesserSelectWord(data);
  }

  let words = props.wordCard;
  return (
    <div>
      <CardContainer>
        <Word theme={Colors.blue} onClick={() => SelectWord(words.word1)}>
          Word 1
        </Word>
        <Word theme={Colors.red} onClick={() => SelectWord(words.word2)}>
          Word 2
        </Word>
        <Word theme={Colors.yellow} onClick={() => SelectWord(words.word3)}>
          Word 3
        </Word>
        <Word theme={Colors.green} onClick={() => SelectWord(words.word4)}>
          Word 4
        </Word>
        <Word theme={Colors.orange} onClick={() => SelectWord(words.word5)}>
          Word 5
        </Word>
      </CardContainer>
    </div>
  );
}

function ClueWriter(props) {
  let words = props.wordCard;
  return (
    <div>
      <CardContainer>
        <Word theme={Colors.blue}>{words.word1}</Word>
        <Word theme={Colors.red}>{words.word2}</Word>
        <Word theme={Colors.yellow}>{words.word3}</Word>
        <Word theme={Colors.green}>{words.word4}</Word>
        <Word theme={Colors.orange}>{words.word5}</Word>
      </CardContainer>
    </div>
  );
}

class WordCard extends Component {
  render() {
    let words = this.props.wordCard;

    //TODO: Check actual role
    if (role == 1) {
      return (
        <Guesser
          wordCard={words}
          guesserSelectWord={this.props.guesserSelectWord}
        />
      );
    } else {
      return <ClueWriter wordCard={words} />;
    }
  }
}

export default connect(null, { guesserSelectWord })(WordCard);
