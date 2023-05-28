import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import NavBar from '../Components/Navbar';
import { faSpinner} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { API_BASE_URL } from '../settings';


const Home = () => {
  
  const isDarkMode = useSelector((state) => state.userSettings.theme === 'dark');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch messages from API
  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/messages/getrandom`);
      setMessages(response.data.messages);
    } catch (error) {
      setError('Mesajlar yüklenirken bir sorun oluştu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);


  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-500 ease-in-out`}>
      <NavBar />
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-32 pt-16">
        <h1 className={`text-3xl md:text-6xl font-bold mb-8 leading-tight text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Türkiye'nin Geleceği İçin<br />
          Siz de Fikirlerinizi Söyleyin.
        </h1>
        <p className={`text-lg md:text-2xl mb-8 text-center flex flex-col items-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Yeni Türkiye'nin geleceğini saglam temellerle kurmak için İYİ Parti olarak sizlerin fikirlerine ihtiyacımız var. Siz de fikirlerinizi bizimle paylaşabilirsiniz.
        </p>
        <div className="w-full justify-center items-center">
        <h2 className={`text-3xl md:text-4xl font-bold mb-8 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Sizlerden Gelenler</h2>

          <div className="px-2 flex flex-row flex-wrap justify-center">

          {loading ? (
            <div className="flex justify-center items-center my-4">
              <FontAwesomeIcon icon={faSpinner} size="4x" spin className="text-gray-900" />
              <span className="ml-4 text-lg">Yükleniyor...</span>
            </div>
          ) : error ? (
            <p className={`text-lg md:text-2xl mb-8 text-center flex flex-col items-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {error}
              <button onClick={() => fetchMessages(1)} type="button" className={`bg-yellow-400 hover:bg-yellow-500 focus:bg-yellow-500 focus:outline-none text-gray mt-4 font-medium rounded-full text-sm px-5 py-2.5 transition-colors duration-300 ease-in-out ${isDarkMode ? 'bg-blue-400 hover:bg-blue-500 focus:bg-blue-500' : ''}`}>Tekrar Dene</button>
            </p>
          ) : messages.length > 0 ? (
            <div className="px-2 flex flex-row flex-wrap justify-center">
              <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {messages.map((message) => (
                  <div key={message._id} className={`rounded-lg shadow-md overflow-hidden ${isDarkMode ? 'bg-gray-800 border border-gray-800' : 'bg-white border border-gray-200'}`}>
                    <div className="p-4">
                      <h5 className={`text-xl md:text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{message.name || message.surname ? `${message.name} ${message.surname}` : '-'}</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className={`text-sm mb-1 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>İsim</p>
                          <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{message.name || '-'}</p>
                        </div>
                        <div>
                          <p className={`text-sm mb-1 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Soyisim</p>
                          <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{message.surname || '-'}</p>
                        </div>
                        <div>
                          <p className={`text-sm mb-1 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>E-Posta</p>
                          <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{message.email || '-'}</p>
                        </div>
                        <div>
                          <p className={`text-sm mb-1 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Yas</p>
                          <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{message.age || '-'}</p>
                        </div>
                        <div className='col-span-4'>
                          <p className={`text-sm mb-1 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Mesaj</p>
                          <textarea className=" rounded-lg resize-none h-18  border border-gray-100 py-2 px-3 block w-full leading-5 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">{message.details}</textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className={`text-lg md:text-2xl mb-8 text-center flex flex-col items-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Henüz mesaj yok.
            </p>
          )}

           

           
           
            
          </div>


        </div>
      </div>
      <div className={`py-16 px-4 sm:px-8 md:px-16 lg:px-32 text-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-500 ease-in-out`}>
        <h2 className={`text-3xl md:text-4xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Bizimle İletişime Geçin</h2>
        <p className={`text-lg md:text-xl mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Sizden gelen her türlü görüş ve öneri bizim için önemlidir. Bizimle iletişime geçerek İYİ Parti'ye katkı sağlayabilirsiniz.
        </p>
        <button type="button" className={`bg-yellow-400 hover:bg-yellow-500 focus:bg-yellow-500 focus:outline-none text-white font-medium rounded-lg text-sm px-5 py-2.5 transition-colors duration-300 ease-in-out ${isDarkMode ? 'dark:bg-yellow-300 dark:hover:bg-yellow-400 dark:focus:bg-yellow-400' : ''}`}>Yellow Button</button>
      </div>
    </div>
  );
};

export default Home;