import React from "react";
import styled from "styled-components";
import {BaseContainer, GameContainer} from "../../helpers/layout";
import {api, handleError} from "../../helpers/api";
import {withRouter} from "react-router-dom";
import LeaderboardTable from "./LeaderboardTable";
import Colors from "../../views/design/Colors";
import {SmallLogo} from "../../views/logos/SmallLogo";
import PacmanLoader from "react-spinners/PacmanLoader";
import {ContainerRow} from "../game/Gameplay";
import {BoxHeader} from "../lobby/Lobby";
import {errorNotification} from "../../helpers/notifications/toasts";

import Button from "../../views/design/Button";
import Grid from "@material-ui/core/Grid";
import MenuBar from "../../views/design/Menu/MenuBar";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

class Leaderboard extends React.Component {
  constructor() {
    super();
    this.state = {
      sortedUsers: [],
    };
  }

  componentDidMount() {
    this.timer = setInterval(async () => await this.getUsers(), 3000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  //getUsers
  async getUsers() {
    console.log("***API CALL - GET USERS***");
    try {
      const response = await api.get("/users", { withCredentials: true });
      this.setState({
        sortedUsers: response.data.sort(
          (a, b) => b.totalIndividualScore - a.totalIndividualScore
        ),
      });
      console.log("Sorted users: ", this.state.sortedUsers);
    } catch (error) {
      errorNotification(
        `Something went wrong while fetching the users: \n${handleError(error)}`
      );
    }
  }

  render() {
    return (
      <Container>
        <GameContainer>
          <SmallLogo />
          <Grid container justify={"center"}>
            <MenuBar/>
            <Grid container alignItems="center" justify={"center"}>
              <Grid item sm={8} md={8} lg={8}>
                <BoxHeader>
                  <span style={Colors.textOrange}>L</span>
                  <span style={Colors.textRed}>e</span>
                  <span style={Colors.textPink}>a</span>
                  <span style={Colors.textViolet}>d</span>
                  <span style={Colors.textBlue}>e</span>
                  <span style={Colors.textGreen}>r</span>
                  <span style={Colors.textYellow}>b</span>
                  <span style={Colors.textBlack}>o</span>
                  <span style={Colors.textOrange}>a</span>
                  <span style={Colors.textRed}>r</span>
                  <span style={Colors.textPink}>d</span>
                </BoxHeader>
              </Grid>
            </Grid>
          </Grid>

          {this.state.sortedUsers.length < 1 ? (
            <ContainerRow style={{ margin: 30 }}>
              <PacmanLoader />
            </ContainerRow>
          ) : (
            <LeaderboardTable users={this.state.sortedUsers} />
          )}
          <Button
            onClick={() => {
              this.props.history.push(`/lobby`);
            }}
          >
            Back to Lobby
          </Button>
        </GameContainer>
      </Container>
    );
  }
}

export default withRouter(Leaderboard);
