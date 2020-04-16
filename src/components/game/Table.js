import React, {Component} from "react";
import styled from "styled-components";

import WordCard from "./WordCard";

import GuessCard from "./GuessCard";
import WhiteTextField from "./InputField";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import {api, handleError} from "../../helpers/api";
import {ContainerRow} from "./Gameplay";
import {store} from "../../store";
import Colors from "../../views/design/Colors";

export const GameTable = styled.div`
  display: flex;
  flex-direction: column;
  /**width: fit-content;
  height: fit-content;**/
  background-color: #F8F3EB;
  border-radius: 200px;
  border: 3px solid #CAB48A;
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  width: 850px;
  height: fit-content;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-bottom: 15px;
`;

export default class Table extends Component {

  constructor(props) {
    super(props);
    this.state = {
      guessInput: '',
      isGuessCorrect: '',
      showVerifyGuessPopup: false
    };
  }

  async submitGuess() {
    const state = store.getState();
    const gameId = state.gameId;
    const currentPlayer = this.props.state.loggedInPlayer.playerId;
    try {
      const requestBody = {
        word: this.state.guessInput,
      };
      const response = await api.post(`/games/${gameId}/players/${currentPlayer}/guess`, requestBody, {
        withCredentials: true,
      });
      this.setState({isGuessCorrect: response.data.isValid});
    } catch (error) {
      alert(`Something went wrong during the guess submission: \n${handleError(error)}`);
    }
  }

  handleInputChange(key, value) {
    this.setState({ [key]: value });
  }

  render() {

    return (
      <div>
        <GameTable>
          <ContainerRow>
            <GuessCard borderColor={Colors.blue} />
            <GuessCard borderColor={Colors.orange} />
            <GuessCard borderColor={Colors.violet} />
            <GuessCard borderColor={Colors.green} />
          </ContainerRow>
          <ContainerRow style={{justifyContent: "center"}}>
            <WordCard/>
          </ContainerRow>
          <ContainerRow style={{justifyContent: "center"}}>
            <WhiteTextField
                label="Guess here..."
                variant="filled"
                id="guess"
                onChange={(e) => {
                  this.handleInputChange("guessInput", e.target.value);
                }}
            />
            <CheckCircleOutlineIcon style={{ fontSize: 60, color: Colors.green }} onClick={() => {
              this.submitGuess()
            }}></CheckCircleOutlineIcon>
          </ContainerRow>
        </GameTable>



      </div>

    );
  }
}
