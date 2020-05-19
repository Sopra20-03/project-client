import React, { Component } from "react";
import styled from "styled-components";
import Colors from "../../views/design/Colors";
//Redux Imports
import { connect } from "react-redux";
import { guesserSelectWord } from "../../redux/actions/gameplayActions";
import { store } from "../../store";

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
`;

export const WordHover = styled.div`
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

function Guesser(props) {
  async function SelectWord(word) {
    console.log(word);
    const data = {
      gameId: props.gameState.gameId,
      roundNum: props.gameState.roundNum,
      selectedWord: word,
    };

    await props.guesserSelectWord(data);
  }

  let words = props.gameState.round.wordCard;

  //TODO: Word is not yet selected
  if (words.selectedWord == null) {
    return (
      <div>
        <CardContainer>
          <WordHover
            theme={Colors.blue}
            onClick={() => SelectWord(words.word1)}
          >
            Word 1
          </WordHover>
          <WordHover
            theme={Colors.green}
            onClick={() => SelectWord(words.word2)}
          >
            Word 2
          </WordHover>
          <WordHover theme={Colors.red} onClick={() => SelectWord(words.word3)}>
            Word 3
          </WordHover>
          <WordHover
            theme={Colors.orange}
            onClick={() => SelectWord(words.word4)}
          >
            Word 4
          </WordHover>
          <WordHover
            theme={Colors.yellow}
            onClick={() => SelectWord(words.word5)}
          >
            Word 5
          </WordHover>
        </CardContainer>
      </div>
    );
  }
  //TODO: Word is already selected
  else {
    return (
      <div>
        <CardContainer>
          <Word
            theme={Colors.blue}
            style={{
              backgroundColor:
                props.gameState.round.wordCard.selectedWord === words.word1
                  ? Colors.blue
                  : "",
            }}
          >
            Word 1
          </Word>
          <Word
            theme={Colors.green}
            style={{
              backgroundColor:
                props.gameState.round.wordCard.selectedWord === words.word2
                  ? Colors.green
                  : "",
            }}
          >
            Word 2
          </Word>
          <Word
            theme={Colors.red}
            style={{
              backgroundColor:
                props.gameState.round.wordCard.selectedWord === words.word3
                  ? Colors.red
                  : "",
            }}
          >
            Word 3
          </Word>
          <Word
            theme={Colors.orange}
            style={{
              backgroundColor:
                props.gameState.round.wordCard.selectedWord === words.word4
                  ? Colors.orange
                  : "",
            }}
          >
            Word 4
          </Word>
          <Word
            theme={Colors.yellow}
            style={{
              backgroundColor:
                props.gameState.round.wordCard.selectedWord === words.word5
                  ? Colors.yellow
                  : "",
            }}
          >
            Word 5
          </Word>
        </CardContainer>
      </div>
    );
  }
}

function ClueWriter(props) {
  let words = props.gameState.round.wordCard;

  if (words.selectedWord == null) {
    //Word Not Yet Selected
    return (
      <div>
        <CardContainer>
          <Word theme={Colors.blue}>{words.word1}</Word>
          <Word theme={Colors.green}>{words.word2}</Word>
          <Word theme={Colors.red}>{words.word3}</Word>
          <Word theme={Colors.orange}>{words.word4}</Word>
          <Word theme={Colors.yellow}>{words.word5}</Word>
        </CardContainer>
      </div>
    );
  } else {
    //Word is selected
    return (
      <div>
        <CardContainer>
          <Word
            theme={Colors.blue}
            style={{
              backgroundColor:
                props.gameState.round.wordCard.selectedWord === words.word1
                  ? Colors.blue
                  : "",
            }}
          >
            {words.word1}
          </Word>
          <Word
            theme={Colors.green}
            style={{
              backgroundColor:
                props.gameState.round.wordCard.selectedWord === words.word2
                  ? Colors.green
                  : "",
            }}
          >
            {words.word2}
          </Word>
          <Word
            theme={Colors.red}
            style={{
              backgroundColor:
                props.gameState.round.wordCard.selectedWord === words.word3
                  ? Colors.red
                  : "",
            }}
          >
            {words.word3}
          </Word>
          <Word
            theme={Colors.orange}
            style={{
              backgroundColor:
                props.gameState.round.wordCard.selectedWord === words.word4
                  ? Colors.orange
                  : "",
            }}
          >
            {words.word4}
          </Word>
          <Word
            theme={Colors.yellow}
            style={{
              backgroundColor:
                props.gameState.round.wordCard.selectedWord === words.word5
                  ? Colors.yellow
                  : "",
            }}
          >
            {words.word5}
          </Word>
        </CardContainer>
      </div>
    );
  }
}

class WordCard extends Component {
  componentDidMount() {
    console.log("WordCard Mount");
  }

  render() {
    if (
      this.props.gameState.round == null ||
      this.props.gameState.round.wordCard == null ||
      this.props.gameState.role == null
    ) {
      return <h1>Loading..</h1>;
    }

    //TODO: Check actual role
    if (this.props.gameState.role === "GUESSER") {
      //if (role == 1) {
      return (
        <Guesser
          guesserSelectWord={this.props.guesserSelectWord}
          gameState={this.props.gameState}
        />
      );
    } else {
      return <ClueWriter gameState={this.props.gameState} />;
    }
  }
}

const mapStateToProps = (state) => ({
  lobbyState: state.lobbyReducer,
  gameState: state.gameplayReducer,
  userState: state.userReducer,
});

export default connect(mapStateToProps, { guesserSelectWord })(WordCard);
