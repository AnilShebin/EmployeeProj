import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../login/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import AlertMessage from "../AlertMessage";

const ReadEmployees: React.FC = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState<any>({});
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showChangePassword, setShowChangePassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState<string>('');

  const { roleName, token } = useAuth();
  const isAdmin = roleName === "admin";
  const issuperuser = roleName === "superuser";

  const [baseUrl, setBaseUrl] = useState("https://thay-db.vercel.app");

  useEffect(() => {
    setBaseUrl("https://thay-db.vercel.app");
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
    navigate("/EditEmployee/" + id);
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
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleConfirmChangePassword = () => {
    if (newPassword === confirmPassword) {
      axios
        .put(
          `${baseUrl}/api/password/${id}`,
          {
            newPassword: newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log("Password changed successfully:", response.data);
          setShowChangePassword(false);
          setNewPassword("");
          setConfirmPassword("");
          setSuccessMessage('Password Changed successfully.'); 
        })
        .catch((error) => {
          console.error("Error changing password:", error);
        });
    } else {
      console.error("New password and confirm password do not match");
    }
  };

  return (
    <div style={{ backgroundImage: 'linear-gradient(to right, lightblue, #ffffff)', minHeight: "100vh" }}>
      <div className="container mt-0" >
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
            {isAdmin || issuperuser && (
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
                <div className="mt-3">
                  <label htmlFor="newPassword">New Password :</label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="mt-3">
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="mt-3">
                  <button
                    className="btn btn-success"
                    onClick={handleConfirmChangePassword}
                  >
                    Change Password
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
          onClose={() => setSuccessMessage('')}
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
    </div>
  );
};

export default ReadEmployees;
