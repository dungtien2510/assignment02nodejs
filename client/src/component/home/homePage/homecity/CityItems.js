import React from "react";
import "./CityItems.css";
import { Link } from "react-router-dom";
function CityItems({ cityHotels }) {
  console.log(cityHotels);
  return (
    <div className="city">
      {cityHotels.map((item) => {
        return (
          <div className="city-item" key={item.name}>
            <Link to="">
              <div className="city-content">
                <h3 className="city-item__name">{item.name}</h3>
                <p className="city-item__population">{`${item.properties} Properties`}</p>
              </div>
              <img
                className="city-item__img"
                src={item.img}
                alt={item.name}
                width="370px"
                height="100%"
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
export default CityItems;
