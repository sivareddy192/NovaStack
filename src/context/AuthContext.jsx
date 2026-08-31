import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginAdmin, registerAdmin } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('novastack_admin_token');
      const storedUser = localStorage.getItem('novastack_admin_user');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error('Failed to load auth from storage', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await loginAdmin(email, password);
      if (data.success && data.token) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('novastack_admin_token', data.token);
        localStorage.setItem('novastack_admin_user', JSON.stringify(data.user));
        return { success: true };
      }
      return { success: false, message: data.message || 'Login failed' };
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Authentication error';
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const data = await registerAdmin({ name, email, password });
      if (data.success && data.token) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('novastack_admin_token', data.token);
        localStorage.setItem('novastack_admin_user', JSON.stringify(data.user));
        return { success: true, message: data.message };
      }
      return { success: false, message: data.message || 'Registration failed' };
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Registration error';
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('novastack_admin_token');
    localStorage.removeItem('novastack_admin_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
