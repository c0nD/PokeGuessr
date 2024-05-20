import React from 'react';

interface HintProps {
  hint: string;
}

const Hint: React.FC<HintProps> = ({ hint }) => {
  let colorClass = '';
  if (hint.startsWith('Correct')) {
    colorClass = 'green';
  } else if (hint.startsWith('Partially Correct') || hint.startsWith('Close')) {
    colorClass = 'yellow';
  } else {
    colorClass = 'red';
  }

  return (
    <div className={`hint ${colorClass}`}>
      {hint}
    </div>
  );
};

export default Hint;
