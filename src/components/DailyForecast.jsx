import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DailyForecast({ forecast = [] }) {
  if (!Array.isArray(forecast) || forecast.length === 0) return null;

  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir * 220,
      behavior: "smooth",
    });
  };

  return (
    <div className="mt-14">
      {/* HEADER */}
      <div className="flex items-center justify-between px-2 mb-5">
        <h4 className="text-lg font-bold text-white/80 tracking-wide">
          Forecast for the Next 5 Days
        </h4>

        {/* MOBILE ARROWS */}
        <div className="flex gap-2 md:hidden">
          <button
            onClick={() => scroll(-1)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll(1)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* CARDS */}
      <div
        ref={scrollRef}
        className="
          flex gap-6 lg:gap-20
          overflow-x-auto pb-4 px-2
          scrollbar-hide cursor-pointer
        "
      >
        {forecast.map((item, i) => {
          const isDay = item.sys?.pod === "d";
          const weather = item.weather?.[0];

          return (
            <div
              key={i}
              className={`
                group relative min-w-[170px]
                rounded-3xl px-5 py-6 text-center
                backdrop-blur-xl
                border border-white/10
                transition-all duration-300
                hover:-translate-y-1 hover:scale-[1.04]
                hover:shadow-2xl
                ${isDay ? "bg-white/15" : "bg-black/30"}
              `}
            >
              {/* DATE */}
              <p className="text-xs text-white/70 mb-3 tracking-wide">
                {new Date(item.dt * 1000).toLocaleDateString("en-IN", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
              </p>

              {/* ICON */}
              <div className="relative mx-auto mb-3 w-16 h-16 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center shadow-inner">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                  alt={weather.main}
                  className="w-12 drop-shadow-lg"
                />
                <span className="absolute -bottom-1 -right-1 text-sm">
                  {isDay ? "☀️" : "🌙"}
                </span>
              </div>

              {/* TEMP */}
              <p className="text-2xl font-bold text-white">
                {Math.round(item.main.temp)}°
              </p>

              {/* CONDITION */}
              <p className="text-xs text-white/70 capitalize mt-1">
                {weather.description}
              </p>

              {/* DIVIDER */}
              <div className="my-4 h-px bg-white/10" />

              {/* STATS */}
              <div className="space-y-1 text-xs text-white/70">
                <p>💧 {item.main.humidity}% humidity</p>
                <p>💨 {item.wind.speed} m/s wind</p>
              </div>

              {/* HOVER GLOW */}
              <div
                className="
                  pointer-events-none absolute inset-0 rounded-3xl
                  opacity-0 group-hover:opacity-100
                  transition
                  bg-gradient-to-t from-white/10 to-transparent
                "
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
