import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  email: string;
  password: string;
}

export default function EmployeeForm() {
  const [employee, setEmployee] = useState<EmployeeProps>({
    employeeID: "",
    employeeName: "",
    employeeAge: "",
    employeeDOJ: "",
    employeeRemarks: "",
    employeeAccruedLeaves: "",
    employeeGender: "",
    roleName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [baseUrl, SetBaseUrl] = useState("https://employee-proj-eight.vercel.app/");

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string>('');
  const { token } = useAuth();

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const hasValidationErrors = () => {
    const errors: Record<string, string> = {};

    if (!employee.employeeName.trim()) {
      errors.employeeName = "Name cannot be empty";
    } else if (employee.employeeName.trim().length < 3) {
      errors.employeeName = "Name must have more than 4 letters";
    } else if (!/^[a-zA-Z. ]+$/.test(employee.employeeName)) {
      errors.employeeName = "Name must be uppercase letter, lowercase letters only";
    }
    if (!employee.employeeID.trim()) {
      errors.employeeID = "ID cannot be empty";
    } else if (!/^\d+$/.test(employee.employeeID.trim())) {
      errors.employeeID = "ID must be a number";
    }

    if (!employee.employeeAge.trim()) {
      errors.employeeAge = "Age cannot be empty";
    } else if (!/^(1[8-9]|[2-7]\d|80)$/.test(employee.employeeAge.trim())) {
      errors.employeeAge = "Age not Valid";
    }

    if (!employee.employeeDOJ.trim()) {
      errors.employeeDOJ = "Date of Joining cannot be empty";
    } else {
      const dojDate = new Date(employee.employeeDOJ);
      const currentDate = new Date();
      const twoMonthsAgo = new Date();
      twoMonthsAgo.setMonth(currentDate.getMonth() - 2);

      if (dojDate > currentDate || dojDate < twoMonthsAgo) {
        errors.employeeDOJ = "Date of Joining must be within the last two months";
      }
    }

    if (!employee.employeeRemarks.trim()) {
      errors.employeeRemarks = "Remarks cannot be empty";
    }

    if (!employee.employeeGender) {
      errors.employeeGender = "Gender cannot be empty";
    }

    if (!employee.employeeAccruedLeaves.trim()) {
      errors.employeeAccruedLeaves = "Acured Leaves cannot empty";
    } else if (!/^\d+$/.test(employee.employeeAccruedLeaves.trim())) {
      errors.employeeAccruedLeaves = "Accrued Leave must be a valid number";
    } else if (parseInt(employee.employeeAccruedLeaves, 10) > 24) {
      errors.employeeAccruedLeaves = "Accrued Leaves cannot exceed 24 days per year";
    }
    if (!employee.roleName) {
      errors.roleName = "RoleName cannot be empty"
    }
    if (!employee.email) {
      errors.email = "Email cannot be empty"
    }
    setErrorMsg(errors);

    return Object.keys(errors).length > 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (hasValidationErrors()) {
      console.log("Validation errors. Form not submitted.");
    } else {
      axios
        .post(`${baseUrl}/api/employee/`, employee, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        .then((res) => {
          console.log(res);
          setSuccessMessage('New employee registered successfully.');
          setTimeout(() => {
            navigate("/DisplayEmployees");
          }, 2000);
        })
        .catch((err) => console.log(err));
    }
  };

  const backEmployee = () => {
    navigate(-1);
  };

  useEffect(() => {
    SetBaseUrl("https://employee-proj-eight.vercel.app");
    setIsSubmitDisabled(hasValidationErrors());
  }, [employee]);

  return (
    <>
      <div className="container border rounded p-4 mt-5 leave-policy-container" style={{ backgroundColor: 'white' }} >
        <h3 className="mb-4">Employee Registration</h3>
        <form className="row col-xxl" onSubmit={handleSubmit}>
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
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={employee.email}
              onChange={handleChange}
            />
            {errorMsg.email && <span style={{ color: "red" }}>{errorMsg.email}</span>}
          </div>

          <div className="col-md-6">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="text"
              className="form-control"
              id="password"
              name="password"
              disabled
              value={employee.password = "password@123"}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="age" className="form-label">
              Employee Age
            </label>
            <input
              type="text"
              className="form-control"
              id="age"
              name="employeeAge"
              value={employee.employeeAge}
              onChange={handleChange}
            />
            {errorMsg && <span style={{ color: "red" }}>{errorMsg.employeeAge}</span>}
          </div>
          <div className="col-6">
            <label htmlFor="dateOfjoining" className="form-label">
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
            {errorMsg && (<span style={{ color: 'red' }}>{errorMsg.employeeDOJ}</span>)}
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
            {errorMsg && (<span style={{ color: 'red' }}>{errorMsg.employeeRemarks}</span>)}
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
              <option selected>Choose...</option>
              <option>Male</option>
              <option>Female</option>
              <option>Others</option>
            </select>
            {errorMsg && (<span style={{ color: 'red' }}>{errorMsg.employeeGender}</span>)}
          </div>
          <div className="col-md-2">
            <label htmlFor="AccruedLeaves" className="form-label">
              Accrued Leaves
            </label>
            <input
              type="text"
              className="form-control"
              id="AccruedLeaves"
              name="employeeAccruedLeaves"
              value={employee.employeeAccruedLeaves}
              onChange={handleChange}
            />
            {errorMsg && (<span style={{ color: 'red' }}>{errorMsg.employeeAccruedLeaves}</span>)}
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
              <option selected>Choose...</option>
              <option>admin</option>
              <option>superuser</option>
              <option>employee</option>
              <option>guest</option>
            </select>
            {errorMsg && (<span style={{ color: 'red' }}>{errorMsg.roleName}</span>)}
          </div>
          <div className="p-5 text-center">
            <button type="submit" className="btn bg-primary text-white" disabled={isSubmitDisabled}>
              Submit
            </button>
            <button type="submit" className="btn bg-danger text-white ms-3" onClick={backEmployee}>
              Back
            </button>
          </div>
        </form>
        {successMessage && (
          <AlertMessage
            message={successMessage}
            type="success"
            onClose={() => setSuccessMessage('')}
          />
        )}
      </div>
      <div className="footer-space" style={{ height: '100px' }}></div> {/* Space for the footer */}
      <Footer />
      <style>
        {`
          body {
            background: linear-gradient(to right, lightblue, #ffffff);
          }
          .leave-policy-container {
            margin-bottom: 20px; /* Ensure space for the footer */
          }
        `}
      </style>
    </>
  );
}
