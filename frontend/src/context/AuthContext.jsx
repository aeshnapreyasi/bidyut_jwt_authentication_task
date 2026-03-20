import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // CHANGED: Check sessionStorage on load
    const [token, setToken] = useState(sessionStorage.getItem('token') || null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            api.get('/profile')
                .then((response) => {
                    setUser(response.data);
                })
                .catch(() => {
                    logout();
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [token]);

    const login = async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        const { access_token } = response.data;
        
        // CHANGED: Save to sessionStorage
        sessionStorage.setItem('token', access_token);
        setToken(access_token);
    };

    const register = async (email, password) => {
        await api.post('/auth/register', { email, password });
        await login(email, password);
    };

    const logout = () => {
        // CHANGED: Remove from sessionStorage
        sessionStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};