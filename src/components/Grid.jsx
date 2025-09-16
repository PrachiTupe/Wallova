import React from "react";
import PhotoCard from "./PhotoCard";
import VideoCard from "./VideoCard"; // make sure to create this component
import "./Grid.css";

const Grid = ({ items, type, onItemClick }) => {
  if (!items || items.length === 0) {
    return <p className="no-items">No {type === "photo" ? "photos" : "videos"} found.</p>;
  }

  return (
    <div className="masonry-grid">
      {type === "photo"
        ? items.map((photo) => (
            <div className="masonry-item" key={photo.id}>
              <PhotoCard photo={photo} onClick={onItemClick} />
            </div>
          ))
        : items.map((video) => (
            <div className="masonry-item" key={video.id}>
              <VideoCard video={video} onClick={onItemClick} />
            </div>
          ))}
    </div>
  );
};

export default Grid;
