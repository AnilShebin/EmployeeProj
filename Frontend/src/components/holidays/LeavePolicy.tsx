import React from 'react';
import Footer from '../nav/Footer';

const LeavePolicy: React.FC = () => {
  return (
    <div className="container mt-5 leave-policy-container">
      <style>
        {`
          body {
            background-image: linear-gradient(to right, lightblue, #ffffff);
            margin: 0;
          }

          .card {
            font-family: "Times New Roman";
            background-color: rgba(255, 255, 255, 0.9);
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 80px; /* Added margin-bottom for spacing */
          }

          .leave-policy-container {
            padding-bottom: 20px; /* Added padding to leave space for the footer */
          }

          .img-fluid {
            border: none; /* Remove any borders from the image */
            background-color: transparent; /* Ensure background is transparent */
          }

          .content-container {
            margin: 0 auto;
            padding: 40px; /* Adjust padding to simulate MS Word document margins */
          }
        `}
      </style>
      <div className="card p-4 ">
        <div className="row">
          <div className="col-md-2 d-flex justify-content-start align-items-start">
            <img src="/thayblacklogo.png" alt="" className="img-fluid img-thumbnail" />
          </div>
          <div className="col-md-9">
            <h2 className="mt-5 text-center">Leave Policy for Thay Technologies Private Limited</h2>
          </div>
        </div>
        <div className='content-container'>
        <p><strong>1. Introduction</strong></p>
        <p>Thay Technologies Private Limited is committed to promoting a healthy work-life balance for its employees. This leave policy outlines the guidelines and procedures regarding sick leave, casual leave, and paid leave.</p>

        <p><strong>2. Types of Leave</strong></p>
        <p><strong>2.1 Sick Leave</strong></p>
        <ul>
          <li>Employees are entitled to six (6) days of sick leave per calendar year.</li>
          <li>Sick leave is provided for employees' own illness, injury, or medical appointments.</li>
          <li>Employees must notify their immediate supervisor as soon as possible in case of illness and provide an estimated duration of absence.</li>
          <li>A medical certificate may be required for sick leave exceeding three (3) consecutive days.</li>
        </ul>

        <p><strong>2.2 Paid / Casual Leave</strong></p>
        <ul>
          <li>Employees are entitled to twelve (12) days of casual leave per calendar year.</li>
          <li>Casual leave can be used for personal reasons such as family emergencies, personal appointments, or unforeseen circumstances.</li>
          <li>Employees must request casual leave at least two (2) days in advance, except in cases of emergency.</li>
          <li>Approval of casual leave is subject to the discretion of the immediate supervisor and the availability of staff.</li>
          <li>Paid leave includes annual leave, public holidays, and other company-designated holidays.</li>
          <li>Annual leave accrues at a rate of 1 day per month for full-time employees, up to a maximum of twelve (12) days per year.</li>
          <li>Employees are entitled to observe all public holidays recognized by Thay Technologies Private Limited.</li>
        </ul>

        <p><strong>2.3 Maternity leave & Paternity leave</strong></p>
        <ul>
          <li>The period during which a woman can legally be absent from work in the weeks before and after she has a baby is for 12 weeks with full pay or for 6 months with 50% pay.</li>
          <li>Fathers can also take time off; it's called paternal leave. Paternity leave allows a new dad to take time away from work to be with the baby for three days.</li>
        </ul>

        <p><strong>3. Leave Administration</strong></p>
        <p>The HR department will maintain accurate records of employees' leave entitlements, balances, and usage.</p>
        <ul>
          <li>Employees are encouraged to communicate any leave-related queries or concerns with their immediate supervisor or the HR department.</li>
        </ul>

        <p><strong>4. Leave Without Pay</strong></p>
        <ul>
          <li>In exceptional circumstances where an employee exhausts all leave entitlements, leave without pay may be granted upon approval from the HR department and the employee's supervisor.</li>
        </ul>

        <p><strong>5. Policy Compliance</strong></p>
        <ul>
          <li>All employees are expected to comply with this leave policy and adhere to the prescribed procedures for requesting and utilizing leave.</li>
          <li>Non-compliance with the leave policy may result in disciplinary action, up to and including termination of employment.</li>
        </ul>

        <p><strong>6. Review and Amendments</strong></p>
        <ul>
          <li>This leave policy will be reviewed annually by the HR department to ensure its effectiveness and compliance with relevant laws and regulations.</li>
          <li>Any amendments to the leave policy will be communicated to all employees in a timely manner.</li>
        </ul>

        <p><strong>7. Conclusion</strong></p>
        <p>Thay Technologies Private Limited believes that a well-defined leave policy is essential for maintaining a productive and healthy work environment. Employees are encouraged to familiarize themselves with this policy and reach out to the HR department for any clarifications or assistance regarding leave matters.</p>
        <div className="col-md-1 d-flex justify-content-start align-items-start">
            <img src="/HR-sign.png" alt="" className="img-fluid img-thumbnail" />
          </div>
        <p><strong>(Ramya K)</strong></p>
        <p><strong>HR – Manager</strong></p>
        <p>Registered office: Thay Technologies Pvt Limited, Plot No: 897, No: 9, ‘H’ Block, 10th Street, Anna Nagar, Chennai - 600 040 | Phone: +91 6380454663 /44-47730029 | CIN:U72900TN2022PTC155090 Thay Infotech, Amritha Towers, 1st Floor, New Chennai Township (SEZ), Chengalpattu, Tamil Nadu – 603305 | 
          <a href="mailto:hr@thaytech.com">hr@thaytech.com</a> | 
          <a href="http://www.thaytech.com" target="_blank" rel="noopener noreferrer">www.thaytech.com</a></p>
      </div>
      </div>
      <div className="footer-space" style={{ height: '20px' }}></div> {/* Space for the footer */}
      <Footer />
    </div>
  );
};

export default LeavePolicy;
