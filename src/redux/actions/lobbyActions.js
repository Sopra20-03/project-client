import {
  GAME_CREATION,
  JOIN_GAME,
  LEAVE_GAME,
  START_GAME,
  CANCEL_GAME,
  GET_GAMES,
  GET_GAME_PLAYERS,
} from "./types";
import { api, handleError } from "../../helpers/api";
import Game from "../../components/shared/models/Game";

export const getGames = () => async (dispatch) => {
  try {
    const response = await api.get("/games", {
      withCredentials: true,
    });
    console.log("GETGAMES");
    console.log(response.data);
    dispatch({
      type: GET_GAMES,
      payload: response.data,
    });
  } catch (error) {
    alert(handleError(error));
  }
};

export const getGamePlayers = (gamesList) => async (dispatch) => {
  try {
    console.log("GET_GAME_PLAYERS");
    let gamePlayers = [];
    for (const game of gamesList) {
      const response = await api.get(`/games/${game.gameId}/players`, {
        withCredentials: true,
      });
      const players = {
        gameId: game.gameId,
        gamePlayers: response.data,
      };
      gamePlayers.push(players);
      console.log(gamePlayers);
    }

    dispatch({
      type: GET_GAME_PLAYERS,
      payload: gamePlayers,
    });
  } catch (error) {
    alert(handleError(error));
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
    alert(handleError(error));
  }
};

export const startGame = (gameId) => async (dispatch) => {
  try {
    console.log("***API CALL : START GAME***");
    const response = await api.put(`/games/${gameId}`, {
      withCredentials: true,
    });
    const game = new Game(response.data);
    dispatch({
      type: START_GAME,
    });
    console.log("request to:", response.request.responseURL);
    console.log("status code:", response.status);
    console.log("status text:", response.statusText);
    console.log("requested data:", response.data);
  } catch (error) {
    alert(handleError(error));
  }
};

export const cancelGame = (gameId) => async (dispatch) => {
  try {
    console.log("***API CALL : CANCEL GAME***");
    const response = await api.delete(`/games/${gameId}`, {
      withCredentials: true,
    });
    const game = new Game(response.data);
    console.log("request to:", response.request.responseURL);
    console.log("status code:", response.status);
    console.log("status text:", response.statusText);
    console.log("requested data:", response.data);
    dispatch({
      type: CANCEL_GAME,
    });
  } catch (error) {
    alert(handleError(error));
  }
};
