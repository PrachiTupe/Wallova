import React, { useState, useEffect, useRef } from "react";
import "./DownloadOptions.css";

const DownloadOptions = ({ photo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("large"); // default Large
  const dropdownRef = useRef(null);

  // ✅ Only 4 sizes
  const sizeMap = {
    original: { label: "Original", desc: "Full resolution" },
    large: { label: "Large", desc: "≈ 940px wide" },
    medium: { label: "Medium", desc: "≈ 350px wide" },
    small: { label: "Small", desc: "≈ 130px wide" },
  };

  // ✅ Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Do the null check AFTER hooks
  if (!photo || !photo.src) return null;

  const handleDownload = async () => {
    try {
      const res = await fetch(photo.src[selectedSize]);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `photo-${photo.id}-${selectedSize}.jpg`;
      link.click();

      URL.revokeObjectURL(url); // cleanup
      setIsOpen(false); // close dropdown after download
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  return (
    <div className="download-options" ref={dropdownRef}>
      <button
        className="download-main-btn"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Download ▼
      </button>

      {isOpen && (
        <div className="download-dropdown">
          <p className="dropdown-title">Choose a size:</p>
          <ul className="download-size-list">
            {Object.keys(sizeMap).map(
              (size) =>
                photo.src[size] && (
                  <li key={size} className="download-size-item">
                    <label>
                      <input
                        type="radio"
                        name="photo-size"
                        value={size}
                        checked={selectedSize === size}
                        onChange={() => setSelectedSize(size)}
                      />
                      <span>
                        <strong>{sizeMap[size].label}</strong> – {sizeMap[size].desc}
                      </span>
                    </label>
                  </li>
                )
            )}
          </ul>
          <button className="download-select-btn" onClick={handleDownload}>
            Download {sizeMap[selectedSize].label}
          </button>
        </div>
      )}
    </div>
  );
};

export default DownloadOptions;
