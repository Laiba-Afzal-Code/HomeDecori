import React, { useEffect, useState } from "react";

function WorldClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
  
      <p  className="conp">
        {time.toLocaleTimeString()}
      </p>
      {/* <p>{time.toDateString()}</p> */}
    </div>
  );
}

export default WorldClock;
