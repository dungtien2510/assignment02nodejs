import { NavLink, useNavigate } from "react-router-dom";
import style from "./Sidebar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Sidebar() {
  const navigate = useNavigate();
  const clickLogoutHandler = () => {
    localStorage.removeItem("userId");
    navigate("/auth?mode=login");
  };
  return (
    <div className={style.navbar}>
      <div className={style.header}>
        <h2>Admin Page</h2>
      </div>
      <div className={style.nav}>
        <ul className={style.main}>
          <h5>MAIN</h5>
          <li>
            <NavLink
              to="dashBoard"
              className={({ isActive }) =>
                isActive ? style.active : undefined
              }
            >
              <FontAwesomeIcon icon="fa-th" style={{ marginRight: "5px" }} />
              DashBoard
            </NavLink>
          </li>
        </ul>
        <ul className={style.lists}>
          <h5>LIST</h5>

          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? style.active : undefined
              }
              to="user"
            >
              <FontAwesomeIcon icon="fa-user" style={{ marginRight: "5px" }} />
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? style.active : undefined
              }
              to="hotels"
            >
              <FontAwesomeIcon icon="fa-home" style={{ marginRight: "5px" }} />
              Hotels
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? style.active : undefined
              }
              to="rooms"
            >
              <FontAwesomeIcon
                icon="fa-archive"
                style={{ marginRight: "5px" }}
              />
              Rooms
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? style.active : undefined
              }
              to="transaction"
            >
              <FontAwesomeIcon icon="fa-truck" style={{ marginRight: "5px" }} />
              Transactions
            </NavLink>
          </li>
        </ul>
        <ul className={style.new}>
          <h5>NEW</h5>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? style.active : undefined
              }
              to="addHotel"
            >
              <FontAwesomeIcon icon="fa-home" style={{ marginRight: "5px" }} />
              New Hotel
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? style.active : undefined
              }
              to="addRoom"
            >
              <FontAwesomeIcon
                icon="fa-archive"
                style={{ marginRight: "5px" }}
              />
              New Room
            </NavLink>
          </li>
        </ul>
        <ul className={style.user}>
          <h5>USER</h5>
          <li>
            <button className={style.btn} onClick={clickLogoutHandler}>
              <FontAwesomeIcon
                icon="fa-sign-out"
                style={{ marginRight: "5px" }}
              />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Sidebar;
