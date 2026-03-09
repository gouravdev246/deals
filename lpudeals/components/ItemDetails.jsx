'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const ItemDetails = ({ product }) => {
    const [activeImage, setActiveImage] = useState(product?.images?.[0] || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzSgyfi42_O43bTC5u6QjYNa8WKduByug8Ws8n-xHH1ENfqceQ9odt-6UvVpV5Kngowf1Ez-41ii8FOgNZwOP6xS8om7rDDc-CJfVN_OkyPzUIfeq6gLZGVnsaqOdA9UfjaWwHGVtC4BP706LLm52xpQ9U6jFm4265jzM0TIdFH6hG7d9W9ivr8rDa8h1itg3A5vJWgJ87wNGWSfaD0EqlvRsVFMcsoqRRNKiLVIc805IhGd6_yqIpvgvUBKqDL8MU56qHYvhh7flc');

    const thumbnails = [
        product?.images?.[0] || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzSgyfi42_O43bTC5u6QjYNa8WKduByug8Ws8n-xHH1ENfqceQ9odt-6UvVpV5Kngowf1Ez-41ii8FOgNZwOP6xS8om7rDDc-CJfVN_OkyPzUIfeq6gLZGVnsaqOdA9UfjaWwHGVtC4BP706LLm52xpQ9U6jFm4265jzM0TIdFH6hG7d9W9ivr8rDa8h1itg3A5vJWgJ87wNGWSfaD0EqlvRsVFMcsoqRRNKiLVIc805IhGd6_yqIpvgvUBKqDL8MU56qHYvhh7flc',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAcjVDbdHcap_oGvSTcloUAVKy8Q41-7arVkA6zJX5ha9WtXhsFdcuCBD0RFs07LA5KU29YppWk_2-q8g-qjdGbKM2h2adP9dlJCIxBHq4NvY5Zh1b_eQVz012dEYzirFmZyVhQCPRjM0Y8FqeBd1TmnuQN53vn5lqLTjutcsxRKP_lrBOrJtkDhZXsEPHvVj70EtGf6yUVRgxhQXJmDLDaXsYnKT-QFY0t3UVMryP5vp893P7yc7oxU--kwwBh-atjYFbwtcmGmCFz',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBtki6clvV0HZeN20e-lusrE9tbRqZwbZyBuWJUgyG-CQmoSibZEFN-KWdlT-933IMHxPoOD49QuQYnkbtMbOYdMrneyN6dWzpa2PxIyQAh3G30u9p9ivV_8ILke7QfNnu8n95cY4Zz5wNGVC7XfVijhdkF4t1grkV7fqsRIW7yLUKe76SElBh3Zv4K1IoFpPZi31JV7YV7bRh3bx5dbp4DD68UkdA7pUH53DDJ0vUBltqBTOMmxUBMfkYY7WlU6hM5XLF5ZyOt8-KV',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDY95ZPMMYGiBicibWls2uvwOSwXx2wP7WOpen4DLu-o8enDZ07P7eVPS3JEb0ce5iDbNoHCFwCQiq7C6tuEfSgRkHNVeXVyePVy5W2D_8Dxv2eHA-j5DtP8qdcPR_1QBKlMQ5zo1RZJPmCEyuzCaIhZiodGlWXxpO4qHsqaaNAiloLiH_bjCsTaDlD3ejwuVD-h1tfF5qqZGAL58h1ows8IwtSM5I9JO6OwQHfi1wlIZANUeTi11qeMvrxUZXOI6Jq-WaUovhLatV3'
    ];

    return (
        <div className="bg-[#f8f7f6] min-h-screen font-sans text-[#1b140d]">
            <main className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-20 py-8">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                    <Link href="/" className="hover:text-orange-600">Home</Link>
                    <span className="material-symbols-outlined text-xs!">chevron_right</span>
                    <Link href="/products" className="hover:text-orange-600">Marketplace</Link>
                    <span className="material-symbols-outlined text-xs!">chevron_right</span>
                    <span className="text-gray-900 font-medium truncate max-w-[200px] md:max-w-none">
                        {product?.title || 'MacBook Air M1'}
                    </span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left Side: Image Gallery */}
                    <div className="lg:col-span-7 space-y-4">
                        <div className="aspect-4/3 rounded-2xl overflow-hidden bg-white shadow-sm border border-orange-100 group relative">
                            <img
                                src={activeImage}
                                alt={product?.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <button className="absolute top-4 right-4 size-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-orange-600 shadow-lg hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined">favorite</span>
                            </button>
                        </div>

                        {/* Thumbnails */}
                        <div className="grid grid-cols-4 gap-4">
                            {thumbnails.map((img, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setActiveImage(img)}
                                    className={`aspect-square rounded-xl overflow-hidden cursor-pointer transition-all ${activeImage === img ? 'ring-2 ring-orange-600 ring-offset-2' : 'hover:opacity-80'}`}
                                >
                                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>

                        {/* Product Description Section */}
                        <div className="pt-8 space-y-6">
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                                <h3 className="text-xl font-bold mb-6 text-gray-900 border-b border-gray-100 pb-4">Description</h3>
                                <div className="text-gray-600 leading-relaxed space-y-4 text-sm md:text-base">
                                    <p>{product?.description || 'Selling my MacBook Air M1 (Space Grey). The device is in excellent condition with minimal signs of use. It has been used primarily for coding assignments and attending online classes.'}</p>
                                    <ul className="list-disc pl-5 space-y-3">
                                        <li>8GB RAM / 256GB SSD storage</li>
                                        <li>Battery health at 92% (Regularly maintained)</li>
                                        <li>Original charger and box available</li>
                                        <li>Screen protector applied since day one</li>
                                    </ul>
                                    <p className="font-medium text-orange-600">Perfect for B.Tech students or anyone looking for a powerful yet portable machine for campus life.</p>
                                </div>
                            </div>

                            {/* Safety Tip */}
                            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 flex gap-4 items-start">
                                <div className="bg-orange-600 text-white p-2 rounded-xl">
                                    <span className="material-symbols-outlined text-xl!">gpp_maybe</span>
                                </div>
                                <div>
                                    <p className="font-bold text-orange-900 mb-1">Safety Tip for Students</p>
                                    <p className="text-sm text-orange-800 leading-relaxed">
                                        Always meet in public campus locations like <b>Uni-Mall</b>, <b>Block 34</b>, or <b>Food Courts</b> during daylight hours. Verify the item thoroughly before making any payment.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Item Details & Seller Card */}
                    <div className="lg:col-span-5 relative">
                        <div className="sticky top-28 space-y-6">
                            {/* Main Header Info */}
                            <div className="bg-white p-8 rounded-2xl border border-orange-100 shadow-sm">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black rounded-lg uppercase tracking-wider">Like New</span>
                                    <span className="px-3 py-1 bg-orange-100 text-orange-600 text-[10px] font-black rounded-lg uppercase tracking-wider">Electronics</span>
                                </div>
                                <h1 className="text-2xl md:text-3xl font-black mb-3 text-gray-900 leading-tight">
                                    {product?.title || 'MacBook Air M1 - 2020 Model (Space Grey)'}
                                </h1>
                                <div className="flex items-baseline gap-2 mb-6">
                                    <span className="text-orange-600 text-4xl font-black">₹{product?.price || '55,000'}</span>
                                    <span className="text-gray-400 text-sm line-through">₹72,000</span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-gray-500 border-t border-gray-100 pt-6">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm! text-orange-600">schedule</span>
                                        <span>Posted 2 days ago</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm! text-orange-600">location_on</span>
                                        <span>Hostel BH-4</span>
                                    </div>
                                </div>
                            </div>

                            {/* Seller Card */}
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 -mr-12 -mt-12 rounded-full"></div>

                                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6 relative">Seller Information</h3>

                                <div className="flex items-center gap-4 mb-8 relative">
                                    <div className="size-16 rounded-2xl overflow-hidden border-2 border-orange-100 shadow-sm">
                                        <img
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtSUcau-1ccvgXkdqXjJxUtuRjd2i-Nq8cbxPkBLTcZCwzRF_bUifADTzqq8XnVNTD1doOE5vX-0KsvMCQxSPXL-hYmsxOMaGZ5m5FnFCY3cnq0_Hm7jydLlf-GJ2YfXneeil3eXCQlzzOSWe_DZX4W99H1mcbzzmVFaNgx5em9y8KxQYcYi1aqYIbVzSwoF_uQY8EdZlDn8wfXfR1URWxuOqt_ZN33E9WH_IiYiSbau7qun-VF-geq6NYAIVYU5bxvNTzS5LEdCLW"
                                            alt="Rahul Sharma"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900">Rahul Sharma</h4>
                                        <p className="text-xs text-gray-500 font-medium">B.Tech CSE, 3rd Year</p>
                                        <div className="flex items-center gap-1 mt-2">
                                            <div className="flex">
                                                {[1, 2, 3, 4, 5].map((s) => (
                                                    <span key={s} className="material-symbols-outlined text-[12px]! text-yellow-500 fill-1">star</span>
                                                ))}
                                            </div>
                                            <span className="text-xs font-black text-gray-900 ml-1">4.8</span>
                                            <span className="text-[10px] text-gray-400 font-bold ml-1">(12 Deals)</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-4 relative">
                                    <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-orange-500/20 active:scale-95">
                                        <span className="material-symbols-outlined text-xl!">chat_bubble</span>
                                        Chat on WhatsApp
                                    </button>
                                    <button className="w-full bg-white hover:bg-orange-50 text-orange-600 border-2 border-orange-50 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95">
                                        <span className="material-symbols-outlined text-xl! text-black">forum</span>
                                        In-App Message
                                    </button>
                                </div>

                                <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Verification</span>
                                        <span className="text-xs text-gray-900 font-bold flex items-center gap-1 mt-1">
                                            <span className="material-symbols-outlined text-sm! text-green-500">verified</span>
                                            Verified Student
                                        </span>
                                    </div>
                                    <button className="text-[10px] font-black text-red-400 hover:text-red-600 uppercase tracking-widest flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm! text-red-500">report</span>
                                        Report
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Similar Items Section */}
                <section className="mt-20">
                    <div className="flex items-center justify-between mb-10 border-b border-gray-100 pb-4">
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Similar Deals on Campus</h2>
                        <Link href="/products" className="text-orange-600 font-bold text-sm hover:underline flex items-center gap-1">
                            View all <span className="material-symbols-outlined text-sm!">arrow_forward</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { id: 1, title: 'Dell XPS 13 - Core i7', price: '42,000', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFZcprlmiY7yAWoM-INyw6fEfMNU6RcTRVXXmQZblCEBUmfyE497VoOh52vmFQjD8U5GBxgJB0MMXwt5jp9vMU87xFcWSBa3cH-dwGE_Ium11KA96BJCoVYrkQ8rwSV5_r0vYISQx3G81JKSQvjMXVkBhlrASyfdTsXKF_lIJUBrN58wbV89K5S2w5LRWKIbuRzYV3uVPgOrYPwRHzesdYM--g6nQE60uLIW9Ovq1q5y3CTWwX1UXIFaDGP4-pXWHpPgRGr9w50d-R' },
                            { id: 2, title: 'iPad Pro 11-inch + Pencil', price: '35,000', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfslFVggprkGV0nkQkwRVjr2ZZrJJPb0U_ODn52GyxSlL9QCjUHIRhS2UVfLrHwwEteghJJ7WiJHVWOgfIh2z0XSWBvtpHQTbehAjmcW9cLwZBTZv1UiWr0o1YruWMCq7TK3qRCH8YblKbQ0pOgx5P_2wzgvAo5BqldwTxr9xIP_roxw_YrQuO3YMXDjneWIGAoKPawODBzaPvkYncch-kQ-Q0s44Zr4ihlR9Ie55Xhz8OsKiHv8uwZPaC2D6-ikiaDrrbKuFqgFFP' },
                            { id: 3, title: 'Sony XM4 Headphones', price: '12,500', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDortCF22AcnS_GryM-AIRW0F_gpgrtUK5x8Tbzt3DwFIud4gNR-Fr5RnU6Xv-Lehe2nh-usCK5h-TtPuCRNSXUGBm4sZ_cwDGVAgVlWP1kEXEKg3_QpH9p_oGAv5sYkGtG2TMOYavirR15BR_lgpjam1I5CAJEPDFe3aMqt5caJprMtQz05-YSAI4lGTljrymj9gxyI6dv4rW0IeAXgHLPlkj2jDgGY0XpwLdJTJfc-OHRYTtZz08fkBIbuwLsdv6jxqtNa1laG50Q' },
                            { id: 4, title: 'iPhone 12 - 64GB', price: '28,000', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0E04DJ_ZDjD2-ONXn4-mfZs7O1cCfs5jAKWCkRD9SjeltJR2kKRiE1lV8mxNw6PmKIjacR0NEluE9onqK67Sbo8pzgjfKpCOyxIALayo4mM49c4uWKssdqEIbfQ9X4G-LY-Lx0PJ3I8aunJkA7nSr62sLCAvxBCI9p3ETLT0tI7J_1lgwqE2AaJDzkYWUqPTFNNhmgGi4t3MDBuhuLx-O7-RyCoWDqZg2dSceoxRY3RinD00OiKRJUyM1MP_JimFGuIJrCNf26G7A' }
                        ].map((item) => (
                            <div key={item.id} className="group cursor-pointer bg-white p-4 rounded-2xl border border-gray-50 hover:shadow-xl hover:border-orange-100 transition-all duration-300">
                                <div className="aspect-square rounded-xl overflow-hidden mb-4 relative">
                                    <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <span className="absolute top-2 right-2 bg-white/90 backdrop-blur text-orange-600 p-2 rounded-xl shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="material-symbols-outlined text-lg!">favorite</span>
                                    </span>
                                </div>
                                <h3 className="font-bold text-gray-900 text-sm truncate mb-1">{item.title}</h3>
                                <p className="text-orange-600 font-black text-lg">₹{item.price}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ItemDetails;
