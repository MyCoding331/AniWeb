import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Footer from "../components/Footer/Footer"
import "./index.scss"
import Loading from "./Loading/Loading";
function Top50Anime() {
  const [animeDetails, setAnimeDetails] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    getAnime();
  }, []);

  async function getAnime() {
    
    let res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}api/top100?page=1&count=100`
    );
    setLoading(false);
    setAnimeDetails(res.data.data.Page.media);
    document.title = "Top 50 Anime - AniWeb"
  }
  return (
    <div>
      {loading && <Loading name="Top 50 Anime" />}
      {!loading && (
        <div className="container">
          <h1 className="heading">
            <span>Top 50 Anime</span> Results
          </h1>
          <div className="anime">
            {animeDetails.map((item, i) => (
              <div className="card" key={i}>

              <Link
                to={
                  "/search/" +
                  (item.title.userPreferred !== null
                    ? item.title.userPreferred
                    : item.title.romaji)
                }
              >
                <img
                          alt={item.title.english}
                          src={item.coverImage.large}
                          loading="lazy"
                          effect="opacity"// use normal <img> attributes as props
                        />
                <p>
                  {item.title.english !== null
                    ? item.title.english
                    : item.title.userPreferred}
                </p>
              </Link>
              </div>
            ))}
          </div>
        <Footer/>
        </div>
        
      )}
    </div>
  );
}


export default Top50Anime ;
