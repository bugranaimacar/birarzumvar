import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import NavBar from '../Components/Navbar';
import { API_BASE_URL } from '../settings';

const SendMessage = () => {
  const isDarkMode = useSelector((state) => state.userSettings.theme === 'dark');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [details, setDetails] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);
    if (!acceptTerms) {
      setError('Lütfen şartlar ve koşulları kabul edin.');
      return;
    }
    try {
      await axios.post(`${API_BASE_URL}/messages`, { name, surname, age, email, details, acceptTerms });
      setSuccess(true);
      setName('');
      setSurname('');
      setAge('');
      setEmail('');
      setDetails('');
      setAcceptTerms(true);
    } catch (error) {
      setError('Mesajınız teknik bir hatadan dolayı gönderilemedi.');
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} transition-colors duration-500 ease-in-out`}>
      <NavBar />
      <div className={`container my-8 mx-auto px-4 p-8 lg:px-16 xl:px-32 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg`}>
        <h1 className={`text-3xl md:text-6xl font-bold mb-8 leading-tight text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Mesaj Gönder</h1>
        <div className="w-full md:w-2/3 lg:w-1/2 mx-auto">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl border-solid border-2 border-gray-100 px-8 pt-6 pb-8 mb-4">
  <p className={`text-center mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Mesajınızı anonim olarak da gönderebilirsiniz.</p>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-800 font-bold mb-2">
                İsim
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className={`w-full p-3 rounded-lg ${isDarkMode ? 'bg-gray-800 border-gray-500 text-white' : 'bg-gray-200 border-gray-500 text-gray-800'} transition-colors duration-500 ease-in-out`}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="surname" className="block text-gray-800 font-bold mb-2">
                Soyisim
              </label>
              <input
                type="text"
                id="surname"
                name="surname"
                value={surname}
                onChange={(event) => setSurname(event.target.value)}
                className={`w-full p-3 rounded-lg ${isDarkMode ? 'bg-gray-800 border-gray-500 text-white' : 'bg-gray-200 border-gray-500 text-gray-800'} transition-colors duration-500 ease-in-out`}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="age" className="block text-gray-800 font-bold mb-2">
                Yaş
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={age}
                onChange={(event) => setAge(event.target.value)}
                className={`w-full p-3 rounded-lg ${isDarkMode ? 'bg-gray-800 border-gray-500 text-white' : 'bg-gray-200 border-gray-500 text-gray-800'} transition-colors duration-500 ease-in-out`}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-800 font-bold mb-2">
                E-posta Adresi
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={`w-full p-3 rounded-lg ${isDarkMode ? 'bg-gray-800 border-gray-500 text-white' : 'bg-gray-200 border-gray-500 text-gray-800'} transition-colors duration-500 ease-in-out`}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="details" className="block text-gray-800 font-bold mb-2">
                Mesajınız
              </label>
              <textarea
                id="details"
                name="details"
                value={details}
                onChange={(event) => setDetails(event.target.value)}
                className={`w-full p-3 rounded-lg ${isDarkMode ? 'bg-gray-800 border-gray-500 text-white' : 'bg-gray-200 border-gray-500 text-gray-800'} transition-colors duration-500 ease-in-out`}
              />
            </div>
            <div className="mb-4 flex flex-row">
              <input
                type="checkbox"
                id="acceptTerms"
                name="acceptTerms"
                onChange={(event) => setAcceptTerms(event.target.checked)}
                required
                className="mr-2 leading-tight"
                />
              <label htmlFor="acceptTerms" className={`block ${isDarkMode ? 'text-gray-400' : 'text-gray-700'} font-bold`}>
                <span className={`text-${isDarkMode ? 'gray-400' : 'yellow-500'} hover:underline`}>Şartlar ve Koşullar</span>'ı kabul ediyorum.
              </label>
            </div>
            <button type="submit" className={`bg-${isDarkMode ? 'blue' : 'yellow'}-500 hover:bg-${isDarkMode ? 'blue' : 'yellow'}-700 text-${isDarkMode ? 'white' : 'black'} font-bold py-2 px-4 rounded-full w-full shadow-lg transition-colors duration-500 ease-in-out`}>
              Gönder
            </button>
          </form>
          {success && (
            <div className={`mt-4 p-4 text-lg font-medium border rounded-lg ${isDarkMode ? 'bg-green-800 border-green-700 text-white' : 'bg-green-100 border-green-200 text-gray-800'} transition-colors duration-500 ease-in-out`}>
              Mesajınız başarıyla gönderildi. En kısa sürede size geri döneceğiz.
            </div>
          )}
          {error && (
            <div className={`mt-4 p-4 text-lg font-medium border rounded-lg ${isDarkMode ? 'bg-red-800 border-red-700 text-white' : 'bg-red-100 border-red-200 text-gray-800'} transition-colors duration-500 ease-in-out`}>
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SendMessage;