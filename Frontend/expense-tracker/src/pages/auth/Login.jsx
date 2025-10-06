import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axoisInstance";
import { API_PATH } from "../../utils/apiPath";
import { userContext } from "../../context/userContext";
import { Wallet, ArrowLeft } from "lucide-react";
import DarkVeil from "../../components/DarkVeil";

const Login = () => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [error, seterror] = useState(null);
    const { updateUser } = useContext(userContext);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            seterror("Please enter a valid email address");
            return;
        }
        if (!password) {
            seterror("Please enter a valid password")
            return;
        }
        seterror("");

        try {
            const response = await axiosInstance.post(API_PATH.AUTH.LOGIN, {
                email,
                password,
            });
            const { token, user } = response.data;
            if (token) {
                localStorage.setItem("token", token);
                updateUser(user);
                navigate("/dashboard");
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                seterror(error.response.data.message);
            } else {
                seterror("Something went wrong . Please Try again");
            }
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#060010] relative" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            <DarkVeil />
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm">
                <div className="w-full flex justify-between items-center px-6 md:px-12 py-4">
                    <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-purple-600 via-purple-500 to-purple-700 flex items-center justify-center">
                            <Wallet className="h-4 w-4 text-white" strokeWidth={2.5} />
                        </div>
                        <span className="text-lg font-semibold tracking-tight text-white">
                            ExpenseTracker
                        </span>
                    </div>
                    <Link 
                        to="/" 
                        className="flex items-center gap-2 text-gray-300 hover:text-white transition font-medium"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        <span>Home</span>
                    </Link>
                </div>
            </nav>

            {/* Main Content */}
            <div className="min-h-screen w-full flex items-center justify-center p-6 pt-24 relative">
            <div className="w-full max-w-md mx-auto">
                {/* Form Card */}
                <div className="w-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <h1 className="text-4xl font-bold text-white mb-3">
                            Welcome Back 👋
                        </h1>
                        <p className="text-gray-300">
                            Sign in to start managing your expenses.
                        </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-2">
                                Email
                            </label>
                            <input
                                value={email}
                                onChange={e => setemail(e.target.value)}
                                type="email"
                                placeholder="Example@email.com"
                                autoComplete="off"
                                className="w-full px-4 py-3 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition bg-white/5 text-white placeholder-gray-400"
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-2">
                                Password
                            </label>
                            <input
                                value={password}
                                onChange={e => setpassword(e.target.value)}
                                type="password"
                                placeholder="At least 8 characters"
                                autoComplete="off"
                                className="w-full px-4 py-3 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition bg-white/5 text-white placeholder-gray-400"
                            />
                            <div className="text-right mt-2">
                                <Link to="/forgot-password" className="text-sm text-purple-400 hover:text-purple-300">
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-500 text-white py-3.5 rounded-lg font-semibold text-base transition-all duration-200"
                        >
                            Sign in
                        </button>

                        {/* Sign Up Link */}
                        <p className="text-center text-gray-300 text-sm mt-6">
                            Don't you have an account?{" "}
                            <Link
                                to="/signup"
                                className="font-semibold text-purple-400 hover:text-purple-300 transition"
                            >
                                Sign up
                            </Link>
                        </p>
                    </form>


                </div>
            </div>
            </div>
        </div>
    );
}

export default Login