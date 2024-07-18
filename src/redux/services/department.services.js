import { commonFunctions } from "../../assets/commonFunction";
export const departmentServices = {
  createDepartment,
  updateDepartment,
  getDepartments,
  deleteDepartment,
};
const apiUrl = import.meta.env.VITE_API_URL;

async function createDepartment(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "POST",
    extraHeaders,
    JSON.stringify(data),
    true
  );
  return await fetch(`${apiUrl}/department`, requestOptions).then((response) =>
    response.json()
  );
}

async function updateDepartment({ departmentData, id }) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "POST",
    extraHeaders,
    JSON.stringify(departmentData),
    true
  );
  return await fetch(`${apiUrl}department/${id}`, requestOptions).then(
    (response) => response.json()
  );
}

async function deleteDepartment(id) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "DELETE",
    extraHeaders,
    JSON.stringify(),
    true
  );
  return await fetch(`${apiUrl}/department/${id}`, requestOptions).then(
    (response) => response.json()
  );
}
async function getDepartments({ activePageNumber, documentSkip }) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "GET",
    extraHeaders,
    JSON.stringify(),
    true
  );
  return await fetch(
    `${apiUrl}department?page=${activePageNumber}&limit=${documentSkip}`,
    requestOptions
  ).then((response) => response.json());
}
