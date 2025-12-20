import React from "react";

const Wrapper = ({ darkmode, children }) => {
  if (darkmode) {
    return <DarkMode>{children}</DarkMode>;
  }
  return <LightMode>{children}</LightMode>;
};

const DarkMode = ({ children }) => {
  return (
    <div className="min-h-screen w-full relative dark">
      {/* Crimson Depth */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 100%, #000000 40%, #2b0707 100%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

const LightMode = ({ children }) => {
  return (
    <div className="min-h-screen w-full relative bg-white overflow-hidden">
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
