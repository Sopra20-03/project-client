import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';

class LeaderboardIcon extends React.Component {
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
            this.props.history.push("/leaderboard");
        }}
      >
        <Tooltip disableFocusListener disableTouchListener title="Leaderboard">
          <EmojiEventsIcon style={{ fontSize: 30 }} />
        </Tooltip>
      </Button>
    );
  }
}

export default withRouter(LeaderboardIcon);
