import React from "react";
import "./VideoCard.css";

const VideoCard = ({ video, onClick }) => {
  if (!video) return null;

  // get the first video file as thumbnail
  const thumbnail = video.image || (video.video_files && video.video_files[0]?.link);

  return (
    <div className="video-card" onClick={() => onClick(video)}>
      <div className="video-card__thumbnail">
        <img src={thumbnail} alt={video.user?.name || "Video"} />
        {video.duration && (
          <span className="video-card__duration">
            {Math.floor(video.duration / 60)}:{video.duration % 60 < 10 ? "0" : ""}
            {video.duration % 60} min
          </span>
        )}
      </div>
      <div className="video-card__info">
        <h4>{video.user?.name || "Unknown"}</h4>
      </div>
    </div>
  );
};

export default VideoCard;
