import React, { useEffect, useState } from "react";
import "./SearchPage.css";
import SearchList from "./searchList/SearchList";
import SearchPopup from "./searchPopup/SearchPopup";
import useHttp from "../../hooks/useHttp";
import { useSearchParams } from "react-router-dom";
function SearchPage() {
  const [searchHotel, setSearchHotel] = useState("");
  const { error, isLoading, sendRequest: fetchSearch } = useHttp();
  const [searchParams] = useSearchParams();
  const dataSearch = {
    destination: searchParams.get("destination"),
    startDate: searchParams.get("startDate"),
    minPrice: searchParams.get("minPrice"),
    maxPrice: searchParams.get("maxPrice"),
    children: searchParams.get("children"),
    room: searchParams.get("room"),
    adult: searchParams.get("adult"),
  };
  // const applyData = (data) => {
  //   setSearchHotel(data);
  // };
  // useEffect(() => {
  //   fetchSearch(
  //     {
  //       url: "/hotels/search",
  //       method: "POST",
  //       dataBody: dataSearch,
  //     },
  //     applyData
  //   );
  // }, []);
  return (
    <div className="searchPage">
      <SearchPopup />
      <SearchList searchHotel={searchHotel} />
    </div>
  );
}
export default SearchPage;
