import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../login/AuthContext";

const AttendanceRecord = () => {
  const [data, setData] = useState<any[]>([]);
  const [searchEmployeeID, setSearchEmployeeID] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [shouldFetchDefault, setShouldFetchDefault] = useState(false);
  const { token } = useAuth();

  const Backend = `https://thay-db.vercel.app`;
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
    <>

      <div style={{ padding: "50px" }}>
        <div className="search-section d-flex gap-1">
          <input
            type="text"
            placeholder="Enter Employee ID"
            value={searchEmployeeID || ''}
            onChange={(e) => setSearchEmployeeID(Number(e.target.value))}
          />
          <input
            type="date"
            placeholder="Start Date"
            value={startDate || ''}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            placeholder="End Date"
            value={endDate || ''}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button onClick={handleSearch} className="btn btn-primary ms-2">search</button>
          <button onClick={clearSearchCriteria} className="btn btn-secondary ms-2">Clear</button>
        </div>
        {errorMessage && <div className="mt-2" style={{ color: "red" }}>{errorMessage}</div>}

        <table className="table table-hover table-bordered table-striped text-center mt-4">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Date</th>
              <th>CheckInDateTime</th>
              <th>CheckOutDateTime</th>
              <th>totalWorkingHours</th>
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
        <style>
          {`body {  background: linear-gradient(to right, lightblue, #ffffff);`}
        </style>
      </div >

    </>
  );
};

export default AttendanceRecord;