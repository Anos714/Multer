import React from "react";

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg p-6 ${className}`}
  >
    {children}
  </div>
);
