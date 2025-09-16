import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPhotoById, getRelatedPhotos } from "../api/pexels";
import Grid from "../components/Grid";
import PhotoInfo from "../components/PhotoInfo";

const PhotoDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [related, setRelated] = useState([]);

   const handlePhotoClick = (photoId) => {
    navigate(`/photo/${photoId}`);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch main photo
        const response = await getPhotoById(id);
        const photoData = response.data;
        setPhoto(photoData); 

        // Fetch related photos based on photo alt or photographer name
        const keyword = photoData?.alt || photoData?.photographer;
        if (keyword) {
          const relatedResponse = await getRelatedPhotos(keyword);
          setRelated(relatedResponse.photos || []);
        }
      } catch (err) {
        console.error("Error fetching photo or related photos:", err);
      }
    };

    fetchData();
  }, [id]);

  if (!photo) return <p>Loading...</p>;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = photo.src.original;
    link.download = `photo-${id}.jpg`;
    link.click();
  };

  return (
    <div className="photo-details">
      <button onClick={() => navigate(-1)}>← Back</button>

      {/* Main Photo Info */}
      <PhotoInfo photo={photo} onDownload={handleDownload} />

      {/* Related Photos */}
      {related.length > 0 && (
        <div className="related-photos">
          <h3>Related Photos</h3>
          <Grid
            items={related}
            type="photo"
            onItemClick={handlePhotoClick}
          />
        </div>
      )}
    </div>
  );
};

export default PhotoDetails;
