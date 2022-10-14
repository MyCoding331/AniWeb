import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { BiArrowToBottom, BiFullscreen } from "react-icons/bi";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";

import { IconContext } from "react-icons";

import useWindowDimensions from "../../hooks/useWindowDimensions";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import ServersList from "../../components/Servers/ServersList";
import "./Watch.scss";
import Loading from "../Loading/Loading";

function WatchAnime() {
  let episodeSlug = useParams().episode;

  const [episodeLinks, setEpisodeLinks] = useState([]);
  const [currentServer, setCurrentServer] = useState("");
  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions();
  const [fullScreen, setFullScreen] = useState(false);
  const [internalPlayer, setInternalPlayer] = useState(true);
  const [localStorageDetails, setLocalStorageDetails] = useState(0);

  useEffect(() => {
    getEpisodeLinks();
  }, [episodeSlug]);

  async function getEpisodeLinks() {
    setLoading(true);
    window.scrollTo(0, 0);
    let res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}api/getlinks?link=/${episodeSlug}`
    );
    setLoading(false);
    setEpisodeLinks(res.data);
    document.title = res.data[0].titleName + " - AniWeb";
    setCurrentServer(res.data[0].vidstreaming);
    if (
      res.data[0].sources.sources !== null ||
      res.data[0].sources.sources !== undefined
    ) {
      setInternalPlayer(true);
    }
    updateLocalStorage(episodeSlug, res.data);
    getLocalStorage(
      res.data[0].titleName.substring(
        0,
        res.data[0].titleName.indexOf("Episode")
      )
    );
  }

  function getLocalStorage(animeDetails) {
    animeDetails = animeDetails.substring(0, animeDetails.length - 1);

    if (localStorage.getItem("Animes")) {
      let lsData = localStorage.getItem("Animes");
      lsData = JSON.parse(lsData);

      let index = lsData.Names.findIndex((i) => i.name === animeDetails);

      if (index !== -1) {
        setLocalStorageDetails(lsData.Names[index].currentEpisode);
      }
    }
  }

  function fullScreenHandler(e) {
    setFullScreen(!fullScreen);
    let video = document.getElementById("video");

    if (!document.fullscreenElement) {
      video.requestFullscreen();
      window.screen.orientation.lock("landscape-primary");
    } else {
      document.exitFullscreen();
    }
  }

  function updateLocalStorage(episode, episodeLinks) {
    let episodeNum = episode.replace(/.*?(\d+)[^\d]*$/, "$1");
    let animeName = episodeLinks[0].titleName.substring(
      0,
      episodeLinks[0].titleName.indexOf("Episode")
    );
    animeName = animeName.substring(0, animeName.length - 1);
    if (localStorage.getItem("Animes")) {
      let lsData = localStorage.getItem("Animes");
      lsData = JSON.parse(lsData);

      let index = lsData.Names.findIndex((i) => i.name === animeName);
      if (index !== -1) {
        lsData.Names.splice(index, 1);
        lsData.Names.unshift({
          name: animeName,
          currentEpisode: episodeNum,
          episodeLink: episodeSlug,
        });
      } else {
        lsData.Names.unshift({
          name: animeName,
          currentEpisode: episodeNum,
          episodeLink: episodeSlug,
        });
      }
      lsData = JSON.stringify(lsData);
      localStorage.setItem("Animes", lsData);
    } else {
      let data = {
        Names: [],
      };
      data.Names.push({
        name: animeName,
        currentEpisode: episodeNum,
        episodeLink: episodeSlug,
      });
      data = JSON.stringify(data);
      localStorage.setItem("Animes", data);
    }
  }

  return (
    <div>
      {loading && <Loading />}
      {!loading && (
        <div className="wrapper">
          {episodeLinks.length > 0 && currentServer !== "" && (
            <div >
              <div>
                <div className="titles">
                  <p>
                    <span>
                      {episodeLinks[0].titleName.substring(
                        0,
                        episodeLinks[0].titleName.indexOf("Episode")
                      )}
                    </span>{" "}
                    -
                    {" " +
                      episodeLinks[0].titleName.substring(
                        episodeLinks[0].titleName.indexOf("Episode")
                      )}
                  </p>
                  {width <= 800 && (
                    <IconContext.Provider
                      value={{
                        size: "1.8rem",
                        style: {
                          verticalAlign: "middle",
                        },
                      }}
                    >
                      <a
                        href={episodeLinks[0].downloadLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <BiArrowToBottom />
                      </a>
                    </IconContext.Provider>
                  )}
                  {width > 800 && (
                    <IconContext.Provider
                      value={{
                        size: "1.2rem",
                        style: {
                          verticalAlign: "middle",
                          marginBottom: "0.2rem",
                          marginLeft: "0.3rem",
                        },
                      }}
                    >
                      <a
                        href={episodeLinks[0].downloadLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="download"
                      >
                        Download
                        <BiArrowToBottom />
                      </a>
                    </IconContext.Provider>
                  )}
                </div>
                <div>
                  <div className="info-div">
                    <span className="page-info">
                      If you get any error message when trying to stream, please
                      Refresh the page or switch to another streaming server.
                    </span>
                  </div>
                </div>
              </div>

              <div>
                {internalPlayer && (
                  <VideoPlayer
                    sources={episodeLinks[0].sources}
                    internalPlayer={internalPlayer}
                    setInternalPlayer={setInternalPlayer}
                    title={episodeLinks[0].titleName}
                  />
                )}
                {!internalPlayer && (
                  <div>
                    <div className="conttainer">
                      <IconContext.Provider
                        value={{
                          size: "1.5rem",
                          color: "white",
                          style: {
                            verticalAlign: "middle",
                          },
                        }}
                      >
                        <p>External Player (Contain Ads)</p>
                        <div>
                          <div className="tooltip">
                            <button
                              onClick={() => setInternalPlayer(!internalPlayer)}
                            >
                              <HiOutlineSwitchHorizontal />change server
                            </button>
                            <span className="tooltiptext">Change Server</span>
                          </div>
                        </div>
                      </IconContext.Provider>
                    </div>
                    <div className="iframe-wrapper">
                      <iframe
                        id="video"
                        title={episodeLinks[0].title}
                        src={currentServer}
                        allowfullscreen="true"
                        frameborder="0"
                        marginwidth="0"
                        marginheight="0"
                        scrolling="no"
                        loading="lazy"
                      ></iframe>
                      {width <= 800 && (
                        <div>
                          <IconContext.Provider
                            value={{
                              size: "1.8rem",
                              color: "white",
                              style: {
                                verticalAlign: "middle",
                                cursor: "pointer",
                              },
                            }}
                          >
                            <BiFullscreen
                              onClick={(e) => fullScreenHandler(e)}
                            />
                          </IconContext.Provider>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <div className="episode-buttons">
                  {width <= 800 && (
                    <IconContext.Provider
                      value={{
                        size: "1.8rem",
                        style: {
                          verticalAlign: "middle",
                        },
                      }}
                    >
                      <Link
                        className="prev"
                        to={
                          "/watch" +
                          episodeLinks[0].baseEpisodeLink +
                          (parseInt(
                            episodeSlug.replace(/.*?(\d+)[^\d]*$/, "$1")
                          ) -
                            1)
                        }
                        style={
                          episodeSlug.replace(/.*?(\d+)[^\d]*$/, "$1") === "1"
                            ? {
                                pointerEvents: "none",
                                color: "rgba(255,255,255, 0.2)",
                              }
                            : {}
                        }
                      >
                        <HiArrowSmLeft />
                      </Link>
                    </IconContext.Provider>
                  )}
                  {width > 800 && (
                    <IconContext.Provider
                      value={{
                        size: "1.3rem",
                        style: {
                          verticalAlign: "middle",
                          marginBottom: "0.2rem",
                          marginRight: "0.3rem",
                        },
                      }}
                    >
                      <Link
                        className="prev"
                        to={
                          "/watch" +
                          episodeLinks[0].baseEpisodeLink +
                          (parseInt(
                            episodeSlug.replace(/.*?(\d+)[^\d]*$/, "$1")
                          ) -
                            1)
                        }
                        style={
                          episodeSlug.replace(/.*?(\d+)[^\d]*$/, "$1") === "1"
                            ? {
                                pointerEvents: "none",
                                color: "rgba(255,255,255, 0.2)",
                              }
                            : {}
                        }
                      >
                        <HiArrowSmLeft />
                        Previous
                      </Link>
                    </IconContext.Provider>
                  )}
                  {width <= 800 && (
                    <IconContext.Provider
                      value={{
                        size: "1.8rem",
                        style: {
                          verticalAlign: "middle",
                        },
                      }}
                    >
                      <Link
                        className="next"
                        to={
                          "/watch" +
                          episodeLinks[0].baseEpisodeLink +
                          (parseInt(
                            episodeSlug.replace(/.*?(\d+)[^\d]*$/, "$1")
                          ) +
                            1)
                        }
                        style={
                          episodeLinks[0].numOfEpisodes ===
                          episodeSlug.replace(/.*?(\d+)[^\d]*$/, "$1")
                            ? {
                                pointerEvents: "none",
                                color: "rgba(255,255,255, 0.2)",
                              }
                            : {}
                        }
                      >
                        <HiArrowSmRight />
                      </Link>
                    </IconContext.Provider>
                  )}

                  {width > 800 && (
                    <IconContext.Provider
                      value={{
                        size: "1.3rem",
                        style: {
                          verticalAlign: "middle",
                          marginBottom: "0.2rem",
                          marginLeft: "0.3rem",
                        },
                      }}
                    >
                      <Link
                        className="next"
                        to={
                          "/watch" +
                          episodeLinks[0].baseEpisodeLink +
                          (parseInt(
                            episodeSlug.replace(/.*?(\d+)[^\d]*$/, "$1")
                          ) +
                            1)
                        }
                        style={
                          episodeLinks[0].numOfEpisodes ===
                          episodeSlug.replace(/.*?(\d+)[^\d]*$/, "$1")
                            ? {
                                pointerEvents: "none",
                                color: "rgba(255,255,255, 0.2)",
                              }
                            : {}
                        }
                      >
                        Next
                        <HiArrowSmRight />
                      </Link>
                    </IconContext.Provider>
                  )}
                </div>
                {!internalPlayer && (
                  <ServersList
                    episodeLinks={episodeLinks}
                    currentServer={currentServer}
                    setCurrentServer={setCurrentServer}
                  />
                )}
                <div className="episode-wrapper">
                  <p>Episodes</p>
                  {width <= 800 && (
                    <div className="episodes">
                      {episodeLinks[0].episodes.map((item, i) => (
                        <Link
                          className="episode-links"
                          to={"/watch" + item}
                          style={
                            parseInt(
                              episodeSlug.replace(/.*?(\d+)[^\d]*$/, "$1")
                            ) ===
                              i + 1 || i < localStorageDetails
                              ? { backgroundColor: "#7676ff" }
                              : {}
                          }
                        >
                          {i + 1}
                        </Link>
                      ))}
                    </div>
                  )}
                  {width > 800 && (
                    <div className="episodes">
                      {episodeLinks[0].episodes.map((item, i) => (
                        <Link
                          className="episode-links"
                          to={"/watch" + item}
                          style={
                            parseInt(
                              episodeSlug.replace(/.*?(\d+)[^\d]*$/, "$1")
                            ) ===
                              i + 1 || i < localStorageDetails
                              ? { backgroundColor: "#7676ff" }
                              : {}
                          }
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

export default WatchAnime;
