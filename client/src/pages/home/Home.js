import HomePage from "../../component/home/homePage/HomePage";
import Header from "../../component/home/header/Header";
import { json, redirect } from "react-router";
import { getAuthUserId } from "../../util/token";
import { useEffect } from "react";

const Home = () => {
  return (
    <div>
      <Header />
      <HomePage />
    </div>
  );
};

export default Home;

export async function loader() {
  const userId = getAuthUserId() ? getAuthUserId()._id : "";
  console.log(userId);
  const response = await fetch("http://localhost:5000/hotels", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: userId,
    },
    body: null,
  });
  if (response.status === 401) {
    alert("Please Login");
    return redirect("/auth?mode=login");
  }
  if (!response.ok) {
    throw json({ message: "fetch failed" }, { status: 500 });
  }

  const data = await response.json();
  return data;
}

// action Form search
// export async function action({ request }) {
//   const data = await request.formData();
//   const dataSearch = {
//     city: data.get("city"),
//     dateStart: data.get("dateStart"),
//     dateEnd: data.get("dateEnd"),
//     maxPeople: data.get("maxPeople"),
//   };
//   // const userId = getAuthUserId() ? getAuthUserId()._id : "";

//   // const response = await fetch("http://localhost:5000/hotel/search", {
//   //   method: "POST",
//   //   headers: {
//   //     "Content-Type": "application/json",
//   //     Authorization: userId,
//   //   },
//   //   body: JSON.stringify(dataSearch),
//   // });
//   // if (!response.ok) {
//   //   throw json({ message: "Error creating" }, { status: 404 });
//   // }
//   // const result = await response.json();
//   console.log(dataSearch);

//   // return redirect(
//   //   `/search?city=${dataSearch.city}&date=${dataSearch.dateStart}&dateEnd=${dataSearch.dateEnd}&maxPeople=${dataSearch.maxPeople}`
//   // );
// }
