'use client';
import { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import AppContext from '../app/context/AppContext';


const Marketplace = () => {
    const { categories, products , searchProduct , setSearchProduct } = useContext(AppContext);
    const [activeCategory, setActiveCategory] = useState('');
    const [filteredProduct , setFilterdProduct] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    
    const itemsPerPage = 6;

    useEffect(()=>{
        const filterd = products.filter((product)=>{
            if(activeCategory === '') return true ;
            return product.category.name === activeCategory ;
        })
        setFilterdProduct(filterd)
        setCurrentPage(1); // Reset to first page on category change
    }, [products , activeCategory])

    useEffect(()=>{
        const search = products.filter((product)=>{
            return product.name.toLowerCase().includes(searchProduct.toLowerCase())
        })
        setFilterdProduct(search)
        setCurrentPage(1); // Reset to first page on category change
    }, [products , searchProduct])

    // Pagination calculations
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProduct.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProduct.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="bg-[#f8f7f6] min-h-screen font-sans">
            <main className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">

                {/* Sidebar Filters */}
                <aside className="w-full lg:w-64 shrink-0 sticky top-24 h-fit hidden lg:block">
                    <div className="space-y-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div>
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="material-icons text-orange-600 text-sm">filter_list</span>
                                Category
                            </h3>
                            <div className="space-y-2">
                                <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-orange-50 cursor-pointer transition-all group">
                                    <input
                                        type="checkbox"
                                        className="rounded text-orange-600 focus:ring-orange-500 border-gray-300"
                                        checked={activeCategory === ''}
                                        onChange={() => setActiveCategory('')}
                                    />
                                    <span className={`text-sm ${activeCategory === '' ? 'font-semibold text-orange-600' : 'text-gray-600 group-hover:text-orange-600'}`}>
                                        All Categories
                                    </span>
                                </label>
                                {categories.map((cat) => (
                                    <label key={cat.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-orange-50 cursor-pointer transition-all group">
                                        <input
                                            type="checkbox"
                                            className="rounded text-orange-600 focus:ring-orange-500 border-gray-300"
                                            checked={activeCategory === cat.name}
                                            onChange={() => setActiveCategory(cat.name)}
                                        />
                                        <span className={`text-sm ${activeCategory === cat.name ? 'font-semibold text-orange-600' : 'text-gray-600 group-hover:text-orange-600'}`}>
                                            {cat.name}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                    </div>
                </aside>


                {/* Product Grid Area */}
                <section className="flex-1">
                    {/* Results Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                        <p className="text-sm text-gray-500">
                            Showing <span className="font-bold text-gray-900">{filteredProduct.length}</span> results {activeCategory && <>for <span className="text-orange-600 font-bold">"{activeCategory}"</span></>}
                        </p>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {currentItems.map((product) => (
                            <Link href={`/products/${product._id}`} key={product._id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group relative border border-gray-100">
                            

                                <div className="h-56 overflow-hidden bg-gray-100 relative" key={product._id}>
                                    <img
                                        src={product.image[0]}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    {product.verified && (
                                        <div className="absolute bottom-3 left-3 bg-orange-600/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-lg">
                                            Verified LPU Student
                                        </div>
                                    )}
                                </div>

                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-bold text-gray-900 truncate flex-1 pr-2">{product.name}</h3>
                                        <span className="text-orange-600 font-black text-lg">₹{product.price}</span>
                                    </div>

                                    <div className="flex items-center gap-3 text-[11px] text-gray-500 font-medium mb-4">
                                        <div>{product.time || 'Recently posted'}</div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-full bg-gray-100 overflow-hidden border border-gray-100">
                                                <img
                                                    src={`https://ui-avatars.com/api/?name=${product.user?.name || 'User'}&background=random`}
                                                    alt={product.user?.name || 'User'}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <span className="text-xs font-semibold text-gray-700">{product.user?.name || 'LPU Student'}</span>
                                        </div>
                                        {product.trusted && (
                                            <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                                                <span className="material-icons text-[12px]">verified</span>
                                                TRUSTED
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Hover Action Overlay */}
                                <div className="absolute inset-x-0 bottom-0 p-5 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <div className="w-full py-3 bg-orange-600 text-white rounded-xl font-bold shadow-lg shadow-orange-500/20 hover:bg-orange-700 transition-all active:scale-95 flex items-center justify-center gap-2">
                                        <span className="material-icons text-sm">visibility</span>
                                        View Details
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-12 flex justify-center items-center gap-2">
                            <button 
                                onClick={() => paginate(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className={`w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white transition-all ${currentPage === 1 ? 'text-gray-200 cursor-not-allowed' : 'text-gray-400 hover:text-orange-600 hover:border-orange-600'}`}
                            >
                                <span className="material-icons">chevron_left</span>
                            </button>
                            
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => paginate(i + 1)}
                                    className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold transition-all ${currentPage === i + 1 ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/20' : 'border border-gray-200 bg-white text-gray-600 hover:text-orange-600 hover:border-orange-600'}`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button 
                                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className={`w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white transition-all ${currentPage === totalPages ? 'text-gray-200 cursor-not-allowed' : 'text-gray-400 hover:text-orange-600 hover:border-orange-600'}`}
                            >
                                <span className="material-icons">chevron_right</span>
                            </button>
                        </div>
                    )}
                </section>
            </main>

            {/* Floating Action Button for Mobile */}
            <button className="fixed bottom-6 right-6 lg:hidden w-14 h-14 bg-orange-600 text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:scale-110 transition-transform active:scale-95">
                <span className="material-icons text-3xl">add</span>
            </button>

            {/* Footer */}
            <footer className="mt-20 border-t border-gray-100 bg-white py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-xl font-black text-gray-900 tracking-tight">LPU<span className="text-orange-600">Deals</span></span>
                            </div>
                            <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
                                Exclusive second-hand marketplace for Lovely Professional University students. Buy and sell books, electronics, cycles, and more with trusted peers.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Support</h4>
                            <ul className="space-y-4 text-sm text-gray-500 font-medium">
                                <li><a className="hover:text-orange-600 transition-colors" href="#">Safety Tips</a></li>
                                <li><a className="hover:text-orange-600 transition-colors" href="#">Verification</a></li>
                                <li><a className="hover:text-orange-600 transition-colors" href="#">Guidelines</a></li>
                                <li><a className="hover:text-orange-600 transition-colors" href="#">Report Scam</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Popular</h4>
                            <ul className="space-y-4 text-sm text-gray-500 font-medium">
                                <li><a className="hover:text-orange-600 transition-colors" href="#">Engineering Books</a></li>
                                <li><a className="hover:text-orange-600 transition-colors" href="#">Lab Coats</a></li>
                                <li><a className="hover:text-orange-600 transition-colors" href="#">Bicycles</a></li>
                                <li><a className="hover:text-orange-600 transition-colors" href="#">Gadgets</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-12 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">© 2026 LpuDeals. Built with ❤️ for Students.</p>
                        <div className="flex gap-6">
                            <span className="material-icons text-gray-400 hover:text-orange-600 cursor-pointer transition-colors">facebook</span>
                            <span className="material-icons text-gray-400 hover:text-orange-600 cursor-pointer transition-colors">camera_alt</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Marketplace;
