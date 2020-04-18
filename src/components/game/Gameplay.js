import React, { Component } from "react";
import styled from "styled-components";
import TimerInfo from "./TimerInfo";
import PointsInfo from "./PointsInfo";
import Table from "./Table";
import { api } from "../../helpers/api";
import { store } from "../../store";
import { BaseContainer, GameContainer } from "../../helpers/layout";
import Button from "../../views/design/Button";
import RolePopup from "./RolePopup";
import AllPlayerBoxes from "./AllPlayerBoxes";
import { SmallLogo } from "../../views/logos/SmallLogo";
import LogoutIcon from "../../views/design/LogoutIcon";

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
      opponents: [],
      loggedInPlayer: null,
      showRolePopup: false,
    };
  }

  toggleRolePopup() {
    this.setState({
      showRolePopup: !this.state.showRolePopup,
    });
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <BaseContainer>
          <GameContainer>
            <SmallLogo />
            <LogoutIcon />
            <div></div>

            <AllPlayerBoxes opponents={this.state.opponents} />

            <TableContainer>
              <Table
                player={this.state.loggedInPlayer}
                players={this.state.players}
              />
            </TableContainer>

            <InfoContainer>
              <PointsInfo />
              <Button
                onClick={() => {
                  this.toggleRolePopup();
                }}
              >
                Toggle Role
              </Button>
              {this.state.showRolePopup ? (
                <RolePopup
                  role={
                    this.state.loggedInPlayer.role !== null
                      ? this.state.loggedInPlayer.role
                      : "no role set yet"
                  }
                  closePopup={this.toggleRolePopup.bind(this)}
                />
              ) : null}
              <TimerInfo />
            </InfoContainer>
          </GameContainer>
        </BaseContainer>
      </div>
    );
  }
}
