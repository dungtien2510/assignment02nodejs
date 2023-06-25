import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Items.css";
function Items(props) {
  console.log(props.icon);
  return (
    <div className={props.active ? "items active" : "items"}>
      <FontAwesomeIcon icon={`fa-solid ${props.icon}`} />
      <span className="items-title">{props.type}</span>
    </div>
  );
}
export default Items;
