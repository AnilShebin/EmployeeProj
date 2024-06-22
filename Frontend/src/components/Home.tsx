import axios from 'axios';
import { CSSProperties, useEffect, useState } from 'react';
import { useAuth } from './login/AuthContext';
import Footer from './nav/Footer';

function Home() {
  const [employee, setEmployee] = useState<any>({});
  const { token, employeeID } = useAuth();

  const employeecall = () => {
    const baseUrl = 'https://employee-proj-eight.vercel.app';
    axios
      .get(`${baseUrl}/api/employee/${employeeID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const employeeData = response.data[0];
        setEmployee(employeeData);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  };

  useEffect(() => {
    employeecall();
  }, [token, employeeID]);

  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(to right, lightblue, #ffffff)',
    padding: '20px 0',
    margin: '0',
  };

  const contentStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  };

  const textContainerStyle: CSSProperties = {
    textAlign: 'center',
    maxWidth: '600px',
    margin: '0 20px',
  };

  const imageContainerStyle: CSSProperties = {
    maxWidth: '700px',
    marginBottom: '20px',
  };

  const headerStyle: CSSProperties = {
    color: 'black',
    fontSize: '2em',
    fontFamily: 'Garamond, serif',
    textTransform: 'uppercase',
  };

  const imageStyle: CSSProperties = {
    width: '100%',
    height: 'auto',
  };

  return (
    <>
      <div style={containerStyle}>
        <div style={contentStyle}>
          <div style={imageContainerStyle}>
            <img
              src="/web-des.svg"
              alt="Description"
              style={imageStyle}
            />
          </div>
          <div style={textContainerStyle}>
            <h2 style={headerStyle}>THAY TECH WELCOMES YOU<br />{employee.employeeName}</h2>
            <br />
            <p style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              Thay Technologies is an IT Solutions firm based in Chennai.<br /> With its state-of-the-art infrastructure and amicable location in the heart of the city, 
              Thay Technologies intends to add value to IT companies.
            </p>
          </div>
        </div>
        <Footer />
      </div>
      <style>
        {`
          body {
            background: linear-gradient(to right, lightblue, #ffffff);
          }
        `}
      </style>
    </>
  );
}

export default Home;
