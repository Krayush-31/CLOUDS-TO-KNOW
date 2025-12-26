import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HourlyForecast({ hourly = [] }) {
  if (!Array.isArray(hourly) || hourly.length === 0) return null;

  const scrollRef = useRef(null);

  const scrollBy = (offset) => {
    scrollRef.current?.scrollBy({
      left: offset,
      behavior: "smooth",
    });
  };

  const isDayTime = (dt) => {
    const hour = new Date(dt * 1000).getHours();
    return hour >= 6 && hour < 18;
  };

  return (
    <section className="mt-14 relative">
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 mb-4">
        <h4 className="text-lg font-bold text-white/80">
          Watch the Weather of Next Few Hour's
        </h4>

        {/* MOBILE ARROWS */}
        <div className="flex gap-2 md:hidden">
          <button
            onClick={() => scrollBy(-180)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scrollBy(180)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* SCROLLER */}
      <div
        ref={scrollRef}
        className="
          flex gap-4  lg:gap-6 px-4 pb-3
          overflow-x-auto scrollbar-hide
          scroll-smooth snap-x snap-mandatory
        "
      >
        {hourly.slice(0, 8).map((item, i) => {
          const isDay = isDayTime(item.dt);
          const weather = item.weather?.[0];

          return (
            <div
              key={i}
              className={`
                snap-start
                relative min-w-[130px]
                rounded-2xl p-4 text-center
                backdrop-blur-xl
                transition-all duration-300
                hover:-translate-y-1 hover:scale-[1.03]
                shadow-lg
                ${
                  isDay
                    ? "bg-gradient-to-br from-yellow-400/25 via-orange-400/10 to-white/5"
                    : "bg-gradient-to-br from-indigo-900/40 via-black/30 to-black/50"
                }
              `}
            >
              {/* TIME */}
              <p className="text-xs text-white/70 mb-1">
                {new Date(item.dt * 1000).toLocaleTimeString("en-IN", {
                  hour: "numeric",
                  hour12: true,
                })}
              </p>

              {/* ICON */}
              <div className="relative my-1">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                  alt={weather.main}
                  className="mx-auto w-12 drop-shadow-xl"
                />

                <span className="absolute -top-1 -right-1 text-sm">
                  {isDay ? "☀️" : "🌙"}
                </span>
              </div>

              {/* TEMP */}
              <p className="text-xl font-bold text-white mt-1">
                {Math.round(item.main.temp)}°
              </p>

              {/* CONDITION */}
              <p className="text-[11px] text-white/70 capitalize mt-1">
                {weather.main}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
