import axios from "axios";
import { handleError } from "../Error/errorActions";
import { getApi } from "../../localStorage/api";
let api = getApi();

export const fetchInfo = match => (dispatch, getState) => {
  const { user } = getState().login;
  const { org, repo } = match.params;
  const hookId = getHookId(user.subscriptions, org, repo);
  
  if (hookId) {
    let url = getUpdateUrl(org, repo, hookId);
    return dispatch(fetchSubscription(url));
  } else {
    return dispatch(hookDeleted())
  }
};

const getHookId = (subs, org, repo) => {
  let sub = subs.find(sub => sub.repo_name === repo && sub.owner === org);
  return sub ? sub.hook_id : null;
};

const fetchSubscription = url => dispatch => {
  axios.get(url)
    .then(res => {
      dispatch(subscriptionFetched(res.data))
    })
    .catch(err => {
      dispatch(handleError(err.response.status))
    });
};

export const SUBSCRIPTION_FETCHED = "SUBSCRIPTION_FETCHED";
const subscriptionFetched = data => {
  return {
    type: SUBSCRIPTION_FETCHED,
    options: data.options,
    current: data.subscription,
    active: true,
    unauthorized: false
  };
};

export const addSubscription = match => (dispatch) => {
  const { org, repo } = match.params;

  let url = getAddUrl(org, repo);
  axios({
    url: url,
    method: "post",
    owner: org,
    repo: repo
  })
    .then(res => {
      if(!res.data.subscription){
        dispatch(noPermission())
      } else{
        dispatch(subscriptionEdited(res.data))
      }
    })
    .catch(err => dispatch(handleError(err.response.status)));
};

export const NO_PERMISSION = "NO_PERMISSION"
const noPermission = () => {
  return {
    type: NO_PERMISSION,
    unauthorized: true 
  }
}

//changes the events that existing hook listens to
export const updateSubscription = (match, event) => (dispatch, getState) => {
  let currentSub = getState().subscription.current;
  let events = currentSub.events;
  let { org, repo } = match.params;
  let existingEvent = events.find(e => e === event);

  if (existingEvent) {
    events = events.filter(e => e !== event);
  } else {
    events.push(event);
  }

  let hookId = currentSub.hook_id;
  let url = getUpdateUrl(org, repo, hookId);

  axios({
    url: url,
    method: "put",
    data: {
      events: events
    }
  })
    .then(res => dispatch(subscriptionEdited(res.data)))
    .catch(err => dispatch(handleError(err.response.status)));
};

export const SUBSCRIPTION_EDITED = "SUBSCRIPTION_EDITED";
export const subscriptionEdited = data => {
  return {
    type: SUBSCRIPTION_EDITED,
    options: data.options,
    current: data.subscription,
    active: true,
    unauthorized: false
  };
};

export const deleteSubscriptions = (match, hookId) => (dispatch) => {
  const { org, repo } = match.params;

  let deleteUrl = getUpdateUrl(org, repo, hookId);

  return axios
    .delete(deleteUrl)
    .then(() => dispatch(hookDeleted()))
    .catch(err => dispatch(handleError(err.response.status)));
};

export const HOOK_DELETED = "HOOK_DELETED";
const hookDeleted = () => {
  return {
    type: HOOK_DELETED,
    active: false,
    current: null,
    unauthorized: false
  };
};

const getUpdateUrl = (owner, repo, hookId) => {
  let url = api.update_subscription;
  let customizedUrl = url
    .replace(":owner", owner)
    .replace(":repo", repo)
    .replace(":hook_id", hookId);
  return customizedUrl;
};

const getAddUrl = (owner, repo) => {
  return api.subscribe
  .replace(":owner", owner)
  .replace(":repo", repo);
};
