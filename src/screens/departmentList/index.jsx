import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "../../components/Table";
import {
  getDepartmentList,
  deleteDepartment,
  updateDepartment,
} from "../../redux/features/departmant/departmentSlice";
import { format } from "date-fns";
import PropTypes from "prop-types";
import Modal from "../../components/CustomModal";
import Loader from "../../components/Loade";
import "../../assets/styles/department.styles.css";

const Departments = ({ navigation }) => {
  const departmentData = useSelector((state) => state?.department?.value);
  const userData = useSelector((state) => state.user.value);
  const status = useState((state) => state?.department?.status);

  const dispatch = useDispatch();
  const [editAndViewModal, setEditAndViewModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [documentSkip, setDocumentSkip] = useState(10);
  const [department, setDepatmen] = useState({});
  const [actionType, setActionType] = useState("");

  const [departmentDetails, setDepartmentDetails] = useState({
    department_name: "",
    description: "",
    department_code: "",
  });

  const [validation, setValidation] = useState({
    department_name: { isValid: true, message: "" },
    description: { isValid: true, message: "" },
    department_code: { isValid: true, message: "" },
  });

  const [activePageNumber, setActivePageNumber] = useState(
    departmentData?.pageNumber
  );

  const handleEditViewModalClose = () => {
    setEditAndViewModal(false);
  };

  const handleEditViewModalOpen = (department, action) => {
    setDepatmen(department);
    setEditAndViewModal(true);
    setDepartmentDetails({
      department_name: department.department_name,
      description: department.description,
      department_code: department.department_code,
    });
    setActionType(action);
  };

  useEffect(() => {
    dispatch(getDepartmentList());
  }, []);

  useEffect(() => {
    dispatch(getDepartmentList({ activePageNumber, documentSkip }));
  }, [activePageNumber, documentSkip]);

  const handleDeleteModalOpen = (depatment) => {
    setDeleteModal(true);
    setDepatmen(depatment);
  };

  const handleDeleteModalClose = () => {
    setDeleteModal(false);
  };

  const handleDelete = () => {
    dispatch(deleteDepartment(department._id));
    dispatch(getDepartmentList({ activePageNumber, documentSkip }));
    handleDeleteModalClose();
  };

  const handleUpdateDepartment = () => {
    if (validateForm()) {
      dispatch(
        updateDepartment({
          departmentData: departmentDetails,
          id: department._id,
        })
      );
      dispatch(getDepartmentList({ activePageNumber, documentSkip }));
      handleEditViewModalClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartmentDetails({ ...departmentDetails, [name]: value });
  };

  const validateForm = () => {
    let isValid = true;
    const newValidation = { ...validation };

    if (!departmentDetails.department_name) {
      newValidation.department_name = {
        isValid: false,
        message: "Department Name is required",
      };
      isValid = false;
    } else {
      newValidation.department_name = { isValid: true, message: "" };
    }

    if (!departmentDetails.description) {
      newValidation.description = {
        isValid: false,
        message: "Description is required",
      };
      isValid = false;
    } else {
      newValidation.description = { isValid: true, message: "" };
    }

    if (!departmentDetails.department_code) {
      newValidation.department_code = {
        isValid: false,
        message: "Department Code is required",
      };
      isValid = false;
    } else {
      newValidation.department_code = { isValid: true, message: "" };
    }

    setValidation(newValidation);
    return isValid;
  };

  const columns = React.useMemo(
    () => [
      { Header: "Department ID", accessor: "_id" },
      { Header: "Department Code", accessor: "department_code" },
      { Header: "Name", accessor: "department_name" },
      { Header: "Description", accessor: "description" },
      {
        Header: "Created by",
        accessor: "created_by_name",
      },
      {
        Header: "Created at",
        accessor: "createdAt",
        Cell: ({ value }) =>
          value ? format(new Date(value), "yyyy-MM-dd") : "N/A",
      },
    ],
    []
  );

  return (
    <div className="container">
      <div className="department-header">
        <h1 className="fw-bold fs-700">Department List</h1>
        <div>
          <button
            type="button"
            className="button"
            onClick={() => navigation("/create-department")}
          >
            Create Department
          </button>
        </div>
      </div>

      {status !== "loading" && status !== "idle" ? (
        <Table
          userType={userData.user_type}
          columns={columns}
          data={departmentData?.departments ? departmentData?.departments : []}
          action={true}
          totalPages={departmentData?.totalPages}
          pageNumber={departmentData?.currentPage}
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
        title="Delete Department"
        className={"delete-modal"}
        overlayClassName="modal-overlay"
        modalContentClassName="delete-modal-content"
      >
        <div className="modal-body">
          <button className="close-button" onClick={handleDeleteModalClose}>
            &times;
          </button>
          <h3 className="fw-bold fs-700 ">Delete Employee</h3>
          <p className="fw-bold | model-text">
            Are you sure you want to delete this department?
          </p>
        </div>
        <div className="even-columns">
          <button className="button" onClick={handleDelete}>
            delete
          </button>{" "}
          <button className="button" onClick={handleDeleteModalClose}>
            cancel
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
                <label>Department Name</label>
                <input
                  type="text"
                  name="department_name"
                  required
                  placeholder="Department Name"
                  disabled={actionType === "view"}
                  value={departmentDetails.department_name}
                  onChange={handleChange}
                />
                {!validation?.department_name?.isValid && (
                  <p className="error">
                    {validation?.department_name?.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label>Department Code</label>
                <input
                  type="text"
                  name="department_code"
                  required
                  placeholder="Department Code"
                  value={departmentDetails.department_code}
                  disabled={actionType === "view"}
                  onChange={handleChange}
                />
                {!validation?.department_code?.isValid && (
                  <p className="error">
                    {validation?.department_code?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  required
                  value={departmentDetails.description}
                  placeholder="Description"
                  disabled={actionType === "view"}
                  onChange={handleChange}
                />
                {!validation?.description?.isValid && (
                  <p className="error">{validation?.description?.message}</p>
                )}
              </div>
            </div>
          </div>
          {actionType === "edit" && (
            <div className="even-columns">
              <button className="button" onClick={handleUpdateDepartment}>
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
