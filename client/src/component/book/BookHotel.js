import { Form, useRouteLoaderData } from "react-router-dom";
import { DateRange } from "react-date-range";
import style from "./BookHotel.module.css";
import { useState } from "react";

function BookHotel() {
  const [valueRooms, setValueRooms] = useState([]);

  // total price
  const [valuePrice, setValuePrice] = useState(0);

  // get data rooms
  const data = useRouteLoaderData("detail-hotel");
  const { dataRooms, dataHotel } = data;
  console.log(data);
  // state date
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // change input handler
  const changeHandler = () => {};

  // calculate Price
  const calculatePrice = (d1, d2, priceRoom) => {
    const difference = d1.getTime() - d2.getTime();
    const totalDays = Math.ceil(difference / (1000 * 3600 * 24));
    const totalPrice = totalDays * priceRoom;
    return totalPrice;
  };

  //change rooms input checkbox
  const changeRoomsHandler = (e) => {
    console.log(e.target.parentElement.parentElement.id);
    if (dataRooms.length > 0) {
      const idRooms = e.target.parentElement.parentElement.id;

      const room = dataRooms.find((r) => {
        return r._id === idRooms;
      });

      if (room) {
        room.roomNumbers.forEach((rm) => {
          if (e.target.checked && e.target.value === rm.toString()) {
            const roomId = valueRooms.find((idR) => {
              return idR.id === room._id;
            });
            console.log(roomId);
            // kiểm tra xem đã có room id đó trong room chưa
            // nếu có thì chỉ thêm số phòng vào
            if (roomId) {
              roomId.roomNumbers.push(rm);
              const addRoomNumber = {
                id: roomId.id,
                roomNumbers: roomId.roomNumbers,
              };

              const indexRoomClear = valueRooms.findIndex(
                (item) => item.id === roomId.id
              );
              const a1 = valueRooms.slice(0, indexRoomClear);
              const a2 = valueRooms.slice(
                indexRoomClear + 1,
                valueRooms.length
              );
              setValueRooms([...a1, addRoomNumber, ...a2]);
              const roomPrice = calculatePrice(
                state[0].endDate,
                state[0].startDate,
                room.price
              );
              setValuePrice((prevState) => prevState + Number(roomPrice));
            }
            // nếu không có thì thêm object room gồm id và roomNumber vào
            else {
              setValueRooms((prevState) => [
                ...prevState,
                { id: room._id, roomNumbers: [rm] },
              ]);
              const roomPrice = calculatePrice(
                state[0].endDate,
                state[0].startDate,
                room.price
              );

              setValuePrice((prevState) => prevState + Number(roomPrice));
            }
          }
          // nếu bỏ checked vào các checkbox đã chọn
          if (!e.target.checked && e.target.value === rm.toString()) {
            // tìm room trong valueRooms
            const roomChecked = valueRooms.find((r) => r.id === room._id);

            // index của room trong valueRooms click vào
            const roomIndex = valueRooms.findIndex(
              (r) => r.id === roomChecked.id
            );

            //phần trước và sau của valueRooms không có room đã change
            const a3 = valueRooms.slice(0, roomIndex);
            const a4 = valueRooms.slice(roomIndex + 1, valueRooms.length);

            // set value price
            const roomPrice = calculatePrice(
              state[0].endDate,
              state[0].startDate,
              room.price
            );

            setValuePrice((prevState) => prevState - roomPrice);

            //nếu còn nhiều phòng khác
            if (roomChecked && roomChecked.roomNumbers.length > 1) {
              const roomNumberDelete = roomChecked.roomNumbers.findIndex(
                (r) => r.toString() === e.target.value
              );

              const a1 = roomChecked.roomNumbers.slice(0, roomNumberDelete);
              const a2 = roomChecked.roomNumbers.slice(
                roomNumberDelete + 1,
                roomChecked.roomNumbers.length
              );
              const newRoomNumber = [...a1, ...a2];
              const newRoom = {
                id: roomChecked.id,
                roomNumbers: newRoomNumber,
              };

              //thay đổi valueRooms

              setValueRooms([...a3, newRoom, ...a4]);
            } else {
              setValueRooms([...a3, ...a4]);
            }
          }
        });
      }
    }
  };

  // price for the total
  console.log(valuePrice);

  const endDateBook = `${state[0].endDate.getDate()}/${
    state[0].endDate.getMonth() + 1
  }/${state[0].endDate.getFullYear()}`;
  const startDateBook = `${state[0].startDate.getDate()}/${
    state[0].startDate.getMonth() + 1
  }/${state[0].startDate.getFullYear()}`;
  console.log(endDateBook, startDateBook);
  return (
    <Form method="POST" className={style.bookForm}>
      <div className={style.info}>
        <div className={style.header}>
          <h2>Dates</h2>
          <DateRange
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            onChange={(item) => setState([item.selection])}
            ranges={state}
            className={style.date}
            minDate={new Date()}
          />
        </div>

        <div className={style.formReseve}>
          <h2>Resever info</h2>
          <div className={style.reseverInput}>
            <label htmlFor="name">Your Full Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Full Name"
              required={true}
            />
          </div>
          <div className={style.reseverInput}>
            <label htmlFor="email">Your Email:</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              required={true}
            />
          </div>
          <div className={style.reseverInput}>
            <label htmlFor="phone">Your phone Number:</label>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="phone number"
              required={true}
            />
          </div>
          <div className={style.reseverInput}>
            <label htmlFor="card">Your identity card number:</label>
            <input
              type="text"
              name="card"
              id="card"
              placeholder="card number"
              required={true}
            />
          </div>
        </div>
      </div>
      <div className={style.selectRooms}>
        <h2>Select Rooms</h2>
        <div className={style.content}>
          {dataRooms &&
            dataRooms.map((item) => (
              <div key={item._id} className={style.rooms} id={item._id}>
                <div className={style.contentRooms}>
                  <p>
                    <strong>{item.title}</strong>
                  </p>
                  <p>{item.desc}</p>
                  <p>{`Max People: ${item.maxPeople}`}</p>
                  <p>
                    <strong>{`$ ${item.price}`}</strong>
                  </p>
                </div>
                {item.roomNumbers &&
                  item.roomNumbers.map((i) => (
                    <div className={style.roomNumbers} key={i}>
                      <label htmlFor={item._id + i}>{i}</label>
                      <input
                        type="checkbox"
                        name="roomNumbers"
                        id={item._id + i}
                        value={i}
                        onChange={changeRoomsHandler}
                      />
                    </div>
                  ))}
              </div>
            ))}
          <input
            type="text"
            name="rooms"
            value={JSON.stringify(valueRooms)}
            onChange={changeHandler}
            hidden
          />
          <input
            type="text"
            name="hotel"
            value={JSON.stringify({
              id: dataHotel._id,
              hotelName: dataHotel.name,
            })}
            onChange={changeHandler}
            hidden
          />
          <input
            type="text"
            name="dateStart"
            value={state[0].startDate}
            onChange={changeHandler}
            hidden
          />
          <input
            type="text"
            name="dateEnd"
            value={state[0].endDate}
            onChange={changeHandler}
            hidden
          />
          <input
            type="number"
            name="price"
            value={valuePrice}
            onChange={changeHandler}
            hidden
          />
          <input
            type="text"
            name="status"
            value={"booked"}
            onChange={changeHandler}
            hidden
          />
        </div>
      </div>
      <div className={style.payment}>
        <h2>Total Bill </h2>
        <div>
          <select required={true} name="payment">
            <option value="">Select payment method</option>
            <option value="cash">Cash</option>
            <option value="credit Card">Credit Card</option>
          </select>
          {valueRooms.length === 0 && (
            <button type="submit" className={style.btnDisabled} disabled>
              Resever Now
            </button>
          )}
          {valueRooms.length > 0 && <button type="submit">Resever Now</button>}
        </div>
      </div>
    </Form>
  );
}
export default BookHotel;
