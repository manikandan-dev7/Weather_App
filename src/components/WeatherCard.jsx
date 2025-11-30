/* eslint-disable react/prop-types */
function WeatherCard({ weather }) {
  const {
    name,
    sys,
    main,
    weather: weatherArr,
    wind,
  } = weather;

  const condition = weatherArr?.[0];
  const temp = Math.round(main?.temp);
  const feelsLike = Math.round(main?.feels_like);

  const iconUrl = condition?.icon
    ? `https://openweathermap.org/img/wn/${condition.icon}@2x.png`
    : null;

  return (
    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col justify-between bg-black/20 rounded-2xl p-4 border border-white/15">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/70">
            Current location
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold mt-1">
            {name}
            {sys?.country ? <span className="text-white/70 text-lg">, {sys.country}</span> : null}
          </h2>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col">
            <span className="text-5xl md:text-6xl font-semibold leading-none">
              {temp}°C
            </span>
            <span className="text-sm text-white/80 mt-1 capitalize">
              {condition?.description}
            </span>
            <span className="text-xs text-white/70 mt-2">
              Feels like {feelsLike}°C
            </span>
          </div>
          {iconUrl && (
            <img
              src={iconUrl}
              alt={condition?.description}
              className="w-20 h-20 md:w-24 md:h-24 drop-shadow-xl animate-[float_4s_ease-in-out_infinite]"
            />
          )}
        </div>
      </div>

      <div className="bg-black/15 rounded-2xl p-4 border border-white/15 flex flex-col justify-between">
        <p className="text-xs uppercase tracking-[0.2em] text-white/70">
          At a glance
        </p>

        <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-xs text-white/70">Humidity</p>
            <p className="text-lg font-semibold">{main?.humidity}%</p>
          </div>

          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-xs text-white/70">Wind</p>
            <p className="text-lg font-semibold">
              {wind?.speed} m/s
            </p>
          </div>

          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-xs text-white/70">Min Temp</p>
            <p className="text-lg font-semibold">
              {Math.round(main?.temp_min)}°C
            </p>
          </div>

          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-xs text-white/70">Max Temp</p>
            <p className="text-lg font-semibold">
              {Math.round(main?.temp_max)}°C
            </p>
          </div>
        </div>

        <p className="mt-3 text-xs text-white/70">
          Data powered by OpenWeather · Refresh the city to get updates.
        </p>
      </div>
    </div>
  );
}

export default WeatherCard;
