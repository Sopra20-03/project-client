import React from "react";
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

function Clues(props) {
    let colors = [Colors.blue, Colors.orange, Colors.violet, Colors.green];
        return (
            colors.map((color, index) => (
                (props.players[index] && props.players[index].role === 'GUESSER') ?
                    <GuesserContainer>
                        <HelpOutlineIcon style={{ fontSize: 60 , position: "relative",  bottom: 10, color: color}}/>
                    </GuesserContainer>
                : props.clues.length>0 ?
                <ClueCard
                    key={props.players[index] ? props.clues.find((x) => x.ownerId === props.players[index].playerId).clueId : index}
                    borderColor={color}
                    owner={props.players[index] ? props.clues.find((x) => x.ownerId === props.players[index].playerId).ownerId : 'bot'}
                    clue={props.players[index] ? props.clues.find((x) => x.ownerId === props.players[index].playerId).word : props.clues[index].word}
                /> :
                    <ClueCard key = {index} borderColor={color} clue={''}/>
                ))
        );

}


const mapStateToProps = (state) => ({
    lobbyState: state.lobbyReducer,
    gameState: state.gameplayReducer,
    userState: state.userReducer,
});

export default connect(mapStateToProps, {})(Clues);
