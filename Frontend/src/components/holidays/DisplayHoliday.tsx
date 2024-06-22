import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../login/AuthContext";
import Footer from "../nav/Footer"; // Import your Footer component

const DisplayHoliday = () => {
  const [data, setData] = useState<any[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const navigate = useNavigate();
  const [baseUrl] = useState("https://employee-proj-eight.vercel.app");
  const { roleName, token } = useAuth();
  const isAdmin = roleName === "admin";

  const getData = () => {
    fetch(`${baseUrl}/api/holiday`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch holidays");
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

  const updateHoliday = (id: string) => {
    navigate(`/EditHoliday/${id}`);
  };

  const addHoliday = () => {
    navigate("/AddHoliday/");
  };

  const confirmDelete = (id: string) => {
    setDeleteId(id);
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  const executeDelete = (id: string) => {
    fetch(`${baseUrl}/api/holiday/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete holiday");
        }
        getData(); // Refresh data after deletion
        setDeleteId(null); // Clear delete confirmation
      })
      .catch((err) => {
        console.error("Error deleting holiday:", err.message);
      });
  };

  useEffect(() => {
    getData();
  }, [baseUrl, token]);

  return (
    <>
      <div className="container">
        <div className="row justify-content-end">
          <div className="col-md-6 d-flex justify-content-end">
            {isAdmin && (
              <button className="btn btn-info mt-3 me-3" onClick={addHoliday}>
                Add Holiday
              </button>
            )}
            {isAdmin && (
              <Link to="/LeavePolicy" target="_blank" rel="noopener noreferrer">
                <button className="btn btn-info mt-3">Leave Policy</button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div style={{ minHeight: "100vh", padding: "20px", backgroundImage: 'linear-gradient(to right, lightblue, #ffffff)' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col">
              <table className="table table-hover table-bordered table-striped text-center rounded">
                <thead>
                  <tr>
                    <th>Sl.No</th>
                    <th>Holiday Name</th>
                    <th>Holiday Date</th>
                    <th>Holiday Day</th>
                    <th>Mandatory / Optional</th>
                    {isAdmin && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {data.map((d, index) => (
                    <tr key={d.holidayID}>
                      <td>{index + 1}</td>
                      <td>{d.holidayName}</td>
                      <td>{d.holidayDate}</td>
                      <td>{d.holidayDay}</td>
                      <td>{d.mandatoryOptionalHoliday}</td>
                      {isAdmin && (
                        <td className="d-flex justify-content-evenly">
                          <button
                            className="btn btn-success"
                            onClick={() => updateHoliday(d.holidayID)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => confirmDelete(d.holidayID)}
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
              <p>Are you sure you want to delete this holiday?</p>
              <div className="d-flex justify-content-evenly">
                <button className="btn btn-danger" onClick={() => executeDelete(deleteId)}>
                  Yes
                </button>
                <button className="btn btn-secondary" onClick={cancelDelete}>
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="footer-space" style={{ height: '70px' }}></div> {/* Space for the footer */}
      <Footer /> {/* Include your Footer component here */}

      <style>
        {`
          body {
            background-image: linear-gradient(to right, lightblue, #ffffff);
            background-size: cover;
            min-height: 100vh;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
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
            background: white;
            border-radius: 5px;
            padding: 20px;
            max-width: 400px;
            width: 100%;
          }
        `}
      </style>
    </>
  );
};

export default DisplayHoliday;
