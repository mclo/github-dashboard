import axios from "axios";

import { handleError } from '../Error/errorActions'
import { getApi } from "../../localStorage/api";


export const fetchIssues = (owner, repo) => dispatch => {
  let apiUrl = getApi().issues;

  let issuesUrl = apiUrl.replace(":owner", owner).replace(":repo", repo);
  dispatch(issuesRequested);

  return axios(issuesUrl)
    .then(res => dispatch(issuesFetched(res.data.issues)))
    .catch(err => dispatch(handleError(err.response.status)));
};

export const REPO_SELECTED = "REPO_SELECTED";
export const repoSelected = repo => {
  return {
    type: REPO_SELECTED,
    selected: repo
  };
};

export const ISSUES_REQUESTED = "ISSUES_REQUESTED";
const issuesRequested = () => {
  return {
    type: ISSUES_REQUESTED,
    loading: true
  };
};

export const ISSUES_FETCHED = "ISSUES_FETCHED";
const issuesFetched = issues => {
  return {
    type: ISSUES_FETCHED,
    loading: false,
    issues: issues
  };
};
