
import { useParams } from "react-router-dom";
import Error from "./Error";

function Details({ countries }) {
  const { code } = useParams();
  const country = countries.find(c => c.alpha3Code === code);

  if (!country) return <Error />;

  const borders = country.borders?.join(", ") || "No borders";
  const altNames = country.altSpellings?.join(", ") || "Bilinmir";

  return (
    <div className="bg-[#E5E7EB] text-black dark:bg-[#1e1e2f] dark:text-white transition-colors duration-300">
      <div className="p-6 max-w-4xl mx-auto ">
        <div className="flex items-center bg-white dark:bg-[#1e1e2f]  shadow-md rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
          <div className="flex-1 p-6">
            <h1 className="text-3xl  dark font-semibold">{country.name}</h1>
            <p>Capital: {country.capital}</p>
            <p>Region: {country.region}</p>
            <p>Alternative names: {altNames}</p>
            <p>Borders: {borders}</p>
            <p>Population: {country.population.toLocaleString()}</p>
            <p>Area: {country.area?.toLocaleString() || "Bilinmir"} km²</p>
          </div>
          <div className="p-4">
            <img
              src={country.flags?.svg}
              alt={country.name}
              className="w-[450px] h-[294px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
