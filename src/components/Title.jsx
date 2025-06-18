import { useState } from "react";

function Title({ searchTerm, onSearch }) {
  const [searchVisible, setSearchVisible] = useState(false);

  const handleScroll = () => {
    const target = document.getElementById("countriesContainer");
    if (target) {
      window.scrollTo({ top: target.offsetTop - 50, behavior: "smooth" });
    }
  };

  const handleSearchToggle = () => {
    setSearchVisible((prev) => !prev);
  };

  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="bg-[#E5E7EB] text-black dark:bg-[#282c3a] dark:text-[#e0e0e0] transition-colors duration-300">
      <div className="container mx-auto max-w-[1280px] px-4 h-[65vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-[48px] font-bold text-black dark:text-white">Welcome to CountryApp Website</h1>
          <p className="mt-4 text-[36px] font-bold text-[#8b5cf6]">
            You can find data of any country in this website.
          </p>

          <div className="relative">
            <input
              id="searchInput"
              type="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className={`min-w-[250px] py-[10px] pl-10 pr-3 text-sm rounded-md sm:w-auto focus:outline-none bg-gray-200 text-black focus:bg-gray-300 focus:border-violet-400 mt-4 mx-auto block w-full ${searchVisible ? "" : "hidden"
                }`}
            />
          </div>

          <div className="mt-6 gap-8 justify-center flex">
            <button
              type="button"
              id="scrollButton"
              onClick={handleScroll}
              className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-[171px] h-[51.61px] mb-2"
            >
              HAVE A LOOK
            </button>
            <button
              id="searchBtn"
              type="button"
              onClick={handleSearchToggle}
              className="relative overflow-hidden text-white bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300
             font-medium rounded-lg text-sm w-[171px] h-[52px] mb-2
             shadow-2xl
             before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-purple-700 before:duration-500
             after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-purple-700 after:duration-500
             hover:text-white hover:shadow-purple-900 hover:before:h-1/2 hover:after:h-1/2
             before:transition-all after:transition-all"
            >
              <span className="relative z-10">SEARCH</span>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Title;
