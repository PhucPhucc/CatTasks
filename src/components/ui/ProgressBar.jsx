import React from "react";

const ProgressBar = ({ progress }) => {
  return (
    <div className="mt-4">
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <p>Progress</p>
        <p>{Math.round(progress)}%</p>
      </div>
      <div className="h-2 w-full rounded-full mt-2 bg-muted overflow-hidden">
        <div className={` h-full bg-linear-to-r from-primary to-primary/0  transition-all duration-500 ease-out`} style={{width: `${progress}%`}}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
