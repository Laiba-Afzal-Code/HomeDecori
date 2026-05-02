import { useState } from "react";
import Navbar from "../Minicompo/Navbar/Navbar";
import Footer from "../Footer/Footer";

export function BudgetCalculator() {
  const [budget, setBudget] = useState("");
  const [spent, setSpent] = useState("");
  const [remaining, setRemaining] = useState(null);

  const calc = () => {
    setRemaining(budget - spent);
  };

  return (
    <>
    <Navbar/>
     <div className="pagecard">

    <div className="card">
      <h2>Budget Calculator</h2>

      <input className="input" placeholder="Total Budget" onChange={(e) => setBudget(e.target.value)} />
      <input className="input" placeholder="Spent Amount" onChange={(e) => setSpent(e.target.value)} />

      <button className="button" onClick={calc}>Calculate</button>

      {remaining !== null && <p>Remaining: ${remaining}</p>}
    </div>
     </div>
    <Footer/>
    </>
  );
}