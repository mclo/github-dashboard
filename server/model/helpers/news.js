let News = require("../News"),
  User = require("../User"),
  formatApiPayload = require("../../utils/firebaseNotifications")
    .formatApiPayload;

const saveNews = payload => {
  let obj = formatApiPayload(payload);
  let save = {
    user_id: payload.sender.id,
    url: obj.url,
    repo_name: obj.repoName,
    repo_id: obj.repoId,
    event: "issue" //obj.event
  };
  //TODO change event type once firebase utils is updated
  //to support commits and releases

  let news = new News(save);
  return news.save();
};

const getNews = userId => News.find({user_id: userId}).sort({date:-1}).limit(20);

const newsSeen = (userId, url) => {
  return News.updateMany({user_id: userId, url: url}, { seen: true })
  .then(() => getNews(userId))
}


module.exports = {
  saveNews,
  getNews,
  newsSeen
};
