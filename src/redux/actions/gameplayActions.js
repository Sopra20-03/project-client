import {
  CLUEWRITER_SUBMITCLUE,
  GAME_CLEAR,
  GAME_GETCLUES,
  GAME_GETGAME,
  GAME_GETROUND,
  GAME_LOADGAME,
  GAME_SET_STATE,
  GAME_UPDATEROUND,
  GET_GAME_PLAYERS,
  GUESSER_SELECTWORD,
  GUESSER_SUBMITGUESS,
  PLAYER_SET_ROLE,
  TIMER_CLEAR,
  TIMER_DECREMENT,
  TIMER_START,
  TIMER_STOP,
  SET_SCORE,
} from "./types";

import { api, handleError } from "../../helpers/api";
import { errorNotification } from "../../helpers/notifications/toasts";

//Functions
export const gameGetGame = (data) => async (dispatch) => {
  if (data.gameId == null) {
    return null;
  }
  try {
    const response = await api.get(`/games/${data.gameId}`, {
      withCredentials: true,
    });
    dispatch({
      type: GAME_GETGAME,
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

export const getGamePlayers = (gameId, userId) => async (dispatch) => {
  if (gameId == null || userId == null) {
    return null;
  }
  try {
    const response = await api.get(`/games/${gameId}/players`, {
      withCredentials: true,
    });
    console.log("GETGAMEPLAYERS");
    console.log(response.data);
    let currentPlayerId = -1;
    if (response.data.find((x) => x.userId === userId)) {
      currentPlayerId = response.data.find((x) => x.userId === userId).playerId;
    }
    dispatch({
      type: GET_GAME_PLAYERS,
      payload: { players: response.data, playerId: currentPlayerId },
    });
  } catch (error) {
    throw error;
  }
};

export const gameGetRound = (data) => async (dispatch) => {
  if (data.roundNum == null || data.gameId == null) {
    return null;
  }
  try {
    //Demo 3 Rounds
    if (data.roundNum > 3) {
      return null;
    }
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
    throw error;
  }
};

export const gameUpdateRound = (roundNum) => async (dispatch) => {
  try {
    dispatch({
      type: GAME_UPDATEROUND,
      payload: roundNum,
    });
  } catch (error) {
    errorNotification(handleError(error));
  }
};

export const guesserSelectWord = (data) => async (dispatch) => {
  if (data.roundNum == null || data.gameId == null) {
    return null;
  }
  try {
    const response = await api.put(
      `/games/${data.gameId}/rounds/${data.roundNum}`,
      data,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: GUESSER_SELECTWORD,
      payload: null,
    });
  } catch (error) {
    errorNotification(handleError(error));
  }
};

export const playerSetRole = (role) => async (dispatch) => {
  try {
    dispatch({
      type: PLAYER_SET_ROLE,
      payload: role,
    });
  } catch (error) {
    errorNotification(handleError(error));
  }
};

export const setScore = (score) => async (dispatch) => {
  try {
    dispatch({
      type: SET_SCORE,
      payload: score,
    });
  } catch (error) {
    errorNotification(handleError(error));
  }
};

export const gameSetState = (gameState) => async (dispatch) => {
  try {
    dispatch({
      type: GAME_SET_STATE,
      payload: gameState,
    });
  } catch (e) {
    errorNotification(handleError(e));
  }
};

export const gameSubmitClue = (data) => async (dispatch) => {
  if (data.playerId == null || data.gameId == null || data.clueId == null) {
    return null;
  }
  try {
    const response = await api.post(
      `/games/${data.gameId}/players/${data.playerId}/clue/${data.clueId}`,
      data,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: CLUEWRITER_SUBMITCLUE,
      payload: response.data,
    });
  } catch (error) {
    errorNotification(handleError(error));
  } finally {
    timerStop();
  }
};

export const gameSubmitGuess = (data) => async (dispatch) => {
  if (data.playerId == null || data.gameId == null) {
    return null;
  }
  try {
    const response = await api.post(
      `/games/${data.gameId}/players/${data.playerId}/guess`,
      data,
      {
        withCredentials: true,
      }
    );
    const points = response.data.isValid ? 1 : 0;
    dispatch({
      type: GUESSER_SUBMITGUESS,
      payload: points,
    });
  } catch (error) {
    console.log(handleError(error));
  } finally {
    timerStop();
  }
};

export const gameGetClues = (data) => async (dispatch) => {
  if (data.roundNum == null || data.gameId == null) {
    return null;
  }
  try {
    //Demo 3 Rounds

    if (data.roundNum > 3) {
      return null;
    }
    const response = await api.get(
      `/games/${data.gameId}/rounds/${data.roundNum}/clues`,
      {
        withCredentials: true,
      }
    );
    const payload = {
      clues: response.data,
    };
    console.log("***API CALL - GET CLUES***");
    console.log(response.data);
    dispatch({
      type: GAME_GETCLUES,
      payload: payload,
    });
  } catch (error) {
    errorNotification(handleError(error));
  }
};

export const gameLoadGame = (data) => async (dispatch) => {
  try {
    dispatch({
      type: GAME_LOADGAME,
      payload: data,
    });
  } catch (error) {
    errorNotification(handleError(error));
  }
};

export const gameClearGame = () => async (dispatch) => {
  try {
    dispatch({
      type: GAME_CLEAR,
      payload: null,
    });
  } catch (error) {
    errorNotification(handleError(error));
  }
};

//Timer Actions
//Configures the timer with countdown time & timer and starts
export const timerStart = (data, func) => async (dispatch) => {
  //Clear Existing Timer
  try {
    dispatch({
      type: TIMER_CLEAR,
      payload: data,
    });
  } catch (e) {
    errorNotification(handleError(e));
  }

  //Set New Timer
  let mytimer = setInterval(async () => {
    dispatch({
      type: TIMER_DECREMENT,
      payload: func,
    });
  }, 1000);

  const timerData = {
    timer: mytimer,
    seconds: data,
  };
  //Configure & Start

  try {
    dispatch({
      type: TIMER_START,
      payload: timerData,
    });
  } catch (e) {
    errorNotification(handleError(e));
  }
};

export const timerStop = () => async (dispatch) => {
  //Clear Existing Timer
  try {
    dispatch({
      type: TIMER_STOP,
      payload: null,
    });
  } catch (e) {
    errorNotification(handleError(e));
  }
};

export const timerClear = () => async (dispatch) => {
  //Clear Existing Timer
  try {
    dispatch({
      type: TIMER_CLEAR,
      payload: null,
    });
  } catch (e) {
    errorNotification(handleError(e));
  }
};
