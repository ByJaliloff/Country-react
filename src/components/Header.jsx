import { useState, useEffect } from "react";
import { FaMoon, FaSun, FaGlobe } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Header({ setRandomCountry, setSelectedRegion, getRandomCountry, setSearchTerm }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("isDarkMode");
    return savedTheme === "true" ? true : false;
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("isDarkMode", isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleIconClick = () => {
    const country = getRandomCountry();
    setRandomCountry(country);
    setSelectedRegion(null);
    setSearchTerm("");
    navigate("/countries", { replace: true });
  };

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    setRandomCountry(null);
    navigate(`/countries/${region.toLowerCase()}`);
  };

  return (
    <header className="p-4 bg-white text-black dark:bg-[#2c2f48] dark:text-[#e0e0e0] transition-colors duration-300">
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
          className="text-violet-500 text-[2.5rem] flex items-center p-2 border-b-2 border-transparent focus:border-violet-600 active:border-violet-600"
          aria-label="Go to main page"
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
