import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../login/AuthContext";
import Footer from "../nav/Footer";

interface RoleData {
  roleID: string;
  roleName: string;
  roleStatus: string;
  ruleRights: string;
  createdDate: string;
  roleDescription: string;
}

const ReadRole = () => {
  const [data, setData] = useState<RoleData[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [baseUrl] = useState("https://employee-proj-eight.vercel.app");
  const { roleName, token } = useAuth();
  const isAdmin = roleName === "admin";
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    fetch(`${baseUrl}/api/roles`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data: RoleData[]) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  const updateRole = (id: string) => {
    navigate("/EditRole/" + id);
  }

  const confirmDelete = (id: string) => {
    setDeleteId(id);
  }

  const cancelDelete = () => {
    setDeleteId(null);
  }

  const executeDelete = (id: string) => {
    fetch(`${baseUrl}/api/roles/` + id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(() => {
        getData();
        setDeleteId(null);
      })
      .catch((err) => {
        console.error("Error deleting role:", err);
      });
  }

  const addRole = () => {
    navigate("/AddRole/");
  }

  return (
    <>
      <div style={{ backgroundImage: 'linear-gradient(to right, lightblue, #ffffff)', padding: '20px' }}>
        <div className="container">
          <div className="row justify-content-end">
            <div className="col-md-6 d-flex justify-content-end">
              {isAdmin && <button className="btn btn-info mt-3" onClick={addRole}>Add Role</button>}
            </div>
          </div>
        </div>
      </div>
      <div style={{ backgroundImage: 'linear-gradient(to right, lightblue, #ffffff)', minHeight: "100vh", padding: "20px" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col">
              <table className="table table-hover table-bordered table-striped text-center rounded">
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
                        <td className="d-flex justify-content-evenly gap-2">
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => updateRole(d.roleID)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger me-2"
                            onClick={() => confirmDelete(d.roleID)}
                          >
                            Delete
                          </button>
                        </td>
                      }
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
              <p>Are you sure you want to delete this Employee Role?</p>
              <div className="d-flex justify-content-evenly">
                <button className="btn btn-danger" onClick={() => executeDelete(deleteId)}>Yes</button>
                <button className="btn btn-secondary" onClick={cancelDelete}>No</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer /> {/* Include your Footer component here */}

      <style>
        {`
          body {
            background: linear-gradient(to right, lightblue, #ffffff);
          }
        `}
      </style>
    </>
  );
};

export default ReadRole;
