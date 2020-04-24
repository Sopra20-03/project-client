import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import HistoryIcon from '@material-ui/icons/History';
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";


class GameHistoryIcon extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Button
        style={{
          size: "fit-content",
          display: "inline",
          fontSize: 30,
          position: "absolute",
          right: 80,
          top: 20,
        }}
        onClick={() => {
            this.props.history.push("/gamehistory");
        }}
      >
        <Tooltip disableFocusListener disableTouchListener title="Game History">
          <HistoryIcon style={{ fontSize: 30 }} />
        </Tooltip>
      </Button>
    );
  }
}

export default withRouter(GameHistoryIcon);
