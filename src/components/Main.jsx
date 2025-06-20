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
            className="block mb-8 bg-white text-black dark:bg-[#2c2f48] dark:text-[#e0e0e0] shadow-md rounded-lg overflow-hidden max-w-[900px] mx-auto transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start">

              <div className="w-full md:w-1/2">
                <img
                  src={randomCountry.flags.svg}
                  alt={randomCountry.name}
                  className="w-full h-auto object-cover md:h-[294px] transition-transform duration-300 hover:scale-95"
                />
              </div>

              <div className="w-full md:w-1/2 p-6">
                <h1 className="text-2xl md:text-4xl font-semibold">{randomCountry.name}</h1>
                <p className="mt-2 text-base md:text-lg">{randomCountry.region}</p>
                <p className="mt-2 text-base md:text-lg">Capital: {randomCountry.capital}</p>
                <p className="mt-2 text-base md:text-lg">Population: {randomCountry.population.toLocaleString()}</p>
                <p className="mt-2 text-base md:text-lg">
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
              className="w-[305px] h-[208px] object-cover transition-all duration-300 hover:scale-90"
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
