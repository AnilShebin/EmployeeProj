import React, { useState, useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useAuth } from "../login/AuthContext";
import "./paySlip.css";
import Footer from "../nav/Footer"; // Import your Footer component here

const PaySlip = () => {
  const [data, setData] = useState<any>(null);
  const [searchEmployeeID, setSearchEmployeeID] = useState<string>("");
  const pdfContainerRef = useRef<HTMLDivElement | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { token } = useAuth();
  const Backend = "https://employee-proj-eight.vercel.app";

  const handleGenerate = () => {
    setErrorMessage(null);

    if (!searchEmployeeID) {
      setErrorMessage("Please enter an Employee ID.");
      return;
    }

    fetch(`${Backend}/api/payslip/${searchEmployeeID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((responseData) => {
        const newData = Array.isArray(responseData) ? responseData : [responseData];
        setData(newData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setErrorMessage("Error fetching data. Please try again.");
      });
  };

  const handleDownloadPDF = async () => {
    const pdf = new jsPDF();
    const content = pdfContainerRef.current;

    if (content) {
      const payslipData = Array.isArray(data) ? data : [];

      for (let i = 0; i < payslipData.length; i++) {
        if (i > 0) {
          pdf.addPage();
        }

        const canvas = await html2canvas(content, { scale: 2 });
        pdf.addImage(canvas.toDataURL("image/png"), "PNG", 10, 10, 190, 0);
      }
      pdf.save(`paySlip_employeeID-${searchEmployeeID}.pdf`);
    }
  };

  return (
    <div style={{ background: "linear-gradient(to right, lightblue, #ffffff)", minHeight: "100vh", paddingTop: "30px" }}>
      <div className="container">
      <div className="d-flex justify-content-left">
  <div className="search-section d-flex align-items-center gap-3" style={{ marginLeft: '105px' }}>
    <input
      type="text"
      placeholder="Enter Employee ID"
      value={searchEmployeeID}
      onChange={(e) => setSearchEmployeeID(e.target.value)}
      className="form-control"
      style={{ marginBottom: 48 }} // Remove bottom margin for input
    />
    <button onClick={handleGenerate} className="btn btn-primary me-3">
      Generate
    </button>
  </div>
</div>





        {errorMessage && (
          <div className="mt-2" style={{ color: "red", textAlign: "center" }}>
            {errorMessage}
          </div>
        )}

        <div style={{ background: "#ffffff", padding: "30px", borderRadius: "10px", margin: "0 auto", maxWidth: "900px" }}>
          <div id="paySlipContainer" className="salary-slip" ref={pdfContainerRef}>
            <header className="salary-header">
              <h1 style={{ borderBottom: "1px solid #000", paddingBottom: "20px", margin: 0 }}>Thay Technology</h1>
              <p style={{ borderBottom: "1px solid #000", paddingBottom: "20px", fontSize: '20px', margin: 0 }} ><b>Salary Slip</b></p>
            </header>
            <div>
              <div style={{ borderBottom: "1px solid #000", paddingBottom: "20px", margin: 0 }}>
                {Array.isArray(data) &&
                  data.map((d: any, i: number) => (
                    <div key={i} className="row" style={{ marginBottom: "15px" }}>
                      <div className="col-md-6">
                        <div className="fs-sm text-dark text-uppercase-bold-sm px-0" style={{ fontSize: '18px' }}>
                          <b>EmployeeID: {d.employeeID}</b>
                        </div>
                        <div className="fs-sm text-dark text-uppercase-bold-sm px-0" style={{ fontSize: '18px' }}>
                          <b>EmployeeName: {d.employeeName}</b>
                        </div>
                      </div>
                      <div className="col-md-6 text-md-end">
                        <div className="fs-sm text-dark text-uppercase-bold-sm px-0" style={{ fontSize: '18px' }}>
                          <b>Month: {d.month}</b>
                        </div>
                        <div className="fs-sm text-dark text-uppercase-bold-sm px-0" style={{ fontSize: '18px' }}>
                          <b>DateOfJoining: {d.dateOfJoining}</b>
                        </div>
                        <div className="fs-sm text-dark text-uppercase-bold-sm px-0" style={{ fontSize: '18px' }}>
                          <b>Number of days present: {d.daysPresent}</b>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <table className="table border-gray-200 mt-4">
              <thead>
                <tr>
                  <th scope="col" className="fs-sm text-dark text-uppercase-bold-sm px-0">Description</th>
                  <th scope="col" className="fs-sm text-dark text-uppercase-bold-sm text-end px-0">Amount</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(data) &&
                  data.map((d: any, i: number) => (
                    <React.Fragment key={i}>
                      <tr>
                        <td className="px-0" style={{ fontSize: '17px' }}>Basic Salary</td>
                        <td className="text-end px-0" style={{ fontSize: '17px' }}>{d.basicSalary}</td>
                      </tr>
                      <tr>
                        <td className="px-0" style={{ fontSize: '17px' }}>Bonus Salary</td>
                        <td className="text-end px-0" style={{ fontSize: '16px' }}>{d.bonusSalary}</td>
                      </tr>
                      <tr>
                        <td className="px-0" style={{ fontSize: '17px' }}>HRA Amount</td>
                        <td className="text-end px-0" style={{ fontSize: '16px' }}>{d.hraAmount}</td>
                      </tr>
                      <tr>
                        <td className="px-0" style={{ fontSize: '17px' }}>PF Amount</td>
                        <td className="text-end px-0" style={{ fontSize: '17px' }}>{d.pfAmount}</td>
                      </tr>
                    </React.Fragment>
                  ))}
              </tbody>
            </table>
            <br />
            <h5><b>Total:</b></h5>
            <div>
              {Array.isArray(data) &&
                data.map((d: any, i: number) => (
                  <div key={i} className="row dark-bottom-border" style={{ marginBottom: "15px" }}>
                    <div className="col-md-6">
                      <div className="fs-sm text-dark text-uppercase-bold-sm px-0" style={{ fontSize: '17px' }}>Netsalary</div>
                    </div>
                    <div className="col-md-6 text-md-end">
                      <div className="fs-sm text-dark text-uppercase-bold-sm px-0 " style={{ fontSize: '17px' }}>{d.netSalary}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <center>
          <button
            onClick={() => handleDownloadPDF()}
            className="btn btn-primary mt-4"
            disabled={!data} // Disable if data is null (no payslip generated)
          >
            Download PDF
          </button>
        </center>
        <div style={{ height: "50px" }}></div> {/* Empty space for the footer */}
        <Footer />
        <style>
          {`
            body {
              background: linear-gradient(to right, lightblue, #ffffff);
            }
            .btn {
              margin-bottom: 50px;
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default PaySlip;
