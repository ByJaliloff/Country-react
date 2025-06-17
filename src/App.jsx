import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import Title from "./components/Title";
import Details from "./pages/Details";
import Error from "./pages/Error";

function App() {
  const [countries, setCountries] = useState([]);
  const [randomCountry, setRandomCountry] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchToggle = () => {
    setSearchVisible((prev) => !prev);
  };

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
      .catch((error) => {
        console.error("Ölkə məlumatları yüklənmədi:", error);
      });
  }, []);

  return (
    <>
      <Header
        setRandomCountry={setRandomCountry}
        setSelectedRegion={setSelectedRegion}
        getRandomCountry={getRandomCountry}
        setSearchTerm={setSearchTerm}
      />

      <Routes>
        <Route path="/" element={<Navigate to="/countries" />} />

        <Route path="/countries/:region?" element={<> {!selectedRegion && (
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
            searchTerm={searchTerm}
            searchVisible={searchVisible}
          />
        </>
        }
        />

        <Route path="/details/:code" element={<Details countries={countries} />} />

        <Route path="*" element={<Error />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
