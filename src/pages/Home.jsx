import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Carousel from "../components/Home/Carousel/Carousel";
import AnimeCards from "../components/Home/AnimeCards";
import Footer from "../components/Footer/Footer"
import useWindowDimensions from "../hooks/useWindowDimensions";
import WatchingEpisodes from "../components/Home/WatchingEpisode/WatchingEpisodes";
import Loading from "./Loading/Loading";
function Home() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const {  width } = useWindowDimensions();

  useEffect(() => {
    getImages();
  }, []);

  async function getImages() {
    window.scrollTo(0, 0);
    let result = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}api/trending?page=1&count=20`
    );
    setImages(result.data.data.Page.media);
    setLoading(false);
    document.title = "AniWeb - Watch Anime Free Online With English Sub and Dub";
  }

  function checkSize() {
    let lsData = localStorage.getItem("Animes");
    lsData = JSON.parse(lsData);
    if (lsData.Names.length === 0) {
      return false;
    }
    return true;
  }
  return (
    <div>
      <HomeDiv>
        {loading && <Loading />}
        {!loading &&( 

          <>
          <div className="home" style={{minHeight:"100vh"}}>

        <HomeHeading>
          <span>Recommended</span> to you
        </HomeHeading>
        <Carousel images={images}  />
        
       
        {localStorage.getItem("Animes") && checkSize() && (
          <div>
            <HeadingWrapper>
              <Heading>
                <h1> <span>Continue</span> Watching</h1> 
              </Heading>
            </HeadingWrapper>
            <WatchingEpisodes />
          </div>
        )}
        {/* <div>
          <HeadingWrapper>
            <Heading>
              <span>All Time</span> Popular
            </Heading>
            <Links to="/popular">View All</Links>
          </HeadingWrapper>
          <AnimeCards count={width <= 800 ? 7 : 15} criteria="popular" />
        </div> */}
        <div>
          <HeadingWrapper>
            <Heading>
              <Links to="/trending">
              <h1> <span>Trending </span>Now</h1> 
              </Links>
            </Heading>
            <Links to="/trending">View All</Links>
          </HeadingWrapper>
          <AnimeCards count={width <= 800 ? 10 : 20} criteria="trending"  />
        </div>
        {/* <div>
          <HeadingWrapper>
            <Heading>
              <span>Top 50</span> Anime
            </Heading>
            <Links to="/top100">View All</Links>
          </HeadingWrapper>
          <AnimeCards count={width <= 800 ? 7 : 15} criteria="top100" />
        </div> */}
        <div>
          <HeadingWrapper>
            <Heading>
              <Links to="/favourites" >
              <h1> <span>All Time</span> Favourite</h1> 
              </Links>
            </Heading>
            <Links to="/favourites">View All</Links>
          </HeadingWrapper>
          <AnimeCards count={width <= 800 ? 10 : 20} criteria="favourite" />
        </div>
          </div>
        <Footer/>
        </>
        )}
      </HomeDiv>
    </div>
  );
}

const Links = styled(Link)`
  color: white;
  font-size: 1.1rem;
 
  @media screen and (max-width: 800px) {
    color: white;
    font-size: 1rem;
   
  }
`;

const HomeDiv = styled.div`
  margin: 1.5rem 5rem 1rem 5rem;
  @media screen and (max-width: 800px) {
    margin: 1rem 1rem 0rem 1rem;
  }
`;

const HomeHeading = styled.h1`
  font-size: 2.3rem;
  color: #7676ff;
 
  span {
    color: white;
  }

  
  margin-bottom: 1rem;

  @media screen and (max-width: 800px) {
    font-size: 1.7rem;
  }
`;

const Heading = styled.div`
a {
  text-decoration:none;
}
h1 {

  font-size: 2.5rem;
  color: #7676ff;
  
  letter-spacing:1px;
  font-weight:400;
  span {
    
    color: white !important;
  }
}

  @media screen and (max-width: 800px) {
    h1 {

      font-size: 1.8rem;
      letter-spacing:1px;
    font-weight:500
    }
  }
`;

const HeadingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 0;
  @media screen and (max-width: 800px) {
  }
`;

export default Home;
