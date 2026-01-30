
import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="min-h-screen bg-[#030712] text-white relative overflow-hidden font-sans selection:bg-blue-500/30">

            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
            </div>

            {/* Navbar */}
            <nav className="glass sticky top-0 z-50 px-6 py-4 flex justify-between items-center border-b border-white/5 h-20">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-blue-500/20">
                        AI
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Code<span className="text-blue-400">Gen</span>
                    </h1>
                </div>
                <div className="flex items-center gap-4">
                    <Link to="/login" className="text-slate-300 hover:text-white font-medium transition-colors">
                        Login
                    </Link>
                    <Link to="/SignUp" className="btn-primary flex items-center gap-2 group">
                        Get Started
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative z-10 container mx-auto px-6 py-20 lg:py-32 flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8 animate-fadeIn">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    Next Gen Online Compiler
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight max-w-4xl">
                    Code from <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 neon-border">Anywhere</span> in the World
                </h1>

                <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed">
                    Experience the future of coding with our AI-powered, cloud-based IDE.
                    Support for multiple languages, real-time collaboration, and instant deployment.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <Link to="/SignUp" className="btn-primary py-4 px-8 text-lg shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40">
                        Start Coding for Free
                    </Link>
                    <button className="px-8 py-4 rounded-xl glass border border-slate-700 text-slate-300 font-medium hover:bg-white/5 transition-colors">
                        View Documentation
                    </button>
                </div>

                {/* Code Preview Mockup */}
                <div className="mt-20 w-full max-w-5xl rounded-2xl glass border border-slate-700/50 p-2 shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
                    <div className="bg-[#0f172a] rounded-xl overflow-hidden min-h-[400px] flex flex-col items-start text-left">
                        <div className="w-full bg-slate-900/50 p-3 flex items-center gap-2 border-b border-slate-800">
                            <div className="flex gap-1.5 ml-1">
                                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                            </div>
                            <div className="ml-4 text-xs text-slate-500 font-mono">main.py</div>
                        </div>
                        <div className="p-6 font-mono text-sm text-slate-300 w-full">
                            <div className="flex">
                                <span className="text-slate-600 mr-4 select-none">1</span>
                                <div><span className="text-purple-400">def</span> <span className="text-blue-400">main</span>():</div>
                            </div>
                            <div className="flex">
                                <span className="text-slate-600 mr-4 select-none">2</span>
                                <div className="pl-4"><span className="text-slate-500"># Welcome to the future of coding</span></div>
                            </div>
                            <div className="flex">
                                <span className="text-slate-600 mr-4 select-none">3</span>
                                <div className="pl-4"><span className="text-blue-300">print</span>(<span className="text-green-400">"Hello, Future Developer!"</span>)</div>
                            </div>
                            <div className="flex">
                                <span className="text-slate-600 mr-4 select-none">4</span>
                                <div className="pl-4"></div>
                            </div>
                            <div className="flex">
                                <span className="text-slate-600 mr-4 select-none">5</span>
                                <div className="pl-4"><span className="text-slate-500"># Start building your dreams...</span></div>
                            </div>
                            <div className="flex animate-pulse">
                                <span className="text-slate-600 mr-4 select-none">6</span>
                                <div className="pl-4 border-l-2 border-blue-500 h-5"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Features Grid */}
            <section className="relative z-10 py-24 bg-slate-900/30">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose CodeGen?</h2>
                        <p className="text-slate-400 max-w-xl mx-auto">Powerful features designed to enhance your coding workflow and boost productivity.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>}
                            title="Multi-Language Support"
                            desc="Compile and run code in Python, JavaScript, Java, C++, Go, and more instantly."
                        />
                        <FeatureCard
                            icon={<svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>}
                            title="Cloud Projects"
                            desc="Save your work to the cloud and access it from any device, anywhere in the world."
                        />
                        <FeatureCard
                            icon={<svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>}
                            title="Lightning Fast"
                            desc="Powered by high-performance servers to ensure your code runs and compiles in milliseconds."
                        />
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative z-10 py-20">
                <div className="container mx-auto px-6 text-center">
                    <div className="glass max-w-4xl mx-auto rounded-3xl p-12 border border-blue-500/30 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>

                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Start Building?</h2>
                        <p className="text-slate-300 mb-8 max-w-lg mx-auto">Join thousands of developers using CodeGen to learn, practice, and build amazing projects.</p>
                        <Link to="/SignUp" className="btn-primary py-3 px-8 text-lg inline-block">
                            Create Your Account
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/5 py-10 bg-slate-900/50">
                <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-slate-500 text-sm">
                        © 2024 CodeGen AI. All rights reserved.
                    </div>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-slate-500 hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="text-slate-500 hover:text-white transition-colors">Terms</a>
                        <a href="#" className="text-slate-500 hover:text-white transition-colors">Twitter</a>
                    </div>
                </div>
            </footer>

        </div>
    );
};

// Simple reusable card component
const FeatureCard = ({ icon, title, desc }) => (
    <div className="glass p-8 rounded-2xl border border-slate-700/50 hover:border-slate-600/80 transition-all hover:-translate-y-1 group">
        <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-slate-400 leading-relaxed">{desc}</p>
    </div>
);

export default Landing;
