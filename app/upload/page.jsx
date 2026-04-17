"use client";

import { useState } from "react";
import ResultCard from "@/components/ResultCard";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileUpload = async () => {
    if (!file) {
      setError("Please upload a resume.");
      return;
    }

    setUploading(true);
    setError("");
    setResumeText("");

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const responseText = await res.text();

      if (!responseText) {
        throw new Error("Server returned an empty response.");
      }

      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        console.error("Invalid JSON:", responseText);
        throw new Error("Invalid response from server.");
      }

      if (!res.ok) {
        throw new Error(data.error || "Failed to upload resume.");
      }

      if (data.text) {
        setResumeText(data.text);
      } else {
        throw new Error("No text extracted from the resume.");
      }
    } catch (err) {
      console.error("Upload Error:", err);
      setError(err instanceof Error ? err.message : "Failed to upload resume.");
    } finally {
      setUploading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!resumeText) {
      setError("Please extract resume text first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText,
          jobDescription,
        }),
      });

      const responseText = await res.text();

      if (!responseText) {
        throw new Error("Server returned an empty response.");
      }

      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error("Invalid response from analysis server.");
      }

      if (!res.ok) {
        throw new Error(data.error || "Failed to analyze resume.");
      }

      setResult(data.analysis);
    } catch (err) {
      console.error("Analysis Error:", err);
      setError(err instanceof Error ? err.message : "Failed to analyze resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="w3-card-panel p-6 md:p-8">
        <h1 className="mb-2 text-4xl font-bold text-black">Upload Resume</h1>
        <p className="mb-6 text-[15px] leading-7 text-[#5f5f5f]">
          Extract your resume text, add a target job description, and view the Gemini response instantly.
        </p>

        {error && <div className="w3-error mb-6">{error}</div>}

        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="w3-section-title mb-4 text-2xl font-bold">Resume File</h2>
            <input
              type="file"
              accept=".pdf,.docx"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="w3-file mb-4"
            />
            <button
              onClick={handleFileUpload}
              disabled={uploading}
              className="w3-button w3-button-primary text-[15px] font-semibold"
            >
              {uploading ? "Extracting..." : "Extract Text"}
            </button>

            <h2 className="w3-section-title mb-4 mt-8 text-2xl font-bold">Resume Text</h2>
            <textarea
              className="w3-textarea"
              style={{resize: 'none'}}
              rows="11"
              placeholder="Extracted resume text will appear here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            />
          </div>

          <div>
            <h2 className="w3-section-title mb-4 text-2xl font-bold">Job Description</h2>
            <textarea
              className="w3-textarea"
              rows="10"
              style={{resize: 'none'}}
              placeholder="Paste job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />

            <div className="w3-note mt-6">
              <h3 className="mb-2 text-xl font-bold">How it works</h3>
              <p className="text-[15px] leading-7">
                First extract the resume text, then click analyze. The response is shown immediately below as a styled results component.
              </p>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="w3-button w3-button-dark mt-6 text-[15px] font-semibold"
            >
              {loading ? "Analyzing..." : "Analyze Resume"}
            </button>
          </div>
        </div>
      </div>

      <ResultCard analysis={result} />
    </main>
  );
}
