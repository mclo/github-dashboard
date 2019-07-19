import axios from "axios";

import { setApi } from "../../localStorage/api";
import { server_api } from "../../config";
import { handleError } from '../Error/errorActions';

export const fetchApiAndUpdateLocalStorage = dispatch => {
  axios(server_api)
    .then(res => {
      setApi(res.data);
      dispatch(apiFetched(res.data));
    })
    .catch(err => dispatch(handleError(err.response.status)));
};

export const API_FETCHED = "API_FETCHED";
function apiFetched(api) {
  return {
    type: API_FETCHED,
    api: api
  };
}

