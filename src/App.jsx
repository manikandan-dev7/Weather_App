import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

const API_KEY = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={4fc469e2a566c4c9b8466bc197badb9d}"; 

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (searchCity) => {
    const query = searchCity || city;

    if (!query.trim()) {
      setError("Please enter a city name.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setWeather(null);

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          query
        )}&appid=${API_KEY}&units=metric`
      );

      const data = await res.json();

      if (!res.ok) {
        console.log("API error:", data);
        throw new Error(data?.message || "Something went wrong. Please try again.");
      }

      setWeather(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Error fetching weather.");
    } finally {
      setLoading(false);
    }
  };

  // Background gradient based on weather condition
  const getBackgroundClasses = () => {
    if (!weather) return "from-slate-900 via-slate-800 to-slate-900";

    const main = weather.weather?.[0]?.main?.toLowerCase() || "";

    if (main.includes("cloud")) return "from-slate-500 via-slate-700 to-slate-900";
    if (main.includes("rain") || main.includes("drizzle"))
      return "from-sky-900 via-slate-900 to-black";
    if (main.includes("thunder")) return "from-indigo-800 via-slate-900 to-black";
    if (main.includes("snow")) return "from-sky-200 via-sky-400 to-slate-600";
    if (main.includes("clear")) return "from-sky-400 via-sky-500 to-blue-700";

    return "from-emerald-500 via-sky-600 to-slate-900";
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden text-white">
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getBackgroundClasses()}`} />

      {/* Soft background image overlay */}
      <div
        className="absolute inset-0 opacity-30 mix-blend-soft-light"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1600')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Animated blur blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute rounded-full -top-32 -left-10 h-72 w-72 bg-white/20 blur-3xl animate-pulse" />
        <div className="absolute right-0 rounded-full bottom-10 h-80 w-80 bg-cyan-300/25 blur-3xl animate-pulse" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-xl p-6 border shadow-2xl backdrop-blur-2xl bg-black/30 border-white/20 rounded-3xl md:p-8">
          {/* Header */}
          <header className="flex flex-col gap-2 mb-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">BreezeCast</h1>
              <p className="text-sm md:text-base text-white/80">
                Minimal weather dashboard - just type a city and vibe. 🌦️
              </p>
            </div>
          </header>

          {/* Search */}
          <SearchBar
            city={city}
            setCity={setCity}
            onSearch={fetchWeather}
            loading={loading}
          />

          {/* Error message */}
          {error && (
            <p className="px-3 py-2 mt-3 text-sm text-red-200 border bg-red-500/20 border-red-300/40 rounded-xl">
              {error}
            </p>
          )}

          {/* Loader */}
          {loading && (
            <div className="flex justify-center py-6">
              <div className="w-10 h-10 border-4 rounded-full border-white/40 border-t-white animate-spin" />
            </div>
          )}

          {/* Weather card */}
          {!loading && weather && (
            <div className="mt-4">
              <WeatherCard weather={weather} />
            </div>
          )}

          {/* Empty state */}
          {!loading && !weather && !error && (
            <p className="mt-4 text-xs md:text-sm text-white/75">
              Try searching for <span className="font-semibold">Madurai</span> or{" "}
              <span className="font-semibold">Chennai</span> to test the API response.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
