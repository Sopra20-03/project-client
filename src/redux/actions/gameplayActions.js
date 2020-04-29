import {
  CLUEWRITER_SUBMITCLUE,
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
  TIMER_ROUND_DECREMENT,
  TIMER_ROUND_RESET,
  TIMER_ROUND_START,
  TIMER_ROUND_STOP
} from './types';
import { api, handleError } from '../../helpers/api';
import GameStates from '../reducers/gameStates';

//Functions
export const gameGetGame = (data) => async (dispatch) => {
  try {
    const response = await api.get(`/games/${data.gameId}`, {
      withCredentials: true,
    });
    dispatch({
      type: GAME_GETGAME,
      payload: response.data,
    });
  } catch (error) {
    alert(handleError(error));
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
    if (response.data.find((x) => x.userId === userId)) {
      currentPlayerId = response.data.find((x) => x.userId === userId).playerId;
    }
    dispatch({
      type: GET_GAME_PLAYERS,
      payload: { players: response.data, playerId: currentPlayerId },
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
    let gameState = GameStates.SELECT_WORD;


    if (response.data.wordCard.selectedWord) {
      gameState = GameStates.WRITE_CLUES;
    }

    const payload = {
      round: response.data,
      gameState: gameState
    };
    dispatch({
      type: GAME_GETROUND,
      payload: payload,
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

export const gameSetState = (gameState) => async (dispatch) => {
  try {
    dispatch({
      type: GAME_SET_STATE,
      payload: gameState
    })
  } catch (e) {
    alert (handleError (e));
  }
}

export const gameSubmitClue = (data) => async (dispatch) => {
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
    alert(handleError(error));
  }
};

export const gameSubmitGuess = (data) => async (dispatch) => {
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
    alert(handleError(error));
  }
};

export const gameGetClues = (data) => async (dispatch) => {
  try {
    const response = await api.get(
      `/games/${data.gameId}/rounds/${data.roundNum}/clues`,
      {
        withCredentials: true,
      }
    );
    let gameState = GameStates.SELECT_WORD;


    if (!response.data.filter((x) => x.word === "")) {
      gameState = GameStates.VALIDATE_CLUES;
    }

    const payload = {
      clues: response.data,
      gameState: gameState
    };
    console.log("***API CALL - GET CLUES***");
    console.log(response.data);
    dispatch({
      type: GAME_GETCLUES,
      payload: payload,
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

//Timer Actions
export const timerRoundReset = (data) => async (dispatch) => {
  console.log("timerRoundReset() Action");
  try {
    dispatch({
      type: TIMER_ROUND_RESET,
      payload: data,
    });
  } catch (e) {
    alert(handleError(e));
  }
};

export const timerRoundStart = () => async (dispatch) => {
  console.log("timerRoundStart() Action");

  try {
    let mytimer = setInterval(async () => {
      console.log("1s");
      dispatch({
        type: TIMER_ROUND_DECREMENT,
        payload: null,
      });
    }, 1000);

    dispatch({
      type: TIMER_ROUND_START,
      payload: mytimer,
    });
  } catch (e) {
    alert(handleError(e));
  }
};

export const timerRoundDecrement = () => async (dispatch) => {
  console.log("timerRoundDecrement() Action");
  try {
    dispatch({
      type: TIMER_ROUND_DECREMENT,
      payload: null,
    });
  } catch (e) {
    alert(handleError(e));
  }
};

export const timerRoundStop = () => async (dispatch) => {
  console.log("timerRoundStop() Action");
  try {
    dispatch({
      type: TIMER_ROUND_STOP,
      payload: null,
    });
  } catch (e) {
    alert(handleError(e));
  }
};
