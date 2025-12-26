import { Zap } from "lucide-react";
import Loader from "./Loader";

export default function CitySearch({
  value,
  onChange,
  onSearch,
  suggestions,
  onSelect,
  loading,
  placeholder,
}) {
  return (
    <div className="relative w-full max-w-3xl mx-auto mb-6 px-2 sm:px-0">
      {/* 🔍 Search Bar */}
      <div
        className="
          flex items-center
          bg-black/60 backdrop-blur-xl
          border border-white/10
          rounded-2xl
          shadow-lg
          transition-all
          focus-within:ring-2
          focus-within:ring-sky-400/60
        "
      >
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "Search city"}
          className="
            flex-1
            px-4 sm:px-5
            py-4
            bg-transparent
            text-white
            placeholder-white/50
            outline-none
            text-sm sm:text-base
          "
        />

        <button
          onClick={onSearch}
          className="
            mr-2 sm:mr-3
            h-11 w-11
            sm:h-10 sm:w-10
            flex items-center justify-center
            rounded-xl
            bg-sky-500/90
            hover:bg-sky-400
            active:scale-95
            transition
            shadow-md
          "
          aria-label="Search"
        >
          <Zap size={18} className="text-black" />
        </button>
      </div>

      {/* 📜 Suggestions */}
      {suggestions.length > 0 && !loading && (
        <div
          className="
            absolute z-30 mt-2 w-full
            bg-black/85 backdrop-blur-xl
            border border-white/10
            rounded-2xl
            shadow-2xl
            overflow-hidden
            animate-fadeIn
          "
        >
          {suggestions.map((city, i) => (
            <div
              key={i}
              onClick={() => onSelect(city)}
              className="
                px-4 sm:px-5
                py-4
                cursor-pointer
                transition
                hover:bg-white/10
                active:bg-white/20
              "
            >
              <div className="text-sm sm:text-base font-semibold text-white">
                {city.name}
              </div>
              <div className="text-xs sm:text-sm text-white/60">
                {city.state ? city.state + ", " : ""}
                {city.country}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ⏳ Loader (NO TEXT) */}
      {loading && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-4">
          <Loader />
        </div>
      )}
    </div>
  );
}
