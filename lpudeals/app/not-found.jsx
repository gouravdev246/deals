'use client'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-white px-6">
            <div className="text-center">
                <h1 className="text-9xl font-extrabold text-orange-600 tracking-tighter mb-4 animate-bounce">
                    404
                </h1>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Oops! Page Not Found
                </h2>
                <p className="text-xl text-gray-600 mb-10 max-w-md mx-auto leading-relaxed">
                    The page you're looking for doesn't exist or has been moved. 
                    <br />
                    <span className="font-semibold text-gray-800">Thanks for visiting!</span>
                </p>

                <div className="bg-orange-50 p-8 rounded-3xl border border-orange-100 mb-10 transform transition-all hover:scale-105">
                    <p className="text-gray-700 font-medium mb-6">Follow the creators on LinkedIn:</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a 
                            href="https://www.linkedin.com/in/gouravdev/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 bg-white text-orange-600 border-2 border-orange-100 px-6 py-3 rounded-xl font-bold hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all shadow-sm"
                        >
                            <span className="material-icons">person</span> Gourav Sarkar
                        </a>
                        <a 
                            href="https://www.linkedin.com/in/shashank-shekhar-ojha48/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 bg-white text-orange-600 border-2 border-orange-100 px-6 py-3 rounded-xl font-bold hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all shadow-sm"
                        >
                            <span className="material-icons">person</span> Shashank Shekhar
                        </a>
                    </div>
                </div>

                <Link 
                    href="/" 
                    className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all shadow-xl shadow-gray-200"
                >
                    <span className="material-icons">home</span> Back to Home
                </Link>
            </div>
        </div>
    )
}
