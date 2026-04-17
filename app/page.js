import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="w3-hero">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <h1 className="mb-4 text-5xl font-bold text-black">AI Resume Analyzer</h1>
          <p className="mx-auto mb-8 max-w-3xl text-lg text-[#5f5f5f]">
            Review your resume the simple way. Upload your file, paste a job description,
            and get an instant ATS-style response in a layout inspired by W3Schools.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/upload" className="w3-button w3-button-primary text-base font-semibold">
              Start Analyzing
            </Link>
            <span className="w3-chip">Fast, clean, instant</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-6 md:grid-cols-3">
          <article className="w3-card-panel p-6">
            <h2 className="w3-section-title mb-4 text-2xl font-bold">1. Upload Resume</h2>
            <p className="w3-muted text-[15px] leading-7">
              Choose a PDF or DOCX file and extract the resume text directly in the browser flow.
            </p>
          </article>

          <article className="w3-card-panel p-6">
            <h2 className="w3-section-title mb-4 text-2xl font-bold">2. Add Job Role</h2>
            <p className="w3-muted text-[15px] leading-7">
              Paste the job description to compare your skills, keywords, and fit against the role.
            </p>
          </article>

          <article className="w3-card-panel p-6">
            <h2 className="w3-section-title mb-4 text-2xl font-bold">3. Read Results</h2>
            <p className="w3-muted text-[15px] leading-7">
              See your score, strengths, weaknesses, missing keywords, and a rewritten summary.
            </p>
          </article>
        </div>

        <div className="mt-8 w3-note">
          <h3 className="mb-2 text-2xl font-bold">Tip</h3>
          <p className="text-[15px] leading-7">
            For the best output, upload a text-based resume and paste a real job description before running the analysis.
          </p>
        </div>

        <footer
        className="mt-12 text-center text-[12px]"
        >Open Source, {(new Date).getFullYear()} - Created With 💗 By Md Alamin. W3.CSS Theme is used.</footer>
      </section>
    </main>
  );
}
