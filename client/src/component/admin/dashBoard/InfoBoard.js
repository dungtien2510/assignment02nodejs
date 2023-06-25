import { useLoaderData } from "react-router";
import style from "./InfoBoard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function InfoBoard() {
  const data = useLoaderData();
  const { dataDash, dataTransaction } = data;
  const totalPrice = dataTransaction.reduce(
    (acc, value) => acc + Number(value.price),
    0
  );
  return (
    <div className={style.info}>
      <div className={style.user}>
        <h5>USER</h5>
        <p>{dataDash}</p>

        <FontAwesomeIcon
          icon="fa-user"
          style={{ backgroundColor: "#ffc9c9", color: "#f03e3e" }}
        />
      </div>
      <div className={style.orders}>
        <h5>ORDERS</h5>
        <p>{dataTransaction.length}</p>
        <FontAwesomeIcon
          icon="fa-shopping-cart"
          style={{ backgroundColor: "#ffec99", color: "#f59f00" }}
        />
      </div>
      <div className={style.earnigs}>
        <h5>EARNINGS</h5>
        <p>{`$ ${totalPrice}`}</p>
        <FontAwesomeIcon
          icon="fa-usd"
          style={{ backgroundColor: "#b2f2bb", color: "#37b24d" }}
        />
      </div>
      <div className={style.balance}>
        <h5>BALANCE</h5>
        <p>{`$ ${totalPrice}`}</p>
        <FontAwesomeIcon
          icon="fa-suitcase"
          style={{ backgroundColor: "#eebefa", color: "#ae3ec9" }}
        />
      </div>
    </div>
  );
}
export default InfoBoard;
