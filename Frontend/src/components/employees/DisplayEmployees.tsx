import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../login/AuthContext";
import Footer from "../nav/Footer";

const DisplayEmployee = () => {
  const [data, setData] = useState<any[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const navigate = useNavigate();
  const [baseUrl] = useState("http://localhost:8080");
  const { roleName, token, isLoggedIn } = useAuth();

  const getData = () => {
    fetch(`${baseUrl}/api/employee`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch employees");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const readEmployee = (id: string) => {
    navigate(`/ReadEmployee/${id}`);
  };

  const confirmDelete = (id: string) => {
    setDeleteId(id);
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  const executeDelete = (id: string) => {
    fetch(`${baseUrl}/api/employee/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete employee");
        }
        getData(); // Refresh data after deletion
        setDeleteId(null); // Clear delete confirmation
      })
      .catch((err) => {
        console.error("Error deleting employee:", err.message);
      });
  };

  const addEmployee = () => {
    navigate("/AddEmployee/");
  };

  useEffect(() => {
    getData();
  }, [baseUrl, token]);

  return (
    <>
      <div style={{ background: 'linear-gradient(to right, lightblue, #ffffff)', padding: '20px' }}>
        <div className="container">
          <div className="row justify-content-end">
            <div className="col-md-6 d-flex justify-content-end">
              {isLoggedIn && roleName === 'admin' && (
                <button className="btn btn-info mt-3" onClick={addEmployee}>Add Employee</button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div style={{ background: 'linear-gradient(to right, lightblue, #ffffff)', minHeight: "100vh", padding: "20px" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col">
              <table className="table table-hover table-bordered table-striped text-center">
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Employee Name</th>
                    {isLoggedIn && (roleName === 'admin' || roleName === 'superuser') && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {data.map((employee,) => (
                    <tr key={employee.employeeID}>
                      <td>{employee.employeeID}</td>
                      <td>{employee.employeeName}</td>
                      {isLoggedIn && roleName === "admin" && (
                        <td>
                          <button
                            className="btn btn-success me-2"
                            onClick={() => readEmployee(employee.employeeID)}
                          >
                            View
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => confirmDelete(employee.employeeID)}
                          >
                            Delete
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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
      <Footer />
      <style>
        {`
          body {
            background: linear-gradient(to right, lightblue, #ffffff);
          }
          .btn {
            margin-bottom: 10px;
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
            z-index: 9999;
          }
          .modal-card {
            background-color: white;
            padding: 20px;
            border-radius: 5px;
            width: 300px;
            text-align: center;
          }
        `}
      </style>
    </>
  );
};

export default DisplayEmployee;
