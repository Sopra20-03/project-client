import axios from 'axios';
import { getDomain } from './getDomain';
import { errorNotification } from './notifications/toasts';

export const api = axios.create({
  baseURL: getDomain(),
  headers: {},
});

export const handleError = (error) => {
  const response = error.response;

  // catch 4xx and 5xx status codes
  if (response && !!`${response.status}`.match(/^[4|5]\d{2}$/)) {
    //let info = `\nrequest to: ${response.request.responseURL}`;
    let info = '';
    if (response.data.status) {
      info += `\nstatus code: ${response.data.status}`;
      //info += `\nerror: ${response.data.error}`;
      info += `\nerror message: ${response.data.message}`;
    } else {
      info += `\nstatus code: ${response.status}`;
      info += `\nerror message:\n${response.data}`;
    }

    console.log(
      "The request was made and answered but was unsuccessful.",
      error.response
    );
    return info;
  } else {
    if (error.message.match(/Network Error/)) {
      errorNotification("The server cannot be reached.\nDid you start it?");
    }

    console.log("Something else happened.", error);
    return error.message;
  }
};
