import { json, redirect } from "react-router";
import { getAuthUserId } from "../../util/token";
import AddHotel from "../../component/admin/newHotel/AddHotel";

function NewHotelPage() {
  return <AddHotel />;
}
export default NewHotelPage;
export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const idEdit = searchParams.get("edit");
  const data = await request.formData();
  const dataHotel = {
    name: data.get("name"),
    city: data.get("city"),
    distance: data.get("distance"),
    desc: data.get("desc"),
    photos: data.get("image").split(","),
    type: data.get("type"),
    address: data.get("address"),
    title: data.get("title"),
    cheapestPrice: data.get("price"),
    featured: data.get("featured"),
    rooms: data.get("rooms").split(","),
  };
  const userId = getAuthUserId() ? getAuthUserId()._id : "";
  const http = idEdit
    ? `http://localhost:5000/admin/postHotelEdit?id=${idEdit}`
    : "http://localhost:5000/admin/addHotel";
  const response = await fetch(http, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: userId },
    body: JSON.stringify(dataHotel),
  });
  if (response.status === 401) {
    alert("You are not logged in of you are not admin");
    return redirect("/");
  }
  if (!response.ok) {
    throw json({ message: "error post data" }, { status: 404 });
  }
  alert(!idEdit ? "added hotel successfully" : "updated hotel successfully");
  return redirect("/admin/hotels");
}
export async function loader({ request }) {
  const userId = getAuthUserId() ? getAuthUserId()._id : "";
  const searchParams = new URL(request.url).searchParams;
  const idEdit = searchParams.get("edit");
  console.log(idEdit);
  if (!idEdit) {
    const response = await fetch("http://localhost:5000/admin/titleRoom", {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: userId },
      body: null,
    });
    if (response.status === 401) {
      alert("You are not logged in of you are not admin");
      return redirect("/");
    }
    if (!response.ok) {
      throw json({ message: "error" }, { status: 404 });
    }
    const data = await response.json();

    return { titleRoom: data };
  } else {
    const response = await fetch(
      `http://localhost:5000/admin/hotel/edit?id=${idEdit}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: userId },
        body: null,
      }
    );
    if (response.status === 401) {
      alert("You are not logged in of you are not admin");
      return redirect("/");
    }
    if (!response.ok) {
      throw json({ message: "error" }, { status: 404 });
    }
    const data = await response.json();

    return data;
  }
}
