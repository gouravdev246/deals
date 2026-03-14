'use client'

import AppContext from "../app/context/AppContext"
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { User, Mail, Hash, Phone, MapPin, Save, LogOut, CheckCircle } from "lucide-react";

function Profile() {
    const { user, logout } = useContext(AppContext);
    
    // Initialize with safe fallback if user is null on first render
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        regid: user?.regid || '',
        phone: user?.phone || '',
        hostel: user?.hostel || ''
    });

    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Update form when user context becomes available
    useEffect(() => {
        if (user) {
            setFormData({
                name: user?.name || '',
                email: user?.email || '',
                regid: user?.regid || '',
                phone: user?.phone || '',
                hostel: user?.hostel || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const UpdateUser = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const res = await axios.put('/api/auth/update', formData);
            console.log("Updated successfully:", res.data);
            
            // Show awesome success feedback on the button
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
            
            // Hint: You should probably update your AppContext here too!
        } catch (err) {
            console.error("Update failed:", err);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto p-4 md:p-6 lg:p-8 mt-4 md:mt-10 animate-in fade-in zoom-in-95 duration-500">
            <div className="bg-white/80 backdrop-blur-3xl dark:bg-zinc-900/80 border border-gray-200/50 dark:border-zinc-800/50 rounded-[2.5rem] shadow-2xl overflow-hidden relative">
                
                {/* Decorative background glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[250px] bg-linear-to-b from-orange-500/20 to-transparent blur-3xl -z-10 pointer-events-none" />

                {/* Header Profile Section */}
                <div className="px-6 pt-12 pb-8 sm:px-12 text-center relative z-10">
                    <div className="mx-auto w-28 h-28 bg-linear-to-br from-orange-600 to-white-600 rounded-full flex items-center justify-center border-[6px] border-white dark:border-zinc-800 shadow-xl mb-5 transform transition hover:scale-105">
                        <User size={52} className="text-white drop-shadow-md" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">My Profile</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base font-medium">Manage your personal information and preferences.</p>
                </div>

                {/* Form Section */}
                <div className="px-6 pb-12 sm:px-12 relative z-10">
                    <form onSubmit={UpdateUser} className="space-y-7">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name Input */}
                            <div className="space-y-2 group">
                                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 ml-1 tracking-wide uppercase">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User size={18} className="text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                                    </div>
                                    <input 
                                        type="text" 
                                        value={formData.name} 
                                        onChange={handleChange} 
                                        name="name" 
                                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700/80 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 hover:border-orange-300 dark:hover:border-zinc-600 transition-all text-gray-900 dark:text-white font-medium shadow-sm outline-none" 
                                        placeholder="John Doe" 
                                    />
                                </div>
                            </div>

                            {/* Email Input */}
                            <div className="space-y-2 group">
                                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 ml-1 tracking-wide uppercase">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail size={18} className="text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                                    </div>
                                    <input 
                                        type="email" 
                                        value={formData.email} 
                                        onChange={handleChange} 
                                        name="email" 
                                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700/80 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 hover:border-orange-300 dark:hover:border-zinc-600 transition-all text-gray-900 dark:text-white font-medium shadow-sm outline-none" 
                                        placeholder="john@example.com" 
                                    />
                                </div>
                            </div>

                            {/* Reg ID Input */}
                            <div className="space-y-2 group">
                                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 ml-1 tracking-wide uppercase">Registration / Roll No</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Hash size={18} className="text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                                    </div>
                                    <input 
                                        type="text" 
                                        name="regid" 
                                        value={formData.regid}
                                        onChange={handleChange} 
                                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700/80 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 hover:border-orange-300 dark:hover:border-zinc-600 transition-all text-gray-900 dark:text-white font-medium shadow-sm outline-none"
                                        placeholder="122XXXXX" 
                                    />
                                </div>
                            </div>

                            {/* Phone Input */}
                            <div className="space-y-2 group">
                                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 ml-1 tracking-wide uppercase">Phone Number</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Phone size={18} className="text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                                    </div>
                                    <input 
                                        type="number" 
                                        name="phone" 
                                        value={formData.phone}
                                        onChange={handleChange} 
                                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700/80 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 hover:border-orange-300 dark:hover:border-zinc-600 transition-all text-gray-900 dark:text-white font-medium shadow-sm outline-none"
                                        placeholder="9876543210" 
                                    />
                                </div>
                            </div>

                            {/* Hostel Input */}
                            <div className="space-y-2 md:col-span-2 group">
                                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 ml-1 tracking-wide uppercase">Hostel Address / Location</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <MapPin size={18} className="text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                                    </div>
                                    <input 
                                        type="text" 
                                        name="hostel" 
                                        value={formData.hostel}
                                        onChange={handleChange} 
                                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700/80 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 hover:border-orange-300 dark:hover:border-zinc-600 transition-all text-gray-900 dark:text-white font-medium shadow-sm outline-none"
                                        placeholder="e.g. BH-1, Room 101" 
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 mt-8">
                            <button 
                                type="button" 
                                onClick={logout}
                                className="w-full sm:w-auto px-6 py-3.5 flex items-center justify-center gap-2.5 text-red-600 hover:text-white dark:text-red-400 dark:hover:text-white hover:bg-red-600 font-semibold rounded-2xl transition-all duration-300 ring-1 ring-red-200 dark:ring-red-900/50 hover:ring-transparent hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                            >
                                <LogOut size={20} />
                                <span>Logout</span>
                            </button>

                            <button 
                                type="submit" 
                                disabled={isSaving}
                                className={`w-full sm:w-auto px-8 py-3.5 flex items-center justify-center gap-2.5 text-white font-semibold rounded-2xl transition-all duration-300 ${
                                    showSuccess 
                                        ? "bg-emerald-500 hover:bg-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]" 
                                        : "bg-orange-600 hover:bg-orange-700 shadow-[0_8px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_8px_30px_rgba(37,99,235,0.4)] hover:-translate-y-0.5"
                                } disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0`}
                            >
                                {showSuccess ? (
                                    <>
                                        <CheckCircle size={20} className="animate-in zoom-in" />
                                        <span>Saved Successfully!</span>
                                    </>
                                ) : (
                                    <>
                                        {isSaving ? (
                                            <div className="h-5 w-5 border-[3px] border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <Save size={20} />
                                        )}
                                        <span>{isSaving ? 'Updating...' : 'Save Changes'}</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Profile;