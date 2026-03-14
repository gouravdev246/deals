'use client';
import { useContext, useState } from "react";
import AppContext from "../app/context/AppContext";
import Link from "next/link";


function Navbar() {
    const { cart, user, isLoggedIn, logout, searchProduct, setSearchProduct, products } = useContext(AppContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Filter products for the search dropdown
    const searchResults = searchProduct.trim() !== "" 
        ? products.filter(p => p.name.toLowerCase().includes(searchProduct.toLowerCase())).slice(0, 8)
        : [];

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
                                <Link href="/addproduct" className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors">Sell</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Middle: Search Bar (Desktop) */}
                    <div className="hidden lg:block flex-1 max-w-xl mx-8 relative">
                        <form className="relative" onSubmit={(e) => e.preventDefault()}>
                            <div className="relative">
                                <input
                                    type="search"
                                    className="block w-full p-3 pl-4 text-sm text-gray-900 border border-gray-200 rounded-full bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none"
                                    placeholder="Search for products, brands and more..."
                                    onChange={(e) => setSearchProduct(e.target.value)}
                                    value={searchProduct}
                                />
                                <button type="submit" className="absolute right-1.5 top-1.5 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors shadow-md">
                                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                                    </svg>
                                    <span className="sr-only">Search</span>
                                </button>
                            </div>
                        </form>

                        {/* Search Results Dropdown (Desktop) */}
                        {searchProduct.trim() !== "" && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden animation-fade-in max-h-[400px] overflow-y-auto">
                                {searchResults.length > 0 ? (
                                    <div className="py-2">
                                        <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">Products Found</div>
                                        {searchResults.map((p) => (
                                            <Link 
                                                key={p._id} 
                                                href={`/products/${p._id}`}
                                                onClick={() => setSearchProduct("")}
                                                className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 transition-colors group"
                                            >
                                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                                                    <img src={p.image[0]} alt={p.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-bold text-gray-900 truncate group-hover:text-orange-600">{p.name}</h4>
                                                    <p className="text-xs text-gray-500">₹{p.price}</p>
                                                </div>
                                                <span className="material-icons text-gray-300 group-hover:text-orange-600 text-sm">chevron_right</span>
                                            </Link>
                                        ))}
                                        <Link 
                                            href="/products" 
                                            onClick={() => setSearchProduct(searchProduct)}
                                            className="block text-center py-3 text-sm font-bold text-orange-600 hover:bg-orange-100 transition-colors"
                                        >
                                            View all results
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="p-8 text-center text-gray-500">
                                        <span className="material-icons text-4xl mb-2 opacity-20">search_off</span>
                                        <p className="text-sm">No products found for "{searchProduct}"</p>
                                    </div>
                                )}
                            </div>
                        )}
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
                                <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden animation-fade-in text-center p-8">
                                    <span className="material-icons text-5xl text-gray-200 mb-4">shopping_basket</span>
                                    <h3 className="font-bold text-gray-900 mb-2">Your Cart is Empty</h3>
                                    <p className="text-sm text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
                                    <Link 
                                        href="/products" 
                                        onClick={() => setIsCartOpen(false)}
                                        className="inline-block px-6 py-2.5 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-colors shadow-lg shadow-orange-500/20"
                                    >
                                        Start Shopping
                                    </Link>
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
                                    {isLoggedIn && user ? (
                                        <>
                                            <div className="p-3 border-b border-gray-100 bg-orange-50/50">
                                                <p className="text-sm font-semibold text-gray-900">{user.name || 'Student'}</p>
                                                <p className="text-xs text-gray-500">{user.email}</p>
                                            </div>
                                            <ul className="py-2 text-sm text-gray-700">
                                                <li><Link href="/profile" className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-600">My Profile</Link></li>
                                                <li><Link href="/dashboard" className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-600">My Listings</Link></li>
                                                <li><Link href="/addproduct" className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-600">Add Sell Items</Link></li>
                                                {/* <li><Link href="#" className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-600">Wishlist</Link></li> */}
                                            </ul>
                                            <div className="border-t border-gray-100 py-2">
                                                <button onClick={() => { logout(); setIsUserMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Sign out</button>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="py-2">
                                            <Link href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 font-medium">Login</Link>
                                            <Link href="/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 font-medium">Register</Link>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Search Bar (Expandable) */}
                {isSearchOpen && (
                    <div className="mt-4 lg:hidden pb-2 relative">
                        <form className="relative" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="search"
                                className="block w-full p-3 pl-4 text-sm text-gray-900 border border-gray-200 rounded-full bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none shadow-sm"
                                placeholder="Search..."
                                onChange={(e) => setSearchProduct(e.target.value)}
                                value={searchProduct}
                                autoFocus
                            />
                            <button type="submit" className="absolute right-2 top-2 bg-orange-500 text-white p-1.5 rounded-full hover:bg-orange-600">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                                </svg>
                            </button>
                        </form>

                        {/* Search Results Dropdown (Mobile) */}
                        {searchProduct.trim() !== "" && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden animation-fade-in max-h-[300px] overflow-y-auto">
                                {searchResults.length > 0 ? (
                                    <div className="py-2">
                                        {searchResults.map((p) => (
                                            <Link 
                                                key={p._id} 
                                                href={`/products/${p._id}`}
                                                onClick={() => { setSearchProduct(""); setIsSearchOpen(false); }}
                                                className="flex items-center gap-3 px-4 py-3 border-b border-gray-50 last:border-0"
                                            >
                                                <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                                                    <img src={p.image[0]} alt={p.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-bold text-gray-900 truncate">{p.name}</h4>
                                                    <p className="text-xs text-gray-500">₹{p.price}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-4 text-center text-xs text-gray-500">No results found</div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Mobile Menu Backdrop */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden transition-opacity cursor-pointer"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Menu Side-Sheet */}
            <div className={`fixed top-0 left-0 bottom-0 w-[280px] bg-white z-50 lg:hidden transform transition-transform duration-300 ease-in-out shadow-2xl ${
                isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                <div className="flex flex-col h-full">
                    {/* Menu Header */}
                    <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-orange-50/30">
                        <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                            <span className="text-xl font-bold text-orange-600 tracking-tight">LPU<span className="text-gray-900">Deals</span></span>
                        </Link>
                        <button 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-100 rounded-full transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Menu Links */}
                    <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                        <div className="pb-4">
                            <h4 className="px-3 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Explore</h4>
                            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-xl text-base font-semibold text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all">
                                <span className="material-icons opacity-60">home</span> Home
                            </Link>
                            <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-xl text-base font-semibold text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all">
                                <span className="material-icons opacity-60">storefront</span> All Products
                            </Link>
                            <Link href="/addproduct" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-xl text-base font-semibold text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all">
                                <span className="material-icons opacity-60">add_circle_outline</span> Sell an Item
                            </Link>
                        </div>

                        <div className="pt-4 border-t border-gray-50">
                            <h4 className="px-3 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Personal</h4>
                            {isLoggedIn && user ? (
                                <>
                                    <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-xl text-base font-semibold text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all">
                                        <span className="material-icons opacity-60">person</span> My Profile
                                    </Link>
                                    <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-xl text-base font-semibold text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all">
                                        <span className="material-icons opacity-60">list_alt</span> My Listings
                                    </Link>
                                    <button 
                                        onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 transition-all mt-4"
                                    >
                                        <span className="material-icons opacity-60">logout</span> Sign Out
                                    </button>
                                </>
                            ) : (
                                <div className="grid grid-cols-2 gap-3 mt-4 px-2">
                                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center py-3 rounded-xl text-sm font-bold border-2 border-orange-100 text-orange-600 hover:bg-orange-50 transition-all">
                                        Login
                                    </Link>
                                    <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center py-3 rounded-xl text-sm font-bold bg-orange-600 text-white hover:bg-orange-700 transition-all">
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Menu Footer */}
                    <div className="p-6 bg-gray-50 border-t border-gray-100">
                        <p className="text-xs text-center text-gray-400 font-medium">© 2026 LPUDeals Marketplace</p>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;