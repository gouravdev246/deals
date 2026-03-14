'use client'
import { useState } from "react"
import axios from 'axios'

function ContactAdmin() {
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState({ loading: false, success: false, error: null });

    const handleChange = (e) => {
        setContactForm({ ...contactForm, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: null });

        try {
            const res = await axios.post('/api/user/contact', contactForm);
            console.log(res);
            setStatus({ loading: false, success: true, error: null });
            
            // Reset state and form
            setContactForm({ name: '', email: '', message: '' });
            e.target.reset();
        } catch (err) {
            setStatus({ loading: false, success: false, error: "Failed to send message. Try again." });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Contact Admin</h2>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="John Doe"
                            value={contactForm.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="john@example.com"
                            value={contactForm.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
                        />
                    </div>

                    {/* Message Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <textarea 
                            name="message" 
                            rows="4"
                            placeholder="How can we help?"
                            value={contactForm.message}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
                        />
                    </div>

                    {/* Feedback Messages */}
                    {status.success && <p className="text-green-600 text-sm">Message sent successfully!</p>}
                    {status.error && <p className="text-red-600 text-sm">{status.error}</p>}

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        disabled={status.loading}
                        className={`w-full py-3 rounded-lg font-semibold text-white transition-colors 
                            ${status.loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700'}`}
                    >
                        {status.loading ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ContactAdmin;