import axios from "axios";
import { useState } from "react";
import { useAuth } from "../login/AuthContext";
import AlertMessage from "../AlertMessage";


function AddRecord() {
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { token } = useAuth();
  const Backend = `https://thay-db.vercel.app/api`;

  const handleCheckIn = async () => {
    try {
      // Perform check-in
      await axios.post(`${Backend}/time/checkin`, {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
      setSuccessMessage('Checked in successfully');
    } catch (error) {
      console.error('Error checking in:', error);
      setErrorMessage('You are already checked in for today');
    }
  };

  const handleCheckOut = async () => {
    try {
      // Perform check-out
      await axios.post(`${Backend}/time/checkout`, {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
      setSuccessMessage('Checked out successfully');
    } catch (error) {
      console.error('Error checking out:', error);
      setErrorMessage('Failed to check out. Please try again.');
    }
  };

  
  return (
    <div className="App d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
      <div className="text-center">
        <h2 className="p-3">Employee Attendance</h2>
        <p style={{ marginBottom: "20px", fontSize: "80%", opacity: "85%" }} >
          Disclaimer: Per day, you are allowed to perform a single check-in and checkout.
        </p>
        <div className="mb-3">
          <button className="btn btn-primary me-2" onClick={handleCheckIn}>
            Check In
          </button>
          <button className="btn btn-secondary" onClick={handleCheckOut}>
            Check Out
          </button>
        </div>
      </div>
      <style>
        {`
        body {
          background: linear-gradient(to right, lightblue, #ffffff);
        }
      `}
      </style>
      {successMessage && (
        <AlertMessage
          message={successMessage}
          type="success"
          onClose={() => setSuccessMessage('')}
        />
      )}
      {errorMessage && (
        <AlertMessage
          message={errorMessage}
          type="error"
          onClose={() => setErrorMessage('')}
        />
      )}
    </div>
  );
}

export default AddRecord;
