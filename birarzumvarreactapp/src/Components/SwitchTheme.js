import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../userSettingsSlice";

const SwitchTheme = () => {
  const [theme, setThemeLocal] = useState(null);
  const userSettings = useSelector((state) => state.userSettings);
  const dispatch = useDispatch();

  useEffect(() => {
    // Set the local state to the initial theme value from the store,
    // and listen for updates to the theme value in the store
    setThemeLocal(userSettings.theme);
  }, [userSettings.theme]);

  const handleClick = () => {
    // Toggle the theme and dispatch an action to update the store
    const newTheme = theme === "light" ? "dark" : "light";
    dispatch(setTheme(newTheme));
  };

  if (!theme) {
    return null; // Or render a loading indicator if the theme is not yet initialized
  }

  return (
    <button
      className={`fixed bottom-4 right-4 w-12 h-12 rounded-full ${
        theme === "dark"
          ? "bg-gray-800 text-white"
          : "bg-yellow-500 text-white"
      }`}
      onClick={handleClick}
    >
      {theme === "dark" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-sun w-6 h-6 mx-auto my-auto"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-moon w-6 h-6 mx-auto my-auto"
        >
          <path
            d="M16.5 13.5C16.5 15.433 15.033 17 13.125 17C11.218 17 9.75 15.433 9.75 13.5C9.75 11.567 11.218 10 13.125 10C15.033 10 16.5 11.567 16.5 13.5Z"
            fill="currentColor"
          />
          <path
            d="M12 3C7.859 3 4.5 6.359 4.5 10.5C4.5 14.641 7.859 18 12 18C16.141 18 19.5 14.641 19.5 10.5C19.5 6.359 16.141 3 12 3Z"
            fill="none"
            stroke="currentColor"
          />
        </svg>
      )}
    </button>
  );
};

export default SwitchTheme;