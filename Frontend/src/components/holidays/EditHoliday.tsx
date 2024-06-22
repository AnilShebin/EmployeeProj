import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../login/AuthContext";
import AlertMessage from "../AlertMessage";
import moment from "moment";
import Footer from "../nav/Footer";

enum MandatoryOptional {
  Mandatory = "Mandatory",
  Optional = "Optional",
}

interface HolidayProps {
  holidayName: string;
  holidayDate: string;
  mandatoryOptionalHoliday: MandatoryOptional;
  holidayDay?: string;
}

const EditHoliday = () => {
  const { id } = useParams();
  const [holiday, setHoliday] = useState<HolidayProps>({
    holidayName: "",
    holidayDate: "",
    mandatoryOptionalHoliday: MandatoryOptional.Mandatory,
  });
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string>('');

  const [baseUrl, setBaseUrl] = useState("http://localhost:8080");
  const { token } = useAuth();

  useEffect(() => {
    setBaseUrl("http://localhost:8080");
    axios.get(`${baseUrl}/api/holiday/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((response) => {
        setHoliday(response.data)
      })
      .catch((error: any) => {
        console.error("Error fetching holiday data:", error);
      });
  }, [id, baseUrl, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "holidayDate") {
      const selectedDate = value;
      const dayOfWeek = moment(selectedDate).format("dddd");
      setHoliday((prevHoliday) => ({
        ...prevHoliday,
        [name]: selectedDate,
        holidayDay: dayOfWeek,
      }));
    } else {
      setHoliday((prevHoliday) => ({
        ...prevHoliday,
        [name]: value as MandatoryOptional, // Cast value to MandatoryOptional enum for select dropdown
      }));
    }
  };

  const hasValidationErrors = () => {
    const errors: Record<string, string> = {};

    if (!holiday.holidayName || holiday.holidayName.trim().length === 0) {
      errors.holidayName = "Name cannot be empty";
    } else if (holiday.holidayName.trim().length <= 4) {
      errors.holidayName = "Name must have more than 4 letters";
    } else if (!/^[a-zA-Z. ]+$/.test(holiday.holidayName)) {
      errors.holidayName = "Name must contain only letters and spaces";
    }

    if (!holiday.holidayDate) {
      errors.holidayDate = "Date cannot be empty";
    }

    if (!holiday.holidayDay) {
      errors.holidayDay = "Day cannot be empty";
    }

    if (!holiday.mandatoryOptionalHoliday) {
      errors.mandatoryOptionalHoliday = "Mandatory / Optional field cannot be empty";
    }

    setErrorMsg(errors);
    return Object.keys(errors).length > 0;
  };

  const backToHolidays = () => {
    navigate("/DisplayHolidays");
  };

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
          console.error("Error updating Holiday:", error);
        });
    }
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
            value={holiday.holidayName || ""}
            onChange={handleChange}
          />
          {errorMsg.holidayName && <span style={{ color: "red" }}>{errorMsg.holidayName}</span>}
        </div>

        <div className="col-md-6">
          <label htmlFor="holidayDate" className="form-label">
            Date
          </label>
          <input
            type="date"
            className="form-control"
            id="holidayDate"
            name="holidayDate"
            value={holiday.holidayDate || ""}
            onChange={handleChange}
            required
          />
          {errorMsg.holidayDate && <span style={{ color: "red" }}>{errorMsg.holidayDate}</span>}
        </div>

        <div className="col-md-6">
          <label htmlFor="holidayDay" className="form-label">
            Day
          </label>
          <input
            type="text"
            className="form-control"
            id="holidayDay"
            name="holidayDay"
            value={holiday.holidayDay || ""}
            onChange={handleChange}
            required
          />
          {errorMsg.holidayDay && <span style={{ color: "red" }}>{errorMsg.holidayDay}</span>}
        </div>

        <div className="col-md-6">
          <label htmlFor="mandatoryOptionalHoliday" className="form-label">
            Mandatory / Optional
          </label>
          <select
            className="form-control"
            id="mandatoryOptionalHoliday"
            name="mandatoryOptionalHoliday"
            value={holiday.mandatoryOptionalHoliday}
            onChange={handleChange}
            required
          >
            <option value={MandatoryOptional.Mandatory}>Mandatory</option>
            <option value={MandatoryOptional.Optional}>Optional</option>
          </select>
          {errorMsg.mandatoryOptionalHoliday && <span style={{ color: "red" }}>{errorMsg.mandatoryOptionalHoliday}</span>}
        </div>

        <div className="col-12 text-center">
          <button type="submit" className="btn btn-info me-3">Update</button>
          <button type="button" className="btn btn-danger" onClick={backToHolidays}>Back</button>
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
      <Footer />
    </div>
  );
};

export default EditHoliday;
