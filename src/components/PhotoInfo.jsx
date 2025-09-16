import React from "react";
import DownloadOptions from "./DownloadOptions";
import "./PhotoInfo.css";


const PhotoInfo = ({ photo, onDownload }) => {
  if (!photo || !photo.src) return null;

  return (
    <div className="photo-info">
      <img
        className="photo-info__image"
        src={photo.src.large}
        alt={photo.alt || "Photo"}
      />

      <div className="photo-info__details">
        <h2>{photo.photographer}</h2>
        
       

        {/* Replace old download button with DownloadOptions component */}
        <DownloadOptions photo={photo} />
      </div>
    </div>
  );
};

export default PhotoInfo;

