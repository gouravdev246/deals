'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

function ForgetPass() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [msg, setMsg] = useState('');

    const sendOtp = async () => {
        if (!email) return alert('Please enter your email first');
        setOtpLoading(true);
        try {
            const res = await axios.post('/api/otp/generateotp', { email });
            setOtpSent(true);
            setMsg('OTP sent to your email!');
        } catch (err) {
            console.error('OTP Error:', err);
            const errorMessage = err.response?.data?.message || err.response?.data || 'Failed to send OTP';
            setMsg(errorMessage);
        } finally {
            setOtpLoading(false);
        }
    };

    const forgetPass = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return setMsg('Passwords do not match');
        }
        setLoading(true);
        setMsg('');
        try {
            const res = await axios.post('/api/auth/forget', { email, otp, password });
            setMsg('Password reset successfully!');
            setTimeout(() => router.push('/login'), 2000);
        } catch (err) {
            console.error('Reset Error:', err);
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
                                <span className="material-icons text-4xl text-black">lock_reset</span>
                            </div>
                            <h1 className="text-4xl font-bold text-gray-900">
                                <Link href="/" className="flex items-center gap-2">
                                    <span className="text-2xl font-bold text-orange-600 tracking-tight">LPU<span className="text-gray-900">Deals</span></span>
                                </Link>
                            </h1>
                            <p className="text-gray-600 text-lg max-w-sm">
                                Don't worry, it happens to the best of us. Reset your password in 3 simple steps.
                            </p>
                            <div className="pt-8 space-y-4 text-left">
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-orange-100 shadow-sm">
                                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                                        <span className="text-orange-600 font-bold text-sm">1</span>
                                    </div>
                                    <span className="text-sm font-semibold text-gray-700">Enter your registered email</span>
                                </div>
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-orange-100 shadow-sm">
                                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                                        <span className="text-orange-600 font-bold text-sm">2</span>
                                    </div>
                                    <span className="text-sm font-semibold text-gray-700">Verify with the OTP sent to your email</span>
                                </div>
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-orange-100 shadow-sm">
                                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                                        <span className="text-orange-600 font-bold text-sm">3</span>
                                    </div>
                                    <span className="text-sm font-semibold text-gray-700">Set your new password</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Reset Form */}
                    <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                        <div className="mb-8 text-center lg:text-left">
                            <div className="lg:hidden inline-flex items-center justify-center p-2 bg-orange-600 text-white rounded-lg mb-4">
                                <span className="material-icons text-black">lock_reset</span>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h2>
                            <p className="text-gray-500">Enter your details to set a new password</p>
                        </div>

                        <form className="space-y-5" onSubmit={forgetPass}>
                            {/* Email + OTP Button */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                                <div className="flex gap-2">
                                    <input
                                        type="email"
                                        className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50/50 text-gray-900 focus:border-orange-500 focus:bg-white focus:ring-0 transition-all outline-none"
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={sendOtp}
                                        disabled={otpLoading}
                                        className="px-5 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl transition-all active:scale-[0.97] text-sm whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-orange-500/15"
                                    >
                                        {otpLoading ? (
                                            <span className="flex items-center gap-1">
                                                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                                                Sending
                                            </span>
                                        ) : otpSent ? '✓ Resend' : 'Send OTP'}
                                    </button>
                                </div>
                            </div>

                            {/* OTP Field */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700 ml-1">OTP Verification Code</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50/50 text-gray-900 focus:border-orange-500 focus:bg-white focus:ring-0 transition-all outline-none tracking-[0.3em] text-center font-mono text-lg"
                                    placeholder="● ● ● ● ● ●"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    maxLength={6}
                                    required
                                />
                            </div>

                            {/* New Password */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700 ml-1">New Password</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50/50 text-gray-900 focus:border-orange-500 focus:bg-white focus:ring-0 transition-all outline-none"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700 ml-1">Confirm New Password</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50/50 text-gray-900 focus:border-orange-500 focus:bg-white focus:ring-0 transition-all outline-none"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Status Message */}
                            {msg && (
                                <p className={`text-sm text-center font-medium px-4 py-2 rounded-lg ${msg.includes('successfully') || msg.includes('sent') ? 'text-green-700 bg-green-50 border border-green-200' : 'text-red-700 bg-red-50 border border-red-200'}`}>
                                    {msg}
                                </p>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all active:scale-[0.98] mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Resetting Password...' : 'Reset Password'}
                            </button>
                        </form>

                        <p className="text-center text-gray-600 text-sm mt-6">
                            Remember your password?
                            <Link href="/login" className="text-orange-600 font-bold hover:underline ml-1">Back to Login</Link>
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="p-8 text-center border-t border-gray-100 bg-white">
                <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-gray-500 font-medium">
                    <span>© 2024 LpuDeals. Exclusive to LPU Students.</span>
                    <div className="flex gap-4">
                        <Link href="#" className="hover:text-orange-600 transition-colors">Terms</Link>
                        <span className="hidden md:inline text-gray-300">•</span>
                        <Link href="#" className="hover:text-orange-600 transition-colors">Privacy</Link>
                        <span className="hidden md:inline text-gray-300">•</span>
                        <Link href="#" className="hover:text-orange-600 transition-colors">Safety</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default ForgetPass;