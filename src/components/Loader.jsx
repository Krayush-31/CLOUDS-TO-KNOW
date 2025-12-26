export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* 🔮 Blur background only */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/20" />

      {/* 🌗 Loader container */}
      <div className="relative w-64 h-40 overflow-hidden">
        {/* ☀️ SUN */}
        <div className="sun absolute left-1/2 bottom-0 -translate-x-1/2" />

        {/* 🌙 MOON */}
        <div className="moon absolute left-1/2 bottom-0 -translate-x-1/2" />
      </div>

    </div>
  );
}
