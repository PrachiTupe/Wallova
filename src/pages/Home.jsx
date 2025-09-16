import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCuratedPhotos,
  searchPhotos,
  getPopularVideos,
  searchVideos,
} from "../api/pexels";

import Grid from "../components/Grid";
import SearchBar from "../components/SearchBar";
import Tabs from "../components/Tabs";
import "./Home.css";
import logo from "../imgs/logo.png";

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("photo");
  const [scrollY, setScrollY] = useState(0);

  const navigate = useNavigate();

  // Fetch items when tab changes
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        if (activeTab === "photo") {
          const res = await getCuratedPhotos(80, 1);
          setPhotos(res.data.photos);
        } else {
          const res = await getPopularVideos(30, 1);
          setVideos(res.data.videos);
        }
      } catch (error) {
        console.error("Failed to fetch items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [activeTab]);

  // Handle search
  const handleSearch = async (query) => {
    setLoading(true);
    try {
      if (activeTab === "photo") {
        const res = await searchPhotos(query, 80, 1);
        setPhotos(res.data.photos);
      } else {
        const res = await searchVideos(query, 30, 1);
        setVideos(res.data.videos);
      }
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle click
  const handleItemClick = (item) => {
    console.log("What Photo", item.id);
    console.log("What Video", item.id);
    if (activeTab === "photo") navigate(`/photo/${item}`);
    else navigate(`/video/${item.id}`);
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine items to render
  const items = activeTab === "photo" ? photos : videos;

  return (
    <div className="home-page">
      <header className={`top-bar ${scrollY > 50 ? "scrolled" : ""}`}>
        <img src={logo} alt="Logo" className="logo" />
        <SearchBar onSearch={handleSearch} />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </header>

      <main className="content">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Grid
            items={items}
            type={activeTab}
            onItemClick={handleItemClick}
          />
        )}
      </main>
    </div>
  );
};

export default Home;
