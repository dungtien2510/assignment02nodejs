import AddRoom from "../../component/admin/newRoom/AddRoom";
import { getAuthUserId } from "../../util/token";
import { json, redirect } from "react-router";
function NewRoomPage() {
  return <AddRoom />;
}
export default NewRoomPage;
export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const idEdit = searchParams.get("edit");
  const data = await request.formData();
  const dataRoom = {
    desc: data.get("desc"),
    type: data.get("type"),
    title: data.get("title"),
    price: data.get("price"),
    maxPeople: data.get("maxPeople"),
    roomNumbers: data.get("roomNumbers").split(","),
    hotel: data.get("hotel"),
  };
  const userId = getAuthUserId() ? getAuthUserId()._id : "";

  const http = idEdit
    ? `http://localhost:5000/admin/postRoomEdit?id=${idEdit}`
    : "http://localhost:5000/admin/addRoom";

  const response = await fetch(http, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: userId },
    body: JSON.stringify(dataRoom),
  });
  if (response.status === 401) {
    alert("You are not logged in of you are not admin");
    return redirect("/");
  }
  if (!response.ok) {
    throw json({ message: "error post data" }, { status: 404 });
  }

  alert("added Room successfully");

  return redirect("/admin/rooms");
}
export async function loader({ request }) {
  const userId = getAuthUserId() ? getAuthUserId()._id : "";

  const searchParams = new URL(request.url).searchParams;
  const idEdit = searchParams.get("edit");
  if (!idEdit) {
    const response = await fetch("http://localhost:5000/admin/nameHotels", {
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

    return { nameHotels: data };
  } else {
    const response = await fetch(
      `http://localhost:5000/admin/room/edit?id=${idEdit}`,
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
