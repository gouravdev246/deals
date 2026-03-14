'use client';
import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import AppContext from '../app/context/AppContext';

function LoginPage() {
    const router = useRouter();
    const { login } = useContext(AppContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMsg('');
        try {
            const res = await axios.post('/api/auth/login', { email, password });
            login(res.data.user); // Save user in context + localStorage
            setMsg('Login successful!');
            setTimeout(() => router.push('/'), 1500);
        } catch (err) {
            console.error('Login error:', err);
            const errorMessage = err.response?.data?.message || 'Something went wrong';
            setMsg(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="font-sans bg-gray-50 min-h-screen flex flex-col pt-16">
            {/* Main Content Area */}
            <main className="flex-grow flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
                {/* Abstract Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                    <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-orange-600/40 blur-3xl"></div>
                    <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-orange-600/40 blur-3xl"></div>
                </div>

                <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden relative z-10 border border-gray-100">
                    {/* Left Side: Visual/Branding (Hidden on mobile) */}
                    <div className="hidden lg:flex flex-col justify-center items-center p-12 bg-orange-50 border-r border-gray-100">
                        <div className="space-y-6 text-center">
                            <div className="inline-flex items-center justify-center p-4 bg-orange-600 text-white rounded-2xl shadow-lg mb-4">
                                <span className="material-icons text-4xl text-black">local_mall</span>
                            </div>
                            <h1 className="text-4xl font-bold text-gray-900">
                                <Link href="/" className="flex items-center gap-2">
                                    <span className="text-2xl font-bold text-orange-600 tracking-tight">LPU<span className="text-gray-900">Deals</span></span>
                                </Link>
                            </h1>
                            <p className="text-gray-600 text-lg max-w-sm">
                                The dedicated marketplace for LPU students. Buy, sell, and trade within your campus community.
                            </p>
                            <div className="pt-8 grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-orange-100 shadow-sm">
                                    <span className="material-icons text-orange-600 block mb-2">verified_user</span>
                                    <span className="text-sm font-semibold text-gray-800">Verified Students</span>
                                </div>
                                <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-orange-100 shadow-sm">
                                    <span className="material-icons text-orange-600 block mb-2">handshake</span>
                                    <span className="text-sm font-semibold text-gray-800">Campus Meetups</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Auth Form */}
                    <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                        <div className="mb-8 text-center lg:text-left">
                            <div className="lg:hidden inline-flex items-center justify-center p-2 bg-orange-600 text-white rounded-lg mb-4">
                                <span className="material-icons text-black">local_mall</span>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h2>
                            <p className="text-gray-500">Connect with your campus community</p>
                        </div>

                        <div className="space-y-4">
                            {/* Google Login */}
                            {/* <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border-2 border-gray-100 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all hover:border-orange-200">
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Continue with Google
                            </button> */}
{/* 
                            <div className="relative flex items-center py-4">
                                <div className="flex-grow border-t border-gray-100"></div>
                                <span className="flex-shrink mx-4 text-gray-400 text-sm font-medium uppercase tracking-wider">or</span>
                                <div className="flex-grow border-t border-gray-100"></div>
                            </div> */}

                            {/* Email Login Form */}
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div className="space-y-1 text-black">
                                    <label className="text-sm font-semibold text-gray-700 ml-1">LPU Email Address</label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50/50 text-gray-900 focus:border-orange-500 focus:bg-white focus:ring-0 transition-all outline-none"
                                        placeholder="vertos@gmail.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-1 text-black">
                                    <div className="flex justify-between items-center ml-1">
                                        <label className="text-sm font-semibold text-gray-700">Password</label>
                                        <Link href="/forgetpass" className="text-xs font-bold text-orange-600 hover:underline">Forgot?</Link>
                                    </div>
                                    <input
                                        type="password"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50/50 text-gray-900 focus:border-orange-500 focus:bg-white focus:ring-0 transition-all outline-none"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                {msg && <p className={`text-sm text-center ${msg.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>{msg}</p>}

                                <button disabled={loading} className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all active:scale-[0.98] mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
                                    {loading ? 'Logging in...' : 'Login to your Account'}
                                </button>
                            </form>

                            <p className="text-center text-gray-600 text-sm mt-6">
                                Don't have an account?
                                <Link href="/register" className="text-orange-600 font-bold hover:underline ml-1">Join the community</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="p-8 text-center border-t border-gray-100 bg-white">
                <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-gray-500 font-medium">
                    <span>© 2026 LpuDeals. Exclusive to LPU Students.</span>
                    <div className="flex gap-4">
                        <Link href="/terms" className="hover:text-orange-600 transition-colors">Terms</Link>
                        <span className="hidden md:inline text-gray-300">•</span>
                        <Link href="/privecy-policy" className="hover:text-orange-600 transition-colors">Privacy</Link>
                        <span className="hidden md:inline text-gray-300">•</span>
                        <Link href="/seftytips" className="hover:text-orange-600 transition-colors">Safety</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default LoginPage;
