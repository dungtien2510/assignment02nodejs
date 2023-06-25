import React from "react";
import HeaderSearch from "./HeaderSearch";
import "./Header.css";
import BackgoundGreen from "../../../UI/BackgoundGreen";
function Header() {
  return (
    <BackgoundGreen>
      <div className="header">
        <div className="header-container">
          <h1>Alifetime of discounts? It's Genius.</h1>
          <p>
            Get rewarded for your travels - unlock instant savings of 10% of
            more with a free account
          </p>
          <button type="button" className="header-container__btn">
            Sign in / Register
          </button>
        </div>
        <HeaderSearch />
      </div>
    </BackgoundGreen>
  );
}
export default Header;
