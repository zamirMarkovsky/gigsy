// src/features/auth/pages/LoginView.jsx
import React, { useState } from 'react';
import { Lock, Zap } from 'lucide-react';
import logo from '../../../assets/gigsy-logo.png';

import { useAuth } from '../context/AuthContext';

export const LoginView = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const { login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = login(password);
        if (!success) {
            setError(true);
            setPassword('');
            setTimeout(() => setError(false), 2000);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <div className="w-12 h-12 flex items-center justify-center">
                            <img src={logo} alt="Gigsy Logo" className="w-10 h-10 object-contain copyright-protected-image" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-black text-white tracking-tight">
                        gigsy<span className="text-indigo-500">.</span>
                    </h1>
                    <p className="text-slate-400 mt-2">הכניסה מוגבלת / Access Restricted</p>
                </div>

                {/* Login Card */}
                <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 shadow-2xl">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                            <Lock className="w-5 h-5 text-indigo-400" />
                        </div>
                        <h2 className="text-xl font-bold text-white">הזן סיסמה / Enter Password</h2>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className={`w-full px-4 py-3 bg-slate-900/50 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${error
                                    ? 'border-red-500 focus:ring-red-500/50 shake'
                                    : 'border-slate-600 focus:ring-indigo-500/50'
                                    }`}
                                autoFocus
                            />
                            {error && (
                                <p className="text-red-400 text-sm mt-2 animate-pulse">
                                    סיסמה שגויה / Incorrect password
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/30"
                        >
                            כניסה / Login
                        </button>
                    </form>
                </div>

                <p className="text-center text-slate-500 text-sm mt-6">
                    Powered by Gigsy • Tickets without the drama
                </p>
            </div>

            <style jsx>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-10px); }
                    75% { transform: translateX(10px); }
                }
                .shake {
                    animation: shake 0.3s ease-in-out;
                }
            `}</style>
        </div>
    );
};
