import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
//Redux
import { connect } from "react-redux";
import { logoutUser } from "../../../redux/actions/userActions";
import { errorNotification } from "../../../helpers/notifications/toasts";
import { handleError } from "../../../helpers/api";

class LogoutIcon extends React.Component {
  constructor() {
    super();
  }

  async logout() {
    try {
      let data = {
        isUserCreator: this.props.lobbyState.isUserCreator,
        userId: this.props.userState.user.id,
        gameId: this.props.lobbyState.gameId,
      };
      if (this.props.lobbyState.joinedGame != null) {
        await this.props.logoutUser(true, data);
      } else {
        await this.props.logoutUser(false, data);
      }
      this.props.history.push("/login");
    } catch (e) {
      errorNotification(handleError(e));
    }
  }

  render() {
    return (
      <Button
        style={{
          size: "fit-content",
          display: "inline",
        }}
        onClick={() => {
          this.logout();
        }}
      >
        <Tooltip disableFocusListener disableTouchListener title="Logout">
          <ExitToAppIcon style={{ fontSize: 30 }} />
        </Tooltip>
      </Button>
    );
  }
}

const mapStateToProps = (state) => ({
  lobbyState: state.lobbyReducer,
  userState: state.userReducer,
});

export default withRouter(connect(mapStateToProps, { logoutUser })(LogoutIcon));
