import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../login/AuthContext";
import Footer from "../nav/Footer"; // Import your Footer component here

const AttendanceRecord = () => {
  const [data, setData] = useState<any[]>([]);
  const [searchEmployeeID, setSearchEmployeeID] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [shouldFetchDefault, setShouldFetchDefault] = useState(false);
  const { token } = useAuth();

  const Backend = `https://employee-proj-eight.vercel.app`;
  const defaultUrl = `${Backend}/api/time`;

  const constructUrl = () => {
    let url = defaultUrl;

    if (searchEmployeeID) {
      url += `/${searchEmployeeID}`;

      if (startDate) {
        url += `/${startDate}`;

        if (endDate) {
          url += `/${endDate}`;
        }
      }
    } else if (startDate) {
      url += `/date/${startDate}`;
    }

    return url;
  };

  const handleSearch = () => {
    setErrorMessage(null);

    const url = constructUrl();

    axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setErrorMessage("Invalid Input or Error fetching data");
      });
  };

  const clearSearchCriteria = () => {
    setSearchEmployeeID(null);
    setStartDate(null);
    setEndDate(null);
    setShouldFetchDefault(true);
  };

  useEffect(() => {
    if (shouldFetchDefault) {
      axios.get(defaultUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setData(response.data);
          setShouldFetchDefault(false);
        })
        .catch((error) => {
          console.error("Error fetching default data:", error);
          setErrorMessage(error.message);
          setShouldFetchDefault(false);
        });
    } else {
      handleSearch();
    }
  }, [shouldFetchDefault, token]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="container flex-grow-1" style={{ padding: "50px" }}>
        <div className="search-section d-flex gap-1 mb-3">
          <input
            type="text"
            placeholder="Enter Employee ID"
            value={searchEmployeeID || ''}
            onChange={(e) => setSearchEmployeeID(Number(e.target.value))}
            className="form-control rounded-input"
          />
          <input
            type="date"
            placeholder="Start Date"
            value={startDate || ''}
            onChange={(e) => setStartDate(e.target.value)}
            className="form-control rounded-input"
          />
          <input
            type="date"
            placeholder="End Date"
            value={endDate || ''}
            onChange={(e) => setEndDate(e.target.value)}
            className="form-control rounded-input"
          />
          <button onClick={handleSearch} className="btn btn-primary ms-2">Search</button>
          <button onClick={clearSearchCriteria} className="btn btn-secondary ms-2">Clear</button>
        </div>
        {errorMessage && <div className="mt-2 text-danger">{errorMessage}</div>}

        <table className="table table-hover table-bordered table-striped text-center mt-4">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Date</th>
              <th>CheckInDateTime</th>
              <th>CheckOutDateTime</th>
              <th>Total Working Hours</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {data.map((d, i) => (
              <tr key={i}>
                <td>{d.employeeID}</td>
                <td>{d.date}</td>
                <td>{d.checkInDateTime}</td>
                <td>{d.checkOutDateTime}</td>
                <td>{d.totalWorkingHours}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
          .rounded-input {
            border-radius: 15px;
            padding: 5px;
          }
        `}
      </style>
      <Footer /> {/* Add the Footer component */}
    </div>
  );
};

export default AttendanceRecord;
