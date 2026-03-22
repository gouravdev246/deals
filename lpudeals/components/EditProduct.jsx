'use client';
import React, { useState, useRef, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import AppContext from '../app/context/AppContext';

// ─── Compress & convert any image (including HEIC from mobile) to JPEG ───
const compressImage = (file, maxWidth = 1200, quality = 0.7) => {
    return new Promise((resolve, reject) => {
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
                        if (!blob) { reject(new Error('Image compression failed')); return; }
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

function EditProduct({ productId }) {
    const router = useRouter();
    const { categories, refreshProducts } = useContext(AppContext);
    const [existingImages, setExistingImages] = useState([]);
    const [newPreviews, setNewPreviews] = useState([]);
    const [newImageFiles, setNewImageFiles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [compressionStatus, setCompressionStatus] = useState('');
    const formRef = useRef(null);
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        condition: "New",
    });

    // Fetch existing product data
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setIsLoading(true);
                const res = await axios.get(`/api/products/getoneproduct/${productId}`);
                const p = res.data.product;
                setProduct({
                    name: p.name || "",
                    description: p.description || "",
                    price: p.price || "",
                    category: p.category?._id || p.category || "",
                    condition: p.condition || "New",
                });
                setExistingImages(p.image || []);
            } catch (err) {
                console.error('Failed to fetch product:', err);
                alert('Failed to load product details');
                router.push('/dashboard');
            } finally {
                setIsLoading(false);
            }
        };
        if (productId) fetchProduct();
    }, [productId]);

    const removeExistingImage = (index) => {
        setExistingImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleImageChange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const totalImages = existingImages.length + newImageFiles.length + files.length;
        if (totalImages > 5) {
            alert('Maximum 5 images allowed in total');
            return;
        }

        setCompressionStatus('Optimizing images...');
        try {
            const compressedFiles = await Promise.all(files.map(f => compressImage(f)));
            setNewImageFiles(prev => [...prev, ...compressedFiles]);

            const previewPromises = compressedFiles.map((file) => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(file);
                });
            });
            const newPrevs = await Promise.all(previewPromises);
            setNewPreviews(prev => [...prev, ...newPrevs]);
            setCompressionStatus('');
        } catch (err) {
            console.error('Image compression error:', err);
            setCompressionStatus('');
            setNewImageFiles(prev => [...prev, ...files]);
            const previewPromises = files.map((file) => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(file);
                });
            });
            Promise.all(previewPromises).then(p => setNewPreviews(prev => [...prev, ...p]));
        }
    };

    const removeNewImage = (index) => {
        setNewImageFiles(prev => prev.filter((_, i) => i !== index));
        setNewPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const EditProductAPI = async (e) => {
        e.preventDefault();

        if (existingImages.length === 0 && newImageFiles.length === 0) {
            alert('Please keep at least one image or upload new ones');
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
            formData.append('existingImages', JSON.stringify(existingImages));

            newImageFiles.forEach((file) => {
                formData.append('image', file);
            });

            const res = await axios.put(`/api/products/editproduct/${productId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                timeout: 60000,
            });
            console.log(res.data);
            alert('Product updated successfully!');
            if (refreshProducts) refreshProducts();
            router.push('/dashboard');
        } catch (err) {
            console.error('Edit product error:', err);
            if (err.code === 'ECONNABORTED') {
                alert('Upload timed out. Please try with fewer or smaller images.');
            } else if (err.response?.status === 413) {
                alert('Images are too large. Please select fewer or smaller images.');
            } else if (err.response?.status === 403) {
                alert('You can only edit your own products.');
            } else {
                alert(err.response?.data?.message || 'Failed to update product. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
                    <p className="text-gray-500 font-medium">Loading product details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Edit Your <span className="text-orange-600">Deal</span>
                    </h1>
                    <p className="mt-3 text-lg text-gray-500">
                        Update your listing details below.
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                    <form ref={formRef} className="p-8 lg:p-12 space-y-8" onSubmit={EditProductAPI}>
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
                                    onChange={(e) => setProduct({...product, name: e.target.value})}
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
                                        onChange={(e) => setProduct({...product, category: e.target.value})}
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
                                        onChange={(e) => setProduct({...product, condition: e.target.value})}
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
                                            onChange={(e) => setProduct({...product, price: e.target.value})}
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
                                    onChange={(e) => setProduct({...product, description: e.target.value})}
                                    required
                                ></textarea>
                            </div>

                            {/* Existing Images */}
                            {existingImages.length > 0 && (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Current Images
                                    </label>
                                    <div className="flex flex-wrap gap-4">
                                        {existingImages.map((src, idx) => (
                                            <div key={idx} className="relative group">
                                                <img
                                                    src={src}
                                                    alt={`Current ${idx + 1}`}
                                                    className="h-28 w-28 object-cover rounded-xl shadow-md border-2 border-gray-100"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeExistingImage(idx)}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                                                >
                                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                                <div className="absolute bottom-1 left-1 bg-green-600 text-white rounded-md px-1.5 py-0.5 text-[10px] font-bold shadow">
                                                    Saved
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Add New Images */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    {existingImages.length > 0 ? 'Add More Images' : 'Product Images'}
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
                                        ) : newPreviews.length > 0 ? (
                                            <div className="flex flex-wrap gap-3 justify-center">
                                                {newPreviews.map((src, idx) => (
                                                    <div key={idx} className="relative inline-block group/new">
                                                        <img src={src} alt={`New ${idx + 1}`} className="h-24 w-24 object-cover rounded-lg shadow-md" />
                                                        <button
                                                            type="button"
                                                            onClick={(e) => { e.stopPropagation(); removeNewImage(idx); }}
                                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors opacity-0 group-hover/new:opacity-100"
                                                        >
                                                            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                        <div className="absolute bottom-1 left-1 bg-blue-600 text-white rounded-md px-1.5 py-0.5 text-[10px] font-bold shadow">
                                                            New
                                                        </div>
                                                    </div>
                                                ))}
                                                <p className="w-full text-xs text-gray-500 mt-2">{newImageFiles.length} new image(s) — click to add more</p>
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
                                                        Upload new images
                                                    </span>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs text-gray-500">PNG, JPG, HEIC — any format (max 5 total)</p>
                                                <p className="text-xs text-gray-400">Images are auto-optimized for fast upload</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Total image count */}
                            <p className="text-xs text-gray-500 font-medium">
                                Total images: {existingImages.length + newImageFiles.length} / 5
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-6 flex flex-col sm:flex-row gap-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`flex-1 flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white transition-all transform ${
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
                                        Saving Changes...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Save Changes
                                    </>
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={() => router.push('/dashboard')}
                                disabled={isSubmitting}
                                className="flex-1 sm:flex-none py-4 px-8 border-2 border-gray-200 rounded-xl text-lg font-bold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditProduct;
