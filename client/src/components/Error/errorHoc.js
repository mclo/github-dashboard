import React from "react";
import { connect } from "react-redux";
import PageNotFound from "./PageNotFound";
import DefaultError from "./DefaultError";
import { clearErrorAndRedirectToLogin } from './errorActions'

export default function errorHandler(ChildComponent){
  const HandleError = props => {
    const { code } = props.error

    console.log('getting to error handler!', code)
    if (!code) {
      return <ChildComponent {...props}/>;
    }
    if (code === 401 || code === 403) {
      if(props.location.pathname !== '/'){
        props.dispatch(clearErrorAndRedirectToLogin)
      }
      return <ChildComponent />
    }
    if (code === 404) {
      return <PageNotFound />;
    }
    else{
      return <DefaultError code={code} />
    }
  };

  function mapStateToProps(state) {
    const { error } = state;
    return { error }
  }

  return connect(mapStateToProps)(HandleError);
};
