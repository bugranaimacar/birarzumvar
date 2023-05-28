import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import NavBar from '../Components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { API_BASE_URL } from '../settings';


const Messages = () => {
  const isDarkMode = useSelector((state) => state.userSettings.theme === 'dark');
  const [currentPage, setCurrentPage] = useState(1);
  const [messagesPerPage] = useState(9);
 const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [age, setAge] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pagination, setPagination] = useState(null);

  const token = useSelector((state) => state.userSettings.token.value);

  const handleSearch = useCallback(async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const params = {
        page: 1,
        limit: messagesPerPage,
        age,
        name,
        email,
      };
      const { data } = await axios.get(`${API_BASE_URL}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      });
      setMessages(data.messages);
      setPagination(data.pagination);
    } catch (error) {
      setError('An error occurred while searching for messages');
    } finally {
      setLoading(false);
    }
  }, [age, email, messagesPerPage, name, token])


  const fetchMessages = useCallback(async (pageNumber) => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page: pageNumber,
        limit: messagesPerPage,
      };
      const { data } = await axios.get(`${API_BASE_URL}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      });
      setMessages(data.messages);
      setPagination(data.pagination);
    } catch (error) {
      setError('An error occurred while loading messages');
    } finally {
      setLoading(false);
    }
  }, [messagesPerPage, token]);

  

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchMessages(currentPage);
  }, [currentPage, fetchMessages]);

  const renderPagination = () => {
    if (!pagination) {
      return null;
    }

    const totalPages = pagination.totalPages;
    const currentPageNumber = pagination.currentPage;
    const isFirstPage = currentPageNumber === 1;
    const isLastPage = currentPageNumber === totalPages;
    const pageNumbers = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPageNumber <= 4) {
        pageNumbers.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPageNumber > 4 && currentPageNumber < totalPages - 3) {
        pageNumbers.push(1, '...', currentPageNumber - 1, currentPageNumber, currentPageNumber + 1, '...', totalPages);
      } else {
        pageNumbers.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      }
    }


  return (
    <nav className="flex items-center justify-center my-4">
      <button
        className={`border rounded-full py-2 px-4 mr-2 ${isDarkMode ? 'border-gray-400 text-gray-300' : 'border-gray-700 text-gray-800'} ${isFirstPage ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => paginate(currentPageNumber - 1)}
        disabled={isFirstPage}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      {pageNumbers.map((pageNumber, index) => (
        <button
          key={index}
          className={`border rounded-full py-2 px-4 mx-1 ${isDarkMode ? 'border-gray-400 text-gray-300' : 'border-gray-700 text-gray-800'} ${pageNumber === currentPageNumber ? `${isDarkMode ? 'bg-blue-400 text-white font-bold' : 'bg-yellow-400 text-white font-bold'}` : ''} ${pageNumber === '...' ? 'cursor-not-allowed opacity-50' : ''}`}
          onClick={() => pageNumber !== '...' && paginate(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      <button
        className={`border rounded-full py-2 px-4 ml-2 ${isDarkMode ? 'border-gray-400 text-gray-300' : 'border-gray-700 text-gray-800'} ${isLastPage ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => paginate(currentPageNumber + 1)}
        disabled={isLastPage}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </nav>
  );
};


  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-500 ease-in-out`}>
      <NavBar />
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-32 pt-16">
        <h1 className={`text-3xl md:text-6xl font-bold mb-4 leading-tight text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
         Gelen Mesajlar
        </h1>
        <div className='flex justify-center m-8'>
  <form className="flex flex-col items-center border border-gray-300 rounded-lg p-6 max-w-md my-4">
    <div className="mb-4">
      <input
        type="text"
        placeholder="İsim"
        value={name}
        onChange={(event) => setName(event.target.value)}
        className={` p-3 w-72 rounded-lg ${isDarkMode ? 'bg-gray-700 border-gray-500 text-gray-300' : 'bg-gray-200 border-gray-500 text-gray-800'} transition-colors duration-500 ease-in-out`}
      />
    </div>
    <div className="mb-4">
      <input
        type="number"
        placeholder="Yaş"
        value={age}
        onChange={(event) => setAge(event.target.value)}
        className={` p-3 w-72 rounded-lg ${isDarkMode ? 'bg-gray-700 border-gray-500 text-gray-300' : 'bg-gray-200 border-gray-500 text-gray-800'} transition-colors duration-500 ease-in-out`}
      />
    </div>
    <div className="mb-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className={` p-3 w-72 rounded-lg ${isDarkMode ? 'bg-gray-700 border-gray-500 text-gray-300' : 'bg-gray-200 border-gray-500 text-gray-800'} transition-colors duration-500 ease-in-out`}
      />
    </div>
    <div className="flex-shrink-0">
      <button
        type="submit"
        onClick={handleSearch}
        className={`bg-${isDarkMode ? 'blue' : 'yellow'}-500 hover:bg-${isDarkMode ? 'blue' : 'yellow'}-600 w-48 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
      >
        Ara
      </button>
    </div>
  </form>
</div>
        <div className="w-full justify-center items-center">
          {loading ? (
            <div className="flex justify-center items-center my-4">
              <FontAwesomeIcon icon={faSpinner} size="4x" spin className="text-gray-900" />
              <span className="ml-4 text-lg">Yükleniyor...</span>
            </div>
          ) : error ? (
            <p className={`text-lg md:text-2xl mb-8 text-center flex flex-col items-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {error}
              <button onClick={() => fetchMessages(currentPage)} type="button" className={`bg-yellow-400 hover:bg-yellow-500 focus:bg-yellow-500 focus:outline-none text-gray mt-4 font-medium rounded-full text-sm px-5 py-2.5 transition-colors duration-300 ease-in-out ${isDarkMode ? 'bg-blue-400 hover:bg-blue-500 focus:bg-blue-500' : ''}`}>Tekrar Dene</button>
            </p>
          ) : messages.length > 0 ? (
            <div className="px-2 flex flex-row flex-wrap justify-center">
            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              {messages.map((message) => (
                <div key={message._id} className={`rounded-lg shadow-md overflow-hidden ${isDarkMode ? 'bg-gray-800 border border-gray-800' : 'bg-white border border-gray-200'}`}>
                  <div className="p-4">
                    <h5 className={`text-xl md:text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{message.name || message.surname ? `${message.name} ${message.surname}` : 'Anonim'}</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className={`text-sm mb-1 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>İsim</p>
                        <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{message.name || 'Anonim'}</p>
                      </div>
                      <div>
                        <p className={`text-sm mb-1 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Soyisim</p>
                        <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{message.surname || 'Anonim'}</p>
                      </div>
                      <div>
                        <p className={`text-sm mb-1 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>E-Posta</p>
                        <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', zIndex: 1 }}>
                          <span className={`email-hover-${message._id}`} style={{ display: 'none', position: 'absolute', marginTop: '-1.5em', padding: '0.5em', backgroundColor: isDarkMode ? '#1F2937' : '#F9FAFB', border: isDarkMode ? '1px solid #374151' : '1px solid #E5E7EB', boxShadow: isDarkMode ? '2px 2px 2px rgba(0,0,0,0.2)' : '2px 2px 2px rgba(255,255,255,0.2)', borderRadius: '0.25rem' }}>
                            {message.email}
                          </span>
                          <span className="email" style={{ position: 'relative' }} onMouseEnter={() => { document.querySelector(`.email-hover-${message._id}`).style.display = 'inline-block' }} onMouseLeave={() => { document.querySelector(`.email-hover-${message._id}`).style.display = 'none' }}>
                          {message.email ? `${message.email.substring(0, 20)}${message.email.length > 20 ? '...' : ''}` : "Anonim"}
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className={`text-sm mb-1 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Yas</p>
                        <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{message.age || 'Anonim'}</p>
                      </div>
                      <div className="col-span-2">
                        <p className={`text-sm mb-1 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Mesaj</p>
                        <textarea className="bg-gray-100 rounded-lg border border-gray-200 py-2 px-3 block w-full leading-5 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">{message.details}</textarea>
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
          {renderPagination()}
        </div>
      </div>
    </div>
  );
};

export default Messages;