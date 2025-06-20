import { useState, useEffect } from "react";
import { FaMoon, FaSun, FaGlobe, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Header({ setRandomCountry, setSelectedRegion, getRandomCountry, setSearchTerm }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("isDarkMode");
    return savedTheme === "true";
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [menuOpen]);

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
    setMenuOpen(false);
  };

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    setRandomCountry(null);
    navigate(`/countries/${region.toLowerCase()}`);
    setMenuOpen(false);
  };

  return (
    <header className="p-4 bg-white text-black dark:bg-[#2c2f48] dark:text-[#e0e0e0] transition-colors duration-300 relative z-50">
      <div className="relative flex justify-center items-center h-16 max-w-screen-xl mx-auto px-4">


        {!menuOpen && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 md:hidden z-50">
            <button
              onClick={() => setMenuOpen(true)}
              className="text-2xl text-violet-600"
              aria-label="Open menu"
            >
              <FaBars />
            </button>
          </div>
        )}

        <ul className="items-stretch hidden space-x-3 md:flex">
          {["Europe", "Asia", "Americas"].map((region) => (
            <li key={region} className="flex">
              <button
                onClick={() => handleRegionClick(region)}
                className="flex items-center px-4 p-4 border-b-2 border-gray-300 hover:border-violet-600 text-black dark:text-white"
              >
                {region}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={handleIconClick}
          className="text-violet-500 text-[2.5rem] flex items-center p-2 border-b-2 border-transparent focus:border-violet-600 active:border-violet-600 mx-4"
          aria-label="Go to main page"
        >
          <span className="transition-transform duration-500 hover:[transform:rotateY(180deg)]">
            <FaGlobe />
          </span>
        </button>

        <ul className="items-stretch hidden space-x-3 md:flex">
          {["Africa", "Oceania", "Antarctic"].map((region) => (
            <li key={region} className="flex">
              <button
                onClick={() => handleRegionClick(region)}
                className="flex items-center px-4 p-4 border-b-2 border-gray-300 hover:border-violet-600 text-black dark:text-white"
              >
                {region}
              </button>
            </li>
          ))}
        </ul>


        <div className={`absolute right-4 top-1/2 -translate-y-1/2 z-50 md:block ${menuOpen ? "hidden" : "block"}`}>
          <button
            onClick={toggleTheme}
            className="text-2xl text-violet-600 hover:text-violet-800 transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        {menuOpen && (
          <button
            onClick={() => setMenuOpen(false)}
            className="fixed left-4 top-4 md:hidden z-60 text-3xl text-violet-400 hover:text-violet-600"
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
        )}

        {menuOpen && (
          <button
            onClick={toggleTheme}
            className="fixed right-4 top-4 md:hidden z-60 text-2xl text-violet-400 hover:text-violet-600 transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
        )}

      </div>

      {menuOpen && (
        <nav
          className={`fixed inset-0 z-40 overflow-auto flex flex-col pt-20 items-center space-y-8
      ${isDarkMode ? "bg-[#2c2f48]" : "bg-white"}`}
          aria-label="Mobile menu"
        >
          {["Europe", "Asia", "Americas", "Africa", "Oceania", "Antarctic"].map((region) => (
            <button
              key={region}
              onClick={() => handleRegionClick(region)}
              className={`text-2xl px-8 py-4 rounded-lg w-3/4 max-w-xs text-center
          ${isDarkMode ? "text-white" : "text-black"}`}
            >
              {region}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}

export default Header;
