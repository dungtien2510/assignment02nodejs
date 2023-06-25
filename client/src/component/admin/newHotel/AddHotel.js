import { Form, useLoaderData } from "react-router-dom";
import style from "./AddHotel.module.css";
import { useEffect, useState } from "react";
function AddHotel() {
  // data loader
  const data = useLoaderData();
  console.log(data);
  const { titleRoom, dataHotel } = data;

  const [valueRooms, setValueRooms] = useState([]);
  const [valueName, setValueName] = useState("");
  const [valueCity, setValueCity] = useState("");
  const [valueDistance, setValueDistance] = useState("");
  const [valueDescription, setValueDescription] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState("");
  const [address, setAddress] = useState("");
  const [titleHotel, setTitleHotel] = useState("");
  const [price, setPrice] = useState("");
  const [featured, setFeatured] = useState("");

  // if edit page
  useEffect(() => {
    if (dataHotel) {
      setValueName(dataHotel.name);
      setValueCity(dataHotel.city);
      setValueDistance(dataHotel.distance);
      setValueDescription(dataHotel.desc);
      setImage(dataHotel.photos.toString());
      setValueRooms(dataHotel.rooms);
      setTitleHotel(dataHotel.title);
      setPrice(dataHotel.cheapestPrice);
      setFeatured(dataHotel.featured);
      setAddress(dataHotel.address);
      setType(dataHotel.type);
    }
  }, [dataHotel]);

  // change handler
  const changeNameHandler = (e) => {
    setValueName(e.target.value);
  };
  const changeCityHandler = (e) => {
    setValueCity(e.target.value);
  };
  const changeDistanceHandler = (e) => {
    setValueDistance(e.target.value);
  };
  const changeDescriptionHandler = (e) => {
    setValueDescription(e.target.value);
  };
  const changeImageHandler = (e) => {
    setImage(e.target.value);
  };
  const changeTypeHandler = (e) => {
    setType(e.target.value);
  };
  const changeAddressHandler = (e) => {
    setAddress(e.target.value);
  };
  const changeTitleHandler = (e) => {
    setTitleHotel(e.target.value);
  };
  const changePriceHandler = (e) => {
    setPrice(e.target.value);
  };
  const changeFeaturedHandler = (e) => {
    setFeatured(e.target.value);
  };

  const changeInput = () => {};

  // change checkbox room
  const changeCheckboxHandler = (e) => {
    titleRoom.forEach((item) => {
      if (e.target.checked && e.target.value === item._id) {
        setValueRooms((prevState) => [...prevState, item._id]);
      }
      console.log(valueRooms);
      if (!e.target.checked && e.target.value === item._id) {
        const indexRoom = valueRooms.findIndex((i) => i === e.target.value);
        const a1 = valueRooms.slice(0, indexRoom);
        const a2 = valueRooms.slice(indexRoom + 1, valueRooms.length);
        setValueRooms([...a1, ...a2]);
      }
    });
    if (e.target.checked && valueRooms.some((i) => i === e.target.value)) {
      const indexRoom = valueRooms.findIndex((i) => i === e.target.value);
      const a1 = valueRooms.slice(0, indexRoom);
      const a2 = valueRooms.slice(indexRoom + 1, valueRooms.length);
      setValueRooms([...a1, ...a2]);
    }
  };
  console.log(valueRooms);
  return (
    <div className={style.addHotel}>
      <div className={style.header}>
        <h3>Add New Product</h3>
      </div>
      <Form method="POST">
        <div className={style.row1}>
          <div className={style.col}>
            <div>
              <label>Name</label>
              <input
                require="true"
                type="text"
                name="name"
                placeholder="My Hotel"
                value={valueName}
                onChange={changeNameHandler}
              />
            </div>
            <div>
              <label>City</label>
              <input
                require="true"
                type="text"
                name="city"
                placeholder="City"
                value={valueCity}
                onChange={changeCityHandler}
              />
            </div>
            <div>
              <label>Distance from City Center</label>
              <input
                require="true"
                type="number"
                name="distance"
                placeholder="500"
                min="1"
                value={valueDistance}
                onChange={changeDistanceHandler}
              />
            </div>
            <div>
              <label>Description</label>
              <input
                require="true"
                type="text"
                name="desc"
                placeholder="Description"
                value={valueDescription}
                onChange={changeDescriptionHandler}
              />
            </div>
            <div>
              <label>Image</label>
              <input
                require="true"
                type="text"
                name="image"
                value={image}
                onChange={changeImageHandler}
              />
            </div>
          </div>
          <div className={style.col}>
            <div>
              <label>Type</label>
              <input
                require="true"
                type="text"
                name="type"
                placeholder="Hotel"
                value={type}
                onChange={changeTypeHandler}
              />
            </div>
            <div>
              <label>Address</label>
              <input
                require="true"
                type="text"
                name="address"
                placeholder="elton st, 216"
                value={address}
                onChange={changeAddressHandler}
              />
            </div>
            <div>
              <label>Title</label>
              <input
                require="true"
                type="text"
                name="title"
                placeholder="The best Hotel"
                value={titleHotel}
                onChange={changeTitleHandler}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                require="true"
                type="number"
                name="price"
                placeholder="100"
                min="1"
                value={price}
                onChange={changePriceHandler}
              />
            </div>
            <div>
              <label>Featured</label>
              <select
                name="featured"
                value={featured}
                onChange={changeFeaturedHandler}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </div>
        </div>
        <div className={style.row2}>
          <label>Rooms</label>
          <div className={style.checkbox}>
            {titleRoom.map((item) => (
              <div
                className={style.checkboxItem}
                key={item._id}
                onClick={changeCheckboxHandler}
              >
                <label htmlFor={item._id}>{item.title}</label>
                <input
                  type="checkbox"
                  // onChange={changeCheckboxHandler}
                  onChange={changeInput}
                  value={item._id}
                  id={item._id}
                  checked={valueRooms.some((id) => id === item._id)}
                />
              </div>
            ))}
            <input
              name="rooms"
              value={valueRooms.toString()}
              onChange={changeInput}
              hidden
            />
          </div>
        </div>
        <button type="submit">Send</button>
      </Form>
    </div>
  );
}
export default AddHotel;
