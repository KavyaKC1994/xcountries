import React, { useState, useEffect } from "react";
import "./App.css";

function XCountriesSearch() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = () => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase(); // Convert search term to lowercase
    setSearchTerm(term);
    const filtered = countries.filter(
      (country) => country.name.common.toLowerCase().includes(term) // Convert country name to lowercase for comparison
    );
    setFilteredCountries(filtered);
  };
  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search for countries..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />
      <div className="country-grid">
        {filteredCountries.map((country) => (
          <div className="countryCard" key={country.name.common}>
            <img src={country.flags.png} alt={country.name.common} />
            <p className="bold">{country.name.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default XCountriesSearch;
