import React, { useState } from "react";
import DatePicker from "./DatePicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./HeaderSearch.css";
import useHttp from "../../../hooks/useHttp";
import { redirect, useNavigate } from "react-router";
import { Form, Link, useSubmit } from "react-router-dom";
function HeaderSearch() {
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [valueCity, setValueCity] = useState("");
  const [valuePeopleRoom, setValuePeopleRoom] = useState("");

  // change handler input
  const changeCityHandler = (e) => {
    setValueCity(e.target.value);
  };
  const changePeopleRoomHandler = (e) => {
    setValuePeopleRoom(e.target.value);
  };

  const navigate = useNavigate();
  //submit handler
  // const submit = useSubmit();
  // const goToSearch = (event) => {
  //   submit(
  //     {
  //       city: valueCity,
  //       dateStart: dateStartInput,
  //       dateEnd: dateEndInput,
  //       maxPeople: valueMaxPeople,
  //     },
  //     { method: "POST", action: "/home" }
  //   );
  //   // navigate("/search");
  //   // event.preventDefault();
  //   // const city = event.target[0].value;
  //   // const dateStart = event.target[1].value;
  //   // const dateEnd = event.target[2].value;
  //   // const maxPeople = event.target[3].value;
  //   // console.log(event.target[1].value);
  // };

  const [dateInput, setDateInput] = useState("");
  const [isPicker, setIsPicker] = useState(false);
  const openPicker = () => {
    setIsPicker(true);
  };
  const changeValue = (value) => {
    setDate(value);
    setIsPicker(false);
  };
  const changeHandler = (e) => {
    // const d = new Date(e.target.value);
    // setDateInput(d);
  };
  const isCancel = (e) => {
    setIsPicker(e);
  };

  //chuyển startDate thành yyyy/mm/dd
  const dateStartInput =
    date[0].startDate.getFullYear() +
    "-" +
    (date[0].startDate.getMonth() + 1 < 9
      ? "0" + (date[0].startDate.getMonth() + 1)
      : date[0].startDate.getMonth() + 1) +
    "-" +
    (date[0].startDate.getDate() < 9
      ? "0" + date[0].startDate.getDate()
      : date[0].startDate.getDate());
  console.log(dateStartInput);

  //chuyển endDate thành yyyy/mm/dd
  const dateEndInput =
    date[0].endDate.getFullYear() +
    "-" +
    (date[0].endDate.getMonth() + 1 < 9
      ? "0" + (date[0].endDate.getMonth() + 1)
      : date[0].endDate.getMonth() + 1) +
    "-" +
    (date[0].endDate.getDate() < 9
      ? "0" + date[0].endDate.getDate()
      : date[0].endDate.getDate());

  return (
    <Form className="header-search" action="/home">
      <div className="header-search__where">
        <FontAwesomeIcon icon="fa-bed" />
        <input
          type="text"
          name="city"
          className="header-search__input header-search__inputWhere"
          placeholder="Where are you going?"
          value={valueCity}
          onChange={changeCityHandler}
        />
      </div>
      <div className="header-search__date">
        <label onClick={openPicker}>
          <FontAwesomeIcon icon="fa-calendar-days" />
          {`${date[0].startDate.toLocaleDateString(
            "vn-VN"
          )} - ${date[0].endDate.toLocaleDateString("vn-VN")}`}
        </label>
        <input
          type="date"
          onChange={changeHandler}
          value={dateStartInput}
          name="dateStart"
          hidden
        />
        <input
          type="date"
          onChange={changeHandler}
          value={dateEndInput}
          name="dateEnd"
          hidden
        />
        {!isPicker && ""}
        {isPicker && <DatePicker edit={isCancel} value={changeValue} />}
      </div>
      <div className="header-search__adult">
        <label>
          <FontAwesomeIcon icon="fa-person" />
        </label>
        <input
          className="header-search__input header-search__inputWhere"
          placeholder="1 preson - 1 room"
          type="text"
          name="peopleRoom"
          value={valuePeopleRoom}
          onChange={changePeopleRoomHandler}
        />
      </div>

      <Link
        to={`/search?city=${valueCity}&date=${dateStartInput}&dateEnd=${dateEndInput}&maxPeople=${
          valuePeopleRoom.split("-")[0]
        }&room=${valuePeopleRoom.split("-")[1]}`}
        className="header-search__btn"
      >
        Search
      </Link>
    </Form>
  );
}
export default HeaderSearch;
