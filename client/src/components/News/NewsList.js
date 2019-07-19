import React from "react";
import { DropdownItem, DropdownMenu } from "reactstrap";

const EventsList = ({ events }) => {
  let list = getList(events);
  return <DropdownMenu>{list}</DropdownMenu>;
};

const getList = events => {
  return events.map(event => {
    let style = getStyle(event);
    let text = getText(event);

    return (
      <DropdownItem
        style={style}
        key={event._id}
        onClick={() => reroute(event.url)}
      >
        {text}
      </DropdownItem>
    );
  });
};

const getStyle = event => {
  let styleNewItem = {
    backgroundColor: "#ff9999"
  };

  let styleItem = {
    backgroundColor: "white"
  };

  return event.seen ? styleItem : styleNewItem;
};

const getText = event => {
  return event.repo_name + ": " + event.event + " updated";
};

const reroute = url => {
  window.location = url;
};

export default EventsList;
