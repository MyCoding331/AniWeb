import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// import Footer from "../components/Footer/Footer"
import "./index.scss"
import Loading from "./Loading/Loading";
function SearchResults() {
  let urlParams = useParams().name;
  urlParams = urlParams.replace(":", "").replace("(", "").replace(")", "");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getResults();
  }, [urlParams]);

  async function getResults() {
    setLoading(true);
    
    let res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}api/search?name=${urlParams}`
    );
    setLoading(false);
    setResults(res.data);
    document.title = urlParams + " - AniWeb"
  }
  return (
    <div>
      {loading && <Loading />}
      {!loading && (
        <div className="container">
          <h1 className="heading">
            <span>Search</span> Results
          </h1>
          <div className="search-anime">
            {results.map((item, i) => (
              <div className="card" key={i}>

              <Link to={item.link}>
              <img
                          src={item.image}
                          alt={item.title.english}
                          loading="lazy"
                          effect="opacity"
                           // use normal <img> attributes as props
                        />
                <p>{item.title}</p>
              </Link>
              </div>
            ))}
          </div>
          {/* <Footer/> */}
          {results.length === 0 && <h2 style={{color:"white"}}>No Search Results Found</h2>}
        </div>
      )}
    </div>
  );
}


export default SearchResults;
