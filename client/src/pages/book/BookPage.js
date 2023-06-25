import { json, redirect } from "react-router";
import BookHotel from "../../component/book/BookHotel";
import { getAuthUserId } from "../../util/token";

function BookPage() {
  return <BookHotel />;
}

export default BookPage;
export async function action({ request }) {
  const data = await request.formData();
  const userId = getAuthUserId() ? getAuthUserId()._id : "";

  const dataBook = {
    user: { userName: getAuthUserId().userName, userId: userId },
    hotel: JSON.parse(data.get("hotel")),
    rooms: JSON.parse(data.get("rooms")),
    dateStart: data.get("dateStart"),
    dateEnd: data.get("dateEnd"),
    price: data.get("price"),
    payment: data.get("payment"),
    status: data.get("status"),
    name: data.get("name"),
    email: data.get("email"),
    phone: data.get("phone"),
    card: data.get("card"),
  };
  console.log(dataBook);
  const response = await fetch("http://localhost:5000/transactions/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: userId,
    },
    body: JSON.stringify(dataBook),
  });
  if (!response.ok) {
    throw json({ message: "Error creating" }, { status: 404 });
  }
  const result = await response.json();
  alert("successful transaction");
  return redirect("/transaction");
}
