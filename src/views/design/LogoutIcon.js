import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
//Redux
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/userActions";

class LogoutIcon extends React.Component {
  constructor() {
    super();
  }

  async logout() {
    await this.props.logoutUser();
    this.props.history.push("/login");
  }

  render() {
    return (
      <Button
        style={{
          size: "fit-content",
          display: "inline",
          fontSize: 30,
          position: "absolute",
          right: 20,
          top: 20,
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

export default withRouter(connect(null, { logoutUser })(LogoutIcon));
