import React, {Component} from "react";
import styled from "styled-components";

import WordCard from "./WordCard";

import PlayerBox from "./PlayerBox";
import GuessCard from "./GuessCard";
import Button from "../../views/design/Button";
import RolePopup from "./RolePopup";
import WhiteTextField from "./InputField";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import {api, handleError} from "../../helpers/api";
import {fade, makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {store} from "../../store";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: fit-content;
  background-color: #00a839;
  border-radius: 100px;
  border: 2px solid black;
`;

export const ContainerRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export default class Table extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showRolePopup: false,
      guessInput: '',
      isGuessCorrect: '',
      showVerifyGuessPopup: false
    };
  }

  toggleRolePopup() {
    this.setState({
      showRolePopup: !this.state.showRolePopup
    });
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
        <Container>
          <ContainerRow>
            <PlayerBox/>
            <PlayerBox/>
            <PlayerBox/>
            <PlayerBox/>
          </ContainerRow>

          <ContainerRow>
            <GuessCard/>
            <GuessCard/>
            <GuessCard/>
            <GuessCard/>
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
            <CheckCircleOutlineIcon style={{ fontSize: 60 }} onClick={() => {
              this.submitGuess()
            }}></CheckCircleOutlineIcon>
          </ContainerRow>


          <ContainerRow style={{justifyContent: "center"}}>
          <Button onClick={() => {
            this.toggleRolePopup()
          }}>Toggle Role</Button>
          {this.state.showRolePopup ?
          <RolePopup role={this.props.player.role} closePopup={this.toggleRolePopup.bind(this)}/> : null}
        </ContainerRow>

        </Container>
      </div>

    );
  }
}
