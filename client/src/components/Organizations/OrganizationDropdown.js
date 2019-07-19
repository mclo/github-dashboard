import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from "reactstrap";

import { fetchOrgs } from "./orgActions";

class OrganizationDropdown extends Component {
  constructor(props) {
    super(props);

    this.listOrgs = this.listOrgs.bind(this);
    this.listContent = this.listContent.bind(this);
    this.getCurrentOrg = this.getCurrentOrg.bind(this);

    let current = this.getCurrentOrg();

    //no access to props.match.params in this class 
    //need to use location and update state to rerender component
    this.state = {
      selectedOrg: current
    };
  }

  componentDidMount = () => {
    const { data } = this.props.organizations;
    const { dispatch } = this.props;

    if (!data) {
      dispatch(fetchOrgs);
    }
  };

  componentDidUpdate() {
    let current = this.getCurrentOrg();
    if (current !== this.state.selectedOrg) {
      this.setState(state => {
        return {
          selectedOrg: current
        };
      });
    }
  }


  getCurrentOrg = () => {
    const { pathname } = this.props.location;
    let params = pathname.split("/");
    let org = params[1];

    return org === "" ? "select organization" : org;
  };

  listOrgs = orgs =>
    orgs.map(org => (
      <Link to={`/${org.login}`} key={`link-${org.login}`}>
        <DropdownItem key={org.id}>{org.login}</DropdownItem>
      </Link>
    ));

  listContent = fetchedOrgs => {
    if(fetchedOrgs){
      return <DropdownMenu key="org-dropdown-toggle">{this.listOrgs(fetchedOrgs)}</DropdownMenu>
    }
  }

  render() {
    //TODO move to css file
    let style = {
      minWidth: 100,
      color: "gray",
      backgroundColor: "white"
    };

    const { selectedOrg } = this.state;
    const { organizations } = this.props;

    let listContent = this.listContent(organizations.data);

    return (
      <UncontrolledDropdown style={style}>
        <DropdownToggle caret style={style} key={selectedOrg}>
          {selectedOrg}
        </DropdownToggle>
        {listContent}
      </UncontrolledDropdown>
    );
  }
}

const mapStateToProps = state => {
  const { organizations } = state;
  return { organizations };
};

export default connect(mapStateToProps)(OrganizationDropdown);
