import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import PersonIcon from '@material-ui/icons/Person';
import {withRouter} from 'react-router-dom';
import Button from '@material-ui/core/Button';

class ProfileIcon extends React.Component {
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
            this.props.history.push("/userprofile");
        }}
      >
        <Tooltip disableFocusListener disableTouchListener title="User Profile">
          <PersonIcon style={{ fontSize: 30 }} />
        </Tooltip>
      </Button>
    );
  }
}

export default withRouter(ProfileIcon);
