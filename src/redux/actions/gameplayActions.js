import { GUESSER_SELECTWORD, CLUEWRITER_SUBMITCLUE } from "./types";
import { api, handleError } from "../../helpers/api";

//Functions
export const guesserSelectWord = (data) => async (dispatch) => {
  try {
    const response = await api.put(
      `/games/${data.gameId}/rounds/${data.roundId}`,
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
