import Room from "../../component/admin/rooms/Room";
import { getAuthUserId } from "../../util/token";
import { json, redirect } from "react-router";
function RoomPage() {
  return <Room />;
}
export default RoomPage;
export async function loader() {
  const userId = getAuthUserId() ? getAuthUserId()._id : "";

  const response = await fetch("http://localhost:5000/admin/rooms", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: userId,
    },
    body: null,
  });
  if (response.status === 401) {
    alert("You are not logged in of you are not admin");
    return redirect("/");
  }
  if (!response.ok) {
    throw json({ message: "Error loading" }, { status: 404 });
  }
  const data = await response.json();
  return data;
}
export async function action({ request }) {
  const userId = getAuthUserId() ? getAuthUserId()._id : "";

  const data = await request.formData();
  const id = { id: data.get("delete") };
  if (window.confirm("Are you sure you want to delete!")) {
    const response = await fetch("http://localhost:5000/admin/room/delete", {
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
