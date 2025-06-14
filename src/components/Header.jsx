import countries from "./data";
import { useState, useEffect } from "react";
import { FaMoon, FaSun, FaGlobe } from "react-icons/fa";

function Header({ setRandomCountry, setSelectedRegion }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleIconClick = () => {
    const randomIndex = Math.floor(Math.random() * countries.length);
    setRandomCountry(countries[randomIndex]);
    setSelectedRegion(null);
  };

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    setRandomCountry(null);
  };

  return (
    <header className="p-4 bg-white text-black dark:bg-[#1e1e2f] dark:text-white transition-colors duration-300">
      <div className="flex justify-between h-16 mx-auto max-w-screen-xl md:justify-center md:space-x-8">
        <ul className="items-stretch hidden space-x-3 md:flex">
          {["Europe", "Asia", "Americas"].map((region) => (
            <li key={region} className="flex">
              <button
                onClick={() => handleRegionClick(region)}
                className="flex items-center px-4 -mb-1 border-b-2 border-gray-300 text-black dark:text-white"
              >
                {region}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={handleIconClick}
          className="flex items-center p-2 border-b-2 border-transparent focus:border-violet-600 active:border-violet-600 text-violet-500 text-[2.5rem]"
          aria-label="Show random country"
        >
          <FaGlobe />
        </button>

        <ul className="items-stretch hidden space-x-3 md:flex">
          {["Africa", "Oceania", "Antarctic"].map((region) => (
            <li key={region} className="flex">
              <button
                onClick={() => handleRegionClick(region)}
                className="flex items-center px-4 -mb-1 border-b-2 border-gray-300 text-black dark:text-white"
              >
                {region}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="text-2xl text-violet-600 hover:text-violet-800 transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
