import {
  CANCEL_GAME,
  GAME_CREATION,
  GET_GAMES,
  JOIN_GAME,
  LEAVE_GAME,
  PLAY_GAME,
  START_GAME,
  CLEAR_JOINEDGAME,
  GET_GAME,
} from "./types";

import { api } from "../../helpers/api";
import Game from "../../components/shared/models/Game";

export const startGame = (gameId) => async (dispatch) => {
  try {
    console.log(" ACTION API startGame");
    console.log(gameId);
    const response = await api.put(`/games/${gameId}`, null, {
      withCredentials: true,
    });
    dispatch({
      type: START_GAME,
    });
    return 0;
  } catch (error) {
    throw error;
  }
};

export const getGame = (gameId) => async (dispatch) => {
  try {
    const response = await api.get(`/games/${gameId}`, {
      withCredentials: true,
    });
    console.log("GETGAME");

    console.log(response.headers["content-type"]);
    console.log(response.data);
    if (response.headers["content-type"] != "application/json") {
      return false;
    }
    dispatch({
      type: GET_GAME,
      payload: response.data,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGames = () => async (dispatch) => {
  try {
    const response = await api.get("/games", {
      withCredentials: true,
    });
    console.log("GETGAMES");

    console.log(response.headers["content-type"]);
    console.log(response.data);
    if (response.headers["content-type"] != "application/json") {
      return false;
    }
    dispatch({
      type: GET_GAMES,
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

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
    throw error;
  }
};

export const joinGame = (gameId, userData) => async (dispatch) => {
  try {
    console.log("***API CALL : JOIN GAME***");
    const response = await api.put(`/games/${gameId}/players`, userData, {
      withCredentials: true,
    });
    dispatch({
      type: JOIN_GAME,
      payload: response.data,
    });
    console.log("request to:", response.request.responseURL);
    console.log("status code:", response.status);
    console.log("status text:", response.statusText);
    console.log("requested data:", response.data);
  } catch (error) {
    throw error;
  }
};

export const clearJoinedGame = () => async (dispatch) => {
  dispatch({
    type: CLEAR_JOINEDGAME,
  });
};

//After joining a game, player waits for creater to start the game.
//Once the game is set to RUNNING, load the gameplay
export const playGame = (gameId) => async (dispatch) => {
  try {
    console.log("***API CALL : JOIN GAME***");
    const response = await api.get(`/games/${gameId}`, {
      withCredentials: true,
    });
    dispatch({
      type: PLAY_GAME,
      payload: response.data,
    });
    console.log("request to:", response.request.responseURL);
    console.log("status code:", response.status);
    console.log("status text:", response.statusText);
    console.log("requested data:", response.data);
  } catch (error) {
    throw error;
  }
};

export const leaveGame = (gameId, userId) => async (dispatch) => {
  try {
    console.log("***API CALL : LEAVE GAME***");
    const response = await api.delete(`/games/${gameId}/players/${userId}`, {
      withCredentials: true,
    });
    const game = new Game(response.data);
    console.log("request to:", response.request.responseURL);
    console.log("status code:", response.status);
    console.log("status text:", response.statusText);
    console.log("requested data:", response.data);
    dispatch({
      type: LEAVE_GAME,
    });
  } catch (error) {
    throw error;
  }
};

export const cancelGame = (gameId) => async (dispatch) => {
  try {
    console.log("***API CALL : CANCEL/DELETE GAME***");
    console.log(gameId);
    const response = await api.delete(`/games/${gameId}`, {
      withCredentials: true,
    });
    dispatch({
      type: CANCEL_GAME,
    });
  } catch (error) {
    throw error;
  }
};
