import { useState } from "react";
import CitySearch from "./CitySearch";
import Loader from "./Loader"; // ✅ reuse existing loader

const GEO_API_KEY = "c6112d234b8b28539d41c578f32a0b75";

export default function SearchBox({
  onCitySelect,
  onBackHome,
  loading,
  placeholder,
}) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [backLoading, setBackLoading] = useState(false); // 🔑

  const handleQueryChange = async (value) => {
    setQuery(value);

    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${GEO_API_KEY}`
    );
    const data = await res.json();
    setSuggestions(data);
  };

  const handleCitySelect = (city) => {
    setQuery(city.name);
    setSuggestions([]);
    setHasSearched(true);
    onCitySelect(city);
  };

  const handleSearchClick = () => {
    if (suggestions.length > 0) {
      handleCitySelect(suggestions[0]);
    }
  };

  const handleBackHome = () => {
    setBackLoading(true); // 🔄 show loader

    setTimeout(() => {
      setQuery("");
      setSuggestions([]);
      setHasSearched(false);
      setBackLoading(false);
      onBackHome();
    }, 300); // smooth UX
  };

  return (
    <>
      {/* 🔄 FULLSCREEN LOADER */}
      {backLoading && <Loader />}

      <div className="flex items-center justify-center gap-3 flex-col sm:flex-row">
        {/* 🔍 SEARCH BAR */}
        <div className="w-full sm:w-[420px]">
          <CitySearch
            value={query}
            onChange={handleQueryChange}
            onSearch={handleSearchClick}
            suggestions={suggestions}
            onSelect={handleCitySelect}
            loading={loading}
            placeholder={placeholder}
          />
        </div>

        {/* 🔙 BACK TO HOME */}
        {hasSearched && !backLoading && (
          <button
            onClick={handleBackHome}
            className="
              h-[52px]
              px-6
              rounded-xl
              text-sm
              font-medium
              text-white/90
              bg-black/40
              mb-6
              backdrop-blur-md
              border border-white/20
              shadow-lg
              hover:bg-white/20
              hover:shadow-xl
              transition-all
              duration-300
              whitespace-nowrap
            "
          >
            Back to Home
          </button>
        )}
      </div>
    </>
  );
}
