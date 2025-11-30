/* eslint-disable react/prop-types */
function SearchBar({ city, setCity, onSearch, loading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 md:flex-row md:items-center"
    >
      <input
        type="text"
        placeholder="Enter city name…"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full rounded-2xl bg-white/15 border border-white/30 px-4 py-2.5 text-sm md:text-base placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/70 focus:bg-white/20 transition"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full md:w-auto rounded-2xl px-5 py-2.5 text-sm md:text-base font-medium bg-white text-slate-900 shadow-lg hover:shadow-xl hover:bg-slate-100 disabled:opacity-60 disabled:cursor-not-allowed transition-transform transform hover:-translate-y-0.5"
      >
        {loading ? "Fetching..." : "Get Weather"}
      </button>
    </form>
  );
}

export default SearchBar;
