import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchCityIncidents } from "../utils/wikiIncidents";
import { fetchWikiSummary } from "../utils/wikiSummary";

export default function CityIncidents({ city }) {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (!city) return;

    const load = async () => {
      setLoading(true);
      setIncidents([]);

      const searches = await fetchCityIncidents(city);
      const results = [];

      for (const item of searches) {
        const summary = await fetchWikiSummary(item.title);

        if (summary?.extract) {
          results.push({
            title: summary.title,
            extract: summary.extract,
            image: summary.thumbnail?.source,
            url: summary.content_urls?.desktop?.page,
          });
        }
      }

      setIncidents(results);
      setLoading(false);
    };

    load();
  }, [city]);

  const scroll = (dir) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };



  if (loading) {
    return (
      <div className="mt-14 px-2">
        <h3 className="text-lg font-semibold text-white mb-4">
          🌪 Major Weather-Related Incidents
        </h3>

        <div className="flex gap-6 overflow-x-hidden">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="
                min-w-[280px] sm:min-w-[340px]
                h-[320px]
                rounded-3xl
                bg-white/10 backdrop-blur-xl
                animate-pulse
              "
            >
              <div className="h-44 bg-white/10" />
              <div className="p-2 space-y-3">
                <div className="h-4 bg-white/20 rounded w-3/4" />
                <div className="h-3 bg-white/15 rounded w-full" />
                <div className="h-3 bg-white/15 rounded w-5/6" />
                <div className="h-8 bg-white/20 rounded w-32 mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!incidents.length) return null;

  /* ---------------- UI ---------------- */

  return (
    <div className="mt-16 px-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-white">
          🌪 Major Weather-Related Incidents
        </h3>

        {/* ARROWS (mobile + desktop) */}
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* SLIDER */}
      <div
        ref={sliderRef}
        className="
          flex gap-6
          overflow-x-auto scrollbar-hide
          snap-x snap-mandatory
          pb-4
        "
      >
        {incidents.map((item, i) => (
          <div
            key={i}
            className="
              snap-start
              min-w-[280px] sm:min-w-[340px]
              bg-black/40 backdrop-blur-xl
              rounded-3xl overflow-hidden
              shadow-xl
              transition-all duration-300
              hover:scale-[1.03]
              hover:shadow-2xl
            "
          >
            {/* IMAGE */}
            {item.image ? (
              <img
                src={item.image}
                alt={item.title}
                className="h-44 w-full object-cover"
              />
            ) : (
              <div className="h-44 bg-gradient-to-br from-sky-700 to-sky-500" />
            )}

            {/* CONTENT */}
            <div className="p-5">
              <h4 className="text-base font-semibold text-white line-clamp-2">
                {item.title}
              </h4>

              <p className="text-sm text-white/70 mt-2 line-clamp-3">
                {item.extract}
              </p>

              {/* CTA */}
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="
                  inline-flex items-center gap-1
                  mt-4
                  px-4 py-2
                  rounded-xl
                  bg-sky-500/90 hover:bg-sky-400
                  text-white text-sm font-medium
                  transition
                "
              >
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
