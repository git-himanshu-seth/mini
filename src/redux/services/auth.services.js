import { commonFunctions } from "../../assets/commonFunction";

export const authServices = {
  register,
  login,
};
const apiUrl = import.meta.env.VITE_API_URL;

async function register(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "POST",
    extraHeaders,
    JSON.stringify(data)
  );
  return await fetch(`${apiUrl}users/register`, requestOptions).then(
    (response) => response.json()
  );
}
async function login(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "POST",
    extraHeaders,
    JSON.stringify(data)
  );
  return await fetch(`${apiUrl}users/login`, requestOptions).then((response) =>
    response.json()
  );
}
