"use client";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  // Ensure router is ready before rendering
  useEffect(() => {
    if (!router.isReady) return;
  }, [router]);

  const handleGoogleLogin = () => {
    console.log("Google SSO clicked");
    // Add Google SSO logic here
  };

  const handleMicrosoftLogin = () => {
    console.log("Microsoft SSO clicked");
    // Add Microsoft SSO logic here
  };
  const handleLogin = () => {
    router.push("/room");
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-r from-gray-700 via-slate-500 to-gray-300">
        {/* Login Box */}
        <div className="w-96 p-8 bg-white rounded-2xl shadow-2xl transform transition duration-500 hover:scale-105">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 mb-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 mb-6 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button className="w-full py-3 text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700"  onClick={handleLogin}>
            Login
          </button>
        </div>

        {/* SSO Boxes */}
        <div className="mt-6 flex flex-col space-y-4">
          <div
            className="w-96 py-3 text-center bg-gray-100 border border-gray-300 rounded-lg shadow-lg cursor-pointer hover:bg-gray-200 transform transition duration-500 hover:scale-105"
            onClick={handleGoogleLogin}
          >
            Login with Google
          </div>
          <div
            className="w-96 py-3 text-center bg-gray-100 border border-gray-300 rounded-lg shadow-lg cursor-pointer hover:bg-gray-200 transform transition duration-500 hover:scale-105"
            onClick={handleMicrosoftLogin}
          >
            Login with Microsoft
          </div>
        </div>
      </div>
    </>
  );
}
