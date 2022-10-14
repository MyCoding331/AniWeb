import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Navigation/Nav";
import { useEffect } from "react";
// import AnimeDetails from "./pages/AnimeDetails/AnimeDetails";
// import FavouriteAnime from "./pages/FavouriteAnime";
// import Home from "./pages/Home";
// import PopularAnime from "./pages/PopularAnime";
// import SearchResults from "./pages/SearchResults";
// import Top100Anime from "./pages/Top100Anime";
// import TrendingAnime from "./pages/TrendingAnime";
// import WatchAnime from "./pages/WatchAnime/WatchAnime";
import GlobalStyle from "./styles/globalStyles";
import { Suspense, lazy } from "react";
// import Search from "./components/Navigation/Search";
import { IoMdArrowRoundUp } from "react-icons/io";
import "./App.scss";





import Donate from "./pages/Donate/Donate";
import Thanx from "./pages/Thanx/Thanx";
function App() {
  const Home = lazy(() => import("./pages/Home"));
  const Explore = lazy(() => import("./pages/Explore"));
  const SearchResults = lazy(() => import("./pages/SearchResults"));
  const Top100Anime = lazy(() => import("./pages/Top50Anime"));
  const TrendingAnime = lazy(() => import("./pages/TrendingAnime"));
  const WatchAnime = lazy(() => import("./pages/WatchAnime/WatchAnime"));
  const FavouriteAnime = lazy(() => import("./pages/FavouriteAnime"));
  const AnimeDetails = lazy(() => import("./pages/AnimeDetails/AnimeDetails"));
  const Error = lazy(() => import("./pages/NotFound/Error"));
  const Terms = lazy(() => import("./pages/Terms/TermsCondition"));
  const Policy = lazy(() => import("./pages/Terms/PrivacyPolicy"));
  const Contact = lazy(() => import("./pages/Contanct/Contanct"));

  


  const toTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  useEffect(() => {
    toTop();
  }, []);

  return (
    <>
      <Router>
        <GlobalStyle />
        <Nav />

        <Suspense>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/trending" element={<TrendingAnime />} />
            <Route path="/favourites" element={<FavouriteAnime />} />
            <Route path="/top50" element={<Top100Anime />} />
            <Route path="/search/:name" element={<SearchResults />} />
            
            <Route path="/category/:slug" element={<AnimeDetails />} />
            <Route path="/watch/:episode" element={<WatchAnime />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/success" element={<Thanx />} />
            <Route path="/terms-condition" element={<Terms />} />
            <Route path="/privacy-policy" element={<Policy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Error/>} />
           
            
          </Routes>
        </Suspense>
       
      </Router>
      <button onClick={toTop} className="top">
        <IoMdArrowRoundUp />
      </button>
    </>
  );
}

export default App;
