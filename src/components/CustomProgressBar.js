import React, { useEffect, useState } from "react";

function CustomProgressBar({ width }) {
  return (
    <div className="progress">
      <div
        className="progress-done"
        style={width ? { width: width + "%" } : ""}
      >
        {width}%<div className="progress-bar-running"></div>
      </div>
    </div>
  );
}

export default CustomProgressBar;
