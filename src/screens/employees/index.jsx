import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "../../components/Table";
import {
  getEmplooyesList,
  deleteEmployee,
  updateEmployee,
} from "../../redux/features/employee/employeesSlice";
import { getDepartmentList } from "../../redux/features/departmant/departmentSlice";
import { format } from "date-fns";
import PropTypes from "prop-types";
import Modal from "../../components/CustomModal";
import Loader from "../../components/Loade";
import Dropdown from "../../components/DropDown";
import "../../assets/styles/department.styles.css";

const Departments = () => {
  const options = [
    { value: "manager", label: "Manager" },
    { value: "employee", label: "Employee" },
  ];

  const sortBy = [
    { value: "first_name", label: "Name" },
    { value: "location", label: "Location" },
  ];

  const sortOrder = [
    { value: "asc", label: "Ascending" },
    { value: "desc", label: "Descending" },
  ];

  const columns = React.useMemo(
    () => [
      { Header: "ID", accessor: "_id" },
      { Header: "NAME", accessor: "user_name" },
      { Header: "Loaction", accessor: "location" },
      { Header: "EMAIL", accessor: "email_address" },
      { Header: "DEPARTMENT ID", accessor: "department_id" },
      { Header: "DEPARTMENT", accessor: "department_name" },
      {
        Header: "CREATED AT",
        accessor: "createdAt",
        Cell: ({ value }) =>
          value ? format(new Date(value), "yyyy-MM-dd") : "N/A",
      },
    ],
    []
  );
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user.value);

  const departmentData = useSelector((state) => {
    return state?.department?.value?.departments.map((department) => {
      return {
        label: department.department_name,
        value: department._id,
      };
    });
  });

  const employeesData = useSelector((state) => state?.employees?.value);

  const [deleteModal, setDeleteModal] = useState(false);
  const [editAndViewModal, setEditAndViewModal] = useState(false);
  const [documentSkip, setDocumentSkip] = useState(10);
  const [employee, setEmployee] = useState({});
  const [actionType, setActionType] = useState("");

  const [validation, setValidation] = useState({
    first_name: { isValid: true, message: "" },
    last_name: { isValid: true, message: "" },
    location: { isValid: true, message: "" },
    email_address: { isValid: true, message: "" },
    department: { isValid: true, message: "" },
  });

  const [employeeDetails, setEmployeeDetails] = useState({
    first_name: "",
    last_name: "",
    location: "",
    email_address: "",
    department: "",
  });

  const [activeSortBy, setActiveSortBy] = useState("first_name");
  const [activeSortOrder, setActiveSortOrder] = useState("asc");

  useEffect(() => {
    dispatch(getDepartmentList);
  }, []);
  const status = useState((state) => state?.employees?.status);
  const [activePageNumber, setActivePageNumber] = useState(
    employeesData?.pageNumber
  );
  useEffect(() => {
    dispatch(getEmplooyesList());
  }, []);
  useEffect(() => {
    dispatch(
      getEmplooyesList({
        activePageNumber,
        documentSkip,
        activeSortBy,
        activeSortOrder,
      })
    );
  }, [activePageNumber, documentSkip, activeSortBy, activeSortOrder, dispatch]);

  const handleDeleteModalOpen = (employee) => {
    setDeleteModal(true);
    setEmployee(employee);
  };

  const handleDeleteModalClose = () => {
    setDeleteModal(false);
  };

  const handleEditViewModalClose = () => {
    setEditAndViewModal(false);
  };

  const handleEditViewModalOpen = (employee, action) => {
    setEditAndViewModal(true);
    setEmployeeDetails({
      first_name: employee.first_name,
      last_name: employee.last_name,
      location: employee.location,
      email_address: employee.email_address,
      user_type: employee.user_type,
      department: employee.department_id,
    });
    setEmployee(employee);
    setActionType(action);
  };

  const handleDelete = () => {
    dispatch(deleteEmployee(employee._id));
    dispatch(getEmplooyesList({ activePageNumber, documentSkip }));
    handleDeleteModalClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeDetails({ ...employeeDetails, [name]: value });
  };

  const handleSelectUserType = (value) => {
    setEmployeeDetails({ ...employeeDetails, user_type: value });
  };

  const validateForm = () => {
    let isValid = true;
    const newValidation = { ...validation };

    if (!employeeDetails.first_name) {
      newValidation.first_name = {
        isValid: false,
        message: "First Name is required",
      };
      isValid = false;
    } else {
      newValidation.first_name = { isValid: true, message: "" };
    }

    if (!employeeDetails.last_name) {
      newValidation.last_name = {
        isValid: false,
        message: "Last Name is required",
      };
      isValid = false;
    } else {
      newValidation.last_name = { isValid: true, message: "" };
    }

    if (!employeeDetails.location) {
      newValidation.location = {
        isValid: false,
        message: "Location is required",
      };
      isValid = false;
    } else {
      newValidation.location = { isValid: true, message: "" };
    }

    if (!employeeDetails.email_address) {
      newValidation.email_address = {
        isValid: false,
        message: "Email Address is required",
      };
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(employeeDetails.email_address)) {
      newValidation.email_address = {
        isValid: false,
        message: "Email Address is invalid",
      };
      isValid = false;
    } else {
      newValidation.email_address = { isValid: true, message: "" };
    }

    if (!employeeDetails.department) {
      newValidation.department = {
        isValid: false,
        message: "Department is required",
      };
      isValid = false;
    } else {
      newValidation.department = { isValid: true, message: "" };
    }

    setValidation(newValidation);
    return isValid;
  };

  const handleUpdateEmployee = () => {
    if (validateForm()) {
      let id = employee._id;
      let userId = userData.id;
      console.log("userID", userId);
      dispatch(
        updateEmployee({
          employeeDetails: {
            department_assigned_by: userId,
            ...employeeDetails,
          },
          id,
        })
      );
      dispatch(getEmplooyesList({ activePageNumber, documentSkip }));
      handleEditViewModalClose();
    }
  };

  return (
    <div className="container">
      <div className="employee-header">
        <h1 className="fw-bold fs-700">Employees List</h1>
        <div className="sb-group">
          <div className="short-button">
            <label>Sort By Loaction OR Name</label>
            <Dropdown
              value={activeSortBy}
              className="sb-button"
              options={sortBy}
              onSelect={(val) => {
                setActiveSortBy(val);
              }}
            />
          </div>
          <div className="short-button">
            <label>Sorting Order</label>
            <Dropdown
              value={activeSortOrder}
              options={sortOrder}
              onSelect={(val) => {
                setActiveSortOrder(val);
              }}
            />
          </div>
        </div>
      </div>

      {status !== "loading" && status !== "idle" ? (
        <Table
          userType={userData.user_type}
          columns={columns}
          data={employeesData?.employees ? employeesData?.employees : []}
          action={true}
          totalPages={employeesData?.totalPages}
          pageNumber={employeesData?.currentPage}
          setDocumentSkip={setDocumentSkip}
          documentSkip={documentSkip}
          handleDelete={handleDeleteModalOpen}
          setActivePageNumber={setActivePageNumber}
          handleEditViewModalOpen={handleEditViewModalOpen}
        />
      ) : (
        <Loader />
      )}
      <Modal
        isOpen={deleteModal}
        onRequestClose={handleDeleteModalClose}
        title="Edit Employee"
        containerClass={"delete-modal-content"}
        className={"delete-modal"}
        overlayClassName="modal-overlay"
        modalContentClassName="delet-modal-content"
      >
        <div className="modal-body">
          <button className="close-button" onClick={handleDeleteModalClose}>
            &times;
          </button>
          <h3 className="fw-bold fs-700 ">Delete Employee</h3>
          <p className="fw-bold | model-text">
            Are you sure you want to delete this employee?
          </p>
        </div>
        <div className="even-columns">
          <button className="button" onClick={handleDelete}>
            Delete
          </button>{" "}
          <button className="button" onClick={handleDeleteModalClose}>
            Cancel
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={editAndViewModal}
        onRequestClose={handleEditViewModalClose}
        className={"view-edit"}
        overlayClassName="modal-overlay"
        modalContentClassName="modal-content"
        title={actionType === "edit" ? "Edit Employee" : "View Employee"}
      >
        <div>
          <button className="close-button" onClick={handleEditViewModalClose}>
            &times;
          </button>
          <h3 className="fw-bold fs-700">
            {" "}
            {actionType === "edit" ? "Edit Employee" : "View Employee"}
          </h3>
        </div>
        <div>
          <div className="form-container">
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="first_name"
                  required
                  placeholder="First Name"
                  disabled={actionType === "view"}
                  value={employeeDetails.first_name}
                  onChange={handleChange}
                />
                {!validation?.first_name?.isValid && (
                  <p className="error">{validation?.first_name?.message}</p>
                )}
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  required
                  placeholder="Last Name"
                  value={employeeDetails.last_name}
                  disabled={actionType === "view"}
                  onChange={handleChange}
                />
                {!validation?.last_name?.isValid && (
                  <p className="error">{validation?.last_name?.message}</p>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email_address"
                  required
                  value={employeeDetails.email_address}
                  placeholder="Email"
                  disabled={actionType === "view"}
                  onChange={handleChange}
                />
                {!validation?.email_address?.isValid && (
                  <p className="error">{validation?.email_address?.message}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="1">Location</label>
                <input
                  type="text"
                  id="1"
                  name="location"
                  required
                  value={employeeDetails.location}
                  placeholder="Location"
                  disabled={actionType === "view"}
                  onChange={handleChange}
                />
                {!validation?.location?.isValid && (
                  <p className="error">{validation?.location?.message}</p>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Employee Type</label>
                <Dropdown
                  value={employeeDetails.user_type}
                  options={options}
                  isDisabled={actionType === "view" ? true : false}
                  onSelect={(val) => {
                    handleSelectUserType(val);
                  }}
                />
                {!validation?.user_type?.isValid && (
                  <p className="error">{validation?.user_type?.message}</p>
                )}
              </div>
              <div className="form-group">
                <label>Department</label>
                <Dropdown
                  value={employeeDetails.department}
                  options={departmentData}
                  isDisabled={actionType === "view" ? true : false}
                  onSelect={(val) => {
                    setEmployeeDetails({
                      ...employeeDetails,
                      department: val,
                    });
                  }}
                />
                {!validation?.user_type?.isValid && (
                  <p className="error">{validation?.department?.message}</p>
                )}
              </div>
            </div>
          </div>
          {actionType === "edit" && (
            <div className="even-columns">
              <button className="button" onClick={handleUpdateEmployee}>
                Save
              </button>
              <button className="button" onClick={handleEditViewModalClose}>
                Cancel
              </button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};
Departments.propTypes = {
  navigation: PropTypes.func.isRequired,
};
export default Departments;
