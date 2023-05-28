import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import routes from '../routes';
import { useSelector } from 'react-redux';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const userthemesetting = useSelector((state) => state.userSettings.theme === 'dark');
  const usersettings = useSelector((state) => state.userSettings);


  const renderNavLinks = useMemo(() => {
    return (
      <div className="flex justify-center duration-500 ease-in-out">
        {routes.map((route, index) => {
          if (route.path === '*') {
            return null; // exclude the 404 route from rendering
          }

          if (route.admin && !usersettings.isAdmin) {
            return null; // exclude admin route if user is not admin
          }

          return (
            <Link
              key={route.path}
              to={route.path}
              className={`${
                index === 0 ? 'ml-4' : 'ml-2'
              } px-3 py-2 rounded-md text-lg font-medium ${
                location.pathname === route.path
                  ? userthemesetting
                    ? 'bg-gray-700 text-gray-200'
                    : 'bg-gray-100 text-gray-900'
                  : userthemesetting
                    ? 'text-gray-300 hover:text-gray-200'
                    : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              {route.name}
            </Link>
          );
        })}
      </div>
    );
  }, [location.pathname, userthemesetting, usersettings]);
  
  const renderMobileNavLinks = useMemo(() => {
    return (
      <div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1">
          <div className="flex flex-col justify-center">
            {routes.map((route) => {
              if (route.path === '*') {
                return null; // exclude the 404 route from rendering
              }
              if (route.admin && !usersettings.isAdmin) {
                return null; // exclude admin route if user is not admin
              }    
              return (
                <Link
                  key={route.path}
                  to={route.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === route.path
                      ? userthemesetting
                        ? 'bg-gray-700 text-gray-200'
                        : 'bg-gray-100 text-gray-900'
                      : userthemesetting
                        ? 'text-gray-300 hover:text-gray-200 hover:bg-gray-700'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {route.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }, [isMenuOpen, location.pathname, userthemesetting, usersettings]);

  return (
    <nav className={`bg-${userthemesetting ? 'gray-800' : 'white'} ${userthemesetting ? 'text-white' : 'text-gray-900'} shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center h-16">
          <div className="flex items-center mr-2">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                className="h-15 w-15"
                src="/images/navbarlogo.svg"
                alt="Navbar logo"
              />
            </Link>
          </div>
          <div className="hidden sm:flex sm:items-center">
            {renderNavLinks}
          </div>
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                userthemesetting
                  ? 'text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-400'
                  : 'text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
              }`}
            >
              <span className="sr-only">Open main menu</span>
              <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      {renderMobileNavLinks}
    </nav>
  );
}

export default Navbar;