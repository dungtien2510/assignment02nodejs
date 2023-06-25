import { Link, useLoaderData, Form, NavLink } from "react-router-dom";
import style from "./Room.module.css";
function Room() {
  const dataRooms = useLoaderData();
  const changeHandler = () => {};
  return (
    <div className={style.room}>
      <div className={style.header}>
        <h3>Rooms List</h3>
        <Link to="/admin/addRoom">Add New</Link>
      </div>
      <table>
        <thead>
          <tr className={style.tableHeader}>
            <td>
              <input type="checkbox" />
            </td>
            <td>ID</td>
            <td>Title</td>
            <td>Description</td>
            <td>Price</td>
            <td>Max People</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {dataRooms &&
            dataRooms.map((item) => {
              return (
                <tr key={item._id} className={style.tableItem}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{item._id}</td>
                  <td>{item.title}</td>
                  <td style={{ width: "400px" }}>{item.desc}</td>
                  <td>{item.price}</td>
                  <td>{item.maxPeople}</td>
                  <td className={style.form}>
                    <Form method="POST">
                      <input
                        name="delete"
                        value={item._id}
                        onChange={changeHandler}
                        hidden
                      />
                      <button className={style.delete} type="submit">
                        Delete
                      </button>
                    </Form>

                    <NavLink
                      className={style.edit}
                      to={`/admin/addRoom?edit=${item._id}`}
                    >
                      Edit
                    </NavLink>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
export default Room;
