'use client';
import { useContext, useState } from "react";
import AppContext from "../app/context/AppContext";
import Link from "next/link";


function Navbar() {
    const { setCart, cart } = useContext(AppContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false); // For mobile search toggle

    return (
        <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
            <div className="max-w-screen-xl mx-auto px-4 lg:px-6 py-3">
                <div className="flex items-center justify-between">

                    {/* Left: Mobile Menu & Logo */}
                    <div className="flex items-center gap-4">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                        >
                            <span className="sr-only">Open menu</span>
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>

                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-orange-600 tracking-tight">LPU<span className="text-gray-900">Deals</span></span>
                        </Link>

                        {/* Desktop Nav Links */}
                        <ul className="hidden lg:flex items-center gap-8 ml-8">
                            <li>
                                <Link href="/" className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors">Home</Link>
                            </li>
                            <li>
                                <Link href="/products" className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors">Products</Link>
                            </li>
                            <li>
                                <Link href="/sell" className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors">Sell</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Middle: Search Bar (Desktop) */}
                    <div className="hidden lg:block flex-1 max-w-xl mx-8">
                        <form className="relative">
                            <div className="relative">
                                <input
                                    type="search"
                                    className="block w-full p-3 pl-4 text-sm text-gray-900 border border-gray-200 rounded-full bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none"
                                    placeholder="Search for products, brands and more..."

                                />
                                <button type="submit" className="absolute right-1.5 top-1.5 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors shadow-md">
                                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                                    </svg>
                                    <span className="sr-only">Search</span>
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right: Icons (Cart & Profile) */}
                    <div className="flex items-center gap-2 lg:gap-4">

                        {/* Mobile Search Toggle */}
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="lg:hidden p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                            </svg>
                        </button>

                        {/* Cart Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsCartOpen(!isCartOpen)}
                                className="flex items-center gap-2 p-2 text-gray-700 hover:text-orange-600 rounded-lg hover:bg-orange-50 transition-all relative"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                <span className="hidden sm:block font-medium text-sm">Cart</span>
                                {cart && cart.length > 0 && (
                                    <span className="absolute top-1 right-1 lg:top-0 lg:right-0 bg-orange-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                                        {cart.length}
                                    </span>
                                )}
                            </button>

                            {/* Cart Dropdown Menu */}
                            {isCartOpen && (
                                <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden animation-fade-in">
                                    <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                                        <h3 className="font-semibold text-gray-800">Shopping Cart</h3>
                                        <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-gray-600">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                    </div>
                                    <div className="max-h-64 overflow-y-auto p-2">
                                        {/* Example Item */}
                                        <div className="p-3 hover:bg-gray-50 rounded-lg flex gap-3 transition-colors">
                                            <div className="w-12 h-12 bg-gray-200 rounded-md shrink-0"></div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">Apple iPhone 15</p>
                                                <p className="text-xs text-gray-500">$599</p>
                                            </div>
                                        </div>
                                        <div className="p-4 text-center text-sm text-gray-500">
                                            Your cart is empty
                                        </div>
                                    </div>
                                    <div className="p-3 border-t border-gray-100 bg-gray-50">
                                        <Link href="/checkout" className="block w-full py-2 px-4 bg-orange-600 hover:bg-orange-700 text-white text-center text-sm font-medium rounded-lg transition-colors shadow-sm">
                                            Checkout
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* User Profile */}
                        <div className="relative">
                            <button
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                className="flex items-center gap-2 p-1.5 pr-3 text-gray-700 hover:text-orange-600 rounded-full border border-gray-200 hover:border-orange-200 hover:bg-orange-50 transition-all"
                            >
                                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <span className="hidden sm:block font-medium text-sm">Account</span>
                            </button>

                            {/* User Dropdown */}
                            {isUserMenuOpen && (
                                <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden animation-fade-in">
                                    <div className="p-3 border-b border-gray-100 bg-orange-50/50">
                                        <p className="text-sm font-semibold text-gray-900">User Name</p>
                                        <p className="text-xs text-gray-500">user@example.com</p>
                                    </div>
                                    <ul className="py-2 text-sm text-gray-700">
                                        <li><Link href="/dashboard" className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-600">My Listings</Link></li>
                                        <li><Link href="/addproduct" className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-600">Add Sell Items</Link></li>

                                        <li><Link href="#" className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-600">Wishlist</Link></li>
                                    </ul>
                                    <div className="border-t border-gray-100 py-2">
                                        <Link href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">Sign out</Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Search Bar (Expandable) */}
                {isSearchOpen && (
                    <div className="mt-4 lg:hidden pb-2">
                        <form className="relative">
                            <input
                                type="search"
                                className="block w-full p-3 pl-4 text-sm text-gray-900 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none shadow-sm"
                                placeholder="Search..."
                                autoFocus
                            />
                            <button type="submit" className="absolute right-2 top-2 bg-orange-500 text-white p-1.5 rounded-md hover:bg-orange-600">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                                </svg>
                            </button>
                        </form>
                    </div>
                )}
            </div>

            {/* Mobile Menu (Slide down/Overlay) */}
            {isMobileMenuOpen && (
                <div className="lg:hidden border-t border-gray-100 bg-white">
                    <div className="px-4 py-3 space-y-1">
                        <Link href="#" className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50">Home</Link>
                        <Link href="#" className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50">Best Sellers</Link>
                        <Link href="#" className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50">Sell</Link>
                        <Link href="#" className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50">Categories</Link>
                        <div className="border-t border-gray-100 my-2 pt-2">
                            <Link href="#" className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50">My Account</Link>
                            <Link href="#" className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50">Order History</Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;