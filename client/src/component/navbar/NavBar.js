import React from "react";
import "./NavBar.css";
import NavBarItems from "./NavBarItems";
import NavBarHeader from "./NavBarHeader";
import BackgoundGreen from "../../UI/BackgoundGreen";
function NavBar() {
  const navBarData = require("../../data/navBar.json");
  return (
    <BackgoundGreen>
      <div className="navBar">
        <NavBarHeader />
        <NavBarItems items={navBarData} />
      </div>
    </BackgoundGreen>
  );
}
export default NavBar;
