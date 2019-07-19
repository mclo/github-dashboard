import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";

import { fetchIssues } from "./issueActions";
import { newsSeen } from "../News/newsActions";

class IssuesTable extends Component {
  constructor(props) {
    super(props);
    this.listIssues = this.listIssues.bind(this);
  }

  componentDidMount = () => {
    const { match, dispatch } = this.props;
    const { org, repo } = match.params;
    dispatch(fetchIssues(org, repo));
  };

  componentDidUpdate = prevProps => {
    const { news, match, dispatch, location } = this.props;
    const { org, repo } = match.params;

    const shouldFetchIssues = prevProps.match.params !== match.params;
    const shouldBeUpdated =
      news.all &&
      news.all.find(event => !event.seen && event.url === location.pathname);

    if (shouldFetchIssues) {
      dispatch(fetchIssues(org, repo));
    }

    if (shouldBeUpdated) {
      dispatch(newsSeen(location.pathname));
    }
  };

  listIssues = () => {
    const { data } = this.props.issues;
    const isObject = value => typeof value === "object" && value !== null;

    if (data && data.length > 0) {
      return data.map(issue => {
        let user = isObject(issue.user) ? issue.user.login : issue.user;
        let assignee = isObject(issue.assignee)
          ? issue.assignee.login
          : issue.assignee;
        let body = issue.body ? issue.body : "";
        let cra = issue.created_at.slice(0, 10);

        return (
          <tr key={issue.id}>
            <th scope="row">{issue.title}</th>
            <td>{body}</td>
            <td>{user}</td>
            <td>{assignee}</td>
            <td>{cra}</td>
          </tr>
        );
      });
    }
  };

  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Created by</th>
            <th>Assignee</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>{this.listIssues()}</tbody>
      </Table>
    );
  }
}

const mapStateToProps = state => {
  const { issues, notifications, news } = state;
  return { issues, notifications, news };
};

export default connect(mapStateToProps)(IssuesTable);
