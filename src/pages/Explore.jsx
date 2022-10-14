import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer"
import InfiniteScroll from "react-infinite-scroll-component";
import { TailSpin } from "react-loader-spinner";
import "./index.scss";
import Loading from "./Loading/Loading";
import { trackWindowScroll } from "react-lazy-load-image-component";
function Explore() {
  const [animeDetails, setAnimeDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const pageCount = 30;
  const pageNo = Math.ceil(animeDetails.length / pageCount) + 1;
  useEffect(() => {
    getAnime();
  }, []);

  const getAnime = async () => {
    let res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}api/popular?page=${pageNo}&count=${pageCount}`
    );
    setLoading(false);
    let data = res.data.data.Page.media;
    const merge = [...animeDetails, ...data];
    setAnimeDetails(merge);
    document.title = "Explore Anime - AniWeb";
  };

  const fetchMoreData = () => {
    getAnime();
  };

  return (
    <>
      <div className="popular">
          {loading && <Loading name="Explore Anime" />}
          {!loading && (
            <>
        <InfiniteScroll
          dataLength={animeDetails.length}
          next={fetchMoreData}
          hasMore={true}
          loader={
            <TailSpin
              height="50"
              width="50"
              color="white"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{display:"flex",justifyContent:"center",margin:"2rem"}}
              wrapperClass=""
              visible={true}
            />
          }
          scrollableTarget="scrollableDiv"
          scrollThreshold="200px"
        >
            <div className="container">
              <h1 className="heading">
                <span>Explore</span> All Anime
              </h1>
              <div className="anime">
                {animeDetails &&
                  animeDetails.length > 0 &&
                  animeDetails.map((item, i) => (
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
                          src={item.coverImage.large}
                          data-src={item.coverImage.extraLarge}
                          alt={item.title.english}
                          loading="lazy"
                          effect="opacity"
                          // use normal <img> attributes as props
                        />
                        {/* <img src={item.coverImage.extraLarge} alt="" /> */}
                        <p>
                          {item.title.english !== null
                            ? item.title.english
                            : item.title.userPreferred}
                        </p>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
        </InfiniteScroll>
            <Footer/>
            </>
          )}
      </div>
    </>
  );
}

export default trackWindowScroll(Explore);
