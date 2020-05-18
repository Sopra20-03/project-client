import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
//Redux
import { connect } from 'react-redux';
import { logoutUser } from '../../../redux/actions/userActions';
import { errorNotification } from '../../../helpers/notifications/toasts';
import { handleError } from '../../../helpers/api';

class LogoutIcon extends React.Component {
  constructor() {
    super();
  }

  async logout() {
    try {
      await this.props.logoutUser()
      this.props.history.push("/login");
    }catch (e) {
      errorNotification (handleError (e));
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

export default withRouter(connect(null, { logoutUser })(LogoutIcon));
