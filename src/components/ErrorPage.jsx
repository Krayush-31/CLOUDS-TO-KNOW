import { useEffect, useState } from "react";
import brokenImage from "../assets/Broken.jpg";

const messages = [
  "⚠️ Tower is under maintenance",
  "🌦 Weather update will start soon",
];

export default function ErrorPage() {
  const [text, setText] = useState("");
  const [msgIndex, setMsgIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentMessage = messages[msgIndex];

    if (charIndex < currentMessage.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + currentMessage[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 80); // typing speed

      return () => clearTimeout(timeout);
    }

    const pause = setTimeout(() => {
      setText("");
      setCharIndex(0);
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 1800);

    return () => clearTimeout(pause);
  }, [charIndex, msgIndex]);

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-end px-6 md:px-16"
      style={{
        backgroundImage: `url(${brokenImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center right", // ✅ better laptop framing
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* DARK OVERLAY FOR IMAGE DEPTH */}
      <div className="absolute inset-0 bg-black/40" />

      {/* RIGHT NEON PANEL */}
      <div
        className="
          relative
          bg-black/80
          backdrop-blur-xl
          border border-red-500/40
          rounded-2xl
          px-8 py-10
          max-w-md
          w-full
          shadow-[0_0_50px_rgba(255,0,0,0.35)]
        "
      >
       <p
  className="
    text-red-500
    text-lg md:text-lg
    font-mono
    tracking-wide
    leading-relaxed
    neon-text
"
>
  {text}
  <span className="blinking-cursor">▌</span>
</p>
      </div>
    </div>
  );
}
