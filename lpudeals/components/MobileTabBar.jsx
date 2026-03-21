'use client';
import { useContext } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import AppContext from '../app/context/AppContext';

const MobileTabBar = () => {
    const { isLoggedIn, mobileSearchOpen, setMobileSearchOpen } = useContext(AppContext);
    const pathname = usePathname();
    const router = useRouter();

    // Hide on homepage
    if (pathname === '/') return null;

    const isActive = (path) => pathname === path || pathname.startsWith(path + '/');

    const handleSearchClick = () => {
        setMobileSearchOpen(!mobileSearchOpen);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 md:hidden z-50 rounded-t-[1.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-around py-3 px-4 max-w-md mx-auto">
                {/* Shop */}
                <Link href="/products" className={`flex flex-col items-center justify-center gap-1 min-w-[56px] ${isActive('/products') ? 'text-orange-600' : 'text-gray-400 hover:text-orange-600'} transition-colors`}>
                    <span className="material-icons-round text-[22px]">storefront</span>
                    <span className="text-[10px] font-bold uppercase">Shop</span>
                </Link>

                {/* Logged in: Listings | Logged out: Search */}
                {isLoggedIn ? (
                    <Link href="/dashboard" className={`flex flex-col items-center justify-center gap-1 min-w-[56px] ${isActive('/dashboard') ? 'text-orange-600' : 'text-gray-400 hover:text-orange-600'} transition-colors`}>
                        <span className="material-icons-round text-[22px]">dashboard</span>
                        <span className="text-[10px] font-bold uppercase">Listings</span>
                    </Link>
                ) : (
                    <button onClick={handleSearchClick} className={`flex flex-col items-center justify-center gap-1 min-w-[56px] ${mobileSearchOpen ? 'text-orange-600' : 'text-gray-400 hover:text-orange-600'} transition-colors`}>
                        <span className="material-icons-round text-[22px]">search</span>
                        <span className="text-[10px] font-bold uppercase">Search</span>
                    </button>
                )}

                {/* Center Add Button */}
                <Link href={isLoggedIn ? "/addproduct" : "/login"} className="relative -mt-10 size-14 bg-orange-600 text-white rounded-2xl shadow-2xl shadow-orange-500/40 border-4 border-[#f8f7f6] flex items-center justify-center active:scale-90 transition-transform">
                    <span className="material-icons-round text-3xl">add</span>
                </Link>

                {/* Logged in: Search | Logged out: Register */}
                {isLoggedIn ? (
                    <button onClick={handleSearchClick} className={`flex flex-col items-center justify-center gap-1 min-w-[56px] ${mobileSearchOpen ? 'text-orange-600' : 'text-gray-400 hover:text-orange-600'} transition-colors`}>
                        <span className="material-icons-round text-[22px]">search</span>
                        <span className="text-[10px] font-bold uppercase">Search</span>
                    </button>
                ) : (
                    <Link href="/register" className={`flex flex-col items-center justify-center gap-1 min-w-[56px] ${isActive('/register') ? 'text-orange-600' : 'text-gray-400 hover:text-orange-600'} transition-colors`}>
                        <span className="material-icons-round text-[22px]">person_add</span>
                        <span className="text-[10px] font-bold uppercase">Register</span>
                    </Link>
                )}

                {/* Profile */}
                <Link href={isLoggedIn ? "/dashboard" : "/login"} className={`flex flex-col items-center justify-center gap-1 min-w-[56px] ${isActive('/login') || (isLoggedIn && isActive('/dashboard')) ? 'text-orange-600' : 'text-gray-400 hover:text-orange-600'} transition-colors`}>
                    <span className="material-icons-round text-[22px]">person_outline</span>
                    <span className="text-[10px] font-bold uppercase">Profile</span>
                </Link>
            </div>
        </nav>
    );
};

export default MobileTabBar;
