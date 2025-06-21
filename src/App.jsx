import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Title from "./components/Title";
import Main from "./components/Main";
import Details from "./pages/Details";
import Error from "./pages/Error";
import Admin from "./pages/Admin";
import RootLayout from "./layout/RootLayout";

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

  const headerProps = {
    setRandomCountry,
    setSelectedRegion,
    getRandomCountry,
    setSearchTerm,
  };


  const titleProps = {
    searchVisible,
    onSearchToggle: handleSearchToggle,
    searchTerm,
    onSearch: setSearchTerm,
  };

  const mainProps = {
    countries,
    randomCountry,
    setRandomCountry: (country) => setRandomCountry(country || getRandomCountry()),
    selectedRegion,
    setSelectedRegion,
    searchTerm,
    searchVisible,
  };

  return (
    <>
      <Routes>

        <Route path="/" element={<Navigate to="/countries" />} />

        <Route path="/" element={<RootLayout {...headerProps} />}>
          <Route
            path="countries/:region?"
            element={
              <>
                {!selectedRegion && <Title {...titleProps} />}
                <Main {...mainProps} />
              </>
            }
          />
          <Route path="details/:code" element={<Details countries={countries} />} />
          <Route path="*" element={<Error />} />
        </Route>

        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
