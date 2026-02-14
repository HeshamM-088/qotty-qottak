import React from "react";

const Answer = ({ text }) => {
  return (
    <div className="bg-muted text-foreground font-bold p-3 rounded-lg animate-fade">
      {text}
    </div>
  );
};

export default Answer;
