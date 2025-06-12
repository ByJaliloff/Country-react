import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import Title from "./components/Title";

function App() {
  const [countries, setCountries] = useState([]);
  const [randomCountry, setRandomCountry] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchToggle = () => {
    setSearchVisible((prev) => !prev);
  };

  const getRandomCountry = () => {
    if (countries.length === 0) return null;
    const index = Math.floor(Math.random() * countries.length);
    return countries[index];
  };

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/TheOksigen/purfect_data/refs/heads/main/country.json"
    )
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setRandomCountry(getRandomCountryFrom(data));
      })
      .catch((error) => {
        console.error("Ölkə məlumatları yüklənmədi:", error);
      });
  }, []);

  const getRandomCountryFrom = (data) => {
    if (!data || data.length === 0) return null;
    const index = Math.floor(Math.random() * data.length);
    return data[index];
  };

  return (
    <>
      <Header
        setRandomCountry={() => setRandomCountry(getRandomCountry())}
        setSelectedRegion={setSelectedRegion}
      />

      {!selectedRegion && !selectedCountry && (
        <Title
          searchVisible={searchVisible}
          onSearchToggle={handleSearchToggle}
          searchTerm={searchTerm}
          onSearch={setSearchTerm} 
        />
      )}

      <Main
        countries={countries}
        randomCountry={randomCountry}
        setRandomCountry={(country) => {
          setRandomCountry(country || getRandomCountry());
        }}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        searchTerm={searchTerm} 
        searchVisible={searchVisible}  
      />

      <Footer />
    </>
  );
}

export default App;
