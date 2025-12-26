export default function ThunderIcon({ loading }) {
  return (
    <div
      className={`text-xl transition-transform duration-300 ${
        loading ? "animate-pulse scale-110" : "hover:scale-125"
      }`}
    >
      ⚡
    </div>
  );
}
