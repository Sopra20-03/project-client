import Grid from "@material-ui/core/Grid";
import LobbyIcon from "./LobbyIcon";
import LeaderboardIcon from "./LeaderboardIcon";
import ProfileIcon from "./GameHistoryIcon";
import InstructionsIcon from "./Instructions";
import LogoutIcon from "./LogoutIcon";
import React from "react";

export default function MenuBar() {
    return (
        <Grid item sm={5}>
            <Grid container alignItems="center" justify={"center"}>
                <Grid item>
                    <LobbyIcon/>
                </Grid>
                <Grid item>
                    <LeaderboardIcon/>
                </Grid>
                <Grid item>
                    <ProfileIcon/>
                </Grid>
                <Grid item>
                    <InstructionsIcon/>
                </Grid>
                <Grid item>
                    <LogoutIcon/>
                </Grid>
            </Grid>
        </Grid>
    );
}