import {
  GUESSER_SELECTWORD,
  CLUEWRITER_SUBMITCLUE,
  GAME_LOADGAME,
  GET_GAME_PLAYERS,
  PLAYER_SET_ROLE,
  GAME_GETROUND,
  GAME_UPDATEROUND,
} from "./types";
import { api, handleError } from "../../helpers/api";

//Functions
export const getGamePlayers = (gameId) => async (dispatch) => {
  try {
    const response = await api.get(`/games/${gameId}/players`, {
      withCredentials: true,
    });
    console.log("GETGAMEPLAYERS");
    console.log(response.data);
    dispatch({
      type: GET_GAME_PLAYERS,
      payload: response.data,
    });
  } catch (error) {
    alert(handleError(error));
  }
};

export const gameGetRound = (data) => async (dispatch) => {
  try {
    const response = await api.get(
      `/games/${data.gameId}/rounds/${data.roundNum}`,
      {
        withCredentials: true,
      }
    );
    console.log("GAMEGETROUND");
    console.log(response.data);
    dispatch({
      type: GAME_GETROUND,
      payload: response.data,
    });
  } catch (error) {
    alert(handleError(error));
  }
};

export const gameUpdateRound = (roundNum) => async (dispatch) => {
  try {
    dispatch({
      type: GAME_UPDATEROUND,
      payload: roundNum,
    });
  } catch (error) {
    alert(handleError(error));
  }
};

export const guesserSelectWord = (data) => async (dispatch) => {
  try {
    const response = await api.put(
      `/games/${data.gameId}/rounds/${data.roundNum}`,
      data,
      {
        withCredentials: true,
      }
    );
    const round = response.data;
    dispatch({
      type: GUESSER_SELECTWORD,
      payload: round,
    });
  } catch (error) {
    alert(handleError(error));
  }
};

export const playerSetRole = (role) => async (dispatch) => {
  try {
    dispatch({
      type: PLAYER_SET_ROLE,
      payload: role,
    });
  } catch (error) {
    alert(handleError(error));
  }
};

export const cluewriterSubmitClue = (data) => async (dispatch) => {
  try {
    const response = await api.put(`/xyz`, data, {
      withCredentials: true,
    });
    dispatch({
      type: CLUEWRITER_SUBMITCLUE,
      payload: response.data,
    });
  } catch (error) {
    alert(handleError(error));
  }
};

export const gameLoadGame = (data) => async (dispatch) => {
  try {
    dispatch({
      type: GAME_LOADGAME,
      payload: data,
    });
  } catch (error) {
    alert(handleError(error));
  }
};
