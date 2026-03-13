'use client';
import React, { useEffect, useState , useContext } from 'react';
import Link from 'next/link';
import AppContext from "../app/context/AppContext";
import axios from 'axios';
const UserDashboard = () => {
    const { cart, user, isLoggedIn, logout, searchProduct, setSearchProduct, products, refreshProducts } = useContext(AppContext);
    const [userProducts , setUserProduct] = useState([])

    useEffect(()=>{
        if (products && user) {
            const up = products.filter((p) => p.user?._id === user._id);
            setUserProduct(up);
        }
    },[products, user]);

    const deleteItem = async (id) => {
        if (!window.confirm("Are you sure you want to delete this listing?")) return;

        try {
            const res = await axios.delete(`/api/products/deleteproduct/${id}`);
            if (res.status === 200) {
                alert("Product deleted successfully!");
                refreshProducts(); // Refresh global context data
            }
        } catch (err) {
            console.error("Delete error:", err);
            alert(err.response?.data?.message || "Failed to delete product");
        }
    };
console.log(userProducts)


 

    return (
        <div className="flex bg-[#f8f7f6] min-h-screen">
            {/* Sidebar - Positioned below Navbar */}
            <aside className="fixed top-[65px] left-0 bottom-0 w-64 bg-white border-r border-orange-100 hidden md:flex flex-col z-40 transition-all">
                <nav className="flex-1 px-4 space-y-1.5 mt-8">
                    <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-orange-600 text-white font-bold transition-all shadow-lg shadow-orange-500/20 group">
                        <span className="material-icons-round text-[20px] w-6 flex justify-center">dashboard</span>
                        <span className="whitespace-nowrap">Dashboard</span>
                    </Link>
                    <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-all font-semibold group">
                        <span className="material-icons-round text-[20px] w-6 flex justify-center text-gray-400 group-hover:text-orange-600 transition-colors">chat_bubble_outline</span>
                        <span className="whitespace-nowrap">Messages</span>
                        <span className="ml-auto bg-orange-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">3</span>
                    </Link>
                    
                    
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 cursor-pointer transition-all border border-transparent hover:border-gray-100">
                        <div className="relative shrink-0">
                            <img
                                className="w-10 h-10 rounded-full object-cover ring-2 ring-orange-100"
                                src="https://ui-avatars.com/api/?name=Aryan+Sharma&background=random"
                                alt="Profile"
                            />
                            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider truncate">{user.email}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 md:ml-64 p-4 md:p-10 lg:p-12">
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Student Dashboard</h1>
                        <p className="text-gray-500 font-medium mt-1">Manage your active deals and track your campus sales.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/addproduct" className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-700 transition-all shadow-xl shadow-orange-500/20 active:scale-95">
                            <span className="material-icons-round text-lg">add_circle</span>
                            <span>Post New Ad</span>
                        </Link>
                      
                    </div>
                </header>

              

                {/* Listing Management Section */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 md:p-8 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gray-50/30">
                        <h2 className="text-xl font-black text-gray-900">My Active Listings</h2>
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="relative flex-1 md:w-80">
                                <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                                <input
                                    className="w-full pl-12 pr-6 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                                    placeholder="Search your listings..."
                                    type="text"
                                />
                            </div>
                            <button className="flex items-center gap-2 px-5 py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-white hover:border-orange-500 hover:text-orange-600 transition-all shadow-sm">
                                <span className="material-icons-round text-sm">filter_list</span>
                                <span>Filter</span>
                            </button>
                        </div>
                    </div>

                    <div className="p-6 md:p-8">
                        <div className="grid grid-cols-1 gap-8">
                            {userProducts.map((item) => (
                                <div key={item._id} className="group flex flex-col lg:flex-row items-start lg:items-center gap-8 p-6 rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300">
                                    <div className="relative w-full lg:w-56 h-40 shrink-0 overflow-hidden rounded-2xl shadow-md border border-gray-50">
                                        <img
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            src={item.image[0]}
                                            alt={item.name}
                                        />
                                        <span className={`absolute top-3 left-3 px-3 py-1.5 ${item.status === 'Active' ? 'bg-green-600' : 'bg-yellow-500'} text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg`}>
                                            {item.status}
                                        </span>
                                    </div>

                                    <div className="flex-1 min-w-0 space-y-3">
                                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                            <div className="min-w-0">
                                                <h3 className="text-xl font-black text-gray-900 group-hover:text-orange-600 transition-colors uppercase tracking-tight truncate">{item.title}</h3>
                                                <p className="text-sm text-gray-500 font-medium line-clamp-2 mt-1">{item.description}</p>
                                            </div>
                                            <p className="text-2xl font-black text-orange-600 shrink-0">₹{item.price}</p>
                                        </div>

                                        {/* <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2">
                                            <span className="flex items-center gap-2 text-[10px] text-gray-400 font-black uppercase tracking-wider">
                                                <span className="material-icons-round text-sm text-orange-500">calendar_today</span>
                                                {item.posted === 'Incomplete listing' ? item.posted : `Posted ${item.posted}`}
                                            </span>
                                            {item.status === 'Active' && (
                                                <>
                                                    <span className="flex items-center gap-2 text-[10px] text-gray-400 font-black uppercase tracking-wider">
                                                        <span className="material-icons-round text-sm text-orange-500">visibility</span>
                                                        {item.views} Views
                                                    </span>
                                                    <span className="flex items-center gap-2 text-[10px] text-gray-400 font-black uppercase tracking-wider">
                                                        <span className="material-icons-round text-sm text-orange-500">chat</span>
                                                        {item.inquiries} Inquiries
                                                    </span>
                                                </>
                                            )}
                                        </div> */}
                                    </div>

                                    <div className="flex lg:flex-col gap-3 w-full lg:w-40 mt-6 lg:mt-0">
                                        {/* <button className={`flex-1 py-3 px-4 ${item.status === 'Active' ? 'bg-orange-600 hover:bg-orange-700 shadow-orange-500/20' : 'bg-gray-900 hover:bg-gray-800 shadow-gray-900/10'} text-white text-xs font-black rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95 uppercase tracking-widest`}>
                                            <span className="material-icons-round text-sm">{item.status === 'Active' ? 'check' : 'publish'}</span>
                                            {item.status === 'Active' ? 'Mark Sold' : 'Publish'}
                                        </button> */}
                                        <div className="flex gap-3 flex-1">
                                            {/* <button className="flex-1 py-3 px-4 border-2 border-gray-50 font-black text-gray-600 text-xs rounded-xl hover:bg-gray-50 hover:text-orange-600 transition-all flex items-center justify-center gap-2 uppercase tracking-widest">
                                                <span className="material-icons-round text-sm">edit</span>
                                                Edit
                                            </button> */}
                                            <button className="p-3 border-2 border-red-50 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all flex items-center justify-center" onClick={() => deleteItem(item._id)}>
                                                <span className="material-icons-round text-sm">delete_outline</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {/* <div className="flex items-center justify-center gap-3 mt-12">
                            <button className="p-3 rounded-xl border-2 border-gray-50 text-gray-400 disabled:opacity-30 hover:bg-gray-50 transition-all" disabled>
                                <span className="material-icons-round">chevron_left</span>
                            </button>
                            <button className="w-12 h-12 rounded-xl bg-orange-600 text-white font-black text-sm shadow-xl shadow-orange-500/20">1</button>
                            <button className="w-12 h-12 rounded-xl text-gray-400 hover:bg-gray-50 font-bold text-sm transition-all border-2 border-transparent hover:border-gray-50">2</button>
                            <button className="w-12 h-12 rounded-xl text-gray-400 hover:bg-gray-50 font-bold text-sm transition-all border-2 border-transparent hover:border-gray-50">3</button>
                            <button className="p-3 rounded-xl border-2 border-gray-50 text-gray-400 hover:bg-gray-50 transition-all">
                                <span className="material-icons-round">chevron_right</span>
                            </button>
                        </div> */}
                    </div>
                </div>

            </main>

            {/* Mobile Tab Bar (Dashboard specific navigation) */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex items-center justify-around py-3 md:hidden z-50 px-2 rounded-t-[1.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                <button className="flex flex-col items-center gap-1 text-orange-600">
                    <span className="material-icons-round">dashboard</span>
                    <span className="text-[10px] font-bold uppercase">Listings</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-orange-600 transition-colors">
                    <span className="material-icons-round">chat_bubble_outline</span>
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Messages</span>
                </button>
                <Link href="/addproduct" className="relative -mt-10 size-14 bg-orange-600 text-white rounded-2xl shadow-2xl shadow-orange-500/40 border-4 border-[#f8f7f6] flex items-center justify-center active:scale-90 transition-transform">
                    <span className="material-icons-round text-3xl">add</span>
                </Link>
                <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-orange-600 transition-colors">
                    <span className="material-icons-round">favorite_border</span>
                    <span className="text-[10px] font-bold uppercase">Saved</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-orange-600 transition-colors">
                    <span className="material-icons-round">person_outline</span>
                    <span className="text-[10px] font-bold uppercase">Profile</span>
                </button>
            </nav>
        </div>
    );
};

export default UserDashboard;
