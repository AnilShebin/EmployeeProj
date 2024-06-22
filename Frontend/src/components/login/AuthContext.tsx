import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'; // Correctly import jwtDecode
import { useNavigate } from 'react-router-dom';
import AlertMessage from '../AlertMessage'; // Adjust the path based on your file structure

interface AuthContextProps {
  isLoggedIn: boolean | null;
  employeeID: string | null;
  roleName: string | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [employeeID, setEmployeeID] = useState<string | null>(null);
  const [roleName, setRoleName] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        setEmployeeID(decodedToken.employeeID);
        setRoleName(decodedToken.roleName);
        setIsLoggedIn(true);

        // Calculate token expiration time to 3 hours (in seconds)
        const expirationTimeInSeconds = 3 * 60 * 60;

        // Set alert timeout to show 10 minutes (600 seconds) before expiration
        const alertTimeInSeconds = expirationTimeInSeconds - 10 * 60;

        const alertTimeout = setTimeout(() => {
          setShowAlert(true);
        }, alertTimeInSeconds * 1000);

        // Set timeout to automatically log out after expiration
        const logoutTimeout = setTimeout(() => {
          logout();
        }, expirationTimeInSeconds * 1000);

        // Clear timeouts on component unmount to prevent memory leaks
        return () => {
          clearTimeout(logoutTimeout);
          clearTimeout(alertTimeout);
        };
      } catch (error) {
        console.error('Error decoding token:', error);
        logout();
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const login = (token: string) => {
    // Set the token in cookies
    Cookies.set('token', token);

    try {
      const decodedToken: any = jwtDecode(token);
      setEmployeeID(decodedToken.employeeID);
      setRoleName(decodedToken.roleName);
      setIsLoggedIn(true);

      // Calculate token expiration time to 3 hours (in seconds)
      const expirationTimeInSeconds = 3 * 60 * 60;

      // Set alert timeout to show 10 minutes (600 seconds) before expiration
      const alertTimeInSeconds = expirationTimeInSeconds - 10 * 60;

      const alertTimeout = setTimeout(() => {
        setShowAlert(true);
      }, alertTimeInSeconds * 1000);

      // Set timeout to automatically log out after expiration
      const logoutTimeout = setTimeout(() => {
        logout();
      }, expirationTimeInSeconds * 1000);

      // Clear timeouts on component unmount to prevent memory leaks
      return () => {
        clearTimeout(logoutTimeout);
        clearTimeout(alertTimeout);
      };
    } catch (error) {
      console.error('Error decoding token:', error);
      logout();
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setIsLoggedIn(false);
    setEmployeeID(null);
    setRoleName(null);
    setShowAlert(false);
    navigate('/login'); // Redirect to /login after logout
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      {showAlert && (
        <AlertMessage
          message="Your session will expire soon. Please refresh or login again."
          type="error"
          onClose={handleCloseAlert}
          autoCloseDuration={5000}
        />
      )}
      <AuthContext.Provider
        value={{ isLoggedIn, roleName, employeeID, token: Cookies.get('token') || null, login, logout }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
