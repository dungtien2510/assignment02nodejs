import SearchPage from "../../component/search/SearchPage";

import Form from "../../component/home/homePage/form/Form";
import { getAuthUserId } from "../../util/token";
import { json, redirect } from "react-router";

const Search = () => {
  return (
    <div>
      <SearchPage />
      <Form />
    </div>
  );
};

export default Search;
export async function loader({ request }) {
  const userId = getAuthUserId() ? getAuthUserId()._id : "";
  const searchParams = new URL(request.url).searchParams;
  const dataSearch = {
    city: searchParams.get("city"),
    dateStart: searchParams.get("dateStart"),
    dateEnd: searchParams.get("dateEnd"),
    maxPeople: searchParams.get("maxPeople"),
    room: searchParams.get("room"),
  };
  console.log(userId);
  const response = await fetch(
    `http://localhost:5000/hotels/search?city=${dataSearch.city}&dateStart=${dataSearch.dateStart}&dateEnd=${dataSearch.dateEnd}&room=${dataSearch.room}&maxPeople=${dataSearch.maxPeople}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: userId,
      },
      body: null,
    }
  );
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
