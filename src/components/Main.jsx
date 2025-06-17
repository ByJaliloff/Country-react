import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function Main({
  countries,
  randomCountry,
  setRandomCountry,
  selectedRegion,
  setSelectedRegion,
  searchTerm,
}) {
  const [visibleCount, setVisibleCount] = useState(20);
  const { region } = useParams();

  useEffect(() => {
    if (region) {
      const formattedRegion = region.charAt(0).toUpperCase() + region.slice(1).toLowerCase();
      if (selectedRegion !== formattedRegion) {
        setSelectedRegion(formattedRegion);
        setRandomCountry(null);
      }
    }
  }, [region]);


  const getRandomCountry = () => {
    if (!countries || countries.length === 0) return null;
    const index = Math.floor(Math.random() * countries.length);
    return countries[index];
  };

  const showMore = () => setVisibleCount((prev) => prev + 20);
  const showLess = () => setVisibleCount((prev) => Math.max(20, prev - 20));

  let filteredCountries = countries;

  if (selectedRegion) {
    filteredCountries = filteredCountries.filter((c) => c.region === selectedRegion);
  }

  if (searchTerm) {
    filteredCountries = filteredCountries.filter((c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <main className="bg-[#E5E7EB] text-black dark:bg-[#282c3a] dark:text-[#e0e0e0] transition-colors duration-300">
      <div className="container mx-auto p-4">
        {!selectedRegion && !searchTerm && randomCountry && (
          <Link
            to={`/details/${randomCountry.alpha3Code}`}
            className="block mb-8 bg-white text-black dark:bg-[#2c2f48] dark:text-[#e0e0e0] shadow-md rounded-lg overflow-hidden max-w-[60%] mx-auto"
          >
            <div className="flex items-center">
              <div className="ml-8">
                <img
                  src={randomCountry.flags.svg}
                  alt={randomCountry.name}
                  className="w-[450px] h-[294px] object-cover mt-4"
                />
              </div>
              <div className="flex-1 w-[340px] h-[294px] p-6">
                <h1 className="text-4xl mt-2 font-semibold">{randomCountry.name}</h1>
                <p className="mt-2">{randomCountry.region}</p>
                <p className="mt-2">Capital: {randomCountry.capital}</p>
                <p className="mt-2">Population: {randomCountry.population.toLocaleString()}</p>
                <p className="mt-2">
                  Area: {randomCountry.area?.toLocaleString() || "Bilinmir"} km²
                </p>
              </div>
            </div>
          </Link>
        )}

        <CountryCards
          countries={filteredCountries}
          visibleCount={visibleCount}
          showMore={showMore}
          showLess={showLess}
        />
      </div>
    </main>
  );
}

function CountryCards({ visibleCount, showMore, showLess, countries }) {
  return (
    <>
      <div id="countriesContainer" className="flex flex-wrap gap-6 justify-center mt-8">
        {countries.slice(0, visibleCount).map((country) => (
          <Link
            key={country.alpha3Code}
            to={`/details/${country.alpha3Code}`}
            className="bg-white text-black dark:bg-[#2c2f48] dark:text-[#e0e0e0] border border-gray-300 dark:border-gray-600 shadow-md rounded-lg overflow-hidden"
            style={{ width: "305px", height: "372px" }}
          >
            <img
              src={country.flags.svg}
              alt={`${country.name} flag`}
              className="w-[305px] h-[208px] object-cover"
            />
            <div className="p-6 box-border h-[164px]">
              <p className="text-gray-500 uppercase text-[12px]">{country.region}</p>
              <h3 className="text-[18px] font-bold py-2">
                {country.name}, <i>{country.capital}</i>
              </h3>
              <div className="text-[12px] flex justify-between pt-3">
                <p>Population: {country.population.toLocaleString()}</p>
                <p>{country.area ? country.area.toLocaleString() : "Bilinmir"} km²</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-8 mb-8">
        {visibleCount < countries.length && (
          <button
            onClick={showMore}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Show More
          </button>
        )}

        {visibleCount > 20 && (
          <button
            onClick={showLess}
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Show Less
          </button>
        )}
      </div>
    </>
  );
}

export default Main;
