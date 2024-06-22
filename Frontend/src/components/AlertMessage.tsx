import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface AlertMessageProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
  autoCloseDuration?: number;
}

const AlertMessage: React.FC<AlertMessageProps> = ({ message, type, onClose, autoCloseDuration = 2000 }) => {
  useEffect(() => {
    let toastId: any;

    if (type === 'success') {
      toastId = toast.success(message, {
        autoClose: autoCloseDuration,
        onClose: onClose,
      });
    } else if (type === 'error') {
      toastId = toast.error(message, {
        autoClose: autoCloseDuration,
        onClose: onClose,
      });
    }

    return () => {
      toast.dismiss(toastId);
    };
  }, [message, type, autoCloseDuration, onClose]);
 
  return (
    <div
      style={{
        position: 'fixed'
      }}
    >
      <ToastContainer position="top-center" />
    </div>
  );
};

export default AlertMessage;
