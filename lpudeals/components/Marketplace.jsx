'use client';
import axios from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';


const Marketplace = () => {
    const [activeCategory, setActiveCategory] = useState('');

    const [categories, setCategory] = useState([])

    const products = [
        {
            id: 1,
            title: 'Hero Sprint Next 24T',
            price: '4,500',
            location: 'BH-1 Hostel',
            time: '2 days ago',
            seller: 'Rahul Sharma',
            trusted: true,
            verified: true,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDASsU-_foQ1SteloelLIQnk_QYphdYkIeqcO2JMIIozInXn94f4AhvU1E_UAlHxqIKJGeEvbrUmmoI7l08m8_KYeKmlQtcr7ptTUOmsigiwNji9vZE5nZzgxnPaoZnZNcmUlbyKgdeU0QTMnAOI_gvVxMPf3ZabvjFN1Pd93718FJtB4RDARJ3esIuL0b6HNGm1yzEP-YawRooz_qtLxzmtGwWJudCnd_w3XES-8irCMSEEfybUKwRhrmaH-zwIM9X40wsxXscsQPg'
        },
        {
            id: 2,
            title: 'Atlas Peak MTB - 21 Speed',
            price: '6,200',
            location: 'BH-5 Hostel',
            time: 'Just now',
            seller: 'Priya Kaur',
            trusted: true,
            verified: true,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAD3AozPtrCRfrnCbxdsKz466hJFMWujVPDo9KD899UylyhZ5UPRo2xr4WBtIR5-ysKXIJo1Ku9arKvXXqxVo48Np2WL4nrsbEePZg_9YSBKqK9cCDMUtuQJG73lTQVsL-OGxNDqCxw-OmDIcq0NrBTZAREbTojie0O48cH0S6zu2zpoPc7cBsHyK3Ox9j9uWh7jq2JrBNQDvsppprTsCkvxwE-LFGHB6BWKVEUD_02mUvi6GRPw5uVKXpzpJRgHP1IoCDlWQeJpMq'
        },
        {
            id: 3,
            title: 'Lady Bird Bicycle - Pink',
            price: '3,000',
            location: 'GD-2 Hostel',
            time: '5 hours ago',
            seller: 'Ankit Singh',
            trusted: true,
            verified: true,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1oAq9oJw-GCn2vFympsxikVt_sjlosR1CFNi2aHYT7PeXMZ6Rj7OptEl9Vxl6n2AXg7OQNaFauQqehjRNZAds0M4_yZb844Fvr51bwpaBODLYh8g2BaoFKIbdRh5PM3M8pdy_1ZBK7mO0Al_0ZzScUKRwv8on-8DKtB8ruq1yIF_4g5-xkYc9ud89g1GItOLlPpWKPpiUSnujg631ZNk8bvhVqdhlQvV2xBmtCtYqR3puhZYogdxi3-kir_ekVkGCy51cAQxuNFMG'
        },
        {
            id: 4,
            title: 'Standard Cycle - Needs Repair',
            price: '1,200',
            location: 'Main Gate',
            time: 'Yesterday',
            seller: 'Vikram',
            trusted: false,
            verified: false,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaDiZvLvFON66gjk90-1F_YBbugbB3OwyEpLpExj7DRs7hBlYf3ehYjk_JHS8Kb1mpAVrF-fFIZspO74MYo4ZKkAO_ik0QkOO-WpyctFtXBHx72J-yxO2mLys_o5ljXwiw2jBm9ob17_7nVVd0hDxPiiHWWJa2OQuQ7ScwT_HVHMml2VyYHbqL2x7cjD5NvM__hLLeHcwVo3EWyVOExoUqRImjOqmcb_tKHQwKYZY2jprZggWwEFugmqZevOt5c_yIy6di6fTtAWCz'
        },
        {
            id: 5,
            title: 'Compact Folding Bicycle',
            price: '8,500',
            location: 'BH-3 Hostel',
            time: '3 days ago',
            seller: 'Sneha Gupta',
            trusted: true,
            verified: true,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7qyxqIDgMLuuF36xa69k_-tBKtHxCQpCAJwJAjKYbnyGhpIyqQleKacBpFAareATOX3AL5VEQVWb6FzQySclpTenYjw7JNAW-qeeLX9PuG5CCHi30RGRiQA9yjAWnqjM0HkEs8vxJBt2OUS67chxc2qTKw3bNLMYjKATMBfO5aaq0YoV0kjGoUy8Ls-DMzI2X7C0hoOCvVQPMMaT3ssegYv2t2NoLmJ1zkuOAV1uUcR2k4v2m_zXPWLjsvsYcd1SxZVYsJB4YywH0'
        },
        {
            id: 6,
            title: 'Electric E-Bike - Mint Condition',
            price: '15,000',
            location: 'Law Gate',
            time: '1 week ago',
            seller: 'Amit Verma',
            trusted: true,
            verified: false,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDf_wLCpIMFoFozJVZ1xi2ScoreT2FzUqvh6z7JHG0zGuvAy1t7Yi6Bf-3jpQJ9e42t789imyYtOG2Jlhx2I5GF2M8yHlkZ1fIiTKBHD0ybmVxZXlzJ-fC1vvG1HETcQdWQ7noRlY1txkdlFnuWDjpaPX1k7XW6tOXq7JkuPGlE5V_iwrQ1SMQZT0rkFDKIRVPbbcDPLLlaNmXt8dabcgdhXFArWL_A_O1OvPa7bnXzjPZFt5tVVIH28-29o5f8NZTuSJjCoOe-h3FW'
        }

    ];

    useEffect(() => {
        const fetchCategory = async () => {
            const res = await axios.get('/api/products/getallcategory');
            setCategory(res.data.categories);
        }
        fetchCategory();
    }, []);
    console.log(categories)

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
                            Showing <span className="font-bold text-gray-900">124</span> results for <span className="text-orange-600 font-bold">"{activeCategory}"</span>
                        </p>
                        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm">
                            <span className="text-sm text-gray-500">Sort by:</span>
                            <select className="bg-transparent border-none text-sm font-bold focus:ring-0 cursor-pointer text-gray-900 outline-none">
                                <option>Newest First</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <Link href={`/products/${product.id}`} key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group relative border border-gray-100">
                                <button className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur rounded-full shadow-sm text-gray-400 hover:text-red-500 transition-colors">
                                    <span className="material-icons text-sm">favorite_border</span>
                                </button>

                                <div className="h-56 overflow-hidden bg-gray-100 relative">
                                    <img
                                        src={product.image}
                                        alt={product.title}
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
                                        <h3 className="font-bold text-gray-900 truncate flex-1 pr-2">{product.title}</h3>
                                        <span className="text-orange-600 font-black text-lg">₹{product.price}</span>
                                    </div>

                                    <div className="flex items-center gap-3 text-[11px] text-gray-500 font-medium mb-4">
                                        <div className="flex items-center gap-1">
                                            <span className="material-icons text-xs text-orange-500">location_on</span>
                                            {product.location}
                                        </div>
                                        <span>•</span>
                                        <div>{product.time}</div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-full bg-gray-100 overflow-hidden border border-gray-100">
                                                <img
                                                    src={`https://ui-avatars.com/api/?name=${product.seller}&background=random`}
                                                    alt={product.seller}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <span className="text-xs font-semibold text-gray-700">{product.seller}</span>
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
                                        Quick View
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-12 flex justify-center items-center gap-2">
                        <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-400 hover:text-orange-600 hover:border-orange-600 transition-all">
                            <span className="material-icons">chevron_left</span>
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-orange-600 text-white font-bold shadow-lg shadow-orange-500/20">1</button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 hover:text-orange-600 hover:border-orange-600 font-bold transition-all">2</button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 hover:text-orange-600 hover:border-orange-600 font-bold transition-all">3</button>
                        <span className="px-2 text-gray-400">...</span>
                        <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 hover:text-orange-600 hover:border-orange-600 font-bold transition-all">12</button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-400 hover:text-orange-600 hover:border-orange-600 transition-all">
                            <span className="material-icons">chevron_right</span>
                        </button>
                    </div>
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
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">© 2024 LpuDeals. Built with ❤️ for Students.</p>
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
