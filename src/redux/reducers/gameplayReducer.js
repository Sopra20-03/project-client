//Import Actions
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
  TIMER_CLEAR,
  TIMER_START,
  TIMER_STOP,
  TIMER_DECREMENT,
  GAME_CLEAR,
  USER_LOGOUT,
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
  currentGameState: null,
  score: null,
  timer: {
    seconds: null,
    timer: null,
    state: null,
  },
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

    case GAME_CLEAR:
      if (state.timer.timer != null) {
        clearInterval(state.timer.timer);
      }
      return {
        gameId: null,
        userId: null,
        playerId: null,
        gamePlayers: [],
        roundNum: null,
        round: null,
        role: null,
        clues: [],
        currentGameState: null,
        score: null,
        timer: {
          seconds: null,
          timer: null,
          state: null,
        },
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
        currentGameState: null,
        score: null,
        timers: null,
        timer: {
          seconds: null,
          timer: null,
          state: null,
        },
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
      };

    case CLUEWRITER_SUBMITCLUE:
      return {
        ...state,
      };

    case GUESSER_SUBMITGUESS:
      return {
        ...state,
      };

    case GAME_GETCLUES:
      return {
        ...state,
        clues: action.payload.clues,
      };

    case GAME_SET_STATE:
      return {
        ...state,
        currentGameState: action.payload,
      };

    //Timer
    case TIMER_START:
      return {
        ...state,
        timer: {
          ...state.timer,
          timer: action.payload.timer,
          seconds: action.payload.seconds,
          state: "RUNNING",
        },
      };

    case TIMER_DECREMENT:
      if (state.timer.timer != null && state.timer.state === "RUNNING") {
        //Finished
        if (state.timer.seconds == 0) {
          clearInterval(state.timer.timer);
          action.payload();
          return {
            ...state,
            timer: {
              ...state.timer,
              seconds: 0,
              state: "FINISHED",
            },
          };
        }

        //Else
        return {
          ...state,
          timer: {
            ...state.timer,
            seconds: state.timer.seconds - 1,
          },
        };
      }
      return {
        ...state,
      };

    case TIMER_STOP:
      if (state.timer.timer != null) {
        clearInterval(state.timer.timer);
      }
      return {
        ...state,
        timer: {
          ...state.timer,
          state: "STOPPED",
        },
      };

    case TIMER_CLEAR:
      if (state.timer.timer != null) {
        clearInterval(state.timer.timer);
      }
      return {
        ...state,
        timer: { seconds: null, timer: null, state: null },
      };

    default:
      return state;
  }
}
