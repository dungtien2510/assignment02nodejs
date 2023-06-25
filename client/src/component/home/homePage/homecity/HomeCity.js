import React from "react";
import "./HomeCity.css";
import CityItems from "./CityItems";
function HomeCity({ quatityHotel }) {
  const cityHotels = [
    {
      name: "Da Nang",
      properties: quatityHotel.quatityHotelDN,
      img: "./images/city Image/Da Nang.jpg",
    },
    {
      name: "Ha Noi",
      properties: quatityHotel.quatityHotelHN,
      img: "./images/city Image/Ha Noi.jpg",
    },
    {
      name: "Ho Chi Minh",
      properties: quatityHotel.quatityHotelHCM,
      img: "./images/city Image/HCM.jpg",
    },
  ];
  return (
    <div className="home-city">
      <CityItems cityHotels={cityHotels} />
    </div>
  );
}
export default HomeCity;
