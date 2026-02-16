// src/features/auth/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

// Read password from environment variable for security
const CORRECT_PASSWORD = import.meta.env.VITE_LOGIN_PASSWORD;
const AUTH_KEY = 'gigsy_auth';

// Validate password is configured
if (!CORRECT_PASSWORD) {
    console.error('❌ VITE_LOGIN_PASSWORD is not set! Login will not work.');
    console.error('Set it in .env locally or in your hosting platform environment variables.');
}

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        // Check localStorage on mount
        return localStorage.getItem(AUTH_KEY) === 'true';
    });

    const login = (password) => {
        if (password === CORRECT_PASSWORD) {
            setIsAuthenticated(true);
            localStorage.setItem(AUTH_KEY, 'true');
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem(AUTH_KEY);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
