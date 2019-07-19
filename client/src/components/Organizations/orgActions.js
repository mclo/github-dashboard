import axios from "axios";
import { getApi } from "../../localStorage/api";
import { handleError } from "../Error/errorActions";

const api = getApi();

export const fetchOrgs = (dispatch, getState) => {
  let orgsUrl = api.organizations;

  //must be dispatched after getState,
  //otherwise getState will be undefined
  dispatch(orgsRequested);

  return axios(orgsUrl)
    .then(res => dispatch(orgsFetched(res.data.orgs)))
    .catch(err => dispatch(handleError(err.response.status)));
};

export const ORGS_REQUESTED = "ORGS_REQUESTED";
const orgsRequested = () => {
  return {
    type: ORGS_REQUESTED,
    loading: true
  };
};

export const ORGS_FETCHED = "ORGS_FETCHED";
const orgsFetched = orgs => {
  return {
    type: ORGS_FETCHED,
    orgs: orgs,
    loading: false
  };
};
