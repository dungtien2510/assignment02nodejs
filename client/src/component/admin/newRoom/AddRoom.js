import { Form, useLoaderData } from "react-router-dom";
import style from "./AddRoom.module.css";
import { useEffect, useState } from "react";
function AddRoom() {
  const data = useLoaderData();
  const { nameHotels, dataRoom } = data;
  console.log(data);

  //state value input
  const [valueTitle, setValueTitle] = useState("");
  const [valuePrice, setValuePrice] = useState("");

  const [valueDesc, setValueDesc] = useState("");
  const [valueMaxPeople, setValueMaxPeople] = useState("");
  const [valueRoomNumbers, setValueRoomNumbers] = useState([]);

  //if is edit
  useEffect(() => {
    if (dataRoom) {
      setValueTitle(dataRoom.title);
      setValuePrice(dataRoom.price);
     
      setValueDesc(dataRoom.desc);
      setValueMaxPeople(dataRoom.maxPeople);
      setValueRoomNumbers(dataRoom.roomNumbers);
    }
  }, [dataRoom]);

  //change value input
  const changeTitleHandler = (e) => {
    setValueTitle(e.target.value);
  };
  const changePriceHandler = (e) => {
    setValuePrice(e.target.value);
  };
  const changeMaxPeopleHandler = (e) => {
    setValueMaxPeople(e.target.value);
  };
  const changeDescHandler = (e) => {
    setValueDesc(e.target.value);
  };
 
  const changeRoomNumbersHandler = (e) => {
    setValueRoomNumbers(e.target.value);
  };

  return (
    <div className={style.addRoom}>
      <div className={style.header}>
        <h3>Add New Room</h3>
      </div>
      <Form method="POST">
        <div className={style.row1}>
          <div className={style.col}>
            <div>
              <label>Title</label>
              <input
                value={valueTitle}
                onChange={changeTitleHandler}
                type="text"
                name="title"
                placeholder="2 bed room"
              />
            </div>
            <div>
              <label>Price</label>
              <input
                value={valuePrice}
                onChange={changePriceHandler}
                type="number"
                name="price"
                placeholder="200"
                min="1"
              />
            </div>
            <div>
              <label>Choose a hotel</label>
              <select type="text" name="hotel">
                {nameHotels &&
                  nameHotels.map((item) => (
                    <option value={item._id} key={item._id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className={style.col}>
            <div>
              <label>Description</label>
              <input
                value={valueDesc}
                onChange={changeDescHandler}
                type="text"
                name="desc"
                placeholder="King size bed 1 bathroom"
              />
            </div>

            <div>
              <label>Max People</label>
              <input
                type="number"
                name="maxPeople"
                placeholder="2"
                min="1"
                max="2"
                value={valueMaxPeople}
                onChange={changeMaxPeopleHandler}
              />
            </div>
            <div className={style.col}>
              <label>Rooms</label>
              <textarea
                value={valueRoomNumbers.toString()}
                onChange={changeRoomNumbersHandler}
                name="roomNumbers"
                placeholder="give comma between room numbers."
              ></textarea>
            </div>
          </div>
        </div>

        <button type="submit">Send</button>
      </Form>
    </div>
  );
}
export default AddRoom;
