import React from "react";

function PageContainer({ screen, children }) {
  const isMobileView = document.body.clientWidth <= 768;
  return (
    <div
      className={
        isMobileView
          ? "h-full px-2"
          : "px-2 h-full"
      }
    >
      {children}
    </div>
  );
}

export default PageContainer;