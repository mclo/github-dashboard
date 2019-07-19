import axios from "axios";
import { getApi } from '../../localStorage/api' 
import { handleError } from '../Error/errorActions'

export const fetchRepos = owner => (dispatch) => {
  let apiUrl = getApi().repos;
  let reposUrl = apiUrl.replace(":owner", owner);

  dispatch(reposRequested(owner));

  return axios(reposUrl).then(res =>
    dispatch(reposFetched(res.data.repos))
  )
  .catch(err => dispatch(handleError(err.response.status)))
};

export const REPOS_REQUESTED = "REPOS_REQUESTED";
const reposRequested = () => {
  return {
    type: REPOS_REQUESTED,
    loading: true
  };
};

export const REPOS_FETCHED = "REPOS_FETCHED";
const reposFetched = (repos) => {
  return {
    type: REPOS_FETCHED,
    repos: repos,
    loading: false 
  };
};

export const REPO_SELECTED = 'REPO_SELECTED'
export const repoSelected = (repo) => {
  return {
    type: REPO_SELECTED,
    repo: repo
  }
}


