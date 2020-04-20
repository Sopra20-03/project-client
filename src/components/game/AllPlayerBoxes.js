import React from "react";
import PlayerBox from "./PlayerBox";
import Colors from "../../views/design/Colors";
import { ContainerRow } from "./Gameplay";
import { store } from "../../store";

function AllPlayerBoxes(props) {
  let players = props.players.filter(
    (x) => x.userId !== store.getState().gameplayReducer.userId
  );
  let colors = [Colors.blue, Colors.orange, Colors.violet, Colors.green];
  let icons = ["female", "male", "female", "male"];
  return (
    <ContainerRow>
      {players.map((player, index) => (
        <PlayerBox
          key={player.userId}
          userName={player === null ? "empty" : player.userName}
          gender={icons[index]}
          borderColor={colors[index]}
        />
      ))}
    </ContainerRow>
  );
}

export default AllPlayerBoxes;
