let base_url = require('../config/environment/index').base_url;

const getMessage = (apiPayload, token) => {
  let data = formatApiPayload(apiPayload);
  let notification = getNotificationMessage(data);
  let webpush = getWebpushOptions(base_url + data.url);

  return {
    data: data,
    notification: notification,
    webpush: webpush,
    token: token
  };
};

const formatApiPayload = apiPayload => {
  //TODO send different data loads depending on 
  //notification type
  return getIssue(apiPayload)
};
const getIssue = apiPayload => {
  let repo = apiPayload.repository;
  let repoName = repo.name;
  let repoId = repo.id.toString();
  let fullRepoName = repo.full_name;


  let event = Object.keys(apiPayload.changes)[0];
  let oldValue = apiPayload.changes[event].from;
  let newValue = apiPayload.issue[event];
  let issueName = apiPayload.issue.title;

  return {
    repoName: repoName,
    repoId: repoId,
    issueName: issueName,
    event: event,
    was: oldValue,
    is: newValue,
    url: '/' + fullRepoName
  };
};

const getCommit = apiPayload => {
  //TODO format commit data
}

const getRelease = apiPayload => {
  //TODO format release data
}

//TODO update to support more than issues
const getNotificationMessage = data => {
  return {
    title: `Issue ${data.issueName} updated in repository ${data.repoName})`,
    body: `${data.event} changed from: ${data.was} to: ${data.is}`
  };
};

const getWebpushOptions = fullname => {
  return {
    fcm_options: {
      link: fullname
    }
  };
};




module.exports = {
  getMessage: getMessage,
  formatApiPayload: formatApiPayload
};
