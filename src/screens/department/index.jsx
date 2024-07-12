import { useState } from "react";
import "../../assets/styles/department.styles.css";
import Breadcrumb from "../../components/Breadcrum";

const DepartmentManager = () => {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const handleCreateOrUpdate = () => {
    if (selectedDepartment) {
      const updatedDepartments = departments.map((dept) =>
        dept.id === selectedDepartment.id
          ? { ...dept, name, description }
          : dept
      );
      setDepartments(updatedDepartments);
    } else {
      const newDepartment = {
        id: Date.now(),
        name,
        description,
      };
      setDepartments([...departments, newDepartment]);
    }
    setName("");
    setDescription("");
    setSelectedDepartment(null);
  };

  const handleDelete = (id) => {
    const updatedDepartments = departments.filter((dept) => dept.id !== id);
    setDepartments(updatedDepartments);
  };

  const handleEdit = (department) => {
    setSelectedDepartment(department);
    setName(department.name);
    setDescription(department.description);
  };
  const paths = [
    { name: "Home", url: "/" },
    { name: "Departments", url: "/departments" },
    { name: selectedDepartment ? "Edit Department" : "Create Department" },
  ];

  return (
    <div className="container">
      <Breadcrumb paths={paths} />

      <div className="container_second">
        <h1>Department Manager</h1>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="button" onClick={handleCreateOrUpdate}>
            {selectedDepartment ? "Update" : "Create"}
          </button>
        </div>
        <ul>
          {departments.map((department) => (
            <li key={department.id}>
              <span>
                {department.name} - {department.description}
              </span>
              <button onClick={() => handleEdit(department)}>Edit</button>
              <button onClick={() => handleDelete(department.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DepartmentManager;
