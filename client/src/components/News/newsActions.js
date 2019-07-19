import axios from "axios";
import { handleError } from "../Error/errorActions";
import { getApi } from "../../localStorage/api";

export const fetchNews = dispatch => {
  const notificationsUrl = getApi().notifications;

  axios(notificationsUrl)
    .then(res => {
      dispatch(newsFetched(res.data));
    })
    .catch(err => dispatch(handleError(err.response.status)));
};

export const NEWS_FETCHED = "NEWS_FETCHED";
function newsFetched(events) {
  return {
    type: NEWS_FETCHED,
    all: events
  };
}

export const newsSeen = url => dispatch => {
  const notificationsUrl = getApi().notifications;
  axios({
    url: notificationsUrl,
    method: "put",
    data: {
      url: url
    }
  })
    .then(res => dispatch(newsFetched(res.data)))
    .catch(e => dispatch(handleError(e.response.status)));
};
