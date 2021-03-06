import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import HomeIcon from "@material-ui/icons/Home";
import {withRouter} from "react-router-dom";
import Button from "@material-ui/core/Button";

class LobbyIcon extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Button
        style={{
          size: "fit-content",
          display: "inline",
        }}
        onClick={() => {
          this.props.history.push("/lobby");
        }}
      >
        <Tooltip disableFocusListener disableTouchListener title="Lobby">
          <HomeIcon style={{ fontSize: 30 }} />
        </Tooltip>
      </Button>
    );
  }
}

export default withRouter(LobbyIcon);
