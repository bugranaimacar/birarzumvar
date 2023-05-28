import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../Components/Navbar';
import { setAdmin } from '../userSettingsSlice';
import { getToken } from '../userSettingsSlice';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const isDarkMode = useSelector((state) => state.userSettings.theme === 'dark');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    dispatch(getToken({ username, password }))
      .unwrap()
      .then(() => {
        setLoading(false);
        setSuccess(true);
        dispatch(setAdmin(true));
        setTimeout(() => {
          navigate('/admin/messages'); // Navigate to /admin/messages after 3 seconds
        }, 3000);
      })
      .catch((error) => {
        setLoading(false);
        setError(error || 'An error occurred while logging in.');
      });
  };

  const themeClasses = isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800';
  const containerClasses = `max-w-7xl mx-auto my-8 px-4 py-8 lg:px-16 xl:px-32 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg`;
  const formClasses = `bg-white rounded-lg shadow-xl border-solid border-2 border-gray-100 px-8 pt-6 pb-8 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`;

  return (
    <div className={`min-h-screen ${themeClasses} transition-colors duration-500 ease-in-out`}>
      <NavBar />
      <div className={containerClasses}>
        <h1 className={`text-3xl md:text-6xl font-bold mb-8 leading-tight text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Yetkili Girişi</h1>
        <div className="w-full md:w-2/3 lg:w-1/2 mx-auto">
          <form onSubmit={handleSubmit} className={formClasses}>
            <div className="mb-4">
              <label htmlFor="username" className="block font-bold mb-2">
                Kullanıcı Adı
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className={`w-full p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 border-gray-500 text-gray-300' : 'bg-gray-200 border-gray-500 text-gray-800'} transition-colors duration-500 ease-in-out`}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block font-bold mb-2">
                Şifre
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={`w-full p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 border-gray-500 text-gray-300' : 'bg-gray-200 border-gray-500 text-gray-800'} transition-colors duration-500 ease-in-out`}
              />
            </div>
            <button type="submit" className={`hover:text-white font-bold py-2 px-4 rounded-full w-full shadow-lg transition-colors duration-500 ease-in-out ${isDarkMode ? 'bg-blue-500 text-white hover:bg-blue-700' : 'bg-yellow-500 text-gray-800 hover:bg-yellow-600'}`}>              {loading ? (
                <i className="fa fa-spinner fa-spin" />
              ) : (
                'Giriş Yap'
              )}
            </button>
            {success && (
              <div className={`mt-4 p-4 text-lg font-medium border rounded-lg ${isDarkMode ? 'bg-green-700 border-green-500 text-gray-300' : 'bg-green-100 border-green-200 text-gray-800'} transition-colors duration-500 ease-in-out`}>
                Başarıyla giriş yaptınız.
              </div>
            )}
            {error && (
              <div className={`mt-4 p-4 text-lg font-medium border rounded-lg ${isDarkMode ? 'bg-red-700 border-red-500 text-gray-300' : 'bg-red-100 border-red-200 text-red-800'} transition-colors duration-500 ease-in-out`}>
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;