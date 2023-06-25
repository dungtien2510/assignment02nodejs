import { Form, Link, NavLink, useLoaderData } from "react-router-dom";
import style from "./Hotel.module.css";

function Hotel() {
  const changeHandler = () => {};

  const dataHotel = useLoaderData();
  console.log(dataHotel);
  return (
    <div className={style.hotels}>
      <div className={style.header}>
        <h3>Hotels List</h3>
        <Link to="/admin/addHotel">Add New</Link>
      </div>
      <table>
        <thead>
          <tr className={style.tableHeader}>
            <td>
              <input type="checkbox" />
            </td>
            <td>ID</td>
            <td>Name</td>
            <td>Type</td>
            <td>Title</td>
            <td>City</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {dataHotel.map((item) => {
            return (
              <tr key={item._id} className={style.tableItem}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{item.title}</td>
                <td>{item.city}</td>
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
                    to={`/admin/addHotel?edit=${item._id}`}
                  >
                    Edit
                  </NavLink>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <div className={style.page}>
        <p>{`${page}-${qualityPage}of${qualityPage}`}</p>
        <Form method='POST'>
         <input type= 
        </Form>
      </div> */}
    </div>
  );
}
export default Hotel;
