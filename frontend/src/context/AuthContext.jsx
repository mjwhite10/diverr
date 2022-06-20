import { createContext, useEffect, useState } from 'react';
import { getUserDataService } from '../services/userService';

const AuthContext = createContext();

const AuthContextProviderComponent = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState();
  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await getUserDataService(token);
        setUser(data);
      } catch (error) {
        logout();
      }
    };
    if (token) getUserData();
  }, [token]);

  const logout = () => {
    setToken('');
    setUser(null);
  };

  const login = (token) => {
    setToken(token);
  };

  const updateUserData = async () => {
    try {
      const data = await getUserDataService(token);
      setUser(data);
    } catch (error) {
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, updateUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProviderComponent };
