'use client';
import { useContext, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AppContext from '../app/context/AppContext';

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn, loading } = useContext(AppContext);
    const router = useRouter();
    const pathname = usePathname();

    // Define routes that ANYONE can see (Lower-case matches)
    const publicRoutes = ['/', '/products', '/forgetpass', '/login', '/register' , '/privecy-policy' , '/seftytips' , '/terms' , '/contact-admin'];
    
    // Check if the current path is a dynamic product page (e.g., /products/123)
    const isDynamicProductPage = pathname.startsWith('/products/');
    const isPublic = publicRoutes.includes(pathname) || isDynamicProductPage;

    useEffect(() => {
        // Only redirect if:
        // 1. Initial hydration/loading is done
        // 2. User is NOT logged in
        // 3. The current page is NOT public
        if (!loading && !isLoggedIn && !isPublic) {
            router.push('/login');
        }
    }, [isLoggedIn, loading, isPublic, router]);

    // Show a loading spinner during initial hydration to prevent "flicker"
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // If it's a private page and user isn't logged in, return null while redirecting
    if (!isPublic && !isLoggedIn) {
        return null;
    }

    return children;
};

export default ProtectedRoute;
