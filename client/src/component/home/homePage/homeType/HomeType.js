import React from "react";
import "./HomeType.css";
import TypeItems from "./TypeItems";
function HomeType({ dataHotels }) {
  const typeHotels = [
    { type: "Hotel", data: dataHotels.filter((h) => h.type == "hotel") },
    {
      type: "Apartments",
      data: dataHotels.filter((h) => h.type == "apartments"),
    },
    { type: "Resorts", data: dataHotels.filter((h) => h.type == "resorts") },
    { type: "Villas", data: dataHotels.filter((h) => h.type == "villas") },
    { type: "Cabins", data: dataHotels.filter((h) => h.type == "cabins") },
  ];
  return (
    <div className="home-type">
      <h3>Browse by property type</h3>
      <TypeItems typeHotels={typeHotels} />
    </div>
  );
}
export default HomeType;
