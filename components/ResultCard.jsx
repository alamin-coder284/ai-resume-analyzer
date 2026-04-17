"use client";
import { useEffect, useRef } from "react";

function ResultList({ items }) {
  if (!Array.isArray(items) || items.length === 0) {
    return <div className="w3-list-row w3-muted">Not provided</div>;
  }

  return (
    <div className="w3-list-box">
      {items.map((item, index) => (
        <div key={`${item}-${index}`} className="w3-list-row text-[15px] leading-7 text-black">
          {item}
        </div>
      ))}
    </div>
  );
}

export default function ResultCard({ analysis }) {

  const bottomRef = useRef(null);

   useEffect(()=>{
    if (analysis) {
      setTimeout(()=>{
        bottomRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end'
        });
      },300);
    }
  }, [analysis]);



  if (!analysis) {
    return null;
  }



  const score = analysis.ATS_Score ?? analysis.atsScore ?? analysis.score ?? "N/A";

  return (
    <section className="mt-8 w3-card-panel p-6">
      <div className="mb-6 flex flex-col gap-4 border-b border-[#e5e5e5] pb-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="mb-2 text-3xl font-bold text-black">Gemini Resume Review</h2>
          <p className="w3-muted text-[15px]">Your results appear instantly below after analysis.</p>
        </div>
        <div className="w3-chip text-base">ATS Score: {score}</div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="w3-section-title mb-3 text-2xl font-bold">Strengths</h3>
          <ResultList items={analysis.Strengths} />
        </div>

        <div>
          <h3 className="w3-section-title mb-3 text-2xl font-bold">Weaknesses</h3>
          <ResultList items={analysis.Weaknesses} />
        </div>

        <div>
          <h3 className="w3-section-title mb-3 text-2xl font-bold">Missing Keywords</h3>
          <ResultList items={analysis.Missing_Keywords} />
        </div>

        <div>
          <h3 className="w3-section-title mb-3 text-2xl font-bold">Suggestions</h3>
          <ResultList items={analysis.Suggestions} />
        </div>

        <div>
          <h3 className="w3-section-title mb-3 text-2xl font-bold">Recommended Skills</h3>
          <ResultList items={analysis.Recommended_Skills} />
        </div>

        <div>
          <h3 className="w3-section-title mb-3 text-2xl font-bold">Formatting and Grammar</h3>
          <ResultList items={analysis.Formatting_and_Grammar_Feedback} />
        </div>
      </div>

      <div className="mt-8">
        <h3 className="w3-section-title mb-3 text-2xl font-bold">Professional Summary</h3>
        <div className="w3-summary-box text-[15px] leading-7 text-black">
          {analysis.Professional_Summary || "Not provided"}
        </div>
      </div>
       
      <div className="mt-8">
         <button
              onClick={()=>{
                window.location.reload();
              }}
             
              className="w3-button w3-button-dark mt-6 text-[15px] font-semibold"
            >
              Next
            </button>
        </div>  

      <div ref={bottomRef} />
    </section>
  );
}
