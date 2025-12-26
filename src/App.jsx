import React, { useEffect, useState, useRef } from "react";

import Navbar from "./components/Navbar";
import LanguageModal from "./components/LanguageModal";
import SearchBox from "./components/SearchBox";
import Loader from "./components/Loader";
import ErrorPage from "./components/ErrorPage";

import WeatherDetailsSlider from "./components/WeatherDetailsSlider";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";
import CityIncidents from "./components/CityIncidents";

import cleanBg from "./assets/Clear.jpg";
import cloudyBg from "./assets/cloudy.jpg";
import rainyBg from "./assets/rainy.jpg";
const BACKEND_URL = "https://weather-backend-g6xf.onrender.com";

export default function App() {
  const [language, setLanguage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [weather, setWeather] = useState(null);
  const [cityInfo, setCityInfo] = useState(null);
  const [aqi, setAqi] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const searchRef = useRef(null);

  /* ---------------- INIT ---------------- */

  useEffect(() => {
    const saved = localStorage.getItem("preferredLanguage");
    if (!saved) setShowModal(true);
    else setLanguage(saved);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      document.body.classList.toggle("scrolled", window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------------- GEO FETCH ---------------- */

  useEffect(() => {
    if (!language) return;

    setLoading(true);
    setError(false);

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        fetchAll(language, coords.latitude, coords.longitude);
      },
      () => {
        setError(true);
        setLoading(false);
      }
    );
  }, [language]);

  /* ---------------- BACKEND FETCH ---------------- */

  const fetchAll = async (lang, lat, lon) => {
    try {
      await fetchWeather(lang, lat, lon);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeather = async (lang, lat, lon) => {
    const res = await fetch(
      `${BACKEND_URL}/api/translations?lat=${lat}&lon=${lon}&language=${lang}`
    );

    if (!res.ok) throw new Error("Backend error");

    const data = await res.json();

    setWeather({
      current: data.weather.current,
      hourly: data.weather.hourly,
      forecast: data.weather.daily,
      timezone: data.weather.timezone ?? 0,
    });

    setCityInfo(data.city);
    setAqi(data.aqi);
  };

  /* ---------------- HANDLERS ---------------- */

  const handleCitySelected = (city) => {
    setLoading(true);
    setCityInfo(city);
    fetchAll(language, city.lat, city.lon);
  };

  const handleBackHome = () => {
    setLoading(true);
    setShowSearch(false);
    setError(false);

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        fetchAll(language, coords.latitude, coords.longitude);
      },
      () => {
        setError(true);
        setLoading(false);
      }
    );
  };

  const handleSearchClick = () => setShowSearch(true);

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    localStorage.setItem("preferredLanguage", lang);
    setShowModal(false);
  };

  /* ---------------- UI HELPERS ---------------- */

  const isReady = Boolean(weather?.current);

  const getBackgroundImage = () => {
    if (!isReady) return cleanBg;
    const type = weather.current.weather[0].main.toLowerCase();
    if (type.includes("rain")) return rainyBg;
    if (type.includes("cloud")) return cloudyBg;
    return cleanBg;
  };

  if (error && !loading) return <ErrorPage />;

  /* ---------------- RENDER ---------------- */

  return (
    <>
      <Navbar onSearchClick={handleSearchClick} onHomeClick={handleBackHome} />

      <main
        className="relative pt-[64px] min-h-screen text-white"
        style={{
          backgroundImage: `url(${getBackgroundImage()})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 -z-10 pointer-events-none" />

        {showModal && <LanguageModal onSelect={handleLanguageSelect} />}

        {/* HERO */}
        <section id="home" className="text-center mt-20 px-4">
          <p className="text-xs tracking-widest text-white/70 mb-2">
            REAL-TIME WEATHER INSIGHTS
          </p>

          <h1 className="text-5xl md:text-6xl font-bold mb-8">
            Clouds To Know
          </h1>

          <div ref={searchRef} className="max-w-xl mx-auto">
            {(showSearch || !cityInfo) && (
              <SearchBox
                onCitySelect={handleCitySelected}
                onBackHome={handleBackHome}
                loading={loading}
                placeholder="Search city"
              />
            )}
          </div>
        </section>

        {/* LOADER */}
        {loading && (
          <div className="flex justify-center mt-16">
            <Loader />
          </div>
        )}

        {/* WEATHER DETAILS */}
        {isReady && !loading && (
          <section className="mt-5 px-2 lg:px-6">
            <WeatherDetailsSlider
              key={cityInfo?.name}
              weather={weather}
              aqi={aqi}
              city={cityInfo}
            />
          </section>
        )}

        {/* HOURLY */}
        {Array.isArray(weather?.hourly) && (
          <section id="hourly" className="mt-12">
            <HourlyForecast hourly={weather.hourly} />
          </section>
        )}

        {/* DAILY */}
        {Array.isArray(weather?.forecast) && (
          <section id="daily" className="mt-8">
            <DailyForecast forecast={weather.forecast} />
          </section>
        )}

        {/* NEWS */}
        {cityInfo?.name && (
          <section id="news" className="mt-10">
            <CityIncidents city={cityInfo.name} />
          </section>
        )}
      </main>
    </>
  );
}
