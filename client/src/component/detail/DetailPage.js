import React from "react";
import "./DetailPage.css";
import Img from "./Img";
import DetailHeader from "./DetailHeader";
import DetailContent from "./DetailContent";
import { useLoaderData, useRouteLoaderData } from "react-router";
function DetailPage() {
  // const detailData = require("../../data/detail.json");
  const data = useRouteLoaderData("detail-hotel");
  const detailData = data.dataHotel;

  return (
    <div className="detail">
      <DetailHeader
        name={detailData.name}
        address={detailData.address}
        cheapestPrice={detailData.cheapestPrice}
        distance={detailData.distance}
        id={detailData._id}
      />
      <Img photos={detailData.photos} />
      <DetailContent
        price={detailData.cheapestPrice}
        description={detailData.desc}
        title={detailData.title}
        id={detailData._id}
      />
    </div>
  );
}
export default DetailPage;
