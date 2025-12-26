export default function LanguageModal({ onSelect }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-sky-300/40 via-blue-400/30 to-indigo-500/40 backdrop-blur-md">
      
      <div className="w-[360px] rounded-[28px] bg-white/70 backdrop-blur-xl p-7 shadow-[0_20px_60px_rgba(0,0,0,0.25)] animate-fadeIn border border-white/40">

        {/* Header */}
        <div className="text-center mb-7">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Choose Language
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Weather tailored for you ☀️
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => onSelect("en")}
            className="w-full rounded-2xl bg-white/80 hover:bg-white px-5 py-4 text-left transition-all shadow-md hover:shadow-lg border border-gray-200"
          >
            <div className="font-semibold text-gray-900">English</div>
            <div className="text-xs text-gray-500">Default</div>
          </button>

          <button
            onClick={() => onSelect("hi")}
            className="w-full rounded-2xl bg-white/80 hover:bg-white px-5 py-4 text-left transition-all shadow-md hover:shadow-lg border border-gray-200"
          >
            <div className="font-semibold text-gray-900">हिंदी</div>
            <div className="text-xs text-gray-500">Hindi</div>
          </button>

          <button
            onClick={() => onSelect("regional")}
            className="w-full rounded-2xl bg-white/80 hover:bg-white px-5 py-4 text-left transition-all shadow-md hover:shadow-lg border border-gray-200"
          >
            <div className="font-semibold text-gray-900">Regional</div>
            <div className="text-xs text-gray-500">
              Auto-detect by location
            </div>
          </button>
        </div>

        <p className="text-[11px] text-gray-500 text-center mt-6">
          You can change this anytime
        </p>
      </div>
    </div>
  );
}
