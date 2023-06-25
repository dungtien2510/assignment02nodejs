import React from "react";
import "./NavBarHeader.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getAuthUserId } from "../../util/token";
function NavBarHeader() {
  const user = getAuthUserId();
  console.log(user);
  const navigate = useNavigate();
  //click logout
  const clickLogoutHandler = () => {
    localStorage.removeItem("userId");
    navigate("/auth?mode=login");
  };

  return (
    <div className="navbar-header">
      <h3 className="navbar-header__title">
        <Link to=""> Booking Website</Link>
      </h3>
      <div className="navbar-header__button">
        {!user && (
          <NavLink to="/auth?mode=signup" className="button-register">
            signup
          </NavLink>
        )}
        {user && (
          <>
            <p>{user.userName}</p>
            <NavLink to="/transaction" className="button-login">
              Transaction
            </NavLink>
          </>
        )}
        {user && (
          <button
            type="button"
            onClick={clickLogoutHandler}
            className="button-login"
          >
            Logout
          </button>
        )}
        {!user && (
          <NavLink to={`/auth?mode=login`} className="button-login">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
}
export default NavBarHeader;
