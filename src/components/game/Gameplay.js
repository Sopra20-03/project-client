import React, {Component} from "react";
import styled from "styled-components";
import TimerInfo from "./TimerInfo";
import PointsInfo from "./PointsInfo";
import Table from "./Table";
import {api} from "../../helpers/api";
import {store} from "../../store";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
  border-radius: 5px;
  border: 2px solid black;
  min-width: fit-content;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;


export default class Gameplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: 1, // FIXME GameID needs to be rendered dynamically
      userId: null,
      players: [],
      loggedInPlayer: null
    }
  }

  componentDidMount() {
    const userId = store.getState().userReducer.user.id;
    this.setState({
      userId: userId
    });
    api.get(`/games/${this.state.gameId}/players`, {
      withCredentials: true,
    })
      .then(result => {
        let players = [];
        result.data.forEach((element) => {
          console.log(element);
          players.push(element);
          if (element.userId === this.state.userId) {
            console.log(true);
            this.setState({
              loggedInPlayer: element
            })
          }
        });
        this.setState({
          players: players
        })
      })
      .catch(error => {
          console.log(error);
          alert(`Couldn't load players. \n${error}`);
        }
      );
  }

  render() {
    return (
      <div>
        <Container>
          <div></div>
          <TableContainer>
            <Table player={this.state.loggedInPlayer}/>
          </TableContainer>

          <InfoContainer>
            <PointsInfo/>
            <div></div>
            <TimerInfo/>
          </InfoContainer>
        </Container>
      </div>
    );
  }
}
