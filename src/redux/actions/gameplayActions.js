import {
    ADVANCE_GAME_STATE, CLUEWRITER_SUBMITCLUE, GAME_GETCLUES,
    GAME_GETGAME,
    GAME_GETROUND,
    GAME_LOADGAME,
    GAME_UPDATEROUND, GAME_VALIDATECLUE,
    GET_GAME_PLAYERS,
    GUESSER_SELECTWORD, GUESSER_SUBMITGUESS,
    PLAYER_SET_ROLE
} from './types';
import { api, handleError } from '../../helpers/api';

//Functions
export const gameGetGame = (data) => async (dispatch) => {
    try {
        const response = await api.get (
            `/games/${data.gameId}`,{ withCredentials: true}
        );
        dispatch ({
            type: GAME_GETGAME,
            payload: response.data
        });
    } catch (error) {
        alert (handleError (error));
    }
};

export const getGamePlayers = (gameId, userId) => async (dispatch) => {
  try {
    const response = await api.get(`/games/${gameId}/players`, {
      withCredentials: true,
    });
    console.log("GETGAMEPLAYERS");
    console.log(response.data);
    let currentPlayerId = -1;
    if (response.data.find(x => x.userId === userId)) {
      currentPlayerId = response.data.find(x => x.userId === userId).playerId;
    }
    dispatch({
      type: GET_GAME_PLAYERS,
      payload: {players: response.data, playerId: currentPlayerId},
    });
  } catch (error) {
    alert(handleError(error));
  }
};

export const gameGetRound = (data) => async (dispatch) => {
    try {
        const response = await api.get (
          `/games/${data.gameId}/rounds/${data.roundNum}`,
          {
              withCredentials: true
          }
        );
        console.log ('GAMEGETROUND');
        console.log (response.data);
        dispatch ({
            type: GAME_GETROUND,
            payload: response.data
        });
    } catch (error) {
        alert (handleError (error));
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

export const gameSubmitClue = (data) => async (dispatch) => {
  try {
    const response = await api.post(`/games/${data.gameId}/players/${data.playerId}/clue/${data.clueId}`, data, {
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

export const gameSubmitGuess = (data) => async (dispatch) => {
  try {
    const response = await api.post(`/games/${data.gameId}/players/${data.playerId}/guess`, data, {
      withCredentials: true,
    });
    const points = response.data.isValid ? 1 : 0;
    dispatch({
      type: GUESSER_SUBMITGUESS,
      payload: points,
    });
  } catch (error) {
    alert(handleError(error));
  }
};

export const gameGetClues = (data) => async (dispatch) => {
    try {
        const response = await api.get (
          `/games/${data.gameId}/rounds/${data.roundNum}/clues`,
          {
              withCredentials: true
          }
        );
        console.log ('***API CALL - GET CLUES***');
        console.log (response.data);
        dispatch ({
            type: GAME_GETCLUES,
            payload: response.data
        });
    } catch (error) {
        alert (handleError (error));
    }
};

export const validateClue = (data) => async (dispatch) => {
    try {
        const response = await api.put (
          `/games/${data.gameId}/rounds/${data.roundNum}/clues/${data.clueId}`,
          {
              withCredentials: true
          }
        );
        console.log (response.data);
        dispatch ({
            type: GAME_VALIDATECLUE,
            payload: data
        });
    } catch (error) {
        alert (handleError (error));
    }
};

export const gameLoadGame = (data) => async (dispatch) => {
    try {
        dispatch ({
            type: GAME_LOADGAME,
            payload: data
        });
    } catch (error) {
        alert (handleError (error));
    }
};

export const advanceGameState = (data) => async (dispatch) => {
    try {
        dispatch ({
            type: ADVANCE_GAME_STATE,
            payload: data
        });
    } catch (e) {
        alert (handleError (e));
    }
};
