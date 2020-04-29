//Import Actions
import {
  ADVANCE_GAME_STATE,
  CLUEWRITER_SUBMITCLUE,
  GUESSER_SUBMITGUESS,
  GAME_GETGAME,
  GAME_GETCLUES,
  GAME_GETROUND,
  GAME_LOADGAME,
  GAME_UPDATEROUND,
  GET_GAME_PLAYERS,
  GUESSER_SELECTWORD,
  PLAYER_SET_ROLE,
  USER_LOGOUT,
  TIMER_ROUND_START,
  TIMER_ROUND_STOP,
  TIMER_ROUND_RESET,
  TIMER_ROUND_DECREMENT,
} from "../actions/types";
import GameStates from "./gameStates";

const initialState = {
  gameId: null,
  userId: null,
  playerId: null,
  gamePlayers: [],
  roundNum: null,
  round: null,
  role: null,
  clues: [],
  currentGameState: GameStates.SELECT_WORD,
  gamePhase: null,
  score: null,
  timers: null,
  timer: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    //Handle the different cases
    case GAME_LOADGAME:
      return {
        ...state,
        gameId: action.payload.gameId,
        userId: action.payload.userId,
      };

    case GAME_GETGAME:
      return {
        ...state,
        score: action.payload.score,
      };

    case GET_GAME_PLAYERS:
      return {
        ...state,
        gamePlayers: action.payload.players,
        playerId: action.payload.playerId,
      };

    case USER_LOGOUT:
      clearInterval(state.timer);
      return {
        //Clear the state
        gameId: null,
        userId: null,
        playerId: null,
        gamePlayers: [],
        roundNum: null,
        round: null,
        role: null,
        clues: [],
        currentGameState: GameStates.SELECT_WORD,
        gamePhase: null,
        score: null,
        timers: null,
        timer: null,
      };

    case GAME_GETROUND:
      return {
        ...state,
        round: action.payload,
      };

    case GAME_UPDATEROUND:
      return {
        ...state,
        roundNum: action.payload,
      };

    case PLAYER_SET_ROLE:
      return {
        ...state,
        role: action.payload,
      };

    case GUESSER_SELECTWORD:
      return {
        ...state,
        round: action.payload,
        gamePhase: "WRITING_CLUES",
      };

    case CLUEWRITER_SUBMITCLUE:
      return {
        ...state,
        gamePhase: "GUESSING",
      };

    case GUESSER_SUBMITGUESS:
      return {
        ...state,
        gamePhase: "CHECK_GUESS",
      };

    case GAME_GETCLUES:
      return {
        ...state,
        clues: action.payload,
      };

    case ADVANCE_GAME_STATE:
      return {
        ...state,
        currentGameState: action.payload,
      };

    //Timer
    case TIMER_ROUND_RESET:
      console.log(" Timer Round Reset Reducer");
      const roundTimer = {
        seconds: action.payload,
      };
      return {
        ...state,
        timers: {
          ...state.timers,
          round: roundTimer,
        },
      };

    case TIMER_ROUND_START:
      console.log(" Timer Round Start Reducer");
      return {
        ...state,
        timer: action.payload,
      };

    case TIMER_ROUND_DECREMENT:
      console.log(" Timer Round Decrement Reducer");
      const decrement = {
        seconds: state.timers.round.seconds - 1,
      };
      return {
        ...state,
        timers: {
          ...state.timers,
          round: decrement,
        },
      };

    case TIMER_ROUND_STOP:
      console.log(" Timer Round Stop Reducer");
      clearInterval(state.timer);
      return {
        ...state,
        timer: null,
      };

    default:
      return state;
  }
}
