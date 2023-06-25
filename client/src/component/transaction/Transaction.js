import { useLoaderData } from "react-router";
import style from "./Transaction.module.css";

function Transaction() {
  const dataTransaction = useLoaderData();
  console.log(dataTransaction);

  //numbers room
  const numberRooms = (rooms) => {
    const array = [];
    const roomNumbers = rooms.reduce((acc, room) => {
      return (acc = acc.concat(room.roomNumbers));
    }, array);
    return roomNumbers.toString();
  };

  //date book
  const dateBook = (dStart, dEnd) => {
    const start = new Date(dStart);
    const end = new Date(dEnd);
    const dateStart =
      start.getDate() +
      "/" +
      (Number(start.getMonth()) + 1) +
      "/" +
      start.getFullYear();
    const dateEnd =
      end.getDate() +
      "/" +
      (Number(end.getMonth()) + 1) +
      "/" +
      end.getFullYear();
    const result = dateStart + " - " + dateEnd;
    return result;
  };

  return (
    <div className={style.tranList}>
      <h2>Your Transaction</h2>
      <table>
        <thead>
          <tr>
            <td>#</td>
            <td>Hotel</td>
            <td>Room</td>
            <td>Date</td>
            <td>Price</td>
            <td>Payment Method</td>
            <td>Status</td>
          </tr>
        </thead>
        <tbody>
          {dataTransaction &&
            dataTransaction.map((item, i) => (
              <tr key={item._id}>
                <td>{i + 1}</td>
                <td>{item.hotel.hotelName}</td>
                <td>{numberRooms(item.rooms)}</td>
                <td>{dateBook(item.dateStart, item.dateEnd)}</td>
                <td>{`$ ${item.price}`}</td>
                <td>{item.payment}</td>
                <td>
                  <span className={style[item.status]}>{item.status}</span>
                </td>
              </tr>
            ))}
          {!dataTransaction && <tr>There is no data</tr>}
        </tbody>
      </table>
    </div>
  );
}
export default Transaction;
