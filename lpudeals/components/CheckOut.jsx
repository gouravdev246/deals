'use client';

import { useState, useContext } from "react";
import AppContext from "../app/context/AppContext";
import Link from "next/link";

function CheckOut() {
    const { cart } = useContext(AppContext);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        zipCode: "",
        paymentMethod: "card"
    });

    const subtotal = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
    const shipping = subtotal > 500 || subtotal === 0 ? 0 : 50;
    const tax = subtotal * 0.18; // 18% GST Example
    const total = subtotal + shipping + tax;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (cart.length === 0) return alert("Your cart is empty!");
        alert("Order Placed Successfully! Thank you for shopping with LPUDeals.");
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900">Checkout</h1>
                        <p className="text-gray-500 mt-1">Complete your purchase to get your items.</p>
                    </div>
                    <Link href="/" className="text-orange-600 font-medium hover:text-orange-700 transition-colors flex items-center gap-1 group">
                        <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Continue Shopping
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left: Forms Section */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* Contact Information */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden text-black ">
                            <div className="p-6 border-b border-gray-50">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm">1</span>
                                    Contact Information
                                </h2>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                        <input type="text" name="firstName" placeholder="John" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all bg-gray-50/50" required onChange={handleInputChange} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                        <input type="text" name="lastName" placeholder="Doe" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all bg-gray-50/50" required onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                        <input type="email" name="email" placeholder="john@example.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all bg-gray-50/50" required onChange={handleInputChange} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                        <input type="tel" name="phone" placeholder="+91 62957 00000" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all bg-gray-50/50" required onChange={handleInputChange} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Hostel Name</label>
                                        <input type="text" name="address" placeholder="123 Academic Block, Hostel Sector" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all bg-gray-50/50" required onChange={handleInputChange} />
                                    </div>
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Room Number</label>
                                        <input type="text" name="city" placeholder="xyz" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all bg-gray-50/50" required onChange={handleInputChange} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden text-black ">
                            <div className="p-6 border-b border-gray-50">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm">2</span>
                                    Reciving Address
                                </h2>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Near Block</label>
                                    <input type="text" name="address" placeholder="123 Academic Block, Hostel Sector" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all bg-gray-50/50" required onChange={handleInputChange} />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Landmark</label>
                                        <input type="text" name="city" placeholder="Robopark" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all bg-gray-50/50" required onChange={handleInputChange} />
                                    </div>
                                  
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden text-black">
                            <div className="p-6 border-b border-gray-50">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm">3</span>
                                    Payment Method
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                       
                                    <label className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${formData.paymentMethod === 'upi' ? 'border-orange-500 bg-orange-50' : 'border-gray-100 hover:bg-gray-50'}`}>
                                        <input type="radio" name="paymentMethod" value="upi" className="w-5 h-5 accent-orange-600" checked={formData.paymentMethod === 'upi'} onChange={handleInputChange} />
                                        <div className="flex-1">
                                            <p className="font-bold text-gray-800">UPI / GPay / PhonePe</p>
                                            <p className="text-xs text-gray-500">Instant & Secure Payment</p>
                                        </div>
                                        <span className="text-2xl">📱</span>
                                    </label>
                                    <label className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${formData.paymentMethod === 'cod' ? 'border-orange-500 bg-orange-50' : 'border-gray-100 hover:bg-gray-50'}`}>
                                        <input type="radio" name="paymentMethod" value="cod" className="w-5 h-5 accent-orange-600" checked={formData.paymentMethod === 'cod'} onChange={handleInputChange} />
                                        <div className="flex-1">
                                            <p className="font-bold text-gray-800">Cash on Delivery</p>
                                            <p className="text-xs text-gray-500">Pay when you receive the item</p>
                                        </div>
                                        <span className="text-2xl">🤝</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="lg:col-span-4 h-full">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 sticky top-24 overflow-hidden text-black">
                            <div className="p-6 border-b border-gray-50 bg-gray-50/50">
                                <h2 className="text-xl font-bold">Order Summary</h2>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                                    {cart.length > 0 ? cart.map((item, index) => (
                                        <div key={index} className="flex gap-4 items-center animate-fade-in text-black">
                                            <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                                                <img src={item.images?.[0] || 'https://via.placeholder.com/150'} alt={item.title} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold text-gray-900 truncate">{item.title}</p>
                                                <p className="text-xs text-gray-500">Qty: {item.quantity || 1}</p>
                                            </div>
                                            <p className="font-bold text-sm text-gray-900">₹{(item.price * (item.quantity || 1)).toFixed(2)}</p>
                                        </div>
                                    )) : (
                                        <div className="text-center py-8">
                                            <div className="text-4xl mb-2">🛒</div>
                                            <p className="text-gray-500 italic">Your cart is empty</p>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-3 pt-4 border-t border-gray-100">
                                    <div className="flex justify-between text-black ">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="font-semibold text-gray-900">₹{subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                                            {shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tax (18% GST)</span>
                                        <span className="font-semibold text-gray-900">₹{tax.toFixed(2)}</span>
                                    </div>
                                    <div className="pt-4 mt-2 border-t border-dashed border-gray-200">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-bold text-gray-900">Total</span>
                                            <span className="text-2xl font-black text-orange-600">₹{total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={cart.length === 0}
                                    className="w-full mt-8 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-2 group"
                                >
                                    Confirm Order
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </button>
                                <p className="text-center text-xs text-gray-400 mt-4">
                                    Secure Encrypted Checkout
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckOut;
