import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import { useAuth } from '../login/AuthContext';
import axios from "axios";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import ProfileModal from './ProfileModal';

const CustomNavbar = () => {
    const [expanded, setExpanded] = useState(false);
    const [employee, setEmployee] = useState<any>({});
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [navbarVisible, setNavbarVisible] = useState(true);

    const { isLoggedIn, roleName, token, employeeID } = useAuth();
    const navbarRef = useRef<any>(null);

    const employeecall = () => {
        const baseUrl = (`http://localhost:8080`);
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

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop && navbarVisible) {
                // Scrolling down and navbar is visible
                setNavbarVisible(false);
            } else if (scrollTop < lastScrollTop && !navbarVisible) {
                // Scrolling up and navbar is not visible
                setNavbarVisible(true);
            }
            setLastScrollTop(scrollTop);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollTop, navbarVisible]);

    const handleNavClick = () => {
        setExpanded(false);
    };

    const renderTooltip = (props: any) => (
        <Tooltip id="employee-name-tooltip" {...props}>
            {employee.employeeName} <br />
            {employee.email}
        </Tooltip>
    );

    const handleProfileIconClick = () => {
        setShowProfileModal(true);
    };

    return (
        <>
            <Navbar
                ref={navbarRef}
                expand="lg"
                expanded={expanded}
                style={{
                    backgroundColor: 'lightSkyBlue',
                    borderBottom: "1px solid #e0e0e0",
                    borderBottomLeftRadius: '15px',
                    borderBottomRightRadius: '15px',
                    boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',
                    marginBottom: '0',
                    transition: 'top 0.5s', // Updated transition speed
                    top: navbarVisible ? '0' : '-100px', // Adjust the negative value based on the height of your Navbar
                }}
            >
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className="m-1" onClick={() => setExpanded(!expanded)} />
                <Navbar.Brand as={NavLink} onClick={handleNavClick} to="/" className="p-2">
                    <h4 style={{ fontFamily: 'Times New Roman", Times, serif' }}> THAY TECHNOLOGIES</h4>
                    <h6 style={{ fontFamily: 'Times New Roman", Times, serif' }}> Private Limited</h6>
                </Navbar.Brand>

                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav style={{ fontSize: 15 }}>
                        {isLoggedIn && (roleName === 'admin' || roleName === 'superuser') && (
                            <>
                                <Nav.Link as={NavLink} to="/AttendanceSheet" className="p-3" onClick={handleNavClick}>
                                    Attendance Sheet
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/DisplayEmployees" className="p-3" onClick={handleNavClick}>
                                    Employees List
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/PaySlip" className="p-3" onClick={handleNavClick}>
                                    PaySlip
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/ReadRole" className="p-3" onClick={handleNavClick}>
                                    Role Details
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/DisplayHolidays" className="p-3" onClick={handleNavClick}>
                                    Holiday list
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/DisplayTime" className="p-3" onClick={handleNavClick}>
                                    Attendance
                                </Nav.Link>
                            </>
                        )}
                        {isLoggedIn && (roleName === 'employee') && (
                            <>
                                <Nav.Link as={NavLink} to="/AttendanceSheet" className="p-3" onClick={handleNavClick}>
                                    Attendance Sheet
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/DisplayHolidays" className="p-3" onClick={handleNavClick}>
                                    Holiday list
                                </Nav.Link>
                            </>
                        )}
                        {/* <Nav.Link as={NavLink} to="/AboutUs" className="p-3" onClick={handleNavClick}>
                            About
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/ContactUs" className="p-3" onClick={handleNavClick}>
                            Contact
                        </Nav.Link> */}
                        {!isLoggedIn && (
                            <>
                                <Nav.Link as={NavLink} onClick={handleNavClick} to="/login" className="p-3">
                                    Login
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>

                <div onClick={handleProfileIconClick} style={{ cursor: 'pointer', marginRight: '15px' }}>
                    {isLoggedIn && (
                        <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip}
                        >
                            <div className='ms-2 justify-content-end'>
                                <div
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        background: '#1b5954',
                                        color: '#fff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '15px',
                                        fontWeight: 'normal',
                                    }}
                                >
                                    {employee.employeeName &&
                                        `${employee.employeeName.charAt(0).toUpperCase()}${employee.employeeName.includes(' ')
                                            ? employee.employeeName.split(' ')[1].charAt(0).toUpperCase()
                                            : ''
                                        }`}
                                </div>
                            </div>
                        </OverlayTrigger>
                    )}
                </div>
            </Navbar>

            <ProfileModal
                show={showProfileModal}
                onHide={() => setShowProfileModal(false)}
                profileDetails={employee}
            />
        </>
    );
};

export default CustomNavbar;