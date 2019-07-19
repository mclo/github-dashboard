const model = require("../resources/model"),
  ghApi = model.gh_api,
  editHookUrl = ghApi.edit_hook,
  issuesUrl = ghApi.repo_issues,
  reposUrl = ghApi.repositories_url,
  addHookUrl = ghApi.add_hook,
  internalApi = model.model;

const getOrgsUrl = () => {};

const getReposUrl = owner => {
  return reposUrl.replace("{owner}", owner);
};

const getIssuesUrl = (owner, repo) => {
  return issuesUrl.replace("{owner}", owner).replace("{repo}", repo);
};

const getEditHookUrl = (owner, repo, hookId) => {
  return editHookUrl
    .replace("{owner}", owner)
    .replace("{repo}", repo)
    .replace("{hook_id}", hookId);
};

const getAddHookUrl = (owner, repo) => {
  return addHookUrl.replace("{owner}", owner).replace("{repo}", repo);
};

module.exports = {
  getOrgsUrl: getOrgsUrl,
  gerReposUrl: getReposUrl,
  getIssuesUrl: getIssuesUrl,
  getEditHookUrl: getEditHookUrl,
  getAddHookUrl: getAddHookUrl
};
