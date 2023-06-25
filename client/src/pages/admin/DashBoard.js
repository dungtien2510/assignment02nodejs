import InfoBoard from "../../component/admin/dashBoard/InfoBoard";
import TransationList from "../../component/admin/transations/TransationList";
import { json, redirect } from "react-router-dom";
import { getAuthUserId } from "../../util/token";

function AdminPage() {
  return (
    <>
      <InfoBoard />
      <TransationList />
    </>
  );
}
export default AdminPage;
export async function loader() {
  const userId = getAuthUserId() ? getAuthUserId()._id : "";

  const response = await fetch("http://localhost:5000/admin/transactions", {
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

  // data dash
  const responseDash = await fetch("http://localhost:5000/admin/dash", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: userId,
    },
    body: null,
  });
  if (responseDash.status === 401) {
    console.log("error 401");
    alert("You are not logged in of you are not admin");
    return redirect("/");
  }
  if (!responseDash.ok) {
    throw json({ message: "fetch failed" }, { status: 500 });
  }

  const dataDash = await responseDash.json();

  const dataTransaction = await response.json();
  const data = { dataDash, dataTransaction };
  console.log(data);
  return data;
}
