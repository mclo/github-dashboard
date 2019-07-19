import React, { Component } from "react";
import { connect } from "react-redux";

import { FormGroup, CustomInput, Jumbotron, Button } from "reactstrap";

import {
  updateSubscription,
  fetchInfo,
  deleteSubscriptions,
  addSubscription
} from "./subActions";

class Subscriptions extends Component {
  constructor(props) {
    super(props);

    this.toggleSubscription = this.toggleSubscription.bind(this);
    this.renderToggleOptions = this.renderToggleOptions.bind(this);
    this.isActive = this.isActive.bind(this);
    this.deleteSubscriptions = this.deleteSubscriptions.bind(this);
    this.activateSubscriptions = this.activateSubscriptions.bind(this);
    this.renderContent = this.renderContent.bind(this)
  }

  componentDidMount = () => {
    const { dispatch, match } = this.props;
    dispatch(fetchInfo(match));
  };
  
  componentDidUpdate = (prevProps) => {
    const { dispatch, match } = this.props;
    if(match.params.repo !== prevProps.match.params.repo)
    {
      dispatch(fetchInfo(match));
    }
  };

  toggleSubscription = e => {
    const { dispatch, match } = this.props;
    let event = e.currentTarget.id;

    dispatch(updateSubscription(match, event));
  };

  renderToggleOptions = () => {
    const subscription = this.props.subscription;
    const { options, current } = subscription;
    if(options) {
      return options.map(event => {
      let isActive = this.isActive(current.events, event);

      return (
        <CustomInput
          key={event}
          type="switch"
          id={event}
          label={event}
          checked={!!isActive}
          onChange={this.toggleSubscription}
        />
      );
    });
  }
  };


  isActive = (events, event) => {
    return events.find(e => e === event);
  };

  deleteSubscriptions = () => {
    const { dispatch, match } = this.props;
    const { hook_id } = this.props.subscription.current;
    dispatch(deleteSubscriptions(match, hook_id));
  };

  activateSubscriptions = () => {
    const { dispatch, match } = this.props;
    dispatch(addSubscription(match));
  };
//TODO place toggle and buttons in separate files..
  renderContent = () => {
    const { options, current, active, unauthorized } = this.props.subscription
    if (options && current && active) {
      return (
        <div className="active-sub-content">
          <FormGroup key={"toggleRepoSubscription"}>
            {this.renderToggleOptions()}
          </FormGroup>
          <Button color="danger" onClick={this.deleteSubscriptions}>
            delete all subscriptions
          </Button>
        </div>
      );
    } else {
      if(unauthorized){
        return (
          <div className="disabled-sub-content">
            <Button color="secondary" disabled>
              activate subscriptions
            </Button>
            <p>You do not have permission to receive notifications for this repository</p>
          </div>
        );  
      }
      return (
        <div className="disabled-sub-content">
          <Button onClick={this.activateSubscriptions} color="success">
            activate subscriptions
          </Button>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <Jumbotron>
          <h5>Subscribe to notifications</h5>
          <p>You will receive notifications to your device if activated.</p>
          {this.renderContent()}
        </Jumbotron>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { login, subscription } = state;
  return { login, subscription };
};

export default connect(mapStateToProps)(Subscriptions);
