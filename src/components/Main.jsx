import { useState } from "react";

function Main({ countries, randomCountry, setRandomCountry, selectedRegion, setSelectedRegion, selectedCountry,
  setSelectedCountry, searchTerm }) {
  const [visibleCount, setVisibleCount] = useState(20);

  const getRandomCountry = () => {
    if (!countries || countries.length === 0) return null;
    const index = Math.floor(Math.random() * countries.length);
    return countries[index];
  };

  const showMore = () => {
    setVisibleCount((prev) => prev + 20);
  };

  const showLess = () => {
    setVisibleCount((prev) => Math.max(20, prev - 20));
  };

  let filteredCountries = countries;

  if (selectedRegion) {
    filteredCountries = filteredCountries.filter(c => c.region === selectedRegion);
  }

  if (searchTerm) {
    filteredCountries = filteredCountries.filter(c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <main className="bg-[#E5E7EB] text-black dark:bg-[#1e1e2f] dark:text-white transition-colors duration-300">
      <div className="container mx-auto p-4">
        {selectedCountry ? (
          <CountryDetails country={selectedCountry} goBack={() => setSelectedCountry(null)} />
        ) : (
          <>
            {!selectedRegion && !searchTerm && randomCountry && (
              <div
                className="mb-8 bg-white text-black dark:bg-[#1e1e2f] dark:text-white  shadow-md rounded-lg overflow-hidden cursor-pointer max-w-[60%] mx-auto"
                onClick={() => setSelectedCountry(randomCountry)}
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
                    <p className="mt-2">Area: {randomCountry.area?.toLocaleString() || "Bilinmir"} km²</p>
                  </div>
                </div>
              </div>
            )}

            <CountryCards
              countries={filteredCountries}
              visibleCount={visibleCount}
              showMore={showMore}
              showLess={showLess}
              onSelect={setSelectedCountry}
            />

            {selectedRegion && (
              <div className="text-center mt-4">
                <button
                  onClick={() => {
                    setSelectedRegion(null);
                    setRandomCountry(getRandomCountry());
                  }}
                  className="px-6 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
                >
                  Bütün ölkələrə qayıt
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}

function CountryCards({ visibleCount, showMore, showLess, onSelect, countries }) {
  return (
    <>
      <div id="countriesContainer" className="flex flex-wrap gap-6 justify-center mt-8">
        {countries.slice(0, visibleCount).map((country, index) => (
          <div
            key={index}
            className="bg-white text-black dark:bg-[#1e1e2f] dark:text-white border border-gray-300 dark:border-gray-600 shadow-md rounded-lg overflow-hidden cursor-pointer"
            style={{ width: "305px", height: "372px" }}
            onClick={() => onSelect(country)}
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
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-8">
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

function CountryDetails({ country, goBack }) {
  const borders = country.borders?.join(", ") || "No borders";
  const altNames = country.altSpellings?.join(", ") || "Bilinmir";

  return (
    <div className="mb-8 bg-white text-black dark:bg-[#1e1e2f] dark:text-white shadow-md rounded-lg overflow-hidden p-6">
      <button
        onClick={goBack}
        className="mb-4 px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
      >
        Geri
      </button>
      <div className="flex items-center">
        <div className="flex-1 w-[340px] h-[294px] p-6">
          <p className="text-xs">{country.alpha3Code}</p>
          <h1 className="text-3xl mt-2 font-semibold">{country.name}</h1>
          <p className="mt-2 pt-1">
            Capital: <strong>{country.capital}</strong>
          </p>
          <p className="pt-1">
            Region: <strong>{country.region}</strong>
          </p>
          <p className="pt-1">
            Alternative names: <strong>{altNames}</strong>
          </p>
          <p>
            Borders: <strong>{borders}</strong>
          </p>
          <div className="text-[12px] flex justify-between pt-3">
            <p>Population: {country.population.toLocaleString()}</p>
            <p>{country.area?.toLocaleString() || "Bilinmir"} km²</p>
          </div>
        </div>
        <div className="ml-8">
          <img
            src={country.flags?.svg || "default-flag.svg"}
            alt={country.name}
            className="w-[450px] h-[294px] object-cover mt-4"
          />
        </div>
      </div>
    </div>
  );
}

export default Main;
