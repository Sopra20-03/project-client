import React, {Component} from "react";
import ClueCard from "./ClueCard";
import Colors from "../../views/design/Colors/Colors";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
// Redux
import {connect} from "react-redux";
import styled from "styled-components";

export const GuesserContainer = styled.div`
  border-radius: 5px;
  padding: 5px;
  margin-top: 2rem;
  margin-left: 2rem;
  margin-right: 2rem;
  width: 7rem;
  height: 3rem;
`;

class Clues extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colors: [],
        };
    }

    componentDidMount() {
      console.log("Clues Mount");
        this.setupColors();
    }


    setupColors() {
        let colors = [];
        colors.push(Colors.blue);
        colors.push(Colors.orange);
        colors.push(Colors.violet);
        colors.push(Colors.green);
        this.setState({
            colors: colors,
        });
    }

    render() {
        if (this.props.players !== null && this.props.clues !== null)
        {
            return this.props.players.filter((x) => x.userId !== this.props.gameState.userId).map((player, index) => {
                if (player.role === "GUESSER") {
                    return (
                        <div>
                            <GuesserContainer>
                                <HelpOutlineIcon style={{ fontSize: 60 , position: "relative",  bottom: 10, color: this.state.colors[index]}}/>
                            </GuesserContainer>
                        </div>
                    );
                }
                else if (this.props.clues.find((x) => x.ownerId === player.playerId)){
                    return (
                        <ClueCard
                            key={this.props.clues.find((x) => x.ownerId === player.playerId).clueId}
                            borderColor={this.state.colors[index]}
                            owner={this.props.clues.find((x) => x.ownerId === player.playerId).ownerId}
                            clue={this.props.clues.find((x) => x.ownerId === player.playerId).word}
                        />
                    );
                }
            });
        }
    }
}


const mapStateToProps = (state) => ({
    lobbyState: state.lobbyReducer,
    gameState: state.gameplayReducer,
    userState: state.userReducer,
});

export default connect(mapStateToProps, {})(Clues);
