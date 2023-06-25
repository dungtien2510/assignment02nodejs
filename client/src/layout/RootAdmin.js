import { Outlet } from "react-router";

import style from "./RootAdmin.module.css";
import Sidebar from "../component/admin/sideBar/Sidebar";
function RootAdmin() {
  return (
    <div className={style.layout}>
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
export default RootAdmin;
