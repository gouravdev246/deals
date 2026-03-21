'use client'

import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const AppContext = createContext();

// Custom hook for easy access
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within AppWrapper");
    }
    return context;
};

export const AppWrapper = ({ children }) => {
    // ─── Auth State ───
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // ─── Cart State ───
    const [cart, setCart] = useState([]);

    // ─── Categories State ───
    const [categories, setCategories] = useState([]);

    // ─── Products State ───
    const [products, setProducts] = useState([]);
    const [homepageProducts , sethomePageProducts  ] = useState(products[2])

    // ─── Loading States ───
    const [loading, setLoading] = useState(true);

    const [searchProduct , setSearchProduct] = useState('')
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

    // ─── Hydrate user from localStorage on mount ───
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsed = JSON.parse(storedUser);
                setUser(parsed);
                setIsLoggedIn(true);
            } catch (e) {
                localStorage.removeItem('user');
            }
        }

        // Hydrate cart from localStorage
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            try {
                setCart(JSON.parse(storedCart));
            } catch (e) {
                localStorage.removeItem('cart');
            }
        }

        setLoading(false);
    }, []);

    // ─── Persist cart to localStorage ───
    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            localStorage.removeItem('cart');
        }
    }, [cart]);

    // ─── Fetch categories once on mount ───
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('/api/products/getallcategory');
                setCategories(res.data.categories || []);
            } catch (err) {
                console.error('Failed to fetch categories:', err);
            }
        };
        fetchCategories();
    }, []);

    // ─── Fetch all products once on mount ───
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('/api/products/getallproducts');
                setProducts(res.data.products || []);
            } catch (err) {
                console.error('Failed to fetch products:', err);
            }
        };
        fetchProducts();
    }, []);

    // ─── Auth Actions ───
    const login = (userData) => {
        setUser(userData);
        setIsLoggedIn(true);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = async () => {
        try {
            await axios.post('/api/auth/logout');
        } catch (err) {
            console.error('Logout error:', err);
        }
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('user');
    };

    // ─── Cart Actions ───
    const addToCart = (item) => {
        setCart((prev) => {
            const exists = prev.find((i) => i._id === item._id);
            if (exists) return prev;
            return [...prev, item];
        });
    };

    const removeFromCart = (itemId) => {
        setCart((prev) => prev.filter((i) => i._id !== itemId));
    };

    const clearCart = () => {
        setCart([]);
    };

    // ─── Refresh data helpers ───
    const refreshProducts = async () => {
        try {
            const res = await axios.get('/api/products/getallproducts');
            setProducts(res.data.products || []);
        } catch (err) {
            console.error('Failed to refresh products:', err);
        }
    };

    const refreshCategories = async () => {
        try {
            const res = await axios.get('/api/products/getallcategory');
            setCategories(res.data.categories || []);
        } catch (err) {
            console.error('Failed to refresh categories:', err);
        }
    };

    return (
        <AppContext.Provider value={{
            // Auth
            user,
            isLoggedIn,
            login,
            logout,
            loading,

            // Cart
            cart,
            setCart,
            addToCart,
            removeFromCart,
            clearCart,

            // Data
            categories,
            products,
            refreshProducts,
            refreshCategories, 
            homepageProducts,

            setSearchProduct , 
            searchProduct,

            mobileSearchOpen,
            setMobileSearchOpen
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;
