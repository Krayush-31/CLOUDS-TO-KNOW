export default function WeatherEffects({ condition, temp }) {
  if (!condition) return null;

  const isRain = condition.includes("rain");
  const isCloud = condition.includes("cloud");
  const isHot = temp >= 35;

  return (
    <>
      {isRain && <div className="rain-layer" />}
      {isCloud && <div className="cloud-layer" />}
      {isHot && <div className="heat-layer" />}
    </>
  );
}
