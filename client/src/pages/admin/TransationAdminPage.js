import { getAuthUserId } from "../../util/token";
import TransationList from "../../component/admin/transations/TransationList";
import { json, redirect } from "react-router-dom";

function TransactionAdminPage() {
  return <TransationList />;
}
export default TransactionAdminPage;

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

  const data = await response.json();
  console.log(data);
  return { dataTransaction: data };
}
