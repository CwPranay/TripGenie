import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";

import API from "../api/axios";

const UploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.8}
    stroke="currentColor"
    className="w-10 h-10"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 16.5V3m0 0l-4.5 4.5M12 3l4.5 4.5M3 15.75v.75A2.25 2.25 0 005.25 18.75h13.5A2.25 2.25 0 0021 16.5v-.75"
    />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clipRule="evenodd" />
  </svg>
);

const SparklesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path
      fillRule="evenodd"
      d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5z"
      clipRule="evenodd"
    />
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

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
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

const DetailRow = ({ icon: Icon, label, value, accent }) => {
  if (!value) return null;
  return (
    <div className={`flex items-start gap-3 rounded-xl p-4 ${accent}`}>
      <span className="mt-0.5 text-sky-600">
        <Icon />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{label}</p>
        <p className="text-sm font-medium text-gray-900 leading-snug">{value}</p>
      </div>
    </div>
  );
};

const mdComponents = {
  h1: ({ children }) => (
    <h1 className="text-2xl font-bold text-gray-900 mt-8 mb-4 first:mt-0 pb-3 border-b-2 border-indigo-100">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3 first:mt-0 flex items-center gap-2.5">
      <span className="inline-block h-2 w-2 rounded-full bg-indigo-500 flex-shrink-0" />
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2.5 flex items-center gap-2">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-sky-400 flex-shrink-0" />
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-sm text-gray-700 leading-relaxed mb-4">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="space-y-2 mb-5 ml-1">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="space-y-2 mb-5 ml-1 list-decimal list-inside">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="flex items-start gap-2.5 text-sm text-gray-700 leading-relaxed pl-1">
      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
      <span className="flex-1">{children}</span>
    </li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-gray-900">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-gray-600">{children}</em>
  ),
  hr: () => <hr className="my-8 border-gray-200" />,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-indigo-300 bg-indigo-50 pl-4 py-3 my-5 text-sm text-gray-700 italic rounded-r-lg">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="bg-gray-100 text-indigo-600 px-1.5 py-0.5 rounded text-xs font-mono">
      {children}
    </code>
  ),
};

const Upload = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const navigate = useNavigate();

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (!file) return;

    setUploadedFile(file);

    const formData = new FormData();

    formData.append("document", file);

    try {
      setLoading(true);

      const { data } = await API.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResult(data.itinerary);
    } catch (error) {
      console.log("Upload Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    disabled: loading,
  });

  const handleNewUpload = () => {
    setResult(null);
    setUploadedFile(null);
  };

  const destination = result?.structuredData?.destination;
  const startDate = formatDate(result?.structuredData?.startDate);

  return (
    <div className="min-h-screen bg-gray-50/60">
      <main className="mx-auto max-w-4xl px-6 py-10">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center cursor-pointer gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-150 mb-2 group"
        >
          <ArrowLeftIcon />
          <span className="group-hover:underline">Back to trips</span>
        </button>

        {!result && !loading && (
          <>
            <div className="mb-10 mt-6">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Upload Booking
              </h1>

              <p className="mt-2 text-sm text-gray-500 max-w-lg leading-relaxed">
                Upload your flight ticket, hotel booking, or travel document and
                let AI generate a beautiful itinerary for your trip.
              </p>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-white shadow-sm overflow-hidden">
              <div className="h-1.5 w-full bg-sky-400 " />

              <div className="p-8">
                <div
                  {...getRootProps()}
                  className={`
                    relative
                    border-2
                    border-dashed
                    rounded-3xl
                    p-16
                    text-center
                    cursor-pointer
                    transition-all
                    duration-200
                    group
                    ${
                      isDragActive
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50"
                    }
                  `}
                >
                  <input {...getInputProps()} />

                  <div className="flex flex-col items-center">
                    <div
                      className={`
                        flex items-center justify-center
                        w-20 h-20
                        rounded-2xl
                        mb-6
                        transition
                        ${
                          isDragActive
                            ? "bg-indigo-100 text-indigo-600"
                            : "bg-gray-100 text-gray-500 group-hover:bg-indigo-100 group-hover:text-indigo-600"
                        }
                      `}
                    >
                      <UploadIcon />
                    </div>

                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {isDragActive
                        ? "Drop your file here"
                        : "Upload travel document"}
                    </h2>

                    <p className="text-sm text-gray-500 max-w-md leading-relaxed">
                      Drag & drop your PDF, booking screenshot, hotel reservation,
                      or travel image here.
                    </p>

                    <div className="mt-6 inline-flex items-center rounded-full bg-gray-100 px-4 py-2 text-xs font-medium text-gray-600">
                      PDF • JPG • PNG
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {loading && (
          <div className="mt-6 space-y-6">
            <div className="rounded-3xl border border-gray-100 bg-white shadow-sm overflow-hidden">
              <div className="h-1.5 w-full bg-sky-400 " />

              <div className="p-8">
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="h-16 w-16 animate-spin rounded-full border-4 border-sky-500 border-t-transparent mb-6" />

                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Generating AI itinerary...
                  </h2>

                  <p className="text-sm text-gray-500 max-w-md text-center leading-relaxed">
                    Analyzing your travel document and creating a personalized travel plan
                  </p>

                  {uploadedFile && (
                    <div className="mt-6 rounded-xl bg-indigo-50 px-4 py-3 text-sm text-indigo-700 border border-indigo-100">
                      Processing: <span className="font-medium">{uploadedFile.name}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {result && (
          <div className="space-y-6 mt-6">
            <div className="rounded-3xl border border-gray-200 bg-white shadow-lg overflow-hidden">
              <div className="h-32 bg-sky-500 relative">
                <div className="absolute inset-0 bg-black/5" />
                <div className="absolute bottom-0 left-0 right-0 p-8 pb-6 flex items-end justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white mb-3 border border-white/30">
                      <SparklesIcon />
                      AI Generated Itinerary
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-white leading-tight drop-shadow-lg">
                      {destination ?? "Untitled Trip"}
                    </h1>
                  </div>
                  <button
                    onClick={handleNewUpload}
                    className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50 active:scale-95 transition-all duration-150 shadow-sm"
                  >
                    <PlusIcon />
                    New Upload
                  </button>
                </div>
              </div>
              
              <div className="p-8 pt-6">
                <div className="flex flex-wrap items-center gap-3">
                  {startDate && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
                      <CalendarIcon />
                      <span className="font-medium">{startDate}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500 text-white shadow-sm">
                  <CalendarIcon />
                </span>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Trip Details</h2>
                  <p className="text-xs text-gray-500">Essential information</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <DetailRow
                  icon={PlaneIcon}
                  label="Flight"
                  value={result.structuredData?.flight}
                  accent="bg-sky-50 border border-sky-100"
                />
                <DetailRow
                  icon={HotelIcon}
                  label="Hotel"
                  value={result.structuredData?.hotel || "Not specified"}
                  accent="bg-indigo-50 border border-indigo-100"
                />
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white shadow-lg p-8">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500 text-white shadow-sm">
                  <SparklesIcon />
                </span>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Your Itinerary</h2>
                  <p className="text-xs text-gray-500">AI-crafted travel plan</p>
                </div>
              </div>

              <div className="prose prose-sm max-w-none">
                <ReactMarkdown components={mdComponents}>
                  {result.itinerary}
                </ReactMarkdown>
              </div>
            </div>

            <div className="h-6" />
          </div>
        )}
      </main>
    </div>
  );
};

export default Upload;
