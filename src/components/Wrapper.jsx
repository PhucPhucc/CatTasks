import React from "react";

const Wrapper = ({ children }) => {
  return (
    <div className="min-h-screen w-full relative bg-white overflow-hidden">
      {/* Background fixed theo viewport */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: "#ffffff",
          backgroundImage: `
            radial-gradient(
              circle at top center,
              rgba(255, 140, 60, 0.5),
              transparent 70%
            )
          `,
          filter: "blur(80px)",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default Wrapper;
