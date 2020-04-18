import { GUESSER_SELECTWORD } from "./types";
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
    console.log(response.data);
    const round = response.data;
    dispatch({
      type: GUESSER_SELECTWORD,
      payload: round,
    });
  } catch (error) {
    alert(handleError(error));
  }
};
