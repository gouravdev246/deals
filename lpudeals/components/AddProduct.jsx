'use client';
import React, { useState } from 'react';
import { useContext } from 'react';
import AppContext from '../app/context/AppContext';

function AddProduct() {
    const [preview, setPreview] = useState(null);
    const {categories} = useContext(AppContext);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        List a <span className="text-orange-600">New Deal</span>
                    </h1>
                    <p className="mt-3 text-lg text-gray-500">
                        Fill in the details below to reach thousands of students in the LPU community.
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                    <form className="p-8 lg:p-12 space-y-8">
                        {/* Basic Information */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-800 border-l-4 border-orange-500 pl-3">Basic Information</h2>

                            <div>
                                <label htmlFor="productName" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    id="productName"
                                    className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none bg-gray-50/50"
                                    placeholder="e.g. Lab Coat, Engineering Graphics Set, iPhone 13"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Category
                                    </label>
                                    <select
                                        id="category"
                                        name='category'
                                        className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none bg-gray-50/50 appearance-none"
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat.name} value={cat._id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Condition
                                    </label>
                                    <select
                                        id="category"
                                        className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none bg-gray-50/50 appearance-none"
                                    >
                                        <option>New</option>
                                        <option>Like New</option>
                                        <option>Used</option>
                                        <option>Bad</option>
                                
                                    </select>
                                </div>
                                
                                <div>
                                    <label htmlFor="productPrice" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Price (₹)
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
                                        <input
                                            type="number"
                                            id="productPrice"
                                            className="block w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none bg-gray-50/50"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description Section */}
                        <div className="space-y-6 pt-4">
                            <h2 className="text-xl font-bold text-gray-800 border-l-4 border-orange-500 pl-3">Details & Media</h2>

                            <div>
                                <label htmlFor="productDescription" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    id="productDescription"
                                    rows="5"
                                    className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none bg-gray-50/50 resize-none"
                                    placeholder="Describe your product condition, usage time, and any key features..."
                                ></textarea>
                            </div>

                            {/* Image Upload Area */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Product Images
                                </label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-2xl bg-gray-50 hover:bg-orange-50/50 hover:border-orange-300 transition-all cursor-pointer group relative">
                                    <input
                                        type="file"
                                        id="productImage"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                    />
                                    <div className="space-y-1 text-center">
                                        {preview ? (
                                            <div className="relative inline-block">
                                                <img src={preview} alt="Preview" className="h-48 w-48 object-cover rounded-lg shadow-md" />
                                                <div className="absolute -top-2 -right-2 bg-orange-600 text-white rounded-full p-1 shadow-lg">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <svg
                                                    className="mx-auto h-12 w-12 text-gray-400 group-hover:text-orange-500 transition-colors"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    viewBox="0 0 48 48"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                <div className="flex text-sm text-gray-600">
                                                    <span className="relative rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500">
                                                        Upload a file
                                                    </span>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <button
                                type="submit"
                                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all transform hover:-translate-y-1"
                            >
                                Post Your Deal
                            </button>
                            <p className="mt-4 text-center text-xs text-gray-400">
                                By posting, you agree to our Terms of Use and Community Guidelines.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;