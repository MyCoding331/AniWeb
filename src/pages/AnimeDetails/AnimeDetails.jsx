import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Loading from "../Loading/Loading";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import "./Detail.scss";
function AnimeDetails() {
  let slug = useParams().slug;
  const [animeDetails, setAnimeDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const { width } = useWindowDimensions();
  const [localStorageDetails, setLocalStorageDetails] = useState(0);

  useEffect(() => {
    getAnimeDetails();
  }, []);

  async function getAnimeDetails() {
    setLoading(true);
    setExpanded(false);
    window.scrollTo(0, 0);
    let res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}api/getanime?link=/category/${slug}`
    );
    setLoading(false);
    setAnimeDetails(res.data);
    getLocalStorage(res.data);
    document.title = res.data[0].gogoResponse.title + " - AniWeb";
  }

  function readMoreHandler() {
    setExpanded(!expanded);
  }

  function getLocalStorage(animeDetails) {
    if (localStorage.getItem("Animes")) {
      let lsData = localStorage.getItem("Animes");
      lsData = JSON.parse(lsData);

      let index = lsData.Names.findIndex(
        (i) => i.name === animeDetails[0].gogoResponse.title
      );

      if (index !== -1) {
        setLocalStorageDetails(lsData.Names[index].currentEpisode);
      }
    }
  }

  return (
    <div>
      {loading && <Loading />}
      {!loading && (
        <div className="content">
          {animeDetails.length > 0 && (
            <div>
              <img
                className="banner"
                loading="lazy"
                src={
                  animeDetails[0].anilistResponse !== "NONE" &&
                  animeDetails[0].anilistResponse.anilistBannerImage !== null
                    ? animeDetails[0].anilistResponse.anilistBannerImage
                    : "https://cdn.wallpapersafari.com/41/44/6Q9Nwh.jpg"
                }
                alt=""
              />
              
              <div className="contentWrapper">
                <div
                  className="info
                "
                >
                  <div className="poster">
                    <img src={animeDetails[0].gogoResponse.image} alt="" loading="lazy" />
                    
                  </div>
                  <div className="details">
                    {localStorageDetails === 0 && (
                      <Link
                        className="button"
                        to={"/watch" + animeDetails[0].gogoResponse.episodes[0]}
                      >
                        Watch Now
                      </Link>
                    )}
                    {localStorageDetails !== 0 && (
                      <Link
                        className="button"
                        to={
                          "/watch" +
                          animeDetails[0].gogoResponse.episodes[
                            localStorageDetails - 1
                          ]
                        }
                      >
                        EP - {localStorageDetails}
                      </Link>
                    )}
                    <h1>{animeDetails[0].gogoResponse.title}</h1>
                    <div className="poster mini-poster">
                      <img src={animeDetails[0].gogoResponse.image} alt="" loading="lazy" />
                      {/* <Link
                        className="button"
                        to={"/watch" + animeDetails[0].gogoResponse.episodes[0]}
                      >
                        Watch Now
                      </Link> */}
                    </div>
                    <p>
                      <span>Type: </span>
                      {animeDetails[0].gogoResponse.type.replace("Type:", "")}
                    </p>
                    {width <= 800 && expanded && (
                      <p>
                        <span>Plot Summery: </span>
                        {animeDetails[0].gogoResponse.description.replace(
                          "Plot Summary:",
                          ""
                        )}
                        <button className="read-more" onClick={() => readMoreHandler()}>
                          read less
                        </button>
                      </p>
                    )}
                    {width <= 800 && !expanded && (
                      <p>
                        <span>Plot Summery: </span>
                        {animeDetails[0].gogoResponse.description
                          .replace("Plot Summary:", "")
                          .substring(0, 200) + "... "}
                        <button className="read-more" onClick={() => readMoreHandler()}>
                          read more
                        </button>
                      </p>
                    )}
                    {width > 800 && (
                      <p>
                        <span>Plot Summery: </span>
                        {animeDetails[0].gogoResponse.description.replace(
                          "Plot Summary:",
                          ""
                        )}
                      </p>
                    )}

                    <p>
                      <span>Genre: </span>
                      {animeDetails[0].gogoResponse.genre.replace("Genre:", "")}
                    </p>
                    <p>
                      <span>Released: </span>
                      {animeDetails[0].gogoResponse.released.replace(
                        "Released:",
                        ""
                      )}
                    </p>
                    <p>
                      <span>Status: </span>
                      {animeDetails[0].gogoResponse.status.replace(
                        "Status:",
                        ""
                      )}
                    </p>
                    <p>
                      <span>Number of Episodes: </span>
                      {animeDetails[0].gogoResponse.numOfEpisodes}
                    </p>
                  </div>
                </div>

                <div className="episode">
                  <h2>Episodes</h2>
                  {width <= 800 && (
                    <div className="episodes">
                      {animeDetails[0].gogoResponse.episodes.map((item, i) => (
                        <Link
                          className="episode-link"
                          style={
                            i < localStorageDetails - 1
                              ? { backgroundColor: "#7676ff" }
                              : {}
                          }
                          to={"/watch" + item}
                        >
                          {i + 1}
                        </Link>
                      ))}
                    </div>
                  )}
                  {width > 800 && (
                    <div className="episodes">
                      {animeDetails[0].gogoResponse.episodes.map((item, i) => (
                        <Link
                          className="episode-link"
                          style={
                            i < localStorageDetails - 1
                              ? { backgroundColor: "#7676ff" }
                              : {}
                          }
                          to={"/watch" + item}
                        >
                          Episode {i + 1}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AnimeDetails;
