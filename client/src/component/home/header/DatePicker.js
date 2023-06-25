import { DateRange } from "react-date-range";
import React, { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./DatePicker.css";
function DatePicker(props) {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const newValue = (event) => {
    event.preventDefault();
    props.value(state);
  };
  const cancelPick = (e) => {
    e.preventDefault();
    props.edit(false);
  };
  return (
    <div className="date-picker">
      <DateRange
        editableDateInputs={true}
        moveRangeOnFirstSelection={false}
        onChange={(item) => setState([item.selection])}
        ranges={state}
        className="date"
        minDate={new Date()}
      />
      <div className="data-picker__btn">
        <button onClick={cancelPick} className="btn-cancel">
          Cancel
        </button>
        <button onClick={newValue} className="btn-newDate">
          New Date
        </button>
      </div>
    </div>
  );
}
export default DatePicker;
