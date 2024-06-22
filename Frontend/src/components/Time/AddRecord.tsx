import axios from "axios";
import { useState } from "react";
import { useAuth } from "../login/AuthContext";
import AlertMessage from "../AlertMessage";
import Footer from "../nav/Footer"; // Import your Footer component here

function AddRecord() {
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { token } = useAuth();
  const Backend = `https://employee-proj-eight.vercel.app/api`;

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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="container flex-grow-1 d-flex justify-content-center align-items-center">
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
      </div>
      <style>
        {`
        body {
          background: linear-gradient(to right, lightblue, #ffffff);
          margin: 0;
          padding: 0;
        }
        .container {
          flex-grow: 1;
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
      <Footer /> {/* Add the Footer component */}
    </div>
  );
}

export default AddRecord;
