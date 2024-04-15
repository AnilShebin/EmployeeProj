import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../login/AuthContext";
import AlertMessage from "../AlertMessage";

const EditHoliday = () => {
  const { id } = useParams();
  const [holiday, setHoliday] = useState<any>({});
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string>('');

  const [baseUrl, SetBaseUrl] = useState("https://thay-db.vercel.app");
  const { token } = useAuth();

  useEffect(() => {
    SetBaseUrl("https://thay-db.vercel.app");
    axios.get(`${baseUrl}/api/holiday/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((response) => {
        setHoliday(response.data)
      })
      .catch((error: any) => {
        console.error("Error fetching role data:", error);
      });
  }, [id]);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setHoliday({ ...holiday, [name]: value });
  };

  const hasValidationErrors = () => {
    const errors: Record<string, string> = {};

    if (!holiday.holidayName.trim()) {
      errors.holidayName = "Name cannot be empty";
    } else if (holiday.holidayName.trim().length <= 4) {
      errors.holidayName = "Name must have more than 4 letters";
    } else if (!/^[a-zA-Z. ]+$/.test(holiday.holidayName)) {
      errors.holidayName = "Name must be uppercase letter, lowercase letters only";
    }
    if (!holiday.holidayDateTime) {
      errors.holidayDateTime = "Date cannot be empty";
    }
    setErrorMsg(errors);
    return Object.keys(errors).length > 0;
  };


  const Backholiday = () => {
    navigate("/DisplayHolidays");
  }

  const updateHoliday = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasValidationErrors()) {
      console.log("Validation errors. Form not submitted.");
    } else {
      axios.put(`${baseUrl}/api/holiday/${id}`, holiday, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then(() => {
          setSuccessMessage('Holiday updated successfully.'); 
          setTimeout(() => {
            navigate("/DisplayHolidays");
          }, 2000);
        })
        .catch((error: any) => {
          console.error("Error updating Role:", error);
        });
    };
  };

  return (
    <div className="container border p-4 rounded mt-4" style={{ backgroundColor: 'white' }}>
      <h3 className="mb-4">Edit Holiday</h3>
      <form className="row g-3" onSubmit={updateHoliday}>

        <div className="col-md-6">
          <label htmlFor="holidayName" className="form-label">
            Holiday Name
          </label>
          <input
            type="text"
            className="form-control"
            id="holidayName"
            name="holidayName"
            value={holiday.holidayName}
            onChange={handleChange}
          />
          {errorMsg.holidayName && <span style={{ color: "red" }}>{errorMsg.holidayName}</span>}
        </div>
        <div className="col-md-6">
          <label htmlFor="holidayDateTime" className="form-label">
            Holiday Date
          </label>
          <input
            type="date"
            className="form-control"
            id="holidayDateTime"
            name="holidayDateTime"
            value={holiday.holidayDateTime}
            onChange={handleChange}
          />
          {errorMsg && <span style={{ color: "red" }}>{errorMsg.holidayDateTime}</span>}
        </div>

        <div className="col-12 text-center">
          <button type="submit" className="btn btn-info me-3">Update</button>
          <button type="button" className="btn btn-danger" onClick={Backholiday}>Back</button>
        </div>
      </form>
      {successMessage && (
        <AlertMessage
          message={successMessage}
          type="success"
          onClose={() => setSuccessMessage('')}
        />
      )}
      <style>
        {`
        body {
          background: linear-gradient(to right, lightblue, #ffffff);
        }
      `}
      </style>
    </div>
  );
};

export default EditHoliday;
