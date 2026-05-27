import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import ReactMarkdown from "react-markdown";


const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clipRule="evenodd" />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
  </svg>
);

const PlaneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
  </svg>
);

const HotelIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M11.584 2.376a.75.75 0 01.832 0l9 6a.75.75 0 11-.832 1.248L12 3.901 3.416 9.624a.75.75 0 01-.832-1.248l9-6z" />
    <path fillRule="evenodd" d="M20.25 10.332v9.918H21a.75.75 0 010 1.5H3a.75.75 0 010-1.5h.75v-9.918a.75.75 0 01.634-.74A49.109 49.109 0 0112 9c2.59 0 5.134.202 7.616.592a.75.75 0 01.634.74zm-7.5 2.418a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75zm3-.75a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0v-6.75a.75.75 0 01.75-.75zM9 12.75a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75z" clipRule="evenodd" />
  </svg>
);

const LinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M19.902 4.098a3.75 3.75 0 00-5.304 0l-4.5 4.5a3.75 3.75 0 001.035 6.037.75.75 0 01-.646 1.353 5.25 5.25 0 01-1.449-8.45l4.5-4.5a5.25 5.25 0 117.424 7.424l-1.757 1.757a.75.75 0 11-1.06-1.06l1.757-1.757a3.75 3.75 0 000-5.304zm-7.389 4.267a.75.75 0 011-.353 5.25 5.25 0 011.449 8.45l-4.5 4.5a5.25 5.25 0 11-7.424-7.424l1.757-1.757a.75.75 0 111.06 1.06l-1.757 1.757a3.75 3.75 0 105.304 5.304l4.5-4.5a3.75 3.75 0 00-1.035-6.037.75.75 0 01-.353-1z" clipRule="evenodd" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
  </svg>
);

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5z" clipRule="evenodd" />
  </svg>
);


const formatDate = (raw) => {
  if (!raw) return null;
  try {
    return new Date(raw).toLocaleDateString("en-US", {
      weekday: "long", month: "long", day: "numeric", year: "numeric",
    });
  } catch { return raw; }
};

const Skeleton = () => (
  <div className="min-h-screen bg-gray-50/60 py-10 px-4">
    <div className="max-w-4xl mx-auto space-y-5 animate-pulse">
      <div className="h-4 w-20 rounded-full bg-gray-200" />
      <div className="rounded-3xl bg-white border border-gray-100 shadow-sm p-8 space-y-4">
        <div className="h-8 w-48 rounded-lg bg-gray-100" />
        <div className="h-4 w-32 rounded-full bg-gray-100" />
      </div>
      <div className="rounded-3xl bg-white border border-gray-100 shadow-sm p-8 space-y-4">
        <div className="h-5 w-28 rounded-lg bg-gray-100" />
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="h-4 w-16 rounded bg-gray-100" />
            <div className="h-4 w-40 rounded bg-gray-100" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-16 rounded bg-gray-100" />
            <div className="h-4 w-40 rounded bg-gray-100" />
          </div>
        </div>
      </div>
      <div className="rounded-3xl bg-white border border-gray-100 shadow-sm p-8 space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={`h-3.5 rounded bg-gray-100 ${i % 3 === 2 ? "w-2/3" : "w-full"}`} />
        ))}
      </div>
    </div>
  </div>
);


const DetailRow = ({ icon: Icon, label, value, accent }) => {
  if (!value) return null;
  return (
    <div className={`flex items-start gap-3 rounded-2xl p-4 ${accent}`}>
      <span className="mt-0.5 text-gray-400">
        <Icon />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-0.5">{label}</p>
        <p className="text-sm font-medium text-gray-800 leading-snug">{value}</p>
      </div>
    </div>
  );
};


const mdComponents = {
  h1: ({ children }) => (
    <h1 className="text-xl font-semibold text-gray-900 mt-8 mb-3 first:mt-0">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-lg font-semibold text-gray-900 mt-7 mb-2.5 first:mt-0 flex items-center gap-2">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-base font-semibold text-gray-800 mt-5 mb-2">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-sm text-gray-600 leading-relaxed mb-3">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="space-y-1.5 mb-4 ml-1">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="space-y-1.5 mb-4 ml-1 list-decimal list-inside">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed">
      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gray-300 flex-shrink-0" />
      <span>{children}</span>
    </li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-gray-800">{children}</strong>
  ),
  hr: () => <hr className="my-6 border-gray-100" />,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-indigo-200 pl-4 my-4 text-sm text-gray-500 italic">
      {children}
    </blockquote>
  ),
};


const ItineraryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState();
  const [copied, setCopied] = useState(false);

  const fetchTrip = async () => {
    try {
      const { data } = await API.get(`itineraries/${id}`);
      setTrip(data.itinerary);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTrip();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/share/${trip.shareId}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!trip) return <Skeleton />;

  const destination = trip.structuredData?.destination;
  const startDate = formatDate(trip.structuredData?.startDate);

  return (
    <div className="min-h-screen bg-gray-50/60 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-5">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center cursor-pointer gap-1.5 text-sm text-gray-900 hover:text-gray-700 transition-colors duration-150 mb-1"
        >
          <ArrowLeftIcon />
          Back to trips
        </button>

        
        <div className="rounded-3xl border border-gray-100 bg-white shadow-sm overflow-hidden">
          
        
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 p-8">
            <div>
              <p className="text-xs font-medium text-indigo-500 uppercase tracking-widest mb-2">
                Itinerary
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-gray-900 leading-tight">
                {destination ?? "Untitled Trip"}
              </h1>
              {startDate && (
                <div className="flex items-center gap-1.5 mt-2.5 text-sm text-gray-400">
                  <CalendarIcon />
                  <span>{startDate}</span>
                </div>
              )}
            </div>

           
            <button
              onClick={handleCopy}
              className={`flex-shrink-0 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                copied
                  ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                  : "bg-gray-900 text-white hover:bg-gray-700 active:scale-95 shadow-sm"
              }`}
            >
              {copied ? <CheckIcon /> : <LinkIcon />}
              {copied ? "Copied!" : "Copy link"}
            </button>
          </div>
        </div>

        
        <div className="rounded-3xl border border-gray-100 bg-white shadow-sm p-8">
          <h2 className="text-base font-semibold text-gray-900 mb-5 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
              <CalendarIcon />
            </span>
            Trip Details
          </h2>

          <div className="grid sm:grid-cols-2 gap-3">
            <DetailRow
              icon={PlaneIcon}
              label="Flight"
              value={trip.structuredData?.flight}
              accent="bg-sky-50/60"
            />
            <DetailRow
              icon={HotelIcon}
              label="Hotel"
              value={trip.structuredData?.hotel || "Not specified"}
              accent="bg-indigo-50/60"
            />
          </div>
        </div>

       
        <div className="rounded-3xl border border-gray-100 bg-white shadow-sm p-8">
          <h2 className="text-base font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-50 text-indigo-500">
              <SparklesIcon />
            </span>
            AI Itinerary
          </h2>

          <div className="divide-y divide-gray-50">
            <ReactMarkdown components={mdComponents}>
              {trip.itinerary}
            </ReactMarkdown>
          </div>
        </div>

        
        <div className="h-6" />
      </div>
    </div>
  );
};

export default ItineraryDetail;