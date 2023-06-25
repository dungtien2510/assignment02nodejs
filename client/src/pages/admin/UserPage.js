import Users from "../../component/admin/users/Users";
import { getAuthUserId } from "../../util/token";
import { redirect, json } from "react-router";

function UserPage() {
  return <Users />;
}
export default UserPage;

export async function loader() {
  const userId = getAuthUserId() ? getAuthUserId()._id : "";

  const response = await fetch("http://localhost:5000/admin/users", {
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
    throw json({ message: "fetch failed" }, { status: 500 });
  }

  const data = await response.json();
  console.log(data);
  return data;
}
