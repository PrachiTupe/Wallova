import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getVideoDetails, getRelatedPhotos } from "../api/pexels";
import Grid from "../components/Grid";
import "./VideoDetails.css";


const VideoDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getVideoDetails(id);
        setVideo(res.data);
        console.log("Retrieved Video:", res);

        // For related videos/photos, using creator's name as placeholder
        if (res.data.user?.name) {
          const relatedData = await getRelatedPhotos(res.data.user.name);
          setRelated(relatedData.data.photos || []);
          console.log("Related videos/photos:", relatedData);
        }
      } catch (error) {
        console.error("Failed to fetch video details:", error);
      }
    };
    fetchData();
  }, [id]);

  if (!video) return <p>Loading...</p>;

  // Step: pick the best quality video
  const bestVideo = video.video_files?.reduce((prev, curr) => {
    return curr.width > prev.width ? curr : prev;
  }, video.video_files[0]);

  const handleDownload = () => {
    if (!bestVideo) return;
    const link = document.createElement("a");
    link.href = bestVideo.link;
    link.download = `video-${id}.mp4`;
    link.click();
  };

  const handleVideoClick = (item) => {
    navigate(`/video/${item.id}`);
  };

  return (
    <div className="video-details">
      <button onClick={() => navigate(-1)}>← Back</button>

      <div className="video-info">
        <video
          controls
          src={bestVideo?.link}
          poster={video.image}
          width="100%"
        />
        <h2>{video.user?.name || "Unknown Creator"}</h2>
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Video Page
        </a>
        <p>
          Duration: {video.duration
            ? `${Math.floor(video.duration / 60)}:${video.duration % 60 < 10 ? "0" : ""}${video.duration % 60} min`
            : "N/A"}
        </p>

        <button onClick={handleDownload}>Download</button>
      </div>

      {related.length > 0 && (
        <div className="related-videos">
          <h3>Related Videos</h3>
          <Grid
            items={related}
            type="photo" // placeholder for now
            onItemClick={handleVideoClick}
          />
        </div>
      )}
    </div>
  );
};

export default VideoDetails;
