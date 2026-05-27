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

      setResult(data);
    } catch (error) {
      console.log("Upload Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div className="min-h-screen bg-gray-50/60">
      <main className="mx-auto max-w-6xl px-6 py-10">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center cursor-pointer gap-1.5 text-sm text-gray-900 hover:text-gray-700 transition-colors duration-150 mb-1"
        >
          <ArrowLeftIcon/>
          Back to trips
        </button>
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
              Upload Booking
            </h1>

            <p className="mt-2 text-sm text-gray-500 max-w-lg leading-relaxed">
              Upload your flight ticket, hotel booking, or travel document and
              let AI generate a beautiful itinerary for your trip.
            </p>
          </div>

          
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

                {uploadedFile && (
                  <div className="mt-6 rounded-xl bg-indigo-50 px-4 py-3 text-sm text-indigo-700 border border-indigo-100">
                    Selected File:{" "}
                    <span className="font-medium">
                      {uploadedFile.name}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {loading && (
              <div className="mt-8 rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
                <div className="flex items-center gap-3 text-indigo-700">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-indigo-600 border-t-transparent" />

                  <div>
                    <p className="font-medium">
                      Generating AI itinerary...
                    </p>

                    <p className="text-sm text-indigo-500 mt-1">
                      Analyzing your travel document
                    </p>
                  </div>
                </div>
              </div>
            )}

            {result && (
              <div className="mt-10 grid gap-6 lg:grid-cols-2">
                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
                      <SparklesIcon />
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        Trip Details
                      </h2>

                      <p className="text-sm text-gray-500">
                        Structured travel information
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-gray-50 p-4 overflow-auto">
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                      {JSON.stringify(
                        result?.structuredData,
                        null,
                        2
                      )}
                    </pre>
                  </div>
                </div>

                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                      <SparklesIcon />
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        AI Itinerary
                      </h2>

                      <p className="text-sm text-gray-500">
                        Personalized travel plan
                      </p>
                    </div>
                  </div>

                  <div className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-strong:text-gray-900">
                    <ReactMarkdown>
                      {result?.itinerary?.itinerary || ""}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Upload;