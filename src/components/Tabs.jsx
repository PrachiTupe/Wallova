import React from "react";
import { useState, useEffect } from "react";
import "./Tabs.css";

const Tabs = ({ activeTab, setActiveTab }) => {

  const [indicatorStyle, setIndicatorStyle] = useState({});

  useEffect(() => {
    const activeBtn = document.querySelector(".tab-btn.active");
    if (activeBtn) {
      setIndicatorStyle({
        width: `${activeBtn.offsetWidth}px`,
        left: `${activeBtn.offsetLeft}px`,
      });
    }
  }, [activeTab]);

  return (
    <div className="tabs">
      <div className="tab-indicator" style={indicatorStyle}></div>
      <button
        className={`tab-btn ${activeTab === "photo" ? "active" : ""}`}
        onClick={() => setActiveTab("photo")}
      >
        Photos
      </button>
      <button
        className={`tab-btn ${activeTab === "video" ? "active" : ""}`}
        onClick={() => setActiveTab("video")}
      >
        Videos
      </button>
    </div>
  );
};

export default Tabs;
