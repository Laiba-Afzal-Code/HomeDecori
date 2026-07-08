import React from "react";
import "./naqsha.css";
export default function NaqshaPreview({ plan, loading }) {
  if (loading) return <div className="preview">Generating...</div>;

  if (!plan) return <div className="preview">No Plan Yet</div>;

  return (
    <div className="preview">
      <h2>Generated Plan</h2>

      <h3>Ground Floor</h3>
      <ul>
        {plan.groundFloor?.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      {plan.firstFloor && (
        <>
          <h3>First Floor</h3>
          <ul>
            {plan.firstFloor.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}