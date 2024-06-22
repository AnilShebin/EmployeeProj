# Thay-Technology Employee Management Web Application

## Project Structure

```bash
Backend                          | Frontend
---------------------------------|-------------------------------------
controllers/                     | src/
   ├── authController.js         |   ├── components/
   ├── employeeController.js     |   │   ├── employees/
   ├── roleController.js         |   │   │   ├── DisplayEmployees.tsx
   ├── holidayController.js      |   │   │   ├── AddEmployees.tsx
   ├── timeController.js         |   │   │   ├── EditEmployees.tsx
   ├── payslipController.js      |   │   │   └── ReadEmployees.tsx
   └── passwordController.js     |   ├── role/
middleware/                      |   │   ├── ReadRole.tsx
   ├── authMiddleware.js         |   │   ├── EditRole.tsx
   └── errorMiddleware.js        |   │   └── AddRole.tsx
services/                        |   ├── holidays/
   ├── authService.js            |   │   ├── DisplayHoliday.tsx
   ├── employeeService.js        |   │   ├── EditHoliday.tsx
   ├── roleService.js            |   │   └── AddHoliday.tsx
   ├── holidayService.js         |   ├── Time/
   ├── timeService.js            |   │   ├── DisplayTime.tsx
   ├── payslipService.js         |   │   └── AddRecord.tsx
   └── passwordService.js        |   ├── payslip/
contactUs.js                     |   │   └── PaySlip.tsx
server.js                        |   ├── login/
contactUs.js                     |   │   ├── Login.tsx
server.js                        |   │   ├── Signup.tsx
                                 |   │   ├── AuthContext.tsx
                                 |   │   └── ProtectedRoute.tsx
                                 |   └── Navbar.tsx
                                 ├── Home.tsx
                                 ├── AboutUs.tsx
                                 ├── LearnMore.tsx
                                 ├── Contact.tsx
                                 ├── index.tsx
                                 └── Deletecall.css
```

## Features

- **Authentication:** Secure user authentication system.
- **Employee Management:** CRUD operations for employee information.
- **Role-Based Access Control:** Assign and manage roles for different user levels.
- **Holiday Tracking:** Keep track of holidays.
- **Time Management:** Log and manage employee work hours.
- **Payslip Generation:** Automated generation of employee payslips.

## Prerequisites

Ensure you have the following software installed before setting up the project:

* [![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
* [![React.js](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
* [![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)
* [![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)](https://code.visualstudio.com/)

## Installation

# Clone the repository
```bash
git clone https://github.com/Raj1531/EmployeeProj EmployeeProj
```

# Navigate to the backend folder
```bash
cd EmployeeProj/BackEnd

npm install

npm start
```

# Navigate to the frontend folder
```bash
cd EmployeeProj/FrontEnd

npm install

npm run dev
```

# Connect to your database and execute SQL commands
```bash
-- Select the database
USE thay;

-- Create the 'roles' table if not exists
CREATE TABLE IF NOT EXISTS roles (
  roleID INT AUTO_INCREMENT PRIMARY KEY,
  roleName VARCHAR(255) UNIQUE NOT NULL,
  roleStatus VARCHAR(50),
  createdDate VARCHAR(50),
  roleDescription TEXT,
  ruleRights TEXT
);

-- Create the 'employee' table if not exists
CREATE TABLE IF NOT EXISTS employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employeeID INT UNIQUE NOT NULL,
  employeeName VARCHAR(255) NOT NULL,
  employeeAge INT NULL,
  employeeGender VARCHAR(10) NULL,
  employeeDOJ VARCHAR(50) NULL,
  employeeRemarks TEXT NULL,
  employeeAccruedLeaves INT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  roleName VARCHAR(50) NOT NULL,
  FOREIGN KEY (roleName) REFERENCES roles(roleName)
);

-- Insert roles if not exists
INSERT INTO roles (roleID, roleName, roleStatus, createdDate, roleDescription, ruleRights)
VALUES (1, 'admin', 'Active', '2024-01-07', 'Admin with All access', 'Attendance, EmpList, HolidayList, AttendanceSheet, Contact, About');

INSERT INTO roles (roleID, roleName, roleStatus, createdDate, roleDescription, ruleRights)
VALUES (2, 'employee', 'Active', '2024-01-07', 'Limited Access', 'Contact, About, Attendance, HolidayList');

INSERT INTO roles (roleID, roleName, roleStatus, createdDate, roleDescription, ruleRights)
VALUES (3, 'superuser', 'Active', '2024-01-07', 'Only Viewable Access', 'EmpList, HolidayList, AttendanceSheet, Contact, About, View only');

INSERT INTO roles (roleID, roleName, roleStatus, createdDate, roleDescription, ruleRights)
VALUES (4, 'guest', 'Active', '2024-01-07', 'No access', 'Contact, About');

-- Create the 'holiday' table if not exists
CREATE TABLE IF NOT EXISTS holiday (
  holidayID INT PRIMARY KEY AUTO_INCREMENT,
  holidayName VARCHAR(255) NOT NULL,
  holidayDay VARCHAR(255) NOT NULL,
  holidayDate DATE NOT NULL,
  mandatoryOptionalHoliday ENUM('MANDATORY', 'OPTIONAL') NOT NULL DEFAULT 'OPTIONAL',
  serialNo INT
);

-- Create the 'timerdetails' table if not exists
CREATE TABLE IF NOT EXISTS timerdetails (
  timerID INT AUTO_INCREMENT PRIMARY KEY,
  employeeID INT,
  checkInDateTime DATETIME,
  checkOutDateTime DATETIME,
  totalWorkingHours TIME,
  date DATE
);

-- Describe holiday table to verify structure
DESCRIBE holiday;
```

# Contributors

Special thanks to the contributors who have participated in this project:

- [Anil Shebin](https://github.com/AnilShebin)
- [Gunali](https://github.com/gunali14)
- [Keerthivasan](https://github.com/keerthivasan0531)
- [Sowmiya](https://github.com/sowmiyamanoj)
- [Vikram](https://github.com/VikramJA99)

Your contributions are greatly appreciated! 🚀
