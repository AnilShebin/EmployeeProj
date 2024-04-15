import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../login/AuthContext";
import AlertMessage from '../AlertMessage';

interface HolidayProps {
  holidayName: string;
  holidayDateTime: string;
}

export default function HolidayForm() {
  const [holiday, setHoliday] = useState<HolidayProps>({
    holidayName: "",
    holidayDateTime: "",

  });

  const navigate = useNavigate();
  const [baseUrl, SetBaseUrl] = useState("https://thay-db.vercel.app");
  const { token } = useAuth();
  
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setHoliday({ ...holiday, [name]: value });
  };
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string>('');

  const hasValidationErrors = () => {
    const errors: Record<string, string> = {};
    if (!holiday.holidayName.trim()) {
      errors.holidayName = "Name cannot be empty";
    } else if (holiday.holidayName.trim().length <= 4) {
      errors.holidayName = "Name must have more than 4 letters";
    } else if (!/^[a-zA-Z. ]+$/.test(holiday.holidayName)) {
      errors.holidayName = "Name must be uppercase letter, lowercase letters only";
    }


    if (!holiday.holidayDateTime.trim()) {
      errors.holidayDateTime = "Date cannot be empty";
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
        .post(`${baseUrl}/api/holiday/`, holiday,
        { headers: {
          Authorization: `Bearer ${token}`
        }})
        .then((res) => {
          console.log(res);
          setSuccessMessage('Holiday registered successfully.'); 
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
    SetBaseUrl("https://thay-db.vercel.app");
    setIsSubmitDisabled(hasValidationErrors());
  }, [holiday]);

  return (
    <div className="container border rounded p-4 mt-5 " style={{ backgroundColor:'white' }}>
      <h3 className="mb-4">Holiday Registration</h3>
      <form className="row col-xxl " onSubmit={handleSubmit}>
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

        <div className="col-6">
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
            required
          />
          {errorMsg && (<span style={{ color: 'red' }}>{errorMsg.holidayDateTime}</span>)}
        </div>
        <div className="p-5 text-center">
          <button type="submit" className="btn bg-primary text-white " disabled={isSubmitDisabled}>Submit</button>

          <button type="button" className="btn bg-danger text-white ms-3" onClick = {backbutton}>
            back
          </button>
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
}