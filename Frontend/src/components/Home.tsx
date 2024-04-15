
import axios from 'axios';
import { CSSProperties, useEffect, useState } from 'react';
import { useAuth } from './login/AuthContext';

function Home() {
  const [employee, setEmployee] = useState<any>({});
  const { token , employeeID } = useAuth();

  const employeecall= () => {
  const baseUrl=(`https://thay-db.vercel.app`);
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
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: 'linear-gradient(to right, lightblue, #ffffff)',
  };

  const textContainerStyle: CSSProperties = {
    textAlign: 'center',
  };

  const imageContainerStyle: CSSProperties = {
    marginRight: '20px',
    maxWidth: '700px',
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
    <div style={containerStyle}>
      <div style={imageContainerStyle}>
        <img
          src="/web-des.svg"
          alt="Description"
          style={imageStyle}
        />
      </div>
      <div style={textContainerStyle}>
        <h2 style={headerStyle} ><b/>THAY TECH WELCOMES YOU  
        <br />{employee.employeeName}</h2><br/>
        <p style={{ fontFamily: 'Times New Roman", Times, serif' }}>Thay Technologies is an IT Solutions firm based in Chennai<br/>. With its state-of-the-art infrastructure and amicable location in the heart of the city, 
          Thay Technologies intends to add value to IT companies.</p>
      </div>
    </div>
  );
}

export default Home;