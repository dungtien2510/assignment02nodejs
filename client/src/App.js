import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Home, {
  loader as loaderHotels,
  // action as actionSearch,
} from "./pages/home/Home";
import Detail, { loader as loaderDetailHotel } from "./pages/detail/Detail";
import Search, { loader as loaderSearch } from "./pages/search/Search";
import RootPage from "./layout/Root";
import DashBoard, { loader as loaderDashBoard } from "./pages/admin/DashBoard";
import Authentication, {
  action as actionAuth,
} from "./pages/auth/Authentication";
import RootAdmin from "./layout/RootAdmin";
import HotelBoardPage, {
  loader as loaderAdminHotel,
  action as actionDeleteHotel,
} from "./pages/admin/HotelBoard";
import NewHotelPage, {
  action as actionPostAddHotel,
  loader as loaderTitleRoom,
} from "./pages/admin/NewHotel";
import NewRoomPage, {
  action as actionAddRoom,
  loader as loaderNameHotels,
} from "./pages/admin/NewRoom";
import RoomPage, {
  loader as loaderRooms,
  action as actionDeleteRoom,
} from "./pages/admin/RoomPage";

import BookPage, {
  action as actionPostTransaction,
} from "./pages/book/BookPage";
import TransactionPage, {
  loader as loaderTransactions,
} from "./pages/transaction/TransactionPage";
import TransactionAdminPage, {
  loader as loaderAdminTransaction,
} from "./pages/admin/TransationAdminPage";
import UsersPage, { loader as loaderUsers } from "./pages/admin/UserPage";

library.add(fas);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      { path: "auth", element: <Authentication />, action: actionAuth },
      {
        path: "",
        element: <Home />,
        loader: loaderHotels,
        // action: actionSearch,
      },
      {
        path: "transaction",
        element: <TransactionPage />,
        loader: loaderTransactions,
      },
      { path: "search", element: <Search />, loader: loaderSearch },
      {
        path: "detail",
        id: "detail-hotel",

        loader: loaderDetailHotel,
        children: [
          { path: "", element: <Detail /> },
          {
            path: "book",
            element: <BookPage />,
            action: actionPostTransaction,
          },
        ],
      },

      ,
    ],
  },
  {
    path: "/admin",
    element: <RootAdmin />,
    children: [
      { path: "dashBoard", element: <DashBoard />, loader: loaderDashBoard },
      {
        path: "hotels",
        element: <HotelBoardPage />,
        loader: loaderAdminHotel,
        action: actionDeleteHotel,
      },
      {
        path: "addHotel",
        element: <NewHotelPage />,
        action: actionPostAddHotel,
        loader: loaderTitleRoom,
      },
      {
        path: "rooms",
        element: <RoomPage />,
        loader: loaderRooms,
        action: actionDeleteRoom,
      },
      {
        path: "addRoom",
        element: <NewRoomPage />,
        loader: loaderNameHotels,
        action: actionAddRoom,
      },
      {
        path: "transaction",
        element: <TransactionAdminPage />,
        loader: loaderAdminTransaction,
      },
      {
        path: "user",
        element: <UsersPage />,
        loader: loaderUsers,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
