import {GAME_CREATION, JOIN_GAME, LEAVE_GAME} from "./types";
import { api, handleError } from "../../helpers/api";
import Game from "../../components/shared/models/Game";

export const createGame = (gameData) => async (dispatch) => {
    try {
        console.log("***API CALL : CREATE GAME***");
        const response = await api.post("/games", gameData);
        const game = new Game(response.data);
        dispatch({
            type: GAME_CREATION,
            payload: game,
        });
        console.log("request to:", response.request.responseURL);
        console.log("status code:", response.status);
        console.log("status text:", response.statusText);
        console.log("requested data:", response.data);
    } catch (error) {
        alert(handleError(error));
    }
};

export const joinGame = (gameId, userData) => async (dispatch) => {
    try {
        console.log("***API CALL : JOIN GAME***");
        const response = await api.put(`/games/${gameId}/players`, userData, {
            withCredentials: true,
        });
        const game = new Game(response.data);
        dispatch({
            type: JOIN_GAME,
            payload: game,
        });
        console.log("request to:", response.request.responseURL);
        console.log("status code:", response.status);
        console.log("status text:", response.statusText);
        console.log("requested data:", response.data);
    } catch (error) {
        alert(handleError(error));
    }
};

export const leaveGame = (gameId, userId) => async (dispatch) => {
    try {
        console.log("***API CALL : LEAVE GAME*** ...coming soon");
        /*
        const response = await api.delete(`/games/${gameId}/players/${userId}`, {
            withCredentials: true,
        });
        const game = new Game(response.data);
        console.log("request to:", response.request.responseURL);
        console.log("status code:", response.status);
        console.log("status text:", response.statusText);
        console.log("requested data:", response.data);
        */
        dispatch({
            type: LEAVE_GAME,
        });
    } catch (error) {
        alert(handleError(error));
    }
};


