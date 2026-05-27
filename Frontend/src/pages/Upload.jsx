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
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4"
  >
    <path
      fillRule="evenodd"
      d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
      clipRule="evenodd"
    />
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

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path
      fillRule="evenodd"
      d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
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

    setResult(null);

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

  const resetUpload = () => {
    setUploadedFile(null);
    setResult(null);
    setLoading(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div className="min-h-screen bg-gray-50/60">
      <main className="mx-auto max-w-7xl px-6 py-10">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center cursor-pointer gap-1.5 text-sm text-gray-900 hover:text-gray-700 transition-colors duration-150 mb-6"
        >
          <ArrowLeftIcon />
          Back to trips
        </button>

        <div className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
            Upload Booking
          </h1>

          <p className="mt-2 text-sm text-gray-500 max-w-2xl leading-relaxed">
            Upload your travel booking or reservation and generate a clean,
            AI-powered itinerary instantly.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          {/* LEFT SIDE */}
          <div className="rounded-3xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            <div className="h-1.5 w-full bg-sky-400" />

            <div className="p-8">
              {/* Upload State */}
              {!result && (
                <div
                  {...getRootProps()}
                  className={`
                    relative
                    border-2
                    border-dashed
                    rounded-3xl
                    min-h-[420px]
                    flex
                    items-center
                    justify-center
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

                  <div className="flex flex-col items-center px-6">
                    {!loading ? (
                      <>
                        <div
                          className={`
                            flex items-center justify-center
                            w-24 h-24
                            rounded-3xl
                            mb-8
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

                        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                          {isDragActive
                            ? "Drop your file here"
                            : "Upload travel document"}
                        </h2>

                        <p className="text-sm text-gray-500 max-w-md leading-relaxed">
                          Upload your flight ticket, hotel reservation,
                          booking screenshot, or travel PDF and let AI
                          generate a personalized itinerary.
                        </p>

                        <div className="mt-6 inline-flex items-center rounded-full bg-gray-100 px-4 py-2 text-xs font-medium text-gray-600">
                          PDF • JPG • PNG
                        </div>

                        {uploadedFile && (
                          <div className="mt-6 rounded-2xl bg-indigo-50 px-5 py-4 text-sm text-indigo-700 border border-indigo-100">
                            Selected File:{" "}
                            <span className="font-semibold">
                              {uploadedFile.name}
                            </span>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="h-14 w-14 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent mb-6" />

                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                          Generating itinerary...
                        </h2>

                        <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
                          AI is analyzing your travel document and creating
                          a personalized travel plan.
                        </p>

                        {uploadedFile && (
                          <div className="mt-6 rounded-2xl bg-gray-100 px-5 py-4 text-sm text-gray-700">
                            {uploadedFile.name}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* RESULT */}
              {result && (
                <div className="space-y-6">
                  {/* HEADER */}
                  <div className="rounded-3xl border border-gray-100 bg-gray-50 p-6">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 text-indigo-700 px-3 py-1 text-xs font-medium mb-4">
                          <SparklesIcon />
                          AI Generated Itinerary
                        </div>

                        <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">
                          {result?.structuredData?.destination ||
                            "Untitled Trip"}
                        </h2>

                        <p className="mt-3 text-sm text-gray-500 leading-relaxed max-w-2xl">
                          Your personalized AI travel itinerary is ready.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ITINERARY */}
                  <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
                    <div className="prose prose-sm sm:prose lg:prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-strong:text-gray-900 prose-li:text-gray-600">
                      <ReactMarkdown>
                        {result?.itinerary?.itinerary || ""}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-gray-100 bg-white shadow-sm overflow-hidden">
              <div className="h-1.5 w-full bg-indigo-400" />

              <div className="p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                    <PlusIcon />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Upload New
                    </h3>

                    <p className="text-sm text-gray-500">
                      Generate another itinerary
                    </p>
                  </div>
                </div>

                <div
                  {...getRootProps()}
                  className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center cursor-pointer hover:border-indigo-300 hover:bg-gray-50 transition-all duration-200"
                >
                  <input {...getInputProps()} />

                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gray-100 text-gray-600 mb-4">
                      <UploadIcon />
                    </div>

                    <h4 className="text-sm font-semibold text-gray-900 mb-2">
                      Upload another file
                    </h4>

                    <p className="text-xs text-gray-500 leading-relaxed">
                      Drag & drop or click here
                    </p>
                  </div>
                </div>

                {result && (
                  <button
                    onClick={resetUpload}
                    className="w-full mt-5 rounded-2xl bg-gray-900 px-4 py-3 text-sm font-medium text-white hover:bg-gray-700 transition-all duration-150"
                  >
                    Clear Current Trip
                  </button>
                )}
              </div>
            </div>

            {uploadedFile && (
              <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Uploaded File
                </h3>

                <div className="rounded-2xl bg-gray-50 p-4 border border-gray-100">
                  <p className="text-sm font-medium text-gray-800 break-all">
                    {uploadedFile.name}
                  </p>

                  <p className="text-xs text-gray-500 mt-2">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
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