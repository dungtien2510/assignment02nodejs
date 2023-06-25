import { useLoaderData } from "react-router";
import style from "./User.module.css";

function Users() {
  const dataUser = useLoaderData();
  return (
    <div className={style.users}>
      <h2>Users</h2>
      <table>
        <thead>
          <tr className={style.tableHeader}>
            <td>
              <input type="checkbox" />
            </td>
            <td>ID</td>
            <td>User</td>
            <td>Full Name</td>
            <td>Email</td>
            <td>Phone</td>
            <td>Card Number</td>
          </tr>
        </thead>
        <tbody>
          {dataUser &&
            dataUser.map((item, i) => (
              <tr key={item._id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{item._id}</td>
                <td>{item.userName}</td>
                <td>{item.fullName ? item.fullName : "no full name"}</td>
                <td>{item.email ? item.email : "no email"}</td>
                <td>{item.phoneNumber ? item.phoneNumber : "no phone"}</td>

                <td>
                  <span className={item.isAdmin ? style.admin : style.noAdmin}>
                    {item.isAdmin ? "Admin" : "No Admin"}
                  </span>
                </td>
              </tr>
            ))}
          {!dataUser && <tr>There is no data</tr>}
        </tbody>
      </table>
    </div>
  );
}
export default Users;
