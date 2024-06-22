import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../login/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
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
}

const ReadEmployees: React.FC = () => {
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
    email: "",
  });
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showChangePassword, setShowChangePassword] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState<string>('');

  const { roleName, token } = useAuth();
  const isAdmin = roleName === "admin" || roleName === "superuser"; // Include superuser
  const baseUrl = "http://localhost:8080"; // Your API base URL

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

  const updateEmployee = (id: string) => {
    navigate(`/EditEmployee/${id}`);
  };

  const backEmployee = () => {
    navigate(-1);
  };

  const confirmDelete = (id: string | null) => {
    setDeleteId(id);
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  const executeDelete = (id: string) => {
    axios
      .delete(`${baseUrl}/api/employee/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setDeleteId(null);
        navigate("/DisplayEmployees");
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const handleChangePassword = () => {
    setShowChangePassword(true);
  };

  const handleCancelChangePassword = () => {
    setShowChangePassword(false);
  };

  const handleSuccessMessageClose = () => {
    setSuccessMessage('');
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'newPassword') {
      setNewPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const handleSubmitChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Perform password change request here
    // Example:
    axios
      .put(`${baseUrl}/api/employee/changePassword`, { id, newPassword }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSuccessMessage('Password changed successfully');
        setShowChangePassword(false);
      })
      .catch((error) => {
        console.error("Error changing password:", error);
      });
  };

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('.footer');
      if (footer) {
        if (window.scrollY === 0) {
          footer.classList.add('hidden');
        } else {
          footer.classList.remove('hidden');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div style={{ backgroundColor: 'linear-gradient(to right, lightblue, #ffffff)', minHeight: "100vh" }}>
      <div className="container mt-0" style={{ paddingBottom: "100px" }}>
        <div className="d-flex pt-2">
          <FontAwesomeIcon icon={faCircleChevronLeft} onClick={backEmployee} className="me-2" size="2x" />
          <h3 className="mb-3">Employee Details</h3>
        </div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Employee Information</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>Employee ID:</strong> {employee.employeeID}
              </li>
              <li className="list-group-item">
                <strong>Name:</strong> {employee.employeeName}
              </li>
              <li className="list-group-item">
                <strong>Email:</strong> {employee.email}
              </li>
              <li className="list-group-item">
                <strong>Age:</strong> {employee.employeeAge}
              </li>
              <li className="list-group-item">
                <strong>Date of Joining:</strong> {employee.employeeDOJ}
              </li>
              <li className="list-group-item">
                <strong>Gender:</strong> {employee.employeeGender}
              </li>
              {isAdmin && (
                <>
                  <li className="list-group-item">
                    <strong>Remarks:</strong> {employee.employeeRemarks}
                  </li>
                  <li className="list-group-item">
                    <strong>Accrued Leaves:</strong> {employee.employeeAccruedLeaves}
                  </li>
                  <li className="list-group-item">
                    <strong>Role Name:</strong> {employee.roleName}
                  </li>
                </>
              )}
            </ul>
            <div className="d-flex gap-3 ms-3 pt-3">
              {isAdmin && (
                <>
                  <input
                    type="button"
                    className="btn btn-info"
                    onClick={() => updateEmployee(employee.employeeID)}
                    value="Edit"
                  />
                  <input
                    type="button"
                    className="btn btn-danger me-2"
                    onClick={() => confirmDelete(employee.employeeID)}
                    value="Delete"
                  />
                </>
              )}
              <input
                type="button"
                className="btn btn-primary me-2"
                onClick={handleChangePassword}
                value="Change Password"
              />
            </div>
            {showChangePassword && (
              <div>
                <div className="form-group mt-3">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    name="newPassword"
                    value={newPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="mt-3">
                  <button
                    className="btn btn-success ms-2"
                    onClick={handleSubmitChangePassword}
                  >
                    Submit
                  </button>
                  <button
                    className="btn btn-secondary ms-2"
                    onClick={handleCancelChangePassword}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            {successMessage && (
              <AlertMessage
                message={successMessage}
                type="success"
                onClose={handleSuccessMessageClose}
              />
            )}
          </div>
        </div>
        {deleteId && (
          <div className="modal-background">
            <div className="modal-card">
              <div className="card-body">
                <p>Are you sure you want to delete this employee?</p>
                <div className="d-flex justify-content-evenly">
                  <button className="btn btn-danger" onClick={() => executeDelete(deleteId)}>Yes</button>
                  <button className="btn btn-secondary" onClick={cancelDelete}>No</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer className="footer" /> {/* Pass className to the Footer component */}
      <style>
        {`
          body {
            background: linear-gradient(to right, lightblue, #ffffff);
          }
          .modal-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .modal-card {
            background-color: white;
            padding: 20px;
            border-radius: 5px;
            width: 300px;
            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
          }
          .footer {
            transition: transform 0.5s ease-in-out;
          }
          .footer.hidden {
            transform: translateY(100%);
          }
        `}
      </style>
    </div>
  );
};

export default ReadEmployees;
