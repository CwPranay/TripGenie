import { useCallback, useState }
    from "react";

import { useDropzone }
    from "react-dropzone";
import ReactMarkdown from "react-markdown";

import API from "../api/axios";

const Upload = () => {

    const [loading, setLoading] =
        useState(false);

    const [result, setResult] =
        useState(null);

    const onDrop = useCallback(
        async (acceptedFiles) => {

            const file = acceptedFiles[0];

            if (!file) return;

            const formData = new FormData();

            formData.append(
                "document",
                file
            );

            try {

                setLoading(true);

                const { data } =
                    await API.post(
                        "/upload",
                        formData,
                        {
                            headers: {
                                "Content-Type":
                                    "multipart/form-data",
                            },
                        }
                    );

                setResult(data);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);
            }
        },
        []
    );

    const {
        getRootProps,
        getInputProps,
        isDragActive,
    } = useDropzone({
        onDrop,
    });

    return (
        <div className="min-h-screen p-6">

            <h1 className="text-3xl font-bold mb-8">
                Upload Travel Booking
            </h1>

            {/* DROPZONE */}

            <div
                {...getRootProps()}
                className={`
          border-2 border-dashed
          rounded-2xl
          p-16
          text-center
          cursor-pointer
          transition
          ${isDragActive
                        ? "border-black bg-gray-100"
                        : "border-gray-300"
                    }
        `}
            >

                <input {...getInputProps()} />

                <p className="text-lg">
                    Drag & drop PDF/image here
                </p>

            </div>

            {/* LOADING */}

            {loading && (

                <div className="mt-8">
                    Generating itinerary...
                </div>
            )}

            {/* RESULT */}

            {result && (

                <div className="mt-10 space-y-6">

                    {/* STRUCTURED DATA */}

                    <div className="border rounded-2xl p-5">

                        <h2 className="text-2xl font-bold mb-4">
                            Trip Details
                        </h2>

                        <pre className="whitespace-pre-wrap">
                            {JSON.stringify(
                                result.structuredData,
                                null,
                                2
                            )}
                        </pre>

                    </div>

                    {/* ITINERARY */}

                    <div className="border rounded-2xl p-5">

                        <h2 className="text-2xl font-bold mb-4">
                            AI Itinerary
                        </h2>

                        <div className="prose max-w-none">
                            <ReactMarkdown>
                                {result.itinerary.itinerary}
                            </ReactMarkdown>
                        </div>

                    </div>

                </div>
            )}

        </div>
    );
};

export default Upload;