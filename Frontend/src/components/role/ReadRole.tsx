import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../login/AuthContext";

const ReadRole = () => {
  const [data, setData] = useState<any[]>([]);
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);
  const [baseUrl, SetBaseUrl] = useState("https://thay-db.vercel.app");
  const { roleName, token } = useAuth();
  const isAdmin = roleName === "admin";

  function getData() {
    SetBaseUrl("");
    fetch(`${baseUrl}/api/roles`, {
      headers: {
        Authorization: `Bearer ${token}`
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
  const updateRole = (id: string) => {
    navigate("/EditRole/" + id);
  }

  const confirmDelete = (id: React.SetStateAction<null>) => {
    setDeleteId(id);
  }

  const cancelDelete = () => {
    setDeleteId(null);
  }


  const executeDelete = (id: string) => {
    fetch(`${baseUrl}/api/roles/` + id, {
      method: "DELETE", headers: {
        Authorization: `Bearer ${token}`,
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
  const AddRole = () => {
    navigate("/AddRole/");
  }

  useEffect(() => {
    getData();
  }, [data]);

  return (
    <>
      <div className="d-flex align-items-end flex-column" style={{ backgroundImage: 'linear-gradient(to right, lightblue, #ffffff)' }}>
        {isAdmin && <button className="btn btn-info mt-3 me-4" onClick={AddRole}> + Add Role</button>}
      </div>
      <div style={{ backgroundImage: 'linear-gradient(to right, lightblue, #ffffff)', minHeight: "100vh", padding: "50px" }}>
        <table className="table table-hover table-bordered table-striped text-center">
          <thead>
            <tr>
              <th>Role ID</th>
              <th>Role Name</th>
              <th>Role Status</th>
              <th>Rule Rights</th>
              <th>Created Date</th>
              <th>Role Description</th>
              {isAdmin &&
                <th>Action</th>
              }

            </tr>
          </thead>
          <tbody className="table-group-divider">
            {data.map((d, i) => (
              <tr key={i}>
                <td>{d.roleID}</td>
                <td>{d.roleName}</td>
                <td>{d.roleStatus}</td>
                <td>{d.ruleRights}</td>
                <td>{d.createdDate}</td>
                <td>{d.roleDescription}</td>
                {isAdmin &&
                  <td className="d-flex justify-content-evenly">
                    <input
                      type="button"
                      className="btn btn-success"
                      onClick={() => updateRole(d.roleID)}
                      value="Edit"
                    />
                    <br />
                    <input
                      type="button"
                      className="btn btn-danger me-2"
                      onClick={() => confirmDelete(d.roleID)}
                      value="Delete"
                    />
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
              <p>Are you sure you want to delete this Employee Role?</p>
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

export default ReadRole;