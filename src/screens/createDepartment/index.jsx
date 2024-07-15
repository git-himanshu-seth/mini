import { useState } from "react";
import PropTypes from "prop-types";
import "../../assets/styles/department.styles.css";
import { createDepartment } from "../../redux/features/departmant/departmentSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loade";

const Department = ({ department_data, actionType = "Create" }) => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.department.status);
  const userId = useSelector((state) => state.user.value.id);
  const [departments, setDepartments] = useState({
    ...department_data,
    created_by: userId,
  });
  const [errors, setErrors] = useState({
    department_name: "",
    department_code: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartments((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let valid = true;
    const newErrors = {
      department_name: "",
      department_code: "",
      description: "",
    };

    if (!departments.department_name) {
      newErrors.department_name = "Name is required.";
      valid = false;
    }

    if (!departments.department_code) {
      newErrors.department_code = "Department ID is required.";
      valid = false;
    }

    if (!departments.description) {
      newErrors.description = "Description is required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (validate()) {
      dispatch(createDepartment(departments));
    }
  };

  return (
    <div className="container">
      {status !== "loading" ? (
        <div className="container_second">
          <h1>{actionType} Department </h1>

          <input
            type="text"
            name="department_code"
            placeholder="Department ID"
            value={departments.department_code}
            onChange={handleChange}
          />
          {errors.department_code && (
            <span className="error">{errors.department_code}</span>
          )}

          <input
            type="text"
            name="department_name"
            placeholder="Name"
            value={departments.department_name}
            onChange={handleChange}
          />
          {errors.department_name && (
            <span className="error">{errors.department_name}</span>
          )}

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={departments.description}
            onChange={handleChange}
          />
          {errors.description && (
            <span className="error">{errors.description}</span>
          )}

          <button className="button" onClick={handleSubmit}>
            {actionType}
          </button>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

Department.propTypes = {
  department_data: PropTypes.shape({
    department_name: PropTypes.string,
    department_code: PropTypes.string,
    description: PropTypes.string,
  }),
  actionType: PropTypes.string,
};

Department.defaultProps = {
  department_data: {
    department_name: "",
    department_code: "",
    description: "",
  },
};

export default Department;
