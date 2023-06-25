import Form from "../../component/home/homePage/form/Form";
import DetailPage from "../../component/detail/DetailPage";
import { json } from "react-router";
import { getAuthUserId } from "../../util/token";
const Detail = () => {
  return (
    <div>
      <DetailPage />
      <Form />
    </div>
  );
};

export default Detail;
export async function loader({ request, params }) {
  const searchParams = new URL(request.url).searchParams;
  const id = searchParams.get("id");
  const userId = getAuthUserId() ? getAuthUserId()._id : '';
  const response = await fetch(`http://localhost:5000/hotels/detail?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: userId,
    },
  });
  if (!response.ok) {
    throw json({ message: "error loading detail" }, { status: 404 });
  }
  const dataHotel = await response.json();

  const rooms = { rooms: dataHotel.rooms };

  const responseRooms = await fetch("http://localhost:5000/rooms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: userId,
    },
    body: JSON.stringify(rooms),
  });
  if (!responseRooms.ok) {
    throw json({ message: "Error fetching" }, { status: 404 });
  }
  const dataRooms = await responseRooms.json();

  return { dataHotel, dataRooms };
}
