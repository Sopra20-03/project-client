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
            clueCards: [],
            opponents: [],
        };
    }

    componentDidMount() {
      console.log("Clues Mount");
        this.setupColors();
        this.setState({
            clueCards: this.props.clues.filter((x) => x.ownerId !== this.props.gameState.userId),
            opponents: this.props.players.filter((x) => x.userId !== this.props.gameState.userId),
        })
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
            return this.props.players.map((player, index) => {
                if (player.role === "GUESSER") {
                    return (
                        <div>
                            <GuesserContainer>
                                <HelpOutlineIcon style={{ fontSize: 60 , position: "relative",  bottom: 10}}/>
                            </GuesserContainer>
                        </div>
                    );
                }
                else {
                    return (
                        <ClueCard
                            key={this.props.clues[index].clueId}
                            borderColor={this.state.colors[index]}
                            owner={this.props.clues[index].ownerId}
                            clue={this.props.clues[index].word}
                        />
                    );
                }
            });
        }

        /*return this.props.clues.map((clue, index) => {
            //console.log(clue);
            //console.log(index);
            return (
                <ClueCard
                    key={clue.clueId}
                    borderColor={this.state.colors[index]}
                    clue={clue.word}
                />
            );
        });*/
    }
}


const mapStateToProps = (state) => ({
    lobbyState: state.lobbyReducer,
    gameState: state.gameplayReducer,
    userState: state.userReducer,
});

export default connect(mapStateToProps, {})(Clues);
