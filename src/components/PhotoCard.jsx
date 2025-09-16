import React from "react";
import "./PhotoCard.css";
import { Download } from "lucide-react";

const PhotoCard = ({ photo, onClick }) => {
  const downloadUrl = photo.src.original;
//  console.log("photo: ", photo);

 return (
    <div className="photo-card" onClick={() => onClick(photo.id)}>
      <img
        src={photo.src.large}
        alt={photo.alt || photo.photographer}
        className="photo-image"
      />
      <div className="photo-overlay">
        <div className="photo-info">
          <p className="photo-title">{photo.alt || "Untitled"}</p>
          <p className="photo-photographer">~ {photo.photographer}</p>
        </div>
        <a
          href={downloadUrl}
          download
          className="photo-download"
          onClick={(e) => e.stopPropagation()}
        >
          <Download size={18} />
        </a>
      </div>
    </div>
  );
};

export default PhotoCard;
