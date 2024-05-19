import React from "react";

interface HintProps {
  hint: string;
}

const Hint: React.FC<HintProps> = ({ hint }) => {
  let color = "";
  if (hint === "Correct Type" || hint === "Correct Generation") {
    color = "green";
  } else if (
    hint === "Wrong Type" ||
    hint === "Higher Generation" ||
    hint === "Lower Generation"
  ) {
    color = "yellow";
  } else {
    color = "red";
  }

  return (
    <div className="hint" style={{ backgroundColor: color }}>
      {hint}
    </div>
  );
};

export default Hint;
