import React from "react";
import Items from "./Items";
import "./NavBarItems.css";
function NavBarItems(props) {
  const items = props.items;
  return (
    <div className="navbar-items">
      {items.map((item) => {
        return <Items key={item.type} type={item.type} icon={item.icon} active={item.active} />;
      })}
    </div>
  );
}
export default NavBarItems;
