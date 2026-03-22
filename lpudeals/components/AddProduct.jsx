'use client';
import React, { useState, useRef } from 'react';
import { useContext } from 'react';
import axios from 'axios';
import AppContext from '../app/context/AppContext';

// ─── Compress & convert any image (including HEIC from mobile) to JPEG ───
const compressImage = (file, maxWidth = 1200, quality = 0.7) => {
    return new Promise((resolve, reject) => {
        // If file is already small enough (< 500KB), skip compression but still convert format
        const skipResize = file.size < 500 * 1024;

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                if (!skipResize && width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob(
                    (blob) => {
                        if (!blob) {
                            reject(new Error('Image compression failed'));
                            return;
                        }
                        // Create a new file with .jpg extension so multer/cloudinary accepts it
                        const compressedFile = new File(
                            [blob],
                            file.name.replace(/\.[^.]+$/, '') + '.jpg',
                            { type: 'image/jpeg' }
                        );
                        resolve(compressedFile);
                    },
                    'image/jpeg',
                    quality
                );
            };
            img.onerror = () => reject(new Error('Failed to load image'));
            img.src = e.target.result;
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
    });
};

function AddProduct() {
    const [previews, setPreviews] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [compressionStatus, setCompressionStatus] = useState('');
    const formRef = useRef(null);
    const {categories} = useContext(AppContext);
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        condition: "New",
    });

    // Set default category when categories are loaded
    React.useEffect(() => {
        if (categories && categories.length > 0 && !product.category) {
            setProduct(prev => ({ ...prev, category: categories[0]._id }));
        }
    }, [categories]);

    const handleImageChange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setCompressionStatus('Optimizing images...');

        try {
            // Compress all images client-side (converts HEIC/HEIF → JPEG, reduces size)
            const compressedFiles = await Promise.all(
                files.map((file) => compressImage(file))
            );
            setImageFiles(compressedFiles);

            // Generate previews from the compressed files
            const previewPromises = compressedFiles.map((file) => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(file);
                });
            });
            const previewResults = await Promise.all(previewPromises);
            setPreviews(previewResults);
            setCompressionStatus('');
        } catch (err) {
            console.error('Image compression error:', err);
            setCompressionStatus('');
            // Fallback: use original files if compression fails
            setImageFiles(files);
            const previewPromises = files.map((file) => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(file);
                });
            });
            Promise.all(previewPromises).then(setPreviews);
        }
    };

    const AddProductAPI = async (e) => {
        e.preventDefault();

        if (imageFiles.length === 0) {
            alert('Please select at least one image');
            return;
        }

        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('name', product.name);
            formData.append('description', product.description);
            formData.append('price', product.price);
            formData.append('category', product.category);
            formData.append('condition', product.condition);

            // Append each compressed image file
            imageFiles.forEach((file) => {
                formData.append('image', file);
            });

            const res = await axios.post('/api/products/addproduct', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                timeout: 60000, // 60 second timeout for mobile networks
            });
            console.log(res.data);
            alert('Product added successfully!');
            // Reset form
            setPreviews([]);
            setImageFiles([]);
            setProduct({
                name: "",
                description: "",
                price: "",
                category: categories?.[0]?._id || "",
                condition: "New",
            });
            if (formRef.current) formRef.current.reset();
        } catch (err) {
            console.error('Add product error:', err);
            if (err.code === 'ECONNABORTED') {
                alert('Upload timed out. Please try with fewer or smaller images.');
            } else if (err.response?.status === 413) {
                alert('Images are too large. Please select fewer or smaller images.');
            } else {
                alert(err.response?.data?.message || 'Failed to add product. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
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
                    <form ref={formRef} className="p-8 lg:p-12 space-y-8" onSubmit={AddProductAPI}>
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
                                    value={product.name}
                                    onChange={(e) => setProduct({...product , name: e.target.value})}
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
                                        value={product.category}
                                        onChange={(e) => setProduct({...product , category: e.target.value})}
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat.name} value={cat._id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="condition" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Condition
                                    </label>
                                    <select
                                        id="condition"
                                        className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none bg-gray-50/50 appearance-none"
                                        value={product.condition}
                                        onChange={(e) => setProduct({...product , condition: e.target.value})}
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
                                            value={product.price}
                                            min={0}
                                            onChange={(e) => setProduct({...product , price: e.target.value})}
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
                                    value={product.description}
                                    onChange={(e) => setProduct({...product , description: e.target.value})} required
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
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageChange}
                                        disabled={isSubmitting}
                                    />
                                  
                                    <div className="space-y-1 text-center">
                                        {compressionStatus ? (
                                            <div className="flex flex-col items-center gap-2 py-4">
                                                <svg className="animate-spin h-8 w-8 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <p className="text-sm text-orange-600 font-medium">{compressionStatus}</p>
                                            </div>
                                        ) : previews.length > 0 ? (
                                            <div className="flex flex-wrap gap-3 justify-center">
                                                {previews.map((src, idx) => (
                                                    <div key={idx} className="relative inline-block">
                                                        <img src={src} alt={`Preview ${idx + 1}`} className="h-24 w-24 object-cover rounded-lg shadow-md" />
                                                        <div className="absolute -top-2 -right-2 bg-orange-600 text-white rounded-full p-1 shadow-lg">
                                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                ))}
                                                <p className="w-full text-xs text-gray-500 mt-2">{imageFiles.length} image(s) optimized & ready — click to change</p>
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
                                                    <span className="relative rounded-md font-medium text-orange-600 hover:text-orange-500">
                                                        Upload files
                                                    </span>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs text-gray-500">PNG, JPG, HEIC — any format (max 5 images)</p>
                                                <p className="text-xs text-gray-400">Images are auto-optimized for fast upload</p>
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
                                disabled={isSubmitting}
                                className={`w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white transition-all transform ${
                                    isSubmitting
                                        ? 'bg-orange-400 cursor-not-allowed'
                                        : 'bg-orange-600 hover:bg-orange-700 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
                                }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Uploading...
                                    </>
                                ) : (
                                    'Post Your Deal'
                                )}
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