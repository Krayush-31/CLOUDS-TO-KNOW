import { useRef } from "react";
import {
  Clock,
  CalendarDays,
  Droplets,
  Wind,
  Gauge,
  Thermometer,
  Activity,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function WeatherDetailsSlider({ weather, aqi, city }) {
  if (!weather || !weather.current) return null;

  const { current, timezone = 0 } = weather;
  const cityDate = new Date(Date.now() + timezone * 1000);

  const scrollRef = useRef(null);

  const formatTime = (d) =>
    d.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    });

  const formatDate = (d) =>
    d.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "short",
      timeZone: "UTC",
    });

  /* ---------------- DATA ---------------- */

  const items = [
    {
      label: "Local Time",
      value: formatTime(cityDate),
      icon: Clock,
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      label: "Date",
      value: formatDate(cityDate),
      icon: CalendarDays,
      gradient: "from-sky-500 to-cyan-400",
    },
    {
      label: "Feels Like",
      value: `${Math.round(current.main.feels_like)}°C`,
      icon: Thermometer,
      gradient: "from-orange-400 to-rose-500",
    },
    {
      label: "Humidity",
      value: `${current.main.humidity}%`,
      icon: Droplets,
      gradient: "from-blue-400 to-cyan-500",
    },
    {
      label: "Wind Speed",
      value: `${current.wind.speed} m/s`,
      icon: Wind,
      gradient: "from-emerald-400 to-teal-500",
    },
    {
      label: "Pressure",
      value: `${current.main.pressure} hPa`,
      icon: Gauge,
      gradient: "from-slate-400 to-gray-600",
    },
    {
      label: "Air Quality",
      value: aqi ?? "N/A",
      icon: Activity,
      gradient: "from-lime-400 to-green-500",
    },
  ];

  /* ---------------- SCROLL ---------------- */

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir * 260,
      behavior: "smooth",
    });
  };

  /* ---------------- UI ---------------- */

  return (
    <section className="mt-16">
      {city && (
        <p className="text-sm text-white/70 mb-2">
          Today’s highlights in{" "}
          <span className="font-semibold text-white">{city.name}</span>
        </p>
      )}

      {/* HEADER (MATCHES DAILY FORECAST) */}
      <div className="flex items-center justify-between  mb-5">
        <h3 className="text-lg font-semibold tracking-wide text-white/80">
          Weather Highlights
        </h3>

        {/* ARROWS (SAME STYLE & POSITION) */}
        <div className="flex gap-2">
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

      {/* SLIDER */}
      <div
        ref={scrollRef}
        className="
          flex gap-4
          overflow-x-auto
          pb-6 px-4
          scrollbar-hide
          snap-x snap-mandatory
        "
      >
        {items.map((item, i) => {
          const Icon = item.icon;

          return (
            <div
              key={i}
              className="
                group snap-start min-w-[190px]
                rounded-3xl p-5
                bg-white/10 backdrop-blur-xl
                border border-white/15
                shadow-xl
                transition-all duration-300
                hover:-translate-y-1.5 hover:shadow-2xl
                whitespace-nowrap
              "
            >
              <div
                className={`
                  w-14 h-14 mx-auto rounded-2xl
                  flex items-center justify-center
                  bg-gradient-to-br ${item.gradient}
                  shadow-lg
                  group-hover:scale-110 transition
                `}
              >
                <Icon className="text-white" size={26} />
              </div>

              <p className="mt-4 text-[11px] uppercase tracking-widest text-white/60 text-center">
                {item.label}
              </p>

              <p className="mt-1 text-2xl font-semibold text-white text-center">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
