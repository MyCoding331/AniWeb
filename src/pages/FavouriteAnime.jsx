import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import Footer from "../components/Footer/Footer"
import "./index.scss"
import Loading from "./Loading/Loading";
function FavouriteAnime() {
  const [animeDetails, setAnimeDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageCount = 30;
  const pageNo = Math.ceil(animeDetails.length / pageCount) + 1;
  useEffect(() => {
    getAnime();
  }, []);

  async function getAnime() {
    
    let res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}api/favourite?page=${pageNo}&count=${pageCount}`
    );
    setLoading(false);
    let data = res.data.data.Page.media;
    const merge = [...animeDetails, ...data];
    setAnimeDetails(merge);
    document.title = "Favorite Anime - AniWeb"
  }
  const fetchMoreData = () => {
    getAnime();
  };

  return (
    <div>
      {loading && <Loading name="Favourite Anime" />}
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
            <span>Favourite Anime</span> Results
          </h1>
          <div className="anime">
            {animeDetails.map((item, i) => (
              <div className="card">

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
                          alt={item.title.english}
                          loading="lazy"
                          effect="opacity"
                           // use normal <img> attributes as props
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
        </div>
      </InfiniteScroll>
      <Footer/>
        </>
      )}
    </div>
  );
}







export default (FavouriteAnime) ;
