import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../login/AuthContext";
import AlertMessage from "../AlertMessage";
import moment from "moment";
import Footer from "../nav/Footer"; // Import your Footer component

enum MandatoryOptional {
  Mandatory = "Mandatory",
  Optional = "Optional",
}

interface HolidayProps {
  holidayName: string;
  holidayDate: string;
  mandatoryOptionalHoliday: MandatoryOptional; // Update to use enum
  holidayDay?: string;
}

export default function HolidayForm() {
  const [holiday, setHoliday] = useState<HolidayProps>({
    holidayName: "",
    holidayDate: "",
    mandatoryOptionalHoliday: MandatoryOptional.Mandatory, // Default value
  });

  const navigate = useNavigate();
  const baseUrl = "https://employee-proj-eight.vercel.app"; // Set the base URL directly
  const { token } = useAuth();

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
        [name]: value as MandatoryOptional, // Cast value to MandatoryOptional enum
      }));
    }
  };

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string>("");

  const hasValidationErrors = () => {
    const errors: Record<string, string> = {};
    if (!holiday.holidayName.trim()) {
      errors.holidayName = "Name cannot be empty";
    } else if (holiday.holidayName.trim().length <= 4) {
      errors.holidayName = "Name must have more than 4 letters";
    } else if (!/^[a-zA-Z. ]+$/.test(holiday.holidayName)) {
      errors.holidayName = "Name must contain only letters and spaces";
    }

    if (!holiday.holidayDate.trim()) {
      errors.holidayDate = "Date cannot be empty";
    }

    setErrorMsg(errors);
    return Object.keys(errors).length > 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (hasValidationErrors()) {
      console.log("Validation errors. Form not submitted.");
    } else {
      axios
        .post(`${baseUrl}/api/holiday/`, holiday, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          setSuccessMessage("Holiday registered successfully.");
          setTimeout(() => {
            navigate("/DisplayHolidays");
          }, 2000);
        })
        .catch((err) => console.log(err));
    }
  };

  const backbutton = () => {
    navigate(-1);
  };

  useEffect(() => {
    setIsSubmitDisabled(hasValidationErrors());
  }, [holiday]);

  return (
    <div className="container border rounded p-4 mt-5" style={{ backgroundColor: "white" }}>
      <h3 className="mb-4">Holiday Registration</h3>
      <form className="row col-xxl" onSubmit={handleSubmit}>
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
            required
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
            value={holiday.holidayDate}
            onChange={handleChange}
            required
          />
          {errorMsg.holidayDate && <span style={{ color: "red" }}>{errorMsg.holidayDate}</span>}
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
        <div className="p-5 text-center">
          <button type="submit" className="btn bg-primary text-white" disabled={isSubmitDisabled}>
            Submit
          </button>
          <button type="button" className="btn bg-danger text-white ms-3" onClick={backbutton}>
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

      <Footer /> {/* Include your Footer component here */}

      <style>
        {`
          body {
            background: linear-gradient(to right, lightblue, #ffffff);
          }
        `}
      </style>
    </div>
  );
}
