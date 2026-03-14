'use client';
import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../app/context/AppContext';
import parse from 'html-react-parser';
import { Markup } from 'interweave';
import Link from 'next/link';
import axios from 'axios';


function HomePage() {
    const { categories, products, homepageProducts } = useContext(AppContext);
    const [count , setCount] = useState('') ;

    useEffect(() => {
        const userCount = async () => {
            try {
                const res = await axios.get('/api/user/count');
                setCount(res.data.count);
            } catch (err) {
                console.error("Failed to fetch user count:", err);
            }
        };
        userCount();
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
                                    <Link href="/products" >Browse Products</Link>

                                    
                                </button>
                                <button className="bg-white border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors">
                                   <Link href="/addproduct" >Sell Now</Link> 
                                </button>
                            </div>
                            <div className="mt-8 flex items-center gap-4 justify-center lg:justify-start text-gray-500">
                                <div className="flex -space-x-2">
                                    <img alt="Student" className="w-10 h-10 rounded-full border-2 border-white bg-gray-200" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYRrkGIalOl2z-Dp3o9dxqC_F3u-ToIT4qZLT3nzuuuu76OcM_pAvVxxdw3nDqaaqz3HwN0x8cCTOpewupZJcrmkOLHJQYYXPaT6DOWaP7c77Jn6Tcn_WIOD0RX7oz4EnnQl1fa2C2JhqXUvVARFVEAormAb7sCop2mn8mdI8nyqSE6PamcSaSdUrLWucUG4mF1jWBcQnFp64nzVXmIar_sPBu0QWl0q7lbg-bdEJKwQSXbNnq4TmThAygUdIuMqex8A5oeUarr5aJ" />
                                    <img alt="Student" className="w-10 h-10 rounded-full border-2 border-white bg-gray-200" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5oLQi6O41rSLBA4WJqNMgdYC-EfdQzwT4ed1gVjdWu7-hdOvzre1k__ARRPMBCQXqhUoNuUYYw5dV4oGXzzCJGxNLRwBq4ku_LOv0PuL8uCFPjtBAUwlmPCY0jV33mKr8a5MMBi-zBB9HKYaTVWx5ms2XvBcZ2rVOnAbnymR0uuTdTMNuV42qLSubSh6G21LPwnlrIWoaGDyLAzu2_QJQ_0bTbUV6riE8G9kk_RJDEzubMDgIft1Hv0m8BgFYiUfW1pT7lpCxBuZN" />
                                    <img alt="Student" className="w-10 h-10 rounded-full border-2 border-white bg-gray-200" src="https://lh3.googleusercontent.com/aida-public/AB6AXuChggXqPFzMXfEjNw2ullQZkmP48nkLxPwS6OysaBrhmg33xZ75cWskQuNBEHcHqaJXVKzS420PpxS8C7IKFMEVyEkSwHys0WZ7xrALn-hfmpx-EWKXfxKl2d2D-ebscpvbzofG_TSvL_MYKD2TKVk17sXGYxGJRFqkYXcjoikzukPqTHanLuZIRvDtLyxoNYf1jsqA1Nrf2JlXL4-n91UXWT5RB7Icb4mspqSvbF4XnSAG-rDDRDNOehodKYw9Wp-VWv3hzr3dNeBl" />
                                </div>
                                <p className="text-sm">Join <span className="font-bold text-gray-900">{count}</span> students trading today</p>
                            </div>
                        </div>
                        <div className="relative hidden lg:block">
                            <div className="absolute -top-10 -right-10 w-64 h-64 bg-orange-200/50 rounded-full blur-3xl"></div>
                            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-orange-100/50 rounded-full blur-3xl"></div>
                            <img alt="Campus Life" className="relative z-10 w-full h-[500px] object-cover rounded-3xl shadow-2xl" src="homePagepic.png" />
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
                                    {cat.icon && cat.icon.includes('<svg') ? (
                                        <div className="text-orange-600 w-10 h-10 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full transition-all">
                                            {parse(cat.icon)}
                                        </div>
                                    ) : (
                                        <span className="material-icons text-orange-600 text-3xl">{cat.icon}</span>
                                    )}
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
                        {products.slice(0, 4).map((item) => (
                            <div key={item._id} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all">
                                <div className="relative h-64 overflow-hidden">
                                    <img alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={item?.image?.[0]} />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-bold shadow-sm">₹{item.price}</span>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="material-icons text-orange-600 text-sm">location_on</span>
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">LPU Campus - {item.loc}</span>
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">{item.name}</h3>
                                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                                        {item.description.length > 100 ? item.description.substring(0, 100) + "..." : item.description}
                                    </p>
                                    <button className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-orange-600 hover:text-white transition-colors"><Link href="/products">Details</Link></button>
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
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24443.697286873434!2d75.6667685508728!3d31.255386023262897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a5f5e9c489cf3%3A0x4049a5409d53c300!2sLovely%20Professional%20University!5e1!3m2!1sen!2sin!4v1773408285087!5m2!1sen!2sin" width="600" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>                        </div>
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
                                <li><a className="text-gray-600 hover:text-orange-600 transition-colors" href="/seftytips">Safety Tips</a></li>
                                <li><a className="text-gray-600 hover:text-orange-600 transition-colors" href="#">FAQs</a></li>
                                <li><a className="text-gray-600 hover:text-orange-600 transition-colors" href="/contact-admin">Contact Admin</a></li>
                                <li><a className="text-gray-600 hover:text-orange-600 transition-colors" href="/privecy-policy">Privacy Policy</a></li>
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
                        <p className="text-gray-400 text-sm">© 2026 LpuDeals Community Project. Not affiliated with Lovely Professional University.</p>
                        <div className="flex gap-6">
                            {/* LinkedIn */}
                            <a className="text-gray-400 hover:text-orange-600 transition-colors" href="https://www.linkedin.com/in/gouravdev/">
                                <i className="material-icons">business</i>
                            </a>

                            {/* GitHub */}
                            <a className="text-gray-400 hover:text-orange-600 transition-colors" href="https://www.linkedin.com/in/shashank-shekhar-ojha48/">
                                <i className="material-icons">code</i>
                            </a>

                            {/* Instagram */}
                            <a className="text-gray-400 hover:text-orange-600 transition-colors" href="https://github.com/gouravdev246/deals.git">
                                <i className="material-icons">camera_alt</i>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default HomePage;