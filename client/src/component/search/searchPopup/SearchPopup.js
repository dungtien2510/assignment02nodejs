import React from "react";
import "./SearchPopup.css";

function SearchPopup() {
  return (
    <form className="searchPopup">
      <h2>Search</h2>
      <div className="searchPopup-destination">
        <label className="searchPopup-destination__label">Destination</label>
        <input
          type="text"
          className="searchPopup-destination__input"
          name="destination"
        />
      </div>
      <div className="searchPopup-date">
        <label className="searchPopup-date__label">Check-in Date</label>
        <input
          type="date"
          className="searchPopup-date__input"
          name="startDate"
        />
      </div>
      <div className="search-options">
        <div className="search-options__header">Options</div>
        <div className="search-options__content">
          <div className="search-options__minPrice">
            <label>Min price per night</label>
            <input type="number" name="minPrice" min="1" />
          </div>
          <div className="search-options__maxPrice">
            <label>Max price per night</label>
            <input type="number" name="maxPrice" min="1" />
          </div>
          <div className="search-options__adult">
            <label>Adult</label>
            <input type="number" name="adult" min="1" />
          </div>
          <div className="search-options__children">
            <label>Children</label>
            <input type="number" name="children" min="1" />
          </div>
          <div className="search-options__room">
            <label>Room</label>
            <input type="number" name="room" min="1" />
          </div>
        </div>
      </div>
      <button type="submit" className="searchPopup-btn">
        Search
      </button>
    </form>
  );
}
export default SearchPopup;
