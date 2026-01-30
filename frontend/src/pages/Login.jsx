import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/signIn", {
                email,
                password,
            });

            if (response.data.success) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                navigate("/editor");
                // Force reload or event dispatch could happen here, but navigate is usually enough if Home checks localStorage
                // To be safe for the header update:
                window.location.href = "/editor";
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>

            <div className="glass p-8 rounded-2xl w-full max-w-md relative z-10 border border-slate-700/50">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold mb-2 tracking-tight">
                        Welcome <span className="text-gradient">Back</span>
                    </h2>
                    <p className="text-slate-400">Enter your credentials to access the grid.</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="flex flex-col gap-5">
                    <div className="group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="input-futuristic"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="group">
                        <input
                            type="password"
                            placeholder="Password"
                            className="input-futuristic"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn-primary mt-4 w-full h-12 text-lg"
                    >
                        Initiate Session
                    </button>
                </form>

                <div className="mt-6 text-center text-slate-400 text-sm">
                    Don't have an identity?{" "}
                    <Link to="/SignUp" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                        Create One
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
