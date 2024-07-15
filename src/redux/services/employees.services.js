import { commonFunctions } from "../../assets/commonFunction";
export const employeeServices = {
  updateEmployee,
  getEmployees,
  updateEmployeeDepartment,
  getEmployee,
  deleteEmployee,
};
const apiUrl = import.meta.env.VITE_API_URL;

async function updateEmployee({ employeeDetails, id }) {
  console.log(employeeDetails);
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "POST",
    extraHeaders,
    JSON.stringify(employeeDetails),
    true
  );
  return await fetch(`${apiUrl}users/employee/${id}`, requestOptions).then(
    (response) => response.json()
  );
}
async function getEmployees({
  activePageNumber,
  documentSkip,
  activeSortOrder,
  activeSortBy,
}) {
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
    `${apiUrl}users/employee?page=${activePageNumber}&limit=${documentSkip}&sortField=${activeSortBy}&sortOrder=${activeSortOrder}`,
    requestOptions
  ).then((response) => response.json());
}
async function updateEmployeeDepartment(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "POST",
    extraHeaders,
    JSON.stringify(data),
    true
  );
  return await fetch(
    `${apiUrl}employee/add-edit-department`,
    requestOptions
  ).then((response) => response.json());
}
async function getEmployee({ id }) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "GET",
    extraHeaders,
    JSON.stringify(),
    true
  );
  return await fetch(`${apiUrl}users/employee/${id}`, requestOptions).then(
    (response) => response.json()
  );
}

async function deleteEmployee(id) {
  console.log(id);
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "DELETE",
    extraHeaders,
    JSON.stringify(),
    true
  );
  return await fetch(`${apiUrl}users/employee/${id}`, requestOptions).then(
    (response) => response.json()
  );
}
