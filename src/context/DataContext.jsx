import { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [countries, setCountries] = useState([]);
  const [randomCountry, setRandomCountry] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const getRandomCountryFrom = (data) => {
    if (!data || data.length === 0) return null;
    const index = Math.floor(Math.random() * data.length);
    return data[index];
  };

  const getRandomCountry = () => getRandomCountryFrom(countries);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/TheOksigen/purfect_data/refs/heads/main/country.json")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setRandomCountry(getRandomCountryFrom(data));
      })
      .catch((err) => console.error("Ölkə məlumatları yüklənmədi:", err));
  }, []);

  return (
    <DataContext.Provider
      value={{
        countries,
        randomCountry,
        setRandomCountry,
        selectedRegion,
        setSelectedRegion,
        searchVisible,
        setSearchVisible,
        searchTerm,
        setSearchTerm,
        getRandomCountry,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
