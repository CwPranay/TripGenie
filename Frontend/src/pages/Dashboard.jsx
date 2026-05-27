import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

// ── Heroicons (inline SVGs, zero dependency) ──────────────────────────────────
const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.083 3.712-5.158 3.712-9.07a8 8 0 10-16 0c0 3.912 1.768 6.987 3.712 9.07a19.58 19.58 0 002.682 2.282 16.958 16.958 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
  </svg>
);

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5z" clipRule="evenodd" />
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd" />
  </svg>
);

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M21.721 12.752a9.711 9.711 0 00-.945-5.003 12.754 12.754 0 01-4.339 2.708 18.991 18.991 0 01-.214 4.772 17.165 17.165 0 005.498-2.477zM14.634 15.55a17.324 17.324 0 00.332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 00.332 4.647 17.385 17.385 0 005.268 0zM9.772 17.119a18.963 18.963 0 004.456 0A17.182 17.182 0 0112 21.724a17.18 17.18 0 01-2.228-4.605zM7.777 15.23a18.87 18.87 0 01-.214-4.774 12.753 12.753 0 01-4.34-2.708 9.711 9.711 0 00-.944 5.004 17.165 17.165 0 005.498 2.477zM21.356 14.752a9.765 9.765 0 01-7.478 6.817 18.64 18.64 0 001.988-4.718 18.627 18.627 0 005.49-2.098zM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 001.988 4.718 9.765 9.765 0 01-7.478-6.816zM13.878 2.43a9.755 9.755 0 016.116 3.986 11.267 11.267 0 01-3.746 2.504 18.63 18.63 0 00-2.37-6.49zM12 2.276a17.152 17.152 0 012.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0112 2.276zM10.122 2.43a18.629 18.629 0 00-2.37 6.49 11.266 11.266 0 01-3.746-2.504 9.754 9.754 0 016.116-3.985z" />
  </svg>
);

// ── Destination color palette (deterministic by destination string) ───────────
const CARD_ACCENTS = [
  { bg: "from-sky-50 to-indigo-50", badge: "bg-sky-100 text-sky-700", dot: "bg-sky-400" },
  { bg: "from-emerald-50 to-teal-50", badge: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-400" },
  { bg: "from-amber-50 to-orange-50", badge: "bg-amber-100 text-amber-700", dot: "bg-amber-400" },
  { bg: "from-rose-50 to-pink-50", badge: "bg-rose-100 text-rose-700", dot: "bg-rose-400" },
  { bg: "from-violet-50 to-purple-50", badge: "bg-violet-100 text-violet-700", dot: "bg-violet-400" },
  { bg: "from-cyan-50 to-sky-50", badge: "bg-cyan-100 text-cyan-700", dot: "bg-cyan-400" },
];

const accentFor = (str = "") => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return CARD_ACCENTS[Math.abs(hash) % CARD_ACCENTS.length];
};

const formatDate = (raw) => {
  if (!raw) return null;
  try {
    return new Date(raw).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return raw;
  }
};

// ── Skeleton loader ───────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm animate-pulse">
    <div className="h-4 w-24 rounded-full bg-gray-100 mb-4" />
    <div className="h-6 w-3/4 rounded-lg bg-gray-100 mb-2" />
    <div className="h-4 w-1/3 rounded-full bg-gray-100 mb-5" />
    <div className="space-y-2">
      <div className="h-3 w-full rounded bg-gray-100" />
      <div className="h-3 w-5/6 rounded bg-gray-100" />
      <div className="h-3 w-4/6 rounded bg-gray-100" />
    </div>
    <div className="mt-6 flex items-center justify-between">
      <div className="h-3 w-20 rounded-full bg-gray-100" />
      <div className="h-8 w-8 rounded-full bg-gray-100" />
    </div>
  </div>
);

// ── Empty state ───────────────────────────────────────────────────────────────
const EmptyState = ({ onNew }) => (
  <div className="col-span-full flex flex-col items-center justify-center py-24 px-6 text-center">
    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-sky-100 text-indigo-500">
      <GlobeIcon />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">No trips yet</h3>
    <p className="text-gray-500 text-sm max-w-xs leading-relaxed mb-8">
      Generate your first AI-powered itinerary and start planning your next adventure.
    </p>
    <button
      onClick={onNew}
      className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700 transition-colors duration-150"
    >
      <PlusIcon />
      New Itinerary
    </button>
  </div>
);

// ── Trip card ─────────────────────────────────────────────────────────────────
const TripCard = ({ trip, onClick }) => {
  const dest = trip.structuredData?.destination ?? "Untitled Trip";
  const accent = accentFor(dest);
  const date = formatDate(trip.structuredData?.startDate);
  const preview = trip.itinerary?.replace(/#+\s/g, "").slice(0, 160);

  return (
    <article
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      aria-label={`Open itinerary for ${dest}`}
      className="group relative rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
    >
      {/* Top color strip */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${accent.bg} opacity-80`} />

      <div className="p-6">
        {/* Badge row */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${accent.badge}`}>
            <MapPinIcon />
            {dest}
          </span>
        </div>

        {/* Destination heading */}
        <h2 className="text-lg font-semibold text-gray-900 leading-snug mb-1 group-hover:text-indigo-600 transition-colors duration-150">
          {dest}
        </h2>

        {/* Date */}
        {date && (
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
            <CalendarIcon />
            <span>{date}</span>
          </div>
        )}

        {/* Preview text */}
        {preview && (
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
            {preview}
            {trip.itinerary?.length > 160 ? "…" : ""}
          </p>
        )}

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <span className={`inline-block h-1.5 w-1.5 rounded-full ${accent.dot}`} />
            <SparklesIcon />
            <span>AI Generated</span>
          </div>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors duration-150">
            <ArrowRightIcon />
          </span>
        </div>
      </div>
    </article>
  );
};



// ── Dashboard ─────────────────────────────────────────────────────────────────
// ── Dashboard ─────────────────────────────────────────────────────────────────
const Dashboard = () => {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchItineraries = async () => {
    try {
      const { data } = await API.get("/itineraries");

      setItineraries(data?.itineraries || []);
    } catch (error) {
      console.log("Error fetching itineraries:", error);
      setItineraries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItineraries();
  }, []);

  const handleNew = () => {
    navigate("/upload");
  };

  const count = itineraries.length;

  return (
    <div className="min-h-screen bg-gray-50/60 font-sans">
      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Page header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              My Trips
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {loading
                ? "Loading your itineraries…"
                : count === 0
                ? "Plan your next adventure with AI"
                : `${count} AI-crafted ${
                    count === 1 ? "itinerary" : "itineraries"
                  }`}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {count > 0 && (
              <span className="hidden sm:inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                {count} {count === 1 ? "trip" : "trips"}
              </span>
            )}

            <button
              onClick={handleNew}
              className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 active:scale-95 transition-all duration-150 shadow-sm"
            >
              <PlusIcon />

              <span className="hidden sm:inline">New Itinerary</span>

              <span className="sm:hidden">New</span>
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          ) : itineraries.length === 0 ? (
            <EmptyState onNew={handleNew} />
          ) : (
            itineraries.map((trip) => (
              <TripCard
                key={trip._id}
                trip={trip}
                onClick={() => navigate(`/itineraries/${trip._id}`)}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;