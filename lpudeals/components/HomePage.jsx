'use client';
import React from 'react';
import { useState , useEffect } from 'react';
import axios from 'axios';

function HomePage() {
    const [categories , setCategories] = useState([]);
    useEffect(() => {
        const fetchCategory = async () => {
            const res = await axios.get('/api/products/getallcategory');
            setCategories(res.data.categories);
        }
        fetchCategory();
    }, []);
    return (
        <div className="bg-gray-50 font-sans text-gray-900">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-10 pb-12 lg:pt-16 lg:pb-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center lg:text-left grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-600 text-sm font-bold tracking-wide uppercase mb-6">
                                Exclusive for LPU Students
                            </span>
                            <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
                                LPU's Own <br /><span className="text-orange-600">Marketplace</span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-10 max-w-lg">
                                Buy, sell, and save within the LPU community. The safest way to trade textbooks, gadgets, and hostel essentials right on campus.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <button className="bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-700 hover:scale-105 transition-all shadow-xl shadow-orange-500/25">
                                    Browse Products
                                </button>
                                <button className="bg-white border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors">
                                    Sell Now
                                </button>
                            </div>
                            <div className="mt-8 flex items-center gap-4 justify-center lg:justify-start text-gray-500">
                                <div className="flex -space-x-2">
                                    <img alt="Student" className="w-10 h-10 rounded-full border-2 border-white bg-gray-200" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYRrkGIalOl2z-Dp3o9dxqC_F3u-ToIT4qZLT3nzuuuu76OcM_pAvVxxdw3nDqaaqz3HwN0x8cCTOpewupZJcrmkOLHJQYYXPaT6DOWaP7c77Jn6Tcn_WIOD0RX7oz4EnnQl1fa2C2JhqXUvVARFVEAormAb7sCop2mn8mdI8nyqSE6PamcSaSdUrLWucUG4mF1jWBcQnFp64nzVXmIar_sPBu0QWl0q7lbg-bdEJKwQSXbNnq4TmThAygUdIuMqex8A5oeUarr5aJ" />
                                    <img alt="Student" className="w-10 h-10 rounded-full border-2 border-white bg-gray-200" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5oLQi6O41rSLBA4WJqNMgdYC-EfdQzwT4ed1gVjdWu7-hdOvzre1k__ARRPMBCQXqhUoNuUYYw5dV4oGXzzCJGxNLRwBq4ku_LOv0PuL8uCFPjtBAUwlmPCY0jV33mKr8a5MMBi-zBB9HKYaTVWx5ms2XvBcZ2rVOnAbnymR0uuTdTMNuV42qLSubSh6G21LPwnlrIWoaGDyLAzu2_QJQ_0bTbUV6riE8G9kk_RJDEzubMDgIft1Hv0m8BgFYiUfW1pT7lpCxBuZN" />
                                    <img alt="Student" className="w-10 h-10 rounded-full border-2 border-white bg-gray-200" src="https://lh3.googleusercontent.com/aida-public/AB6AXuChggXqPFzMXfEjNw2ullQZkmP48nkLxPwS6OysaBrhmg33xZ75cWskQuNBEHcHqaJXVKzS420PpxS8C7IKFMEVyEkSwHys0WZ7xrALn-hfmpx-EWKXfxKl2d2D-ebscpvbzofG_TSvL_MYKD2TKVk17sXGYxGJRFqkYXcjoikzukPqTHanLuZIRvDtLyxoNYf1jsqA1Nrf2JlXL4-n91UXWT5RB7Icb4mspqSvbF4XnSAG-rDDRDNOehodKYw9Wp-VWv3hzr3dNeBl" />
                                </div>
                                <p className="text-sm">Join <span className="font-bold text-gray-900">5,000+</span> students trading today</p>
                            </div>
                        </div>
                        <div className="relative hidden lg:block">
                            <div className="absolute -top-10 -right-10 w-64 h-64 bg-orange-200/50 rounded-full blur-3xl"></div>
                            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-orange-100/50 rounded-full blur-3xl"></div>
                            <img alt="Campus Life" className="relative z-10 w-full h-[500px] object-cover rounded-3xl shadow-2xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSNDBHDu4NY5xBV_liw9Pn7myX6AUoHtWZD3LedQ5NSuDoklG-cPSzo6fvMMt9fjIYnE6DlrBRCpiyxz2Va9eptzsP5Uehfcxqct1ALXVsfohPJD2dLepLJhyDH9m1LUUfykuDrySGTALWJpGZfp0ZQ2VX1-ciNIaa028onDNBecII1hoS9-5ZqfwHsAiZVQR0Eb_Dine1VlLDsS5o7oS899-dQVztjNVqHTqJhBgTHJBbYYIYF8j9853PXx4JCwggr0q5DyBFWFCx" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 bg-white border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-10">Popular Categories</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {categories.map((cat) => (
                            <a key={cat.name} className="group flex flex-col items-center p-6 rounded-2xl bg-gray-50 hover:bg-orange-50 transition-all border border-gray-100 hover:border-orange-200" href="#">
                                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                                    <span className="material-icons text-orange-600 text-3xl">{cat.icon}</span>
                                </div>
                                <span className="font-semibold text-gray-700 group-hover:text-orange-700">{cat.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Recently Added Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Recently Added</h2>
                            <p className="text-gray-500 mt-2">Latest items from fellow students</p>
                        </div>
                        <a className="text-orange-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all" href="#">
                            View All <span className="material-icons">arrow_forward</span>
                        </a>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: 'Data Structures & Algorithms', price: '850', loc: 'Block 34', desc: 'Hardly used, 2nd Edition book for CSE students.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKr2LOgeJaczPbTuNYG02MmEnpTdi3OzcFwOSOflbvklxskRuDd1KLVxY4qkL2zW-H77qEISD7yPTwLYhcdd6IB2kLf4aNBAF6q78x9leShyqorIPNjwXcv19J4pdZlcwY4eJUcHzwtn9Qdl_RU3cYVuQexedJzYk-hXxd5RDCV5wgQtEzZlPNXJAMW_PDBfJk5vrNmTh1rsWBPYdQqX4tDW7n7RCM_X6_wjOl1Aj2O4AcQ7Hc2-RSQT8NNrK9nd4eaXlc3tklDblo' },
                            { title: 'Mountain Gear Cycle', price: '4,200', loc: 'Hostel 4', desc: '6-speed gear cycle in perfect condition.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhiUFvQeT64HWR3PseAxTQHykVOE9rQcBv_SBBoUXgRddVGj5b3ho56f2QKeibK9ccVQAcL_Tpfg-TZfsAtT9iJYA1ibuq1ssPrV8DiOIbDgqRintwoK1F3oBR_HYB33h0PLkBK0DkTz7egWsebuXT71tq32S8mU9Az09pcfRNxQiZ6Lcu00MD731V3Me71Uhi4IoxGxIuyEkVnIUnEFObTd8TWEjdZizhapBtilCmEeAIJnDPFnP4UXND9AmKeXpD_4CwU061EYc7' },
                            { title: 'Noise Smartwatch', price: '1,500', loc: 'Uni-Mall', desc: '6 months old, all features working perfectly.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCfavS0eBvMuWEcT24CyhQRuujTs4sT04_djguGLfBNkCXOGbeI4hDzvJ6KpRizjjIYopwOj-k7MSjlIoOfu9K8q0N7fqycSmbt7xHJYoI8HBRO9A5ObFmLJg5jmihx3_umq-N2jMchJM-ufFQZoZf9e715NhZAM4-zFApgb0P4_n91hMggBAMmRM94UDwWKVfFnKNYlZcN96n_HYGlhgZIG08iA9GgG9QIHtFteYbOZ_uldxf8WcGpDi8_5eLaO7eE97u1-tL4TyN' },
                            { title: 'LED Study Lamp', price: '350', loc: 'BH 1', desc: 'Adjustable brightness, perfect for night study.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxNnL4KYDmEA-mx4qEKz1DPENOsEnXuKLC6HrcnqlnDfin1-baWPSHfm1m9z8jfcaVc1Nq2fPTKIyo4fLTgxtoFjfq32XR_lOVpC7oQObpIVgbdsq6V47O_NHym8etEOm0ML_QdadDK4NGEP63n5iJAKtK1klq8JJUiYARbDNkpvg4ge9yPWcmGHST3GCtZTRykfT9xZip3NViDk8UnykaPuE0ChSUVMC43ak-6jOONwvkS11bB-kpAXydacSXpuSUL_P4HpeYv9is' }
                        ].map((item, idx) => (
                            <div key={idx} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all">
                                <div className="relative h-64 overflow-hidden">
                                    <img alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={item.img} />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-bold shadow-sm">₹{item.price}</span>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="material-icons text-orange-600 text-sm">location_on</span>
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">LPU Campus - {item.loc}</span>
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">{item.title}</h3>
                                    <p className="text-gray-500 text-sm mb-4">{item.desc}</p>
                                    <button className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-orange-600 hover:text-white transition-colors">Details</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Hub Section */}
            <section className="py-20 bg-orange-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-orange-100 flex flex-col lg:flex-row">
                        <div className="lg:w-1/2 p-12 flex flex-col justify-center text-black">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Easy Hand-overs</h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Say goodbye to shipping fees and long waits. Meet your buyers and sellers at popular campus spots like the Uni-Mall, Central Library, or outside your Hostels.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    { icon: 'verified', text: 'Verified LPU Student IDs' },
                                    { icon: 'handshake', text: 'Direct face-to-face deals' },
                                    { icon: 'security', text: 'Safe campus environments' }
                                ].map((step) => (
                                    <li key={step.text} className="flex items-center gap-3 text-gray-700">
                                        <span className="material-icons text-orange-600">{step.icon}</span>
                                        <span>{step.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="lg:w-1/2 min-h-[400px]">
                            <img alt="LPU Map" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBN9CpmDsKRozV88TYoan7KAmb4rVNwDizxHZc0gXTcMMazF4wBzRGkhx4ikIvgS8hPVCGuVdvofUVs0NVmMn6pIyMKJj-m33AmzZielrG2DHnpe-WscsuZyJzcuj6qAE5Bp2DZYfjrNC8-mRBtJK_c7ijLHsLkY3_4AOkuijiVVKiOoWo-yqTV_Npk3gXFaBf4GeFDW-78-ABPE_f4uel1bduRsE5_qwEiZfkk8hEj_PvgHg19xGy1h5_O4iJERIl-dwAsAh_J30Ue" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-1 md:col-span-1">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="text-xl font-bold tracking-tight text-gray-900">LPU<span className="text-orange-600">Deals</span></span>
                            </div>
                            <p className="text-gray-500 leading-relaxed">
                                Empowering LPU students to build a sustainable and affordable campus lifestyle through community commerce.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-6 uppercase text-sm tracking-widest">Quick Links</h4>
                            <ul className="space-y-4">
                                <li><a className="text-gray-600 hover:text-orange-600 transition-colors" href="#">About Us</a></li>
                                <li><a className="text-gray-600 hover:text-orange-600 transition-colors" href="#">How it Works</a></li>
                                <li><a className="text-gray-600 hover:text-orange-600 transition-colors" href="#">Popular Deals</a></li>
                                <li><a className="text-gray-600 hover:text-orange-600 transition-colors" href="#">Campus Map</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-6 uppercase text-sm tracking-widest">Support</h4>
                            <ul className="space-y-4">
                                <li><a className="text-gray-600 hover:text-orange-600 transition-colors" href="#">Safety Tips</a></li>
                                <li><a className="text-gray-600 hover:text-orange-600 transition-colors" href="#">FAQs</a></li>
                                <li><a className="text-gray-600 hover:text-orange-600 transition-colors" href="#">Contact Admin</a></li>
                                <li><a className="text-gray-600 hover:text-orange-600 transition-colors" href="#">Privacy Policy</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-6 uppercase text-sm tracking-widest">Newsletter</h4>
                            <p className="text-gray-500 mb-4 text-sm">Get notified about the latest steals!</p>
                            <div className="flex gap-2">
                                <input className="bg-gray-50 border-gray-200 rounded-lg flex-1 text-sm focus:ring-orange-500 focus:border-orange-500" placeholder="Email" type="email" />
                                <button className="bg-orange-600 text-white p-2 rounded-lg hover:bg-orange-700 transition-colors">
                                    <span className="material-icons">send</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm">© 2024 LpuDeals Community Project. Not affiliated with Lovely Professional University.</p>
                        <div className="flex gap-6">
                            <a className="text-gray-400 hover:text-orange-600 transition-colors" href="#"><i className="material-icons">facebook</i></a>
                            <a className="text-gray-400 hover:text-orange-600 transition-colors" href="#"><i className="material-icons">alternate_email</i></a>
                            <a className="text-gray-400 hover:text-orange-600 transition-colors" href="#"><i className="material-icons">camera_alt</i></a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default HomePage;