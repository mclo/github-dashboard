import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchNews } from "./newsActions";
import Badge from "./Badge";
import EventsList from "./NewsList";

import { UncontrolledButtonDropdown, DropdownToggle } from "reactstrap";

class News extends Component {
  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch(fetchNews);
  };

  render() {
    const { all } = this.props.news;

    const style = getStyle();
    const addBadgeIfNews = getBadgeIfNews(all);
    const list = renderListIfNews(all)

    return (
      <UncontrolledButtonDropdown style={style}>
        <DropdownToggle style={style} caret>
          events
          {addBadgeIfNews}
        </DropdownToggle>
        {list}
      </UncontrolledButtonDropdown>
    );
  }
}

const getStyle = () => {
  return {
    backgroundColor: "transparent",
    border: "none",
    color: "black"
  };
};

const getBadgeIfNews = events => {
  if (events) {
    let news = events.filter(event => !event.seen)

    let amount = news.length;
    if (amount > 0) {
      return <Badge amount={amount} />;
    }
  }
};

const renderListIfNews = (news) => {
  if(news){
    return <EventsList events={news} />
  }
}

const mapStateToProps = state => {
  const { notifications, news } = state;
  return { notifications, news };
};

export default connect(mapStateToProps)(News);

