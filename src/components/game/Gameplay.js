import React, {Component} from "react";
import styled from "styled-components";
import TimerInfo from "./TimerInfo";
import PointsInfo from "./PointsInfo";
import Table from "./Table";
import {api} from "../../helpers/api";
import {store} from "../../store";
import {BaseContainer, GameContainer} from "../../helpers/layout";
import PlayerBox from "./PlayerBox";
import Button from "../../views/design/Button";
import RolePopup from "./RolePopup";
import Colors from "../../views/design/Colors/Colors";


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

export const ContainerRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;


export default class Gameplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: store.getState().lobbyReducer.gameId,
      userId: store.getState().userReducer.user.id,
      players: [],
      loggedInPlayer: null,
      showRolePopup: false,
    }
  }

    toggleRolePopup() {
        this.setState({
            showRolePopup: !this.state.showRolePopup
        });
    }

  componentDidMount() {
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
        <BaseContainer>
            <GameContainer>
              <div></div>

              <ContainerRow>
                <PlayerBox userName={'test'} borderColor={Colors.blue} />
                <PlayerBox userName={'test'} borderColor={Colors.orange} />
                <PlayerBox userName={'test'} borderColor={Colors.violet} />
                <PlayerBox userName={'test'} borderColor={Colors.green} />
              </ContainerRow>

              <TableContainer>
                <Table player={this.state.loggedInPlayer} players={this.state.players}/>
              </TableContainer>

              <InfoContainer>
                  <PointsInfo/>
                  <Button onClick={() => {
                      this.toggleRolePopup()
                  }}>Toggle Role</Button>
                  {this.state.showRolePopup ?
                      <RolePopup role={this.props.player.role} closePopup={this.toggleRolePopup.bind(this)}/> : null}
                  <TimerInfo/>
              </InfoContainer>

            </GameContainer>
        </BaseContainer>
      </div>
    );
  }
}
