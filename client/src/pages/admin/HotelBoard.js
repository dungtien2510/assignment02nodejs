import { json, redirect } from "react-router";
import { getAuthUserId } from "../../util/token";
import Hotel from "../../component/admin/hotelBoard/Hotel";

function HotelBoardPage() {
  return <Hotel />;
}
export default HotelBoardPage;
export async function loader() {
  const userId = getAuthUserId() ? getAuthUserId()._id : "";

  const response = await fetch("http://localhost:5000/admin/hotels", {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: userId },
    body: null,
  });
  if (response.status === 401) {
    alert("You are not logged in of you are not admin");
    return redirect("/");
  }
  if (!response.ok) {
    throw json({ message: "error Loading" }, { status: 404 });
  }
  const data = await response.json();
  return data;
}
export async function action({ request }) {
  const data = await request.formData();
  const id = { id: data.get("delete") };
  const userId = getAuthUserId() ? getAuthUserId()._id : "";

  if (window.confirm("Are you sure you want to delete!")) {
    const response = await fetch("http://localhost:5000/admin/hotel/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: userId },
      body: JSON.stringify(id),
    });
    if (response.status === 401) {
      alert("You are not logged in of you are not admin");
      return redirect("/");
    }
    if (!response.ok) {
      throw json({ message: "error delete" }, { status: 404 });
    }
    return redirect("");
  }
  return redirect("");
}
