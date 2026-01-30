import React from 'react';
import { Link } from 'react-router-dom';

const NoPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-4 animate-pulse-slow">
        404
      </h1>

      <h2 className="text-3xl font-semibold mb-6 text-slate-200">
        System Malfunction
      </h2>

      <p className="text-slate-400 mb-8 max-w-md mx-auto">
        The coordinates you are trying to access do not exist in the known universe.
      </p>

      <Link to="/" className="btn-primary">
        Return to Base
      </Link>
    </div>
  )
}

export default NoPage;