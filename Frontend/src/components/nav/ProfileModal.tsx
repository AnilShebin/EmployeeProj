import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useAuth } from '../login/AuthContext';
import { Button } from "react-bootstrap";

interface ProfileModalProps {
  show: boolean;
  onHide: () => void;
  profileDetails: {
    employeeName: string;
    employeeID: string;
    email: string;
    employeeAge: number;
    employeeDOJ: string;
    employeeGender: string;
  };
}

const ProfileModal: React.FC<ProfileModalProps> = ({ show, onHide, profileDetails }) => {
  const { isLoggedIn, logout } = useAuth();

  const handleLogoutClick = () => {
    logout();
    onHide(); // Close the modal after logout
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <style>
        {`
          .modal-content {
            background-image: linear-gradient(to right, lightblue, #ffffff);
          }
        `}
      </style>
      <Modal.Header closeButton>
        <Modal.Title>Profile Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ fontWeight: 500, fontSize: '19px' }}>
          Name: <span style={{ textTransform: 'uppercase' }}>{profileDetails.employeeName}</span>
        </p>
        <p style={{ fontWeight: 500, fontSize: '16px' }}>Employee ID: {profileDetails.employeeID}</p>
        <p style={{ fontWeight: 500, fontSize: '16px' }}>Email ID: {profileDetails.email}</p>
        <p style={{ fontWeight: 500, fontSize: '16px' }}>Date of Joining: {profileDetails.employeeDOJ}</p>
        <p style={{ fontWeight: 500, fontSize: '16px' }}>Age: {profileDetails.employeeAge}</p>
        <p style={{ fontWeight: 500, fontSize: '16px' }}>Gender: {profileDetails.employeeGender}</p>
        
        {isLoggedIn && (
          <div className="text-center mt-3">
            <Button variant="danger" onClick={handleLogoutClick}>
              Logout
            </Button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ProfileModal;
