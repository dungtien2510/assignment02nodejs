import React, { useEffect, useState } from "react";
import "./SearchList.css";
import SearchItem from "./SearchItem";
import useHttp from "../../../hooks/useHttp";
function SearchList() {
  const searchItems = require("../../../data/search.json");

  const [searchData, setSearchData] = useState("");

  const { error, isLoading, sendRequest: fetchSearchData } = useHttp();
  const applyData = (data) => {
    setSearchData(data);
  };
  useEffect(() => {
    fetchSearchData({ url: "/hotels/search" }, applyData);
  }, []);
  return (
    <div className="search-list">
      {searchItems.map((item) => {
        return <SearchItem key={item.name} item={item} />;
      })}
    </div>
  );
}
export default SearchList;
