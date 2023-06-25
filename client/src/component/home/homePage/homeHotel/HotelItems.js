import React from "react";
import "./HotelItems.css";
import { Link } from "react-router-dom";
function HotelItems(props) {
  const hotelItem = props.hotelData;

  return (
    <div className="hotel">
      {hotelItem.map((item) => {
        return (
          <div className="hotel-item" key={item.name}>
            <img
              src={item.photos[0]}
              alt={item.name}
              className="hotel-item__img"
              width="280px"
              height="300px"
            />
            <div className="hotel-item__content">
              <Link
                to={`/detail?id=${item._id}`}
                className="item-content__name"
              >
                <strong>{item.name}</strong>
              </Link>
              <p className="item-content__city">{item.city}</p>
              <h4 className="item-content__price">{`Starting from $${item.cheapestPrice}`}</h4>
              <div className="item-content__rateType">
                <span id="content-rate">{item.rating}</span>
                <span id="content-type">{item.type}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default HotelItems;
