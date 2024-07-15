import { toast, Bounce } from "react-toastify";

export const commonFunctions = {
  getRequestOptions,
  shareSocialPage,
  getFileName,
  convertDateToString,
  validateConatctNumber,
  getIframString,
  getMethodForCurrency,
  setMethodForCurrency,
  success,
  failed,
  warning,
};

function validateConatctNumber(number) {
  var re = /^[6-9]{1}[0-9]{9}$/;

  return re.test(String(number));
}

function warning(message) {
  return toast.warn(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
}
function success(message) {
  return toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
}
function failed(message) {
  console.log("message", message);
  return toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
}

function getRequestOptions(type, extraHeaders, body, bNoToken) {
  let authHeader = {};
  let accessToken;

  if (bNoToken) {
    console.log(accessToken);
    accessToken = localStorage.getItem("accessToken")
      ? localStorage.getItem("accessToken")
      : null;
    authHeader = {
      Authorization: `Bearer ${accessToken}`,
    };
  }

  let requestOptions = {
    method: type,
    headers: {
      ...extraHeaders,
      ...authHeader,
    },
  };
  if (body) {
    requestOptions["body"] = body;
  }
  return requestOptions;
}

function getFileName(header, type) {
  let fileName = "downloaded." + type;
  if (header) {
    var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    var matches = filenameRegex.exec(header);
    if (matches != null && matches[1]) {
      fileName = matches[1].replace(/['"]/g, "");
    }
  }
  return fileName;
}

function shareSocialPage(url) {
  window.open(url, "", "width=600,height=600");
  return false;
}
function convertDateToString(dateObj) {
  if (dateObj && !isNaN(dateObj)) {
    let month = (dateObj.getMonth() + 1).toString();
    month = month.length === 1 ? "0" + month : month;
    let date = dateObj.getDate().toString();
    date = date.length === 1 ? "0" + date : date;
    let year = dateObj.getFullYear().toString();
    return `${year}-${month}-${date}`;
  }
  return "";
}

function getIframString(str) {
  let updatedStr = str.includes("iframe")
    ? str
        .replaceAll(/&lt;iframe/g, "<iframe")
        .replaceAll(/&gt;&lt;\/iframe&gt;/g, "></iframe>")
    : str;
  return updatedStr;
}

function getMethodForCurrency() {
  let obj = localStorage.getItem("currencyObj");
  return obj ? JSON.parse(obj) : { value: "GBP", label: "GBP", sign: "£" };
}

function setMethodForCurrency(obj) {
  localStorage.setItem("currencyObj", JSON.stringify(obj));
}
