import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { useSelector } from 'react-redux';

function NotFound() {
    const isDarkMode = useSelector((state) => state.userSettings.theme === 'dark');

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className={`text-center ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          <h1 className="text-4xl font-bold">404 | Not found</h1>
          <p className="mt-4 text-lg font-medium">
            Üzgünüm, aradığınız sayfa mevcut değil!
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              to="/"
              className={`px-4 py-2 border border-transparent text-base font-medium rounded-md ${
                isDarkMode ? 'text-gray-900 bg-gray-100 hover:bg-gray-200' : 'text-white bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;