import { json, redirect } from "react-router";
import Auth from "../../component/auth/Auth";
function Authentication() {
  return <Auth />;
}
export default Authentication;
export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "unsupported mode" }, { status: 422 });
  }

  const data = await request.formData();
  const authData = {
    userName: data.get("userName"),
    password: data.get("password"),
  };
  console.log(authData);
  const response = await fetch(`http://localhost:5000/auth/${mode}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(authData),
  });
  if (response.status === 403 || response.status === 402) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "could not authenticate user!" }, { status: 500 });
  }
  const dataResult = await response.json();
  if (mode === "signup") {
    alert("created user successfully!!!");
    return redirect("/auth?mode=login");
  } else if (mode === "login") {
    localStorage.setItem("userId", JSON.stringify(dataResult));

    return redirect("/");
  } else {
    localStorage.removeItem("userId");
    return redirect("/auth?mode=login");
  }
}
