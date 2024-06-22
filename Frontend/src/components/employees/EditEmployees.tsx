import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../login/AuthContext";
import AlertMessage from "../AlertMessage";
import Footer from "../nav/Footer"; // Ensure to import your Footer component

interface EmployeeProps {
  employeeID: string;
  employeeName: string;
  employeeAge: string;
  employeeDOJ: string;
  employeeRemarks: string;
  employeeAccruedLeaves: string;
  employeeGender: string;
  roleName: string;
}

const EditEmployee: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<EmployeeProps>({
    employeeID: "",
    employeeName: "",
    employeeAge: "",
    employeeDOJ: "",
    employeeRemarks: "",
    employeeAccruedLeaves: "",
    employeeGender: "",
    roleName: "",
  });
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [baseUrl] = useState("https://employee-proj-eight.vercel.app");
  const { token } = useAuth();

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/employee/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const employeeData = response.data[0];
        setEmployee(employeeData);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }, [id, baseUrl, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const hasValidationErrors = () => {
    const errors: Record<string, string> = {};

    if (!employee.employeeName.trim()) {
      errors.employeeName = "Name cannot be empty";
    } else if (employee.employeeName.trim().length < 4) {
      errors.employeeName = "Name must have more than 4 letters";
    } else if (!/^[a-zA-Z. ]+$/.test(employee.employeeName)) {
      errors.employeeName = "Name must contain only letters, dots, or spaces";
    }

    if (!employee.employeeID) {
      errors.employeeID = "ID cannot be empty";
    } else if (!/^\d+$/.test(employee.employeeID)) {
      errors.employeeID = "ID must be a number";
    }

    if (!employee.employeeAge) {
      errors.employeeAge = "Age cannot be empty";
    } else if (!/^(1[8-9]|[2-7]\d|80)$/.test(employee.employeeAge)) {
      errors.employeeAge = "Age is not valid";
    }

    if (!employee.employeeDOJ) {
      errors.employeeDOJ = "Date of Joining cannot be empty";
    }

    if (!employee.employeeRemarks) {
      errors.employeeRemarks = "Remarks cannot be empty";
    }

    if (!employee.employeeGender) {
      errors.employeeGender = "Gender cannot be empty";
    }

    if (!employee.roleName) {
      errors.roleName = "Role Name cannot be empty";
    }

    setErrorMsg(errors);
    return Object.keys(errors).length > 0;
  };

  const backEmployee = () => {
    navigate(-1);
  };

  const updateEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasValidationErrors()) {
      console.log("Validation errors. Form not submitted.");
    } else {
      axios
        .put(`${baseUrl}/api/employee/${id}`, employee, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Updated Employee:", response);
          setSuccessMessage('Employee updated successfully.');
          setTimeout(() => {
            navigate("/DisplayEmployees");
          }, 2000);
        })
        .catch((error) => {
          console.error("Error updating Employee:", error);
        });
    }
  };

  return (
    <div className="container border rounded p-4 mt-5" style={{ backgroundColor: 'white' }}>
      <h3 className="mb-4">Edit Employee</h3>
      <form className="row col-xxl" onSubmit={updateEmployee}>
        <div className="col-md-6">
          <label htmlFor="Id" className="form-label">
            Employee ID
          </label>
          <input
            type="text"
            className="form-control"
            id="Id"
            name="employeeID"
            value={employee.employeeID}
            onChange={handleChange}
          />
          {errorMsg.employeeID && <span style={{ color: "red" }}>{errorMsg.employeeID}</span>}
        </div>
        <div className="col-md-6">
          <label htmlFor="empName" className="form-label">
            Employee Name
          </label>
          <input
            type="text"
            className="form-control"
            id="empName"
            name="employeeName"
            value={employee.employeeName}
            onChange={handleChange}
          />
          {errorMsg.employeeName && <span style={{ color: "red" }}>{errorMsg.employeeName}</span>}
        </div>
        <div className="col-md-6">
          <label htmlFor="employeeAge" className="form-label">
            Employee Age
          </label>
          <input
            type="text"
            className="form-control"
            id="employeeAge"
            name="employeeAge"
            value={employee.employeeAge}
            onChange={handleChange}
          />
          {errorMsg.employeeAge && <span style={{ color: "red" }}>{errorMsg.employeeAge}</span>}
        </div>
        <div className="col-6">
          <label htmlFor="Dateofjoining" className="form-label">
            Date of Joining
          </label>
          <input
            type="date"
            className="form-control"
            id="Dateofjoining"
            name="employeeDOJ"
            value={employee.employeeDOJ}
            onChange={handleChange}
          />
          {errorMsg.employeeDOJ && <span style={{ color: "red" }}>{errorMsg.employeeDOJ}</span>}
        </div>
        <div className="col-md-6">
          <label htmlFor="remark" className="form-label">
            Employee Remark
          </label>
          <input
            type="text"
            className="form-control"
            id="remark"
            name="employeeRemarks"
            value={employee.employeeRemarks}
            onChange={handleChange}
          />
          {errorMsg.employeeRemarks && <span style={{ color: "red" }}>{errorMsg.employeeRemarks}</span>}
        </div>
        <div className="col-md-4">
          <label htmlFor="Gender" className="form-label">
            Gender
          </label>
          <select
            id="Gender"
            className="form-select"
            name="employeeGender"
            value={employee.employeeGender}
            onChange={handleChange}
          >
            <option disabled value="">Choose...</option>
            <option>Male</option>
            <option>Female</option>
            <option>Others</option>
          </select>
          {errorMsg.employeeGender && <span style={{ color: "red" }}>{errorMsg.employeeGender}</span>}
        </div>
        <div className="col-md-2">
          <label htmlFor="roleName" className="form-label">
            Role Name
          </label>
          <select
            id="roleName"
            className="form-select"
            name="roleName"
            value={employee.roleName}
            onChange={handleChange}
          >
            <option disabled value="">Choose...</option>
            <option>admin</option>
            <option>superuser</option>
            <option>employee</option>
            <option>guest</option>
          </select>
          {errorMsg.roleName && <span style={{ color: "red" }}>{errorMsg.roleName}</span>}
        </div>
        <div className="col-12 text-center mt-4">
          <button type="submit" className="btn btn-info me-3">Update</button>
          <button type="button" className="btn btn-danger" onClick={backEmployee}>Back</button>
        </div>
      </form>
      {successMessage && (
        <AlertMessage
          message={successMessage}
          type="success"
          onClose={() => setSuccessMessage('')}
        />
      )}
      <Footer />
      <style>
        {`
        body {
          background: linear-gradient(to right, lightblue, #ffffff);
        }
      `}
      </style>
    </div>
  );
};

export default EditEmployee;
