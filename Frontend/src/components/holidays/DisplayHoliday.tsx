import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../login/AuthContext";


const DisplayHoliday = () => {

  const [data, setData] = useState<any[]>([]);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();
  const [baseUrl, SetBaseUrl] = useState("https://thay-db.vercel.app");
  const { roleName, token } = useAuth();
  const isAdmin = roleName === "admin";

  function getData() {
    SetBaseUrl("https://thay-db.vercel.app");
    fetch(`${baseUrl}/api/holiday`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  const updateHoliday = (id: string) => {
    navigate("/EditHoliday/" + id);
  }

  const AddHolidays = () => {
    navigate("/AddHoliday/");
  }

  const confirmDelete = (id: React.SetStateAction<null>) => {
    setDeleteId(id);
  }

  const cancelDelete = () => {
    setDeleteId(null);
  }

  const executeDelete = (id: string) => {
    fetch(`${baseUrl}/api/holiday/` + id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        getData();
        setDeleteId(null);
      })
      .catch((err) => {
        console.log(err.message)
      });
  }

  useEffect(() => {
    getData();
  }, [data]);
  return (
    <>
      <div className="d-flex align-items-end flex-column" style={{ backgroundImage: 'linear-gradient(to right, lightblue, #ffffff)' }}>
        {isAdmin && <button className="btn btn-info mt-3 me-4" onClick={AddHolidays}> + Add Holidays</button>}
      </div>
      <div style={{ backgroundImage: 'linear-gradient(to right, lightblue, #ffffff)', minHeight: "100vh", padding: "50px" }}>
        <table className="table table-hover table-bordered table-striped text-center">
          <thead>
            <tr>
              <th>Holiday ID</th>
              <th>Holiday Name</th>
              <th>Holiday Date</th>
              {isAdmin &&
                <th>Actions</th>
              }
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {data.map((d, i) => (
              <tr key={i}>
                <td>{d.holidayID}</td>
                <td>{d.holidayName}</td>
                <td>{d.holidayDateTime}</td>
                {isAdmin &&
                  <td className="d-flex justify-content-evenly">

                    <input
                      type="button"
                      className="btn btn-success"
                      onClick={() => updateHoliday(d.holidayID)}
                      value="Edit"
                    />
                    <br />
                    <input
                      type="button"
                      className="btn btn-danger"
                      onClick={() => confirmDelete(d.holidayID)}
                      value="Delete"
                    />
                    <br />
                  </td>
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deleteId && (
        <div className="modal-background">
          <div className="modal-card">
            <div className="card-body">
              <p>Are you sure you want to delete this holiday?</p>
              <div className="d-flex justify-content-evenly">
                <button className="btn btn-danger" onClick={() => executeDelete(deleteId)}>Yes</button>
                <button className="btn btn-secondary" onClick={cancelDelete}>No</button>

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );

};


export default DisplayHoliday;
