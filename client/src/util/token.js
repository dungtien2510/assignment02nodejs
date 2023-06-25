export function getAuthUserId() {
  const userId = JSON.parse(localStorage.getItem("userId"));
  return userId;
}
