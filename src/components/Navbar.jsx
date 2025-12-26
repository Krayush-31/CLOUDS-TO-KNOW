import React, { useEffect, useState } from "react";

const NAV_HEIGHT = 64;

export default function Navbar({ onSearchClick, onHomeClick }) {
  const [scrolled, setScrolled] = useState(false);

  /* ---------------- SCROLL DETECTION ---------------- */
  /* ---------------- SCROLL TO SECTION ---------------- */
 const scrollToSection = (id) => {
  if (id === "home" && typeof onHomeClick === "function") {
    onHomeClick();
  }

  const el = document.getElementById(id);
  if (!el) return;

  const y =
    el.getBoundingClientRect().top +
    document.documentElement.scrollTop -
    NAV_HEIGHT;

  window.scrollTo({ top: y, behavior: "smooth" });
};


useEffect(() => {
  const handle = () => setScrolled(document.documentElement.scrollTop > 50);
  window.addEventListener("scroll", handle);
  handle();
  return () => window.removeEventListener("scroll", handle);
}, []);
  /* ---------------- NAV ITEM ---------------- */
  const NavItem = ({ label, id }) => (
    <button
      onClick={() => scrollToSection(id)}
      className="
        relative px-2 py-1 text-sm font-medium
        text-white/80 hover:text-white
        transition
        after:absolute after:left-0 after:-bottom-1
        after:h-[2px] after:w-0 after:bg-blue-400
        after:transition-all after:duration-300
        hover:after:w-full
      "
    >
      {label}
    </button>
  );

  /* ---------------- RENDER ---------------- */
  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50
        hidden md:flex
        h-[64px]
        transition-all duration-300 ease-out
        ${
          scrolled
            ? "bg-black/70 backdrop-blur-xl shadow-lg"
            : "bg-transparent"
        }
      `}
    >
      <div className="max-w-7xl mx-auto w-full px-6 flex items-center justify-between">
        {/* LOGO */}
        <h1
          onClick={() => scrollToSection("home")}
          className="
            text-lg font-semibold tracking-wide
            cursor-pointer text-white
            hover:text-blue-300 transition
          "
        >
          CloudsToKnow
        </h1>

        {/* NAV LINKS */}
        <div className="flex items-center gap-6">
          <NavItem label="Home" id="home" />
          <NavItem label="Hourly" id="hourly" />
          <NavItem label="Daily" id="daily" />
          <NavItem label="News" id="news" />

          <button
            onClick={onSearchClick}
            className="
              ml-4 px-5 py-2 text-sm font-medium
              rounded-md
              bg-blue-500 text-white
              hover:bg-blue-600 hover:scale-[1.03]
              transition-all shadow-md
            "
          >
            Search City
          </button>
        </div>
      </div>
    </nav>
  );
}
