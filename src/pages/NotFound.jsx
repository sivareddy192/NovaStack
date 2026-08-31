import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Container from '../components/common/Container';
import SEO from '../components/common/SEO';

export const NotFound = () => {
  return (
    <>
      <SEO title="404 — Page Not Found" />
      <div className="min-h-[70vh] flex items-center justify-center py-20">
        <Container size="small" className="text-center">
          <div className="text-8xl sm:text-9xl font-black text-indigo-600 font-mono tracking-tighter">
            404
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-4">
            Page Not Found
          </h1>

          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            The page or digital product route you are looking for does not exist or has been moved.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Return Home</span>
            </Link>

            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 transition-all"
            >
              <span>Explore Projects</span>
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
};

export default NotFound;
