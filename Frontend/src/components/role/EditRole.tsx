import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { useAuth } from "../login/AuthContext";
import AlertMessage from "../AlertMessage";
import Footer from "../nav/Footer";

const EditRole: React.FC = () => {
  const { id } = useParams();
  const [role, setRole] = useState<any>({});
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string>("");
  const { token } = useAuth();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/roles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const roleData = response.data[0];
        const selectedOptions = roleData.ruleRights
          .split(", ")
          .map((value: any) => ({
            value,
            label: value,
          }));
        setRole({
          ...roleData,
          ruleRights: selectedOptions,
        });
      })
      .catch((error) => {
        console.error("Error fetching role data:", error);
      });
  }, [id, token]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setRole({ ...role, [name]: value });
  };

  const hasValidationErrors = () => {
    const errors: Record<string, string> = {};

    if (!role.roleName.trim()) {
      errors.roleName = "Name cannot be empty";
    } else if (role.roleName.trim().length <= 4) {
      errors.roleName = "Name must have more than 4 letters";
    } else if (!/^[a-zA-Z. ]+$/.test(role.roleName)) {
      errors.roleName =
        "Name must be uppercase letter, lowercase letters only";
    }

    if (!role.roleID) {
      errors.roleID = "ID cannot be empty";
    } else if (!/^\d+$/.test(role.roleID)) {
      errors.roleID = "ID must be a number";
    }

    if (!role.roleStatus) {
      errors.roleStatus = "Status cannot be empty";
    }

    if (!role.createdDate) {
      errors.createdDate = "Date cannot be empty";
    }

    if (!role.roleDescription) {
      errors.roleDescription = "Description cannot be empty";
    }

    if (!role.ruleRights || role.ruleRights.length === 0) {
      errors.ruleRights = "RuleRights cannot be empty";
    }

    setErrorMsg(errors);

    return Object.keys(errors).length > 0;
  };

  const BackRole = () => {
    navigate("/ReadRole");
  };

  const updateRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasValidationErrors()) {
      console.log("Validation errors. Form not submitted.");
    } else {
      const stringValue = role.ruleRights
        .map((option: any) => option.value)
        .join(", ");
      const updatedRole = { ...role, ruleRights: stringValue };

      axios
        .put(`http://localhost:8080/api/roles/${id}`, updatedRole, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Updated Role:", response.data);
          setSuccessMessage("Role updated successfully.");
          setTimeout(() => {
            navigate("/ReadRole");
          }, 2000);
        })
        .catch((error) => {
          console.error("Error updating Role:", error);
        });
    }
  };

  const updatePassword = (newPassword: string) => {
    axios
      .put(
        `http://localhost:8080/api/passwords/${id}`,
        { newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Updated Password:", response.data);
        setSuccessMessage("Password updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating Password:", error);
      });
  };

  const options = [
    { value: "Attendance", label: "Attendance" },
    { value: "EmpList", label: "EmpList" },
    { value: "HolidayList", label: "HolidayList" },
    { value: "AttendanceSheet", label: "AttendanceSheet" },
    { value: "Contact", label: "ContactUs" },
    { value: "About", label: "About" },
    { value: "ViewOnly", label: "ViewOnly" },
  ];

  const handleMultiSelectChange = (selectedOptions: any) => {
    setRole({ ...role, ruleRights: selectedOptions });
  };

  return (
    <>
      <div className="container border rounded p-4 mt-4" style={{ backgroundColor: 'white' }}>
        <h3 className="mb-4">Edit Role</h3>
        <form className="row col-xxl" onSubmit={updateRole}>
          <div className="col-md-6">
            <label htmlFor="roleid" className="form-label">
              Role ID
            </label>
            <input
              type="text"
              className="form-control"
              id="roleid"
              name="roleID"
              disabled
              value={role.roleID || ""}
              onChange={handleChange}
            />
            {errorMsg.roleID && (
              <span style={{ color: "red" }}>{errorMsg.roleID}</span>
            )}
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
              value={role.roleName || ""}
              onChange={handleChange}
            />
            {errorMsg.roleName && (
              <span style={{ color: "red" }}>{errorMsg.roleName}</span>
            )}
          </div>
          <div className="col-md-6">
            <label htmlFor="ruleRigths" className="form-label">
              Rule Rights
            </label>
            <Select
              id="ruleRights"
              name="ruleRights"
              value={role.ruleRights || []}
              onChange={handleMultiSelectChange}
              options={options}
              isMulti
            />
            {errorMsg.ruleRights && (
              <span style={{ color: "red" }}>{errorMsg.ruleRights}</span>
            )}
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
              value={role.roleStatus || ""}
              onChange={handleChange}
            />
            {errorMsg.roleStatus && (
              <span style={{ color: "red" }}>{errorMsg.roleStatus}</span>
            )}
          </div>
          <div className="col-md-6">
            <label htmlFor="createdDate" className="form-label">
              Created Date
            </label>
            <input
              type="date"
              className="form-control"
              id="createdDate"
              name="createdDate"
              value={role.createdDate || ""}
              onChange={handleChange}
            />
            {errorMsg.createdDate && (
              <span style={{ color: "red" }}>{errorMsg.createdDate}</span>
            )}
          </div>
          <div className="col-md-6">
            <label htmlFor="roleDescription" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="roleDescription"
              name="roleDescription"
              value={role.roleDescription || ""}
              onChange={handleChange}
            />
            {errorMsg.roleDescription && (
              <span style={{ color: "red" }}>{errorMsg.roleDescription}</span>
            )}
          </div>
          <div className="p-5 text-center">
            <button type="submit" className="btn btn-success me-3">
              Update
            </button>
            <button type="reset" className="btn btn-danger" onClick={BackRole}>
              Back
            </button>
          </div>
        </form>
        {successMessage && (
          <AlertMessage
            message={successMessage}
            type="success"
            onClose={() => setSuccessMessage("")}
          />
        )}
      </div>
      <style>
        {`
        body {
          background: linear-gradient(to right, lightblue, #ffffff);
        }
        `}
      </style>
      <div style={{ paddingBottom: '100px' }} /> {/* Add space for the footer */}
      <Footer /> {/* Add the Footer component */}
    </>
  );
};

export default EditRole;
