import Transaction from "../../component/transaction/Transaction";
import { json, redirect } from "react-router";
import { getAuthUserId } from "../../util/token";

const TransactionPage = () => {
  return <Transaction />;
};
export default TransactionPage;

export async function loader() {
  const userId = getAuthUserId() ? getAuthUserId()._id : "";
  console.log(userId);
  const response = await fetch("http://localhost:5000/transactions/list", {
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
