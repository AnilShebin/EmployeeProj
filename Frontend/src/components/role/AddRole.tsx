import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from 'react-select';
import { useAuth } from "../login/AuthContext";
import AlertMessage from "../AlertMessage";


interface RoleProps {
  roleID: string;
  roleName: string;
  roleStatus: string;
  roleDescription: string;
  createdDate: string;
  ruleRights: string;
}

const RoleForm: React.FC = () => {
  const [role, setRole] = useState<RoleProps>({

    roleID: "",
    roleName: "",
    roleStatus: "",
    roleDescription: "",
    createdDate: "",
    ruleRights: "",

  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setRole({ ...role, [name]: value });
  };

  const { opr } = useParams();
  const navigate = useNavigate();
  const [baseUrl, SetBaseUrl] = useState("https://thay-db.vercel.app");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string>('');
  const { token } = useAuth();

  const backbutton = () => {
    navigate(-1);
  };

  const hasValidationErrors = () => {
    const errors: Record<string, string> = {};

    if (!role.roleName.trim()) {
      errors.roleName = "Name cannot be empty";
    } else if (role.roleName.trim().length <= 4) {
      errors.roleName = "Name must have more than 4 letters";
    } else if (!/^[a-zA-Z. ]+$/.test(role.roleName)) {
      errors.roleName = "Name must be uppercase letter, lowercase letters only";
    }
    if (!role.roleID.trim()) {
      errors.roleID = "ID cannot be empty";
    } else if (!/^\d+$/.test(role.roleID.trim())) {
      errors.roleID = "ID must be a number";
    }
    if (!role.roleStatus.trim()) {
      errors.roleStatus = "status cannot be empty";
    }
    if (!role.roleDescription) {
      errors.roleDescription = "Description cannot be empty";
    }
    if (!role.createdDate.trim()) {
      errors.createdDate = "Date cannot be empty";
    }
    if (!role.ruleRights) {
      errors.ruleRights = "RuleRights cannot be empty";
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
        .post(`${baseUrl}/api/roles/`, role, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        .then((res: any) => {
          console.log(res);
          setSuccessMessage('New role add successfully.');
          setTimeout(() => {
            navigate("/ReadRole");
          }, 2000);
        })
        .catch((err) => console.log(err));
    }
  };
  useEffect(() => {
    SetBaseUrl("https://thay-db.vercel.app");
    setIsSubmitDisabled(hasValidationErrors());
  }, [role, opr]);

  const options = [

    { value: 'EmpList', label: 'EmpList' },
    { value: 'HolidayList', label: 'HolidayList' },
    { value: 'attendanceSheet', label: 'AttendanceSheet' },
    { value: 'Attendance', label: 'Attendance' },
    { value: 'Contact', label: 'ContactUs' },
    { value: 'About', label: 'About' },
    { value: 'ViewOnly', label: 'ViewOnly' },
  ];

  const handleMultiSelectChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions.map((option: any) => option.value).join(', ');
    setRole({ ...role, ruleRights: selectedValues });
  };

  return (
    <div className="container border rounded p-4 mt-5">
      <h3 className="mb-4">Role Registration</h3>
      <form className="row col-xxl" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="roleid" className="form-label">
            Role ID
          </label>
          <input
            type="id"
            className="form-control"
            id="roleid"
            name="roleID"
            value={role.roleID}
            onChange={handleChange}
          />
          {errorMsg.roleID && <span style={{ color: "red" }}>{errorMsg.roleID}</span>}
        </div>
        <div className="col-md-6">
          <label htmlFor="roleName" className="form-label">
            Role Name
          </label>
          <input
            type="text"
            className="form-control"
            id="roleName"
            name="roleName"
            value={role.roleName}
            onChange={handleChange}
          />
          {errorMsg.roleName && <span style={{ color: "red" }}>{errorMsg.roleName}</span>}
        </div>
        <div className="col-md-6">
          <label htmlFor="ruleRigths" className="form-label">
            Rule Rights
          </label>
          <Select
            id="ruleRights"
            name="ruleRights"
            value={options.filter((option) => role.ruleRights.includes(option.value))}
            onChange={handleMultiSelectChange}
            options={options}
            isMulti
          />
          {errorMsg.ruleRights && <span style={{ color: "red" }}>{errorMsg.ruleRights}</span>}
        </div>
        <div className="col-md-6">
          <label htmlFor="roleStatus" className="form-label">
            Status
          </label>
          <input
            type="text"
            className="form-control"
            id="roleStatus"
            name="roleStatus"
            value={role.roleStatus}
            onChange={handleChange}
          />
          {errorMsg.roleStatus && <span style={{ color: "red" }}>{errorMsg.roleStatus}</span>}
        </div>
        <div className="col-md-6 me-3">

          <label htmlFor="CreateDate" className="form-label">
            Create Date
          </label>
          <input
            type="date"
            className="form-control"
            id="createdDate"
            name="createdDate"
            value={role.createdDate}
            onChange={handleChange}
          />
          {errorMsg.createdDate && <span style={{ color: "red" }}>{errorMsg.createdDate}</span>}
        </div>
        <div className="col-md-6 me-3">
          <label htmlFor="roleDescription" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="roleDescription"
            name="roleDescription"
            value={role.roleDescription}
            onChange={handleChange}
          />
          {errorMsg.roleDescription && <span style={{ color: "red" }}>{errorMsg.roleDescription}</span>}
        </div>
        <div className="p-5 text-center">
          <button type="submit" className="btn btn-success" disabled={isSubmitDisabled}>
            Submit
          </button>
          <button type="submit" className="btn bg-danger text-white ms-3" onClick={backbutton}>
            back
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
  );
};


export default RoleForm;
